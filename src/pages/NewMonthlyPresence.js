import React, { useState, useEffect } from 'react';
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

import monthlyEmployeeService from '../services/monthlyEmployeeService'
import monthlyPresenceService from '../services/monthlyPresenceService'
import Label from '../components/Label';


const NewMonthlyPresence = () => {

  //show employee data
  const [monthlyEmployee, setMonthlyemployee] = useState([])
  const [loaded, setLoaded] = useState(false);
  const findData = useParams();
  const monthlyemployee_id = findData.id

  useEffect(() => {
      const load = async () => {
          const res = await monthlyEmployeeService.get(monthlyemployee_id)
          setMonthlyemployee(res.data)
          setLoaded(true)
      }
      if (monthlyemployee_id && !loaded) {
          load();
      }
  }, [monthlyemployee_id, loaded])

  //insert new week
  const [month, setMonth] = useState(dayjs())
  const [startdate, setStartdate] = useState(null)

  const initialWeekState = {
    id:                 null,
    month:              moment(month.$d).format('MMMM YYYY'),
    start_date:         startdate,
    monthlyemployee_id: monthlyemployee_id
  }
  const [week, setWeek] = useState(initialWeekState)
  
  const insertMonth = (newMonth) => {
    const m = moment(newMonth.$d).format('MMMM YYYY')
    setMonth(m)
    setWeek({ ...week, month: m })
}

  const insertStartdate = (newStartdate) => {
    const f = moment(newStartdate).format('YYYY-MM-DD')
    setStartdate(f)
    setWeek({ ...week, start_date: f })
  }

  const saveWeek = e => {
    e.preventDefault()
    var data = {
        month:              week.month,
        start_date:         week.start_date,
        monthlyemployee_id: week.monthlyemployee_id,
    }                       
    if (!data.start_date) {
        swal({
            title: "Un erreur est survenue!",
            text: "Des formulaires requis sont vides.",
            icon: "error",
            button: "OK",
        });
    } else {
        monthlyPresenceService.create(monthlyemployee_id, data).then(res => {
            setWeek({
                id:                 res.data.id,
                month:              res.data.month,
                start_date:         res.data.startdate,
                monthlyemployee_id: res.data.monthlyemployee_id,
            })
            window.location.reload(true)
        })
    }
  }

  //show presence days
  const [presences, setPresences] = useState([])

  const getPresences = () => {
    monthlyPresenceService.getAll(monthlyemployee_id).then((res) => {
        setPresences(res.data)
    }).catch(err => {
        console.log(err)
    })
  }

  useEffect(() => {
    getPresences()
  }, [monthlyemployee_id])

  const columns = [
    { field: 'date',            headerName: 'Date',  width: 250, type: 'action',
      renderCell: (data) => {
        if (!data.row.date) {
          return ''
        } else {
          return moment(data.row.date).format('YYYY-MM-DD')
        }
      }
    },
    { field: 'status',          headerName: 'Status',   width: 250, type: 'action',
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
    { field: 'advance',         headerName: 'Avance (Ar)',   width: 250},
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
    id:               presence.monthlypresence_id,
    date:             presence.DATE,
    status:           presence.status,
    advance:          presence.advance,
    presence_salary:  presence.presence_salary,
  }))

  //insert new presence
  const [date, setDate] = useState(null)
  const [statusValue, setStatusValue] = useState('')
  const [salary, setSalary] = useState(0)

  const initialPresenceState = {
    id:     null,
    date:   date,
    status: statusValue,
    advance:  null
  }
  const [presence, setPresence] = useState(initialPresenceState)

  const handleInputChange = e => {
    const { name, value } = e.target
    setPresence({ ...presence, [name]: value })
  }

  const insertDate = newDate => {
    const dateInput = moment(newDate).format('YYYY-MM-DD')
    setDate(dateInput)
    setPresence({ ...presence, date: dateInput })
  }

  const insertStatus = e => {
    const statusInput = e.target.value
    if (statusInput===1) {
      setSalary(monthlyEmployee.salary)
    } else if (statusInput===0.5) {
      const newSalary = monthlyEmployee.salary / 2
      setSalary(newSalary)
    } else {
      setSalary(0)
    }
    setStatusValue(statusInput)
    setPresence({ ...presence, status: statusInput})
  }

  const savePresence = e => {
    e.preventDefault()

    var data = {
      date:   presence.date,
      status: presence.status,
      advance:  presence.advance
    }

    if (!data.date) {
      swal({
        title: "Un erreur est survenue!",
        text: "Des formulaires requis sont vides.",
        icon: "error",
        button: "OK",
      });
    } else {
      monthlyPresenceService.action(monthlyemployee_id, data).then(res => {
        monthlyPresenceService.setPresence(monthlyemployee_id)
        monthlyPresenceService.setAbsence(monthlyemployee_id)
        monthlyPresenceService.advance(monthlyemployee_id)
        monthlyPresenceService.salary(monthlyemployee_id)
        window.location.reload(true)
      })
    }
  }

  console.log(presences)

  //show dashboard
  const [nbPresence, setNbPresence] = useState(0)
  const [nbAbsence, setNbAbsence] = useState(0)
  const [totalAdvance, setTotalAdvance] = useState(0)
  const [totalSalary, setTotalSalary] = useState(0)

  const getNbPresence = () => {
    monthlyPresenceService.nbPresence(monthlyemployee_id).then((res) => { setNbPresence(res.data.nb_presence) }).catch(err => { console.log(err) })
  }

  const getNbAbsence = () => {
    monthlyPresenceService.nbAbsence(monthlyemployee_id).then((res) => { setNbAbsence(res.data.nb_absence) }).catch(err => { console.log(err) })
  }

  const getAdvance = () => {
    monthlyPresenceService.getAdvance(monthlyemployee_id).then((res) => { setTotalAdvance(res.data.total_advance) }).catch(err => { console.log(err) })
  }

  const getSalary = () => {
    monthlyPresenceService.getSalary(monthlyemployee_id).then((res) => { setTotalSalary(res.data.total_salary) }).catch(err => { console.log(err) })
  }

  useEffect(() => {
    getNbPresence()
    getNbAbsence()
    getAdvance()
    getSalary()
  })

  //get last date
  const [lastdate, setLastDate] = useState(null)

  const getLastDate = () => {
    monthlyPresenceService.getLastDate(monthlyemployee_id).then((res) => { setLastDate(res.data.start_date) }).catch(err => { console.log(err) })
  }

  useEffect(() => {
    getLastDate()
  }, [])

  var title
  if (lastdate) {
    title = `Début de semaine : le ${moment(lastdate).format('DD-MM-YYYY')}`
  } else {
    title = 'Semaine non spécifié'
  }

  return (
    <>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        {title}
      </Typography>

      <Container maxWidth="xxl">
        <Card sx={{ height: '100%', width: '100%' }}>
          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={saveWeek} noValidate autoComplete='off'>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box sx={{ ml: 8, mt: 5, fontSize: '18px' }}>
                    <div>
                      <b>N° Matricule :</b> {monthlyEmployee.matricule} <br />
                      <b>Nom : </b> {monthlyEmployee.firstname} <br />
                      <b>Prénom :</b> {monthlyEmployee.lastname} <br />
                      <b>Poste occupé : </b> {monthlyEmployee.post_name}<br />
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      views={['year', 'month']}
                      label="Mois et Année"
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
                      value={startdate}
                      onChange={insertStartdate}
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
                  <Box sx={{ minWidth: 120, width: '100%' }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date"
                      id="start_date"
                      name="start_date"
                      value={date}
                      onChange={insertDate}
                      renderInput={(params) =>
                        <Box>
                          <TextField
                            {...params}
                            variant="outlined"
                            id="start_date"
                            name="start_date"
                            sx={{ width: '100%' }}
                          /><br />
                        </Box>
                      }
                    />
                  </LocalizationProvider>
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
                  <TextField
                    fullWidth
                    type='number'
                    id="outlined-disabled"
                    label="Avance"
                    name='advance'
                    value={presence.advance}
                    onChange={handleInputChange}
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
                <AppWidgetSummary title="TOTAL NOMBRE D'ABSENCE" total={nbAbsence} color="error" icon={'ant-design:tag-filled'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="TOTAL AVANCE SALAIRE - AR" total={totalAdvance} icon={'ant-design:alert-filled'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="TOTAL SALAIRE - AR" total={totalSalary} color="success" icon={'ant-design:gift-filled'} />
              </Grid>
            </Grid>
          </Container><br />

        </Card>
      </Container>
    </>
  )
}

export default NewMonthlyPresence