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

import moment from 'moment'
import swal from '@sweetalert/with-react';
import { useNavigate } from 'react-router-dom';

import permissionService from '../services/permissionService';

function NewPermission() {

  const [monthlyEmployees, setMonthlyEmployees] = useState('')
  const [employees, setEmployees] = useState([])
  const [startTime, setStartTime] = useState('')
  const [returnTime, setReturnTime] = useState('')
  const [startHoursTime, setstartHoursTime] = useState(null)
  const [startMinutesTime, setstartMinutesTime] = useState(null)
  const [returnHoursTime, setreturnHoursTime] = useState(null)
  const [returnMinutesTime, setreturnMinutesTime] = useState(null)
  const [hoursBeforeReq, sethoursBeforeReq] = useState(null)
  const [minutesBeforeReq, setminutesBeforeReq] = useState(null)



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
    start_hour_time: '',
    return_hour_time: '',
    start_minute_time: '',
    return_minute_time:'',
    number_time_permission: '',
    permission_hour_before_request: '',
    permission_minute_before_request: '',
    new_solde_permission:'',
    visa_rh: visaRh
  }

  const [permissions, setPermission] = useState(initialPermissionState)

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
    setPermission({ ...permissions, start_time: d })
  }

  const insertStartHoursTime = (event) => {
    const d = event.target.value
    setstartHoursTime(d)
    setPermission({...permissions, start_hour_time: d})
  }

  const insertStartMinutesTime = event => {
    const d = event.target.value
    setstartMinutesTime(d)
    setPermission({...permissions, start_minute_time: d})
  }

  const insertReturnHoursTime = event => {
    const d = event.target.value
    setreturnHoursTime(d)
    setPermission({...permissions, return_hour_time: d})
  }

  const insertReturnMinutesTime = event => {
    const d = event.target.value
    setreturnMinutesTime(d)
    setPermission({...permissions, return_minute_time: d})
  }
      
  const insertHoursBeforeReq = event => {
    const d = event.target.value
    sethoursBeforeReq(d)
    setPermission({...permissions, permission_hour_before_request: d})
  }

  const insertMinutesBeforeReq = event => {
    const d = event.target.value
    setminutesBeforeReq(d)
    setPermission({...permissions, permission_minute_before_request: d})
  }

  const insertReturnTime = newTime => {
    const d = newTime
    setReturnTime(d)
    setPermission({ ...permissions, return_time: d })
  }

  const insertPermissionTime = newTime => {
    const d = newTime
    setPermissionTime(d)
    setPermission({ ...permissions, permission_before_request : d })
  }

  // useEffect(() => {
  //   setStartTime(`${startHoursTime}:${startMinutesTime}`)
  //   setPermission({...permissions, start_time:startTime})
  //   setReturnTime(`${returnHoursTime}:${returnMinutesTime}`)
  //   setPermission({...permissions, return_time:returnTime})
  // }, [])

  const savePermissions = e => {
    e.preventDefault()

    var data = {
      monthlyemployee_id: permissions.monthlyemployee_id,
      permission_reason: permissions.permission_reason,
      start_hour_time: permissions.start_hour_time,
      start_minute_time: permissions.start_minute_time,
      return_hour_time: permissions.return_hour_time,
      return_minute_time: permissions.return_minute_time,
      permission_hour_before_request: permissions.permission_hour_before_request,
      permission_minute_before_request: permissions.permission_minute_before_request,
      visa_rh: permissions.visa_rh
    }

    // if (!data.monthlyemployee_id || !data.start_hour_time || !data.start_minute_time || !data.permission_reason || !data.visa_rh) {
    //   swal({
    //     title: "Une erreur est survenue!",
    //     text: "Des formulaires requis sont vides.",
    //     icon: "error",
    //     button: "OK",
    //   });
    // } else {
      permissionService.create(data).then(res => {
        setPermission({
          id: res.data.id,
          monthlyemployee_id: res.data.monthlyemployee_id,
          permission_reason: res.data.permission_reason,
          start_hour_time: res.data.start_hour_time,
          start_minute_time: res.data.start_minute_time,
          return_hour_time: res.data.return_hour_time,
          return_minute_time: res.data.return_minute_time,
          permission_hour_before_request: res.data.permission_hour_before_request,
          permission_minute_before_request: res.data.permission_minute_before_request,
          visa_rh: res.data.visa_rh
        })
      }).catch(err => {
        console.log(err)
      })
      navigate('/conge/permission?inserted')
    // }
  }

  console.log(
    "HD ", startHoursTime,
    "MD ", startMinutesTime,
    "HR ", returnHoursTime,
    "MR ", returnMinutesTime,
    "HBR ", hoursBeforeReq,
    "MBR ", minutesBeforeReq
  );

  console.log("PRM ", permissions);

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Nouvelle permission
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
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
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
                  </Box>

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

                  {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Heure de départ *"
                      id="start_time"
                      name="start_time"
                      value={startTime}
                      onChange={insertStartTime}
                      renderInput={(params) =>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                          <TextField {...params} variant="standard" sx={{ width: '100%' }} /><br />
                        </Box>
                      }
                    />
                  </LocalizationProvider> */} 
                  
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <FormControl variant="standard" sx={{ m: 1, width:'100%', mt: 5 }}>
                        <InputLabel id="demo-simple-select-standard-label">Heure de départ *</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={startHoursTime}
                          onChange={insertStartHoursTime}
                          label="Heure"
                        >
                          <MenuItem value={0}>00 h</MenuItem>
                          <MenuItem value={1}>01 h</MenuItem>
                          <MenuItem value={2}>02 h</MenuItem>
                          <MenuItem value={3}>03 h</MenuItem>
                          <MenuItem value={4}>04 h</MenuItem>
                          <MenuItem value={5}>05 h</MenuItem>
                          <MenuItem value={6}>06 h</MenuItem>
                          <MenuItem value={7}>07 h</MenuItem>
                          <MenuItem value={8}>08 h</MenuItem>
                          <MenuItem value={9}>09 h</MenuItem>
                          <MenuItem value={10}>10 h</MenuItem>
                          <MenuItem value={11}>11 h</MenuItem>
                          <MenuItem value={12}>12 h</MenuItem>
                          <MenuItem value={13}>13 h</MenuItem>
                          <MenuItem value={14}>14 h</MenuItem>
                          <MenuItem value={15}>15 h</MenuItem>
                          <MenuItem value={16}>16 h</MenuItem>
                          <MenuItem value={17}>17 h</MenuItem>
                          <MenuItem value={18}>18 h</MenuItem>
                          <MenuItem value={19}>19 h</MenuItem>
                          <MenuItem value={20}>20 h</MenuItem>
                          <MenuItem value={21}>21 h</MenuItem>
                          <MenuItem value={22}>22 h</MenuItem>
                          <MenuItem value={23}>23 h</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl variant="standard" sx={{ m: 1, width:'100%', mt: 5 }}>
                      <InputLabel id="demo-simple-select-standard-label">Minute de départ *</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={startMinutesTime}
                        onChange={insertStartMinutesTime}
                        label="Minutes"
                        sx={{width: '100%'}}

                      >
                        <MenuItem value={0}>00 mn</MenuItem>
                        <MenuItem value={1}>01 mn</MenuItem>
                        <MenuItem value={2}>02 mn</MenuItem>
                        <MenuItem value={3}>03 mn</MenuItem>
                        <MenuItem value={4}>04 mn</MenuItem>
                        <MenuItem value={5}>05 mn</MenuItem>
                        <MenuItem value={6}>06 mn</MenuItem>
                        <MenuItem value={7}>07 mn</MenuItem>
                        <MenuItem value={8}>08 mn</MenuItem>
                        <MenuItem value={9}>09 mn</MenuItem>
                        <MenuItem value={10}>10 mn</MenuItem>
                        <MenuItem value={11}>11 mn</MenuItem>
                        <MenuItem value={12}>12 mn</MenuItem>
                        <MenuItem value={13}>13 mn</MenuItem>
                        <MenuItem value={14}>14 mn</MenuItem>
                        <MenuItem value={15}>15 mn</MenuItem>
                        <MenuItem value={16}>16 mn</MenuItem>
                        <MenuItem value={17}>17 mn</MenuItem>
                        <MenuItem value={18}>18 mn</MenuItem>
                        <MenuItem value={19}>19 mn</MenuItem>
                        <MenuItem value={20}>20 mn</MenuItem>
                        <MenuItem value={21}>21 mn</MenuItem>
                        <MenuItem value={22}>22 mn</MenuItem>
                        <MenuItem value={23}>23 mn</MenuItem>
                        <MenuItem value={24}>24 mn</MenuItem>
                        <MenuItem value={25}>25 mn</MenuItem>
                        <MenuItem value={26}>26 mn</MenuItem>
                        <MenuItem value={27}>27 mn</MenuItem>
                        <MenuItem value={28}>28 mn</MenuItem>
                        <MenuItem value={29}>29 mn</MenuItem>
                        <MenuItem value={30}>30 mn</MenuItem>
                        <MenuItem value={31}>31 mn</MenuItem>
                        <MenuItem value={32}>32 mn</MenuItem>
                        <MenuItem value={33}>33 mn</MenuItem>
                        <MenuItem value={34}>34 mn</MenuItem>
                        <MenuItem value={35}>35 mn</MenuItem>
                        <MenuItem value={36}>36 mn</MenuItem>
                        <MenuItem value={37}>37 mn</MenuItem>
                        <MenuItem value={38}>38 mn</MenuItem>
                        <MenuItem value={39}>39 mn</MenuItem>
                        <MenuItem value={40}>40 mn</MenuItem>
                        <MenuItem value={41}>41 mn</MenuItem>
                        <MenuItem value={42}>42 mn</MenuItem>
                        <MenuItem value={43}>43 mn</MenuItem>
                        <MenuItem value={44}>44 mn</MenuItem>
                        <MenuItem value={45}>45 mn</MenuItem>
                        <MenuItem value={46}>46 mn</MenuItem>
                        <MenuItem value={47}>47 mn</MenuItem>
                        <MenuItem value={48}>48 mn</MenuItem>
                        <MenuItem value={49}>49 mn</MenuItem>
                        <MenuItem value={50}>50 mn</MenuItem>
                        <MenuItem value={51}>51 mn</MenuItem>
                        <MenuItem value={53}>52 mn</MenuItem>
                        <MenuItem value={53}>53 mn</MenuItem>
                        <MenuItem value={54}>54 mn</MenuItem>
                        <MenuItem value={55}>55 mn</MenuItem>
                        <MenuItem value={56}>56 mn</MenuItem>
                        <MenuItem value={57}>57 mn</MenuItem>
                        <MenuItem value={58}>58 mn</MenuItem>
                        <MenuItem value={59}>59 mn</MenuItem>

                      </Select>
                    </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <FormControl variant="standard" sx={{ m: 1, width:'100%', mt: 5 }}>
                        <InputLabel id="demo-simple-select-standard-label">Heure de retour *</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={returnHoursTime}
                          onChange={insertReturnHoursTime}
                          label="Heure"
                        >
                          <MenuItem value={0}>00 h</MenuItem>
                          <MenuItem value={1}>01 h</MenuItem>
                          <MenuItem value={2}>02 h</MenuItem>
                          <MenuItem value={3}>03 h</MenuItem>
                          <MenuItem value={4}>04 h</MenuItem>
                          <MenuItem value={5}>05 h</MenuItem>
                          <MenuItem value={6}>06 h</MenuItem>
                          <MenuItem value={7}>07 h</MenuItem>
                          <MenuItem value={8}>08 h</MenuItem>
                          <MenuItem value={9}>09 h</MenuItem>
                          <MenuItem value={10}>10 h</MenuItem>
                          <MenuItem value={11}>11 h</MenuItem>
                          <MenuItem value={12}>12 h</MenuItem>
                          <MenuItem value={13}>13 h</MenuItem>
                          <MenuItem value={14}>14 h</MenuItem>
                          <MenuItem value={15}>15 h</MenuItem>
                          <MenuItem value={16}>16 h</MenuItem>
                          <MenuItem value={17}>17 h</MenuItem>
                          <MenuItem value={18}>18 h</MenuItem>
                          <MenuItem value={19}>19 h</MenuItem>
                          <MenuItem value={20}>20 h</MenuItem>
                          <MenuItem value={21}>21 h</MenuItem>
                          <MenuItem value={22}>22 h</MenuItem>
                          <MenuItem value={23}>23 h</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl variant="standard" sx={{ m: 1, width:'100%', mt: 5 }}>
                      <InputLabel id="demo-simple-select-standard-label">Minute de retour *</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={returnMinutesTime}
                        onChange={insertReturnMinutesTime}
                        label="Minutes"
                        sx={{width: '100%'}}
                      >
                        <MenuItem value={0}>00 mn</MenuItem>
                        <MenuItem value={1}>01 mn</MenuItem>
                        <MenuItem value={2}>02 mn</MenuItem>
                        <MenuItem value={3}>03 mn</MenuItem>
                        <MenuItem value={4}>04 mn</MenuItem>
                        <MenuItem value={5}>05 mn</MenuItem>
                        <MenuItem value={6}>06 mn</MenuItem>
                        <MenuItem value={7}>07 mn</MenuItem>
                        <MenuItem value={8}>08 mn</MenuItem>
                        <MenuItem value={9}>09 mn</MenuItem>
                        <MenuItem value={10}>10 mn</MenuItem>
                        <MenuItem value={11}>11 mn</MenuItem>
                        <MenuItem value={12}>12 mn</MenuItem>
                        <MenuItem value={13}>13 mn</MenuItem>
                        <MenuItem value={14}>14 mn</MenuItem>
                        <MenuItem value={15}>15 mn</MenuItem>
                        <MenuItem value={16}>16 mn</MenuItem>
                        <MenuItem value={17}>17 mn</MenuItem>
                        <MenuItem value={18}>18 mn</MenuItem>
                        <MenuItem value={19}>19 mn</MenuItem>
                        <MenuItem value={20}>20 mn</MenuItem>
                        <MenuItem value={21}>21 mn</MenuItem>
                        <MenuItem value={22}>22 mn</MenuItem>
                        <MenuItem value={23}>23 mn</MenuItem>
                        <MenuItem value={24}>24 mn</MenuItem>
                        <MenuItem value={25}>25 mn</MenuItem>
                        <MenuItem value={26}>26 mn</MenuItem>
                        <MenuItem value={27}>27 mn</MenuItem>
                        <MenuItem value={28}>28 mn</MenuItem>
                        <MenuItem value={29}>29 mn</MenuItem>
                        <MenuItem value={30}>30 mn</MenuItem>
                        <MenuItem value={31}>31 mn</MenuItem>
                        <MenuItem value={32}>32 mn</MenuItem>
                        <MenuItem value={33}>33 mn</MenuItem>
                        <MenuItem value={34}>34 mn</MenuItem>
                        <MenuItem value={35}>35 mn</MenuItem>
                        <MenuItem value={36}>36 mn</MenuItem>
                        <MenuItem value={37}>37 mn</MenuItem>
                        <MenuItem value={38}>38 mn</MenuItem>
                        <MenuItem value={39}>39 mn</MenuItem>
                        <MenuItem value={40}>40 mn</MenuItem>
                        <MenuItem value={41}>41 mn</MenuItem>
                        <MenuItem value={42}>42 mn</MenuItem>
                        <MenuItem value={43}>43 mn</MenuItem>
                        <MenuItem value={44}>44 mn</MenuItem>
                        <MenuItem value={45}>45 mn</MenuItem>
                        <MenuItem value={46}>46 mn</MenuItem>
                        <MenuItem value={47}>47 mn</MenuItem>
                        <MenuItem value={48}>48 mn</MenuItem>
                        <MenuItem value={49}>49 mn</MenuItem>
                        <MenuItem value={50}>50 mn</MenuItem>
                        <MenuItem value={51}>51 mn</MenuItem>
                        <MenuItem value={53}>52 mn</MenuItem>
                        <MenuItem value={53}>53 mn</MenuItem>
                        <MenuItem value={54}>54 mn</MenuItem>
                        <MenuItem value={55}>55 mn</MenuItem>
                        <MenuItem value={56}>56 mn</MenuItem>
                        <MenuItem value={57}>57 mn</MenuItem>
                        <MenuItem value={58}>58 mn</MenuItem>
                        <MenuItem value={59}>59 mn</MenuItem>

                      </Select>
                    </FormControl>
                    </Grid>
                  </Grid>

                  {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Heure de retour *"
                      id="return_time"
                      name="return_time"
                      value={returnTime}
                      onChange={insertReturnTime}
                      renderInput={(params) =>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                          <TextField {...params} variant="standard" sx={{ width: '100%' }} /><br />
                        </Box>
                      }
                    />
                  </LocalizationProvider> */}

                  {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Solde permission avant demande *"
                      id="permission_before_request"
                      name="permission_before_request"
                      value={permissionTime}
                      onChange={insertPermissionTime}
                      renderInput={(params) =>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                          <TextField {...params} variant="standard" sx={{ width: '100%' }} /><br />
                        </Box>
                      }
                    />
                  </LocalizationProvider> */}

                 

                  {/* <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <NoteAltIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                      id="permission_before_request"
                      value={permissions.permission_before_request}
                      onChange={handleInputChange}
                      name="permission_before_request"
                      required
                      type='number'
                      label="Solde permission avant demande *"
                      variant="standard"
                      sx={{ width: '100%' }}
                    /><br />
                  </Box> */}


                  <Chip label="Solde permission avant demande *" />
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <FormControl variant="standard" sx={{ m: 1, width:'100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Heure *</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={hoursBeforeReq}
                          onChange={insertHoursBeforeReq}
                          label="Heure"
                        >
                          <MenuItem value={0}>00 h</MenuItem>
                          <MenuItem value={1}>01 h</MenuItem>
                          <MenuItem value={2}>02 h</MenuItem>
                          <MenuItem value={3}>03 h</MenuItem>
                          <MenuItem value={4}>04 h</MenuItem>
                          <MenuItem value={5}>05 h</MenuItem>
                          <MenuItem value={6}>06 h</MenuItem>
                          <MenuItem value={7}>07 h</MenuItem>
                          <MenuItem value={8}>08 h</MenuItem>
                          <MenuItem value={9}>09 h</MenuItem>
                          <MenuItem value={10}>10 h</MenuItem>
                          <MenuItem value={11}>11 h</MenuItem>
                          <MenuItem value={12}>12 h</MenuItem>
                          <MenuItem value={13}>13 h</MenuItem>
                          <MenuItem value={14}>14 h</MenuItem>
                          <MenuItem value={15}>15 h</MenuItem>
                          <MenuItem value={16}>16 h</MenuItem>
                          <MenuItem value={17}>17 h</MenuItem>
                          <MenuItem value={18}>18 h</MenuItem>
                          <MenuItem value={19}>19 h</MenuItem>
                          <MenuItem value={20}>20 h</MenuItem>
                          <MenuItem value={21}>21 h</MenuItem>
                          <MenuItem value={22}>22 h</MenuItem>
                          <MenuItem value={23}>23 h</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl variant="standard" sx={{ m: 1, width:'100%' }}>
                      <InputLabel id="demo-simple-select-standard-label">Minute *</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={minutesBeforeReq}
                        onChange={insertMinutesBeforeReq}
                        label="Minutes"
                        sx={{width: '100%'}}
                      >
                        <MenuItem value={0}>00 mn</MenuItem>
                        <MenuItem value={1}>01 mn</MenuItem>
                        <MenuItem value={2}>02 mn</MenuItem>
                        <MenuItem value={3}>03 mn</MenuItem>
                        <MenuItem value={4}>04 mn</MenuItem>
                        <MenuItem value={5}>05 mn</MenuItem>
                        <MenuItem value={6}>06 mn</MenuItem>
                        <MenuItem value={7}>07 mn</MenuItem>
                        <MenuItem value={8}>08 mn</MenuItem>
                        <MenuItem value={9}>09 mn</MenuItem>
                        <MenuItem value={10}>10 mn</MenuItem>
                        <MenuItem value={11}>11 mn</MenuItem>
                        <MenuItem value={12}>12 mn</MenuItem>
                        <MenuItem value={13}>13 mn</MenuItem>
                        <MenuItem value={14}>14 mn</MenuItem>
                        <MenuItem value={15}>15 mn</MenuItem>
                        <MenuItem value={16}>16 mn</MenuItem>
                        <MenuItem value={17}>17 mn</MenuItem>
                        <MenuItem value={18}>18 mn</MenuItem>
                        <MenuItem value={19}>19 mn</MenuItem>
                        <MenuItem value={20}>20 mn</MenuItem>
                        <MenuItem value={21}>21 mn</MenuItem>
                        <MenuItem value={22}>22 mn</MenuItem>
                        <MenuItem value={23}>23 mn</MenuItem>
                        <MenuItem value={24}>24 mn</MenuItem>
                        <MenuItem value={25}>25 mn</MenuItem>
                        <MenuItem value={26}>26 mn</MenuItem>
                        <MenuItem value={27}>27 mn</MenuItem>
                        <MenuItem value={28}>28 mn</MenuItem>
                        <MenuItem value={29}>29 mn</MenuItem>
                        <MenuItem value={30}>30 mn</MenuItem>
                        <MenuItem value={31}>31 mn</MenuItem>
                        <MenuItem value={32}>32 mn</MenuItem>
                        <MenuItem value={33}>33 mn</MenuItem>
                        <MenuItem value={34}>34 mn</MenuItem>
                        <MenuItem value={35}>35 mn</MenuItem>
                        <MenuItem value={36}>36 mn</MenuItem>
                        <MenuItem value={37}>37 mn</MenuItem>
                        <MenuItem value={38}>38 mn</MenuItem>
                        <MenuItem value={39}>39 mn</MenuItem>
                        <MenuItem value={40}>40 mn</MenuItem>
                        <MenuItem value={41}>41 mn</MenuItem>
                        <MenuItem value={42}>42 mn</MenuItem>
                        <MenuItem value={43}>43 mn</MenuItem>
                        <MenuItem value={44}>44 mn</MenuItem>
                        <MenuItem value={45}>45 mn</MenuItem>
                        <MenuItem value={46}>46 mn</MenuItem>
                        <MenuItem value={47}>47 mn</MenuItem>
                        <MenuItem value={48}>48 mn</MenuItem>
                        <MenuItem value={49}>49 mn</MenuItem>
                        <MenuItem value={50}>50 mn</MenuItem>
                        <MenuItem value={51}>51 mn</MenuItem>
                        <MenuItem value={53}>52 mn</MenuItem>
                        <MenuItem value={53}>53 mn</MenuItem>
                        <MenuItem value={54}>54 mn</MenuItem>
                        <MenuItem value={55}>55 mn</MenuItem>
                        <MenuItem value={56}>56 mn</MenuItem>
                        <MenuItem value={57}>57 mn</MenuItem>
                        <MenuItem value={58}>58 mn</MenuItem>
                        <MenuItem value={59}>59 mn</MenuItem>
                      </Select>
                    </FormControl>
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <DoneAllIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <FormControl variant="standard" sx={{ m: 1, width: '100%', mt: 7 }}>
                      <InputLabel id="demo-simple-select-standard-label">Visa RH *</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={visaRh}
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
                    Ajouter
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

export default NewPermission