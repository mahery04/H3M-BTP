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
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import moment from 'moment'
import swal from '@sweetalert/with-react';
import { useNavigate, useParams } from 'react-router-dom';

import permissionService from '../services/permissionService';

function UpdatePermission() {

  const [monthlyEmployees, setMonthlyEmployees] = useState('')
  const [employees, setEmployees] = useState([])
  const [startTime, setStartTime] = useState(null)
  const [returnTime, setReturnTime] = useState(null)
  const [permissionTime, setPermissionTime] = useState(null)
  const [visaRh, setVisaRh] = useState('')

  const navigate = useNavigate()

  const getEmployees = () => {
    permissionService.getEmployee().then((res) => {
      setEmployees(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getEmployees()
  }, [])


  const initialPermissionState = {
    id: null,
    monthlyemployee_id: monthlyEmployees,
    permission_reason: '',
    start_time: '',
    return_time: '',
    number_time_permission: '',
    permission_before_request: '',
    new_solde_permission:'',
    visa_rh: visaRh
  }

  const findData = useParams()
  const permission_id = findData.id
  const [loaded, setLoaded] = useState(false)

  const [permissions, setPermission] = useState(initialPermissionState)

  useEffect(() => {
    const load = async () => {
      const res = await permissionService.get(permission_id)
      setPermission(res.data)
      setLoaded(true)
    }
    if (permission_id && !loaded) {
      load();
    }
  }, [permission_id, loaded])

  const handleEmployeeChange = e => {
    const employeeValue = e.target.value
    setMonthlyEmployees(employeeValue)
    setPermission({ ...permissions, monthlyemployee_id: employeeValue })
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setPermission({ ...permissions, [name]: value })
  }

  const handleVisaChange = (event) => {
    setVisaRh(event.target.value);
    setPermission({...permissions, visa_rh: event.target.value })
  };

  const insertStartTime = newTime => {
    const d = newTime
    setStartTime(d)
    setPermission({ ...permissions, start_time: moment(d).format("hh:mm:ss") })
    console.log("TST: ", d);
  }

  console.log("PTST: ", permissions.start_time);

  const insertReturnTime = newTime => {
    const d = newTime
    setReturnTime(d)
    setPermission({ ...permissions, return_time: moment(d).format("hh:mm:ss") })
    console.log("TRT: ", d);

  }

  const insertPermissionTime = newTime => {
    const d = newTime
    setPermissionTime(d)
    setPermission({ ...permissions, permission_before_request : d })
  }

  const savePermissions = e => {
    e.preventDefault()

    var data = {
      monthlyemployee_id: permissions.monthlyemployee_id,
      permission_reason: permissions.permission_reason,
      start_time: moment(permissions.start_time).format("hh:mm:ss"),
      return_time:  moment(permissions.return_time).format("hh:mm:ss"),
      permission_before_request: moment(permissions.permission_before_request).format("hh:mm:ss"),
      visa_rh: permissions.visa_rh
    }

    if (!data.monthlyemployee_id || !data.start_time || !data.return_time || !data.permission_reason) {
      swal({
        title: "Une erreur est survenue!",
        text: "Des formulaires requis sont vides.",
        icon: "error",
        button: "OK",
      });
    } else {
      permissionService.update(permission_id,data).then(res => {
        setPermission({
          id: res.data.id,
          monthlyemployee_id: res.data.monthlyemployee_id,
          permission_reason: res.data.permission_reason,
          start_time: res.data.start_time,
          return_time: res.data.return_time,
          permission_before_request: res.data.permission_before_request,
          visa_rh: res.data.visa_rh
        })
      }).catch(err => {
        console.log(err)
      })
      navigate('/conge/permission?updated')
    }
  }

  

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Modification de permission
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
          startIcon={<ArrowBackIcon />}
          href='/conge/permission'
        >
          Retour
        </Button>
      </Typography>
      <Container maxWidth="xxl">
        <Card sx={{ height: 'auto', width: '95%' }}>
          <CardContent>
            <form onSubmit={savePermissions} noValidate autoComplete='off'>
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
                      id="permission_reason"
                      value={permissions.permission_reason}
                      onChange={handleInputChange}
                      name="permission_reason"
                      required
                      label="Motif de permission"
                      variant="standard"
                      sx={{ width: '100%' }}
                    /><br />
                  </Box>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Heure de départ *"
                      id="start_time"
                      name="start_time" 
                      value={new Date(`2022-02-03T${permissions.start_time}`)}
                      onChange={insertStartTime}
                      renderInput={(params) =>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                          <TextField {...params} variant="standard" sx={{ width: '100%' }} /><br />
                        </Box>
                      }
                    />
                  </LocalizationProvider>


                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Heure de retour *"
                      id="return_time"
                      name="return_time"
                      value={new Date(`2022-02-03T${permissions.return_time}`)}
                      onChange={insertReturnTime}
                      renderInput={(params) =>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                          <TextField {...params} variant="standard" sx={{ width: '100%' }} /><br />
                        </Box>
                      }
                    />
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Solde permission avant demande *"
                      id="permission_before_request"
                      name="permission_before_request"
                      value={new Date(`2022-02-03 ${permissions.permission_before_request}`)}
                      onChange={insertPermissionTime}
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
                          value={permissions.visa_rh}
                          onChange={handleVisaChange}
                          label="Visa RH *"
                        >
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
                    onClick={savePermissions}
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

export default UpdatePermission