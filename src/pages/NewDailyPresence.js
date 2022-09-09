import React,{useState, useEffect} from 'react';
import AppWidgetSummary from '../sections/@dashboard/app/AppWidgetSummary';

import { Box, Card, CardContent, Container, InputLabel, MenuItem, FormControl, Select, Paper, Button } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 
import { Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import moment from 'moment';
import dayjs from 'dayjs';
import swal from '@sweetalert/with-react';

import dailyEmployeeService from '../services/dailyEmployeeService';
import dailyPresenceService from '../services/dailyPresenceService'
import Label from '../components/Label';

function NewDailyPresence() {

  // show employee data
  const [dailyEmployees, setDailyEmployees] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const findData = useParams();
  const dailyemployee_id = findData.id

  useEffect(() => {
    const load = async () => {
      const res = await dailyEmployeeService.get(dailyemployee_id)
      setDailyEmployees(res.data)
      setLoaded(true)
    }
    if (dailyemployee_id && !loaded) {
      load();
    }
  }, [dailyemployee_id, loaded])

  // insert new week
  const [month, setMonth] = useState(dayjs())
  const [firstdate, setFirstdate] = useState(null)
  const [lastdate, setLastdate] = useState(null)

  const initialWeekState = {
    id:         null,
    month:      moment(month.$d).format('MMMM YYYY'),
    first_date: firstdate,
    last_date:  lastdate
  }
  const [week, setWeek] = useState(initialWeekState)

  const insertMonth = (newMonth) => {
    const m = moment(newMonth.$d).format('MMMM YYYY')
    setMonth(m)
    setWeek({ ...week, month: m })
  }

  const insertFirstdate = (newFirstdate) => {
    const f = moment(newFirstdate).format('YYYY-MM-DD')
    setFirstdate(f)
    setWeek({ ...week, first_date: f })
  }

  const insertLastdate = (newLastdate) => {
    const l = moment(newLastdate).format('YYYY-MM-DD')
    setLastdate(l)
    setWeek({ ...week, last_date: l })
  }

  const saveWeek = e => {
    e.preventDefault()
    var data = {
      month:        week.month,
      first_date:   week.first_date,
      last_date:    week.last_date,
    }
    if (!data.first_date || !data.last_date) {
      swal({
        title: "Un erreur est survenue!",
        text: "Des formulaires requis sont vides.",
        icon: "error",
        button: "OK",
      });
    } else {
      dailyPresenceService.create(dailyemployee_id, data).then(res => {
        setWeek({
          id:         res.data.id,
          month:      res.data.month,
          first_date: res.data.firstdate,
          last_date:  res.data.last_date,
        })
        window.location.reload(true)
      })
    }
  }

  //show presence days
  const [presences, setPresences] = useState([])

  const getPresences = () => {
    dailyPresenceService.getAll(dailyemployee_id).then((res) => {
      setPresences(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getPresences()
  }, [dailyemployee_id])

  const columns = [
    { field: 'date',            headerName: 'Fait le',  width: 150, type: 'action',
      renderCell: (data) => {
        if (!data.row.date) {
          return ''
        } else {
          return moment(presence.date).format('YYYY-MM-DD')
        }
      }
    },
    { field: 'day_text',        headerName: 'Jour',     width: 150 },
    { field: 'status',          headerName: 'Status',   width: 150, type: 'action',
      renderCell: (data) => {
        if (data.row.status==='1') {
          return( <Label variant="ghost" color='success'>Présent</Label> )
        } else if(data.row.status==='0.5') {
          return( <Label variant="ghost" color='warning'>Demi Journée</Label> )
        } else if(data.row.status==='0') {
          return( <Label variant="ghost" color='error'>Absent</Label> )
        }
      }
    },
    { field: 'presence_salary', headerName: 'Salaire',  width: 150, type: 'action', 
      renderCell: (data) => {
        if (!data.row.presence_salary) {
          return ''
        } else {
          return(<b>{data.row.presence_salary} Ar</b>)
        }
      }
    },
  ]

  const rows = presences.map(presence => ({
    id:               presence.dailypresence_id,
    day_text:         presence.day_text,
    date:             presence.date,
    status:           presence.status,
    presence_salary:  presence.presence_salary,
  }))

  //insert new presence
  const [dayValue, setDayValue] = useState('')
  const [statusValue, setStatusValue] = useState('')
  const [salary, setSalary] = useState(0)

  const initialPresenceState = {
    id:               null,
    day_id:           dayValue,
    status:           statusValue,
  }
  const [presence, setPresence] = useState(initialPresenceState)

  const insertDay = e => {
    const dayInput = e.target.value
    setDayValue(dayInput)
    setPresence({ ...presence, day_id: dayInput })
  }

  const insertStatus = e => {
    const statusInput = e.target.value
    if (statusInput===1) {
      setSalary(dailyEmployees.salary)
    } else if (statusInput===0.5) {
      const newSalary = dailyEmployees.salary / 2
      setSalary(newSalary)
    } else {
      setSalary(0)
    }
    setStatusValue(statusInput)
    setPresence({ ...presence, status: statusInput})
  }
  console.log('presence =',presence)

  const savePresence = e => {
    e.preventDefault()

    var data = {
      day_id: presence.day_id,
      status: presence.status,
    }

    if (!data.day_id) {
      swal({
        title: "Un erreur est survenue!",
        text: "Des formulaires requis sont vides.",
        icon: "error",
        button: "OK",
      });
    } else {
      dailyPresenceService.action(dailyemployee_id, data).then(res => {
        setPresence({
          id:     res.data.id,
          day_id: res.data.day_id,
          status: res.data.status
        })
        dailyPresenceService.salary(dailyemployee_id)
        dailyPresenceService.setPresence(dailyemployee_id)
        window.location.reload(true)
      })
    }
  }

  //show dashboard
  const [totalSalary, setTotalSalary] = useState(0)
  const [nbPresence, setNbPresence] = useState(0)

  const getSalary = () => {
    dailyPresenceService.getSalary(dailyemployee_id).then((res) => { setTotalSalary(res.data.total_salary) }).catch(err => { console.log(err) })
  }

  const getNbPresence = () => {
    dailyPresenceService.nbPresence(dailyemployee_id).then((res) => { setNbPresence(res.data.nb_presence) }).catch(err => { console.log(err) })
  }

  useEffect(() => {
    getSalary()
    getNbPresence()
  })

  return (
    <div>
      <Container maxWidth="xxl">
        <Card sx={{ height: '100%', width: '100%' }}>
          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={saveWeek} noValidate autoComplete='off'>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box sx={{ ml: 8, mt: 5, fontSize: '18px' }}>
                    <div>
                      <b>N° Matricule :</b> {dailyEmployees.matricule} <br />
                      <b>Nom : </b> {dailyEmployees.firstname} <br />
                      <b>Prénom :</b> {dailyEmployees.lastname} <br />
                      <b>Poste occupé : </b> {dailyEmployees.post_name}<br />
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      views={['year', 'month']}
                      label="Year and Month"
                      minDate={dayjs('2012-03-01')}
                      maxDate={dayjs('2023-06-01')}
                      value={month}
                      onChange={insertMonth}
                      renderInput={(params) => <TextField sx={{ mt: 5 }} variant="standard" {...params} helperText={null} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={2}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date de début"
                      id="start_date"
                      name="start_date"
                      value={firstdate}
                      onChange={insertFirstdate}
                      renderInput={(params) =>
                        <Box sx={{ mt: 5 }}>
                          <TextField
                            {...params}
                            variant="standard"
                            id="start_date"
                            name="start_date"
                          /><br />
                        </Box>
                      }
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={2}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date de fin"
                      id="end_date"
                      name="end_date"
                      value={lastdate}
                      onChange={insertLastdate}
                      renderInput={(params) =>
                        <Box sx={{ mt: 5 }}>
                          <TextField
                            {...params}
                            variant="standard"
                            id="end_date"
                            name="end_date"
                          /><br />
                        </Box>
                      }
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={2}>
                  <Button sx={{ mt: 5 }} onClick={saveWeek} variant="contained" size='large'>Enregistrer</Button>
                </Grid>
              </Grid>
            </form>
          </Box><br />

          <Container maxWidth="lg">

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={7}
                  rowsPerPageOptions={[7]}
                  disableSelectionOnClick
                />
              </Box>
            </Paper> <br />

            <form onSubmit={savePresence} noValidate autoComplete='off'>
              <Grid container spacing={3}>
                <Grid item xs>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Jour</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={dayValue}
                        label="Jour"
                        onChange={insertDay}
                      >
                        <MenuItem value={1}>Lundi</MenuItem>
                        <MenuItem value={2}>Mardi</MenuItem>
                        <MenuItem value={3}>Mercredi</MenuItem>
                        <MenuItem value={4}>Jeudi</MenuItem>
                        <MenuItem value={5}>Vendredi</MenuItem>
                        <MenuItem value={6}>Samedi</MenuItem>
                        <MenuItem value={7}>Dimanche</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                      <Select
                        id="status"
                        name='status'
                        value={statusValue}
                        label="Presence"
                        onChange={insertStatus}
                      >
                        <MenuItem value={1}>Présent</MenuItem>
                        <MenuItem value={0.5}>Demi-journée</MenuItem>
                        <MenuItem value={0}>Absent</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs>
                  <TextField
                    fullWidth
                    disabled
                    id="outlined-disabled"
                    label="Salaire"
                    value={salary}
                    // onChange={handleChangeSalary}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Ar</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <Button variant="contained" onClick={savePresence} size='large'>Enregistrer</Button>
                </Grid>
              </Grid>
            </form><br />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="TOTAL NOMBRE DE JOURS TRAVAILLES" total={nbPresence} color="warning" icon={'ant-design:shopping-filled'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="TOTAL NOMBRE D'ABSENCE" total={0} color="error" icon={'ant-design:tag-filled'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="TOTAL AVANCE SALAIRE" total={0} icon={'ant-design:alert-filled'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="TOTAL SALAIRE" total={totalSalary} color="success" icon={'ant-design:gift-filled'} />
              </Grid>
            </Grid>
          </Container><br />

        </Card>
      </Container>
    </div>
  )
}

export default NewDailyPresence