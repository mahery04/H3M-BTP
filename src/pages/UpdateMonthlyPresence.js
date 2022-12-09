import React, { useEffect, useState } from 'react';

import { Button, Card, CardContent, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl, Divider, Chip, InputAdornment } from '@mui/material';

import { Grid, TextField } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import PortraitIcon from '@mui/icons-material/Portrait';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import moment from 'moment'
import swal from '@sweetalert/with-react';
import monthlyPresenceService from '../services/monthlyPresenceService'
import { useNavigate,useParams } from 'react-router-dom';

function UpdateMonthlyPresence() {

  const [monthlyEmployees, setMonthlyEmployees] = useState('')
  const [employees, setEmployees] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [returnDate, setReturnDate] = useState(null)
  const [visaRh, setVisaRh] = useState('')

  const navigate = useNavigate()

  const getEmployees = () => {
    monthlyPresenceService.getEmployee().then((res) => {
      setEmployees(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getEmployees()
  }, [])


  const initialPresenceState = {
    id: null,
    monthlyemployee_id: monthlyEmployees,
    absence_reason: '',
    start_date: '',
    return_date: '',
    visa_rh: visaRh
  }

  const findData = useParams()
  const presence_id = findData.id
  const [loaded, setLoaded] = useState(false)

  const [presence, setPresence] = useState(initialPresenceState)
  
  useEffect(() => {
    const load = async () => {
      const res = await monthlyPresenceService.get(presence_id)
      setPresence(res.data)
      setLoaded(true)
    }
    if (presence_id && !loaded) {
      load();
    }
  }, [presence_id, loaded])

  const handleEmployeeChange = e => {
    const employeeValue = e.target.value
    setMonthlyEmployees(employeeValue)
    setPresence({ ...presence, monthlyemployee_id: employeeValue })
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setPresence({ ...presence, [name]: value })
  }

  const handleVisaChange = (event) => {
    setVisaRh(event.target.value);
    setPresence({...presence, visa_rh: event.target.value })
  };

  const insertstartDate = newDate => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setStartDate(d)
    setPresence({ ...presence, start_date: d })
  }

  const insertreturnDate = newDate => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setReturnDate(d)
    setPresence({ ...presence, return_date: d })
  }

  const savepresence = e => {
    e.preventDefault()

    var data = {
      monthlyemployee_id: presence.monthlyemployee_id,
      absence_reason: presence.absence_reason,
      start_date: presence.start_date,
      return_date: presence.return_date,
      visa_rh: presence.visa_rh
    }

    if (!data.monthlyemployee_id || !data.start_date || !data.return_date || !data.absence_reason) {
      swal({
        title: "Une erreur est survenue!",
        text: "Des formulaires requis sont vides.",
        icon: "error",
        button: "OK",
      });
    } else {
      monthlyPresenceService.update(presence_id,data).then(res => {
        setPresence({
          id: res.data.id,
          monthlyemployee_id: res.data.monthlyemployee_id,
          absence_reason: res.data.absence_reason,
          start_date: res.data.start_date,
          return_date: res.data.return_date,
          visa_rh: res.data.visa_rh
        })
      }).catch(err => {
        console.log(err)
      })
      navigate('/presence/monthlypresence?updated')
    }
  }

  console.log(presence);

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Modification de l'absence 
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
          startIcon={<ArrowBackIcon />}
          href='/presence/monthlypresence'
        >
          Retour
        </Button>
      </Typography>
      <Container maxWidth="xxl">
        <Card sx={{ height: 'auto', width: '95%' }}>
          <CardContent>
            <form onSubmit={savepresence} noValidate autoComplete='off'>
              <Box sx={{ flexGrow: 1 }}>
                <Container maxWidth="xl" sx={{ lineHeight: 5 }}>
                  {/* <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PortraitIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <FormControl variant="standard" sx={{ width: '100%', marginTop: 4 }}>
                      <InputLabel id="statue">Employé(e) *</InputLabel>
                      <Select
                        labelId="employee"
                        id="employee"
                        onChange={handleEmployeeChange}
                        label="Age"
                      >
                        {employees.map(employee => (
                          <MenuItem key={employee.monthlyemployee_id} value={employee.monthlyemployee_id}>{employee.matricule} - {employee.firstname} {employee.lastname}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box> */}

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <NoteAltIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                      id="absence_reason"
                      value={presence.absence_reason}
                      onChange={handleInputChange}
                      name="absence_reason"
                      required
                      label="Motif d'absence"
                      variant="standard"
                      sx={{ width: '100%' }}
                    /><br />
                  </Box>

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date de départ *"
                      id="start_date"
                      name="start_date"
                      value={presence.start_date}
                      onChange={insertstartDate}
                      renderInput={(params) =>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                          <TextField {...params} variant="standard" sx={{ width: '100%' }} /><br />
                        </Box>
                      }
                    />
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date de retour *"
                      id="return_date"
                      name="return_date"
                      value={presence.return_date}
                      onChange={insertreturnDate}
                      renderInput={(params) =>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                          <TextField {...params} variant="standard" sx={{ width: '100%' }} /><br />
                        </Box>
                      }
                    />
                  </LocalizationProvider>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <DoneAllIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <FormControl variant="standard" sx={{ m: 1, width: '100%', mt: 7 }}>
                        <InputLabel id="demo-simple-select-standard-label">Visa RH *</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={presence.visa_rh}
                          onChange={handleVisaChange}
                          label="Visa RH *"
                        >
                          {/* <MenuItem value="">
                            <em>None</em>
                          </MenuItem> */}
                          <MenuItem value="En attente">En attente</MenuItem>
                          <MenuItem value="Accordé">Accordé</MenuItem>
                          <MenuItem value="Non accordé">Non accordé</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  <br />
                  <Button
                    size="medium"
                    variant="outlined"
                    color="primary"
                    sx={{ width: 250 }}
                    startIcon={<AddIcon />}
                    onClick={savepresence}
                  >
                    Modifier
                  </Button>
                </Container>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}

export default UpdateMonthlyPresence