import React,{useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 
import { Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import moment from 'moment';

import dailyEmployeeService from '../services/dailyEmployeeService';
import dailyPresenceService from '../services/dailyPresenceService'


function NewDailyPresence() {

  const [status, setStatus] = useState('');
  const [salary, setSalary] = useState(0);

  const initiatePresenceState = {
    dailypresence_id: null,
    status:           status,
    advance:          '',
    // presence_salary:  salary,
  }
  
  const [dailyEmployees,setDailyEmployees] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [dateStart, setdateStart] = useState(null);
  const [dateEnd, setdateEnd] = useState(null);
  const [age, setAge] = useState('');
  const [presence, setPresence] = useState(initiatePresenceState);
  const [presencedays, setPresencedays] = useState([]);
  const [nextDay, setNextDay] = useState([])
  
  const findData = useParams();
  const dailyemployee_id = findData.id

  useEffect(() => {
    dailyPresenceService.getAll(dailyemployee_id).then((res) => {
      setPresencedays(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  console.log(presencedays)
  
  const handleChangeMonth = (event) => {
    setAge(event.target.value);
  }

  useEffect(() => {
    dailyPresenceService.getEmptyOne(dailyemployee_id).then((res) => {
      setNextDay(res.data)
    })
  }, [])
  
    console.log(nextDay)

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

  const insertStartDate = (newDate) => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setdateStart(d);
    setDailyEmployees({ ...dailyEmployees, start_date: d })
  }

  const insertEndDate = (newDate) => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setdateEnd(d);
    setDailyEmployees({ ...dailyEmployees, end_date: d })
  }

  const handleChangePresence = e => {
    const { name, value } = e.target
    setPresence({ ...presence, [name]: value })
  }
  console.log('presence',presence)

  const handleStatusDayChange = (e) => {
    const statusDay = e.target.value
    if (statusDay===1) {
      setSalary(dailyEmployees.salary)
      setPresence({ ...presence, presence_salary: dailyEmployees.salary})
    } else if(statusDay===0.5) {
      const newSalary = dailyEmployees.salary / 2
      setSalary(newSalary)
      setPresence({ ...presence, presence_salary: newSalary})
    } else {
      setSalary(0)
      setPresence({ ...presence, presence_salary: 0})
    }
    setStatus(statusDay);
    setPresence({ ...presence, status: statusDay })
  }

  const columns = [
    { field: 'day_text', headerName: 'Jour', width: 200 },
    { field: 'status', headerName: 'Présence', width: 200 },
    { field: 'advance', headerName: 'Avance', width: 200 },
    { field: 'presence_salary', headerName: 'Salaire', width: 200 },
  ]

  const rows = presencedays.map(presenceday => ({
    id:               presenceday.dailypresence_id,
    day_text:         presenceday.day_text,
    status:           presenceday.status,
    advance:          presenceday.advance,
    presence_salary:  presenceday.presence_salary,
  }))

  const savePresence = e => {
    e.preventDefault()
    var data = {
      dailypresence_id: nextDay.dailypresence_id,
      status:           presence.status,
      advance:          presence.advance,
    }
    dailyPresenceService.update(data).then(res => {
      setPresence({
        dailypresence_id: res.data.dailypresence_id,
        status:           res.data.status,
        advance:          res.data.advance,
      })
    })

  }

  return (
    <div>
      <Container maxWidth="xxl">
        <Card sx={{ height: 900, width: '100%' }}>
          <Box sx={{ ml:8, mt:5, fontSize:'18px'}}> 
            <div>
              <b>N° Matricule :</b> {dailyEmployees.matricule} <br/>
              <b>Nom : </b> {dailyEmployees.firstname} <br/>
              <b>Prénom :</b> {dailyEmployees.lastname} <br/>
              <b>Poste occupé : </b> {dailyEmployees.post_name}<br/>  
            </div>             
          </Box>
          <CardContent>
            <form>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ lineHeight: 6 }}>
                  <Grid item xs={2} sm={4} md={4}>
                    <FormControl variant="standard" sx={{ ml: 40, width:'70%',mt:-15 }}>
                      <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={age}
                        onChange={handleChangeMonth}
                        label="Mois"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Date de début"
                        id="start_date"
                        name="start_date"
                        value={dateStart} 
                        onChange={insertStartDate}
                        renderInput={(params) =>
                          <Box sx={{ mt:-15 }}>
                            <TextField 
                              {...params} 
                              variant="standard" 
                              sx={{ width:'70%', ml: 25 }} 
                              id="start_date" 
                              name="start_date" 
                            /><br />
                          </Box>
                        }
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Date de fin"
                        id="end_date"
                        name="end_date"
                        value={dateEnd}
                        onChange={insertEndDate}
                        renderInput={(params) =>
                          <Box sx={{ mt:-15 }}>
                            <TextField 
                              {...params} 
                              variant="standard" 
                              sx={{ width:'70%',ml:10 }} 
                              id="end_date" 
                              name="end_date" 
                            /><br />
                          </Box>
                        }
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Box>
            </form>
            
            <Container maxWidth="lg">
            
              <Paper sx={{ width: '100%', overflow: 'hidden', mt: -10 }}>
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
                    <Typography variant="h4">{nextDay.day_text}</Typography>
                  </Grid>
                  <Grid item xs>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl sx={{ width: '25ch' }}>
                        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                        <Select
                          id="status"
                          name='status'
                          value={status}
                          label="Presence"
                          onChange={handleStatusDayChange}
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
                      label="Avance"
                      id="outlined-start-adornment"
                      value={presence.advance}
                      onChange={handleChangePresence}
                      name='advance'
                      sx={{ width: '25ch' }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Ar</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
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
              </form>
              
            </Container>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}

export default NewDailyPresence