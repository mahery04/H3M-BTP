import React, { useEffect, useState } from 'react';

import { Button, Card, CardContent, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl, Divider, Chip } from '@mui/material';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';


import { useNavigate, useParams } from 'react-router-dom';
import { Grid, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 

import AddIcon from '@mui/icons-material/Add';
import NumbersIcon from '@mui/icons-material/Numbers';
import BadgeIcon from '@mui/icons-material/Badge';
import PortraitIcon from '@mui/icons-material/Portrait';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ClassIcon from '@mui/icons-material/Class';
import CallIcon from '@mui/icons-material/Call';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import moment from 'moment';
import InputMask from 'react-input-mask'
import swal from '@sweetalert/with-react';

import monthlyEmployeeService from '../services/monthlyEmployeeService'
import postDailyEmployeeService from '../services/postDailyEmployeeService';

function UpdateMonthlyEmployee(props) {

  const [hiringdate, setHiringdate] = useState(null);
  const [startdate, setStartdate] = useState(null);
  const [posts, setPost] = useState([]);
  const [postValue,setPostValue] = useState('');
  const [group,setGroup] = useState('');
  const [status,setStatus] = useState('');
  const [contrat,setContrat] = useState('');
  const [evaluation,setEvaluation] = useState('');
  const [sanction,setSanction] = useState('');

  const getMonthlyDailyEmployees = () => {
    postDailyEmployeeService.getAllPosts().then((res) => {
      setPost(res.data)
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getMonthlyDailyEmployees()
  },[])

  const initialEmployeeState = {
    id:           null,
    matricule:    '',
    firstname:    '',
    lastname:     '',
    cin:          null,
    address:      '',
    contact:      '',
    group:        group,
    post_occupe:      postValue,
    status:       '',
    code_chantier: '',
    category:     '',
    hiring_date:  hiringdate,
    ostie_num:    '',
    cnaps_num:    '',
  }

  const findData = useParams()
  const monthlyemployee_id = findData.id
  
  const [loaded, setLoaded] = useState(false)
  const [monthlyemployee, setMonthlyemployee] = useState(initialEmployeeState)

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


  const handleInputChange = e => {
    const { name, value } = e.target
    setMonthlyemployee({ ...monthlyemployee, [name]: value })
  }

  const handleGroupChange = (event) => {
    setGroup(event.target.value);
    setMonthlyemployee({...monthlyemployee, group: event.target.value })
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setMonthlyemployee({...monthlyemployee, status: event.target.value })
  };

  const handlePostChange = (event) => {
    const postInput = event.target.value
    setPostValue(postInput);
    setMonthlyemployee({...monthlyemployee, post_occupe: postInput})
  };

  const hiringDate = (newDate) => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setHiringdate(d);
    setMonthlyemployee({ ...monthlyemployee, hiring_date: d })
  }


  console.log(monthlyemployee);

  const navigate = useNavigate()

  const updateEmployee = e => {
    e.preventDefault();

    if (!monthlyemployee.hiring_date) {
      var data = {
        matricule:    monthlyemployee.matricule,
        firstname:    monthlyemployee.firstname,
        lastname:     monthlyemployee.lastname,
        cin:          monthlyemployee.cin,
        address:      monthlyemployee.address,
        contact:      monthlyemployee.contact,
        group:        monthlyemployee.group,
        post_occupe:  monthlyemployee.post_occupe,
        salary:      monthlyemployee.salary,
        status:       monthlyemployee.status,
        code_chantier:monthlyemployee.code_chantier,
        category:     monthlyemployee.category,
        hiring_date:  null,
        ostie_num:    monthlyemployee.ostie_num,
        cnaps_num:    monthlyemployee.cnaps_num,
      }
    } else {
      var data = {
        matricule:    monthlyemployee.matricule,
        firstname:    monthlyemployee.firstname,
        lastname:     monthlyemployee.lastname,
        cin:          monthlyemployee.cin,
        address:      monthlyemployee.address,
        contact:      monthlyemployee.contact,
        group:        monthlyemployee.group,
        post_occupe:      monthlyemployee.post_occupe,
        salary:      monthlyemployee.salary,
        status:       monthlyemployee.status,
        code_chantier:monthlyemployee.code_chantier,
        category:     monthlyemployee.category,
        hiring_date:  moment(Date.parse(monthlyemployee.hiring_date)).format("YYYY-MM-DD"),
        ostie_num:    monthlyemployee.ostie_num,
        cnaps_num:    monthlyemployee.cnaps_num,
      }
    }


    if(data.matricule.length <= 0 || data.firstname.length <= 0 || data.lastname.length <= 0 || data.group.length <= 0 || data.post_occupe.length <= 0 || data.status.length <= 0) {
      swal({
        title: "Un erreur est survenue!",
        text: "Des formulaires requis sont vides.",
        icon: "error",
        button: "OK",
      });
    } else {
      monthlyEmployeeService.update(monthlyemployee_id, data).then(res => {
          setMonthlyemployee({
              id:           res.data.id,
              matricule:    res.data.matricule,
              firstname:    res.data.firstname,
              lastname:     res.data.lastname,
              cin:          res.data.cin,
              address:      res.data.address,
              contact:      res.data.contact,
              group:        res.data.group,
              post_occupe:      res.data.post_occupe,
              salary:      res.data.salary,
              status:       res.data.status,
              code_chantier:res.data.code_chantier,
              category:     res.data.category,
              hiring_date:  res.data.hiring_date,
              ostie_num:    res.data.ostie_num,
              cnaps_num:    res.data.cnaps_num,
          })
      }).catch(err => {
        console.log(err)
      })
      navigate('/employee/monthlyemployee?updated')
  }
  }

  let showMotif = false
  // useEffect(() => {
    if (status === 'Actif' || status === '') {
      showMotif = true
    } else {
      showMotif = false
    }
  // }, [])

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Modification d'un employé mensuel
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
          startIcon={<ArrowBackIcon />}
          href='/employee/monthlyemployee'
        >
          Retour
        </Button>
      </Typography>

      <Container maxWidth="xxl">
        <Card sx={{ height: '100%', width: '95%' }}>
          <CardContent>
          <form onSubmit={updateEmployee} noValidate autoComplete='off'>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ lineHeight: 6 }}>
                  <Grid item xs={2} sm={4} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <NumbersIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        id="matricule"
                        value={monthlyemployee.matricule}
                        onChange={handleInputChange}
                        name="matricule"
                        label="Numéro matricule"
                        required
                        variant="standard"
                        sx={{ width: '100%' }}
                      /><br />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <InputMask
                        value={monthlyemployee.cin}
                        onChange={handleInputChange}
                        mask="999 999 999 999"
                        disabled={false}
                        maskChar=""
                      >
                        {() => <TextField
                          id="cin"
                          name="cin"
                          variant="standard"
                          sx={{ width: '100%' }}
                          label="Numéro CIN"
                        />}
                      </InputMask>
                      <br />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        id="post_occupe"
                        value={monthlyemployee.post_occupe}
                        onChange={handleInputChange}
                        name="post_occupe"
                        label="Poste occupé"
                        required
                        variant="standard"
                        sx={{ width: '100%' }}
                      /><br />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <GroupsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <FormControl variant="standard" sx={{ m: 1, width: '100%',mt:7 }}>
                        <InputLabel id="demo-simple-select-standard-label">Status *</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={monthlyemployee.status}
                          onChange={handleStatusChange}
                          label="Status *"
                        >
                          {/* <MenuItem value="">
                            <em>None</em>
                          </MenuItem> */}
                          <MenuItem value="Actif">Actif</MenuItem>
                          <MenuItem value="Congé">Congé</MenuItem>
                          <MenuItem value="Démission">Démission</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <GroupsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <FormControl variant="standard" sx={{ m: 1, width: '100%', mt: 5 }}>
                        <InputLabel id="demo-simple-select-standard-label">Groupe *</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={monthlyemployee.group}
                          onChange={handleGroupChange}
                          label="Groupe *"
                        >
                          {/* <MenuItem value="">
                            <em>None</em>
                          </MenuItem> */}
                          <MenuItem value="BTP">BTP</MenuItem>
                          <MenuItem value="SIP">SIP</MenuItem>
                          <MenuItem value="Parapharmaceutique">Parapharmaceutique</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <PortraitIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        id="firstname"
                        required
                        value={monthlyemployee.firstname}
                        onChange={handleInputChange}
                        name="firstname"
                        label="Nom"
                        variant="standard"
                        sx={{ width: '100%' }}
                      /><br />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <LocationOnIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        id="address"
                        value={monthlyemployee.address}
                        onChange={handleInputChange}
                        name="address"
                        label="Adresse"
                        variant="standard"
                        sx={{ width: '100%' }}
                      /><br />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <CurrencyTextField
                        label="Salaire *"
                        variant="standard"
                        value={monthlyemployee.salary}
                        currencySymbol="Ar"
                        //minimumValue="0"
                        outputFormat="string"
                        decimalCharacter="."
                        digitGroupSeparator=","
                        onChange={(event, value)=> setMonthlyemployee({...monthlyemployee, salary: value })}
                        style={{width: '100%', marginTop: '10%'}}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <ClassIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        id="category"
                        value={monthlyemployee.category}
                        onChange={handleInputChange}
                        name="category"
                        label="Catégorie"
                        variant="standard"
                        sx={{ width: '100%' }}
                      /><br />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <ClassIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        id="ostie_num"
                        value={monthlyemployee.ostie_num}
                        onChange={handleInputChange}
                        name="ostie_num"
                        label="Numéro OSTIE"
                        variant="standard"
                        sx={{ width: '100%',mt:7 }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <PortraitIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        id="lastname"
                        required
                        value={monthlyemployee.lastname}
                        onChange={handleInputChange}
                        name="lastname"
                        label="Prénom"
                        variant="standard"
                        sx={{ width: '100%' }}
                      /><br />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <CallIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <InputMask
                        value={monthlyemployee.contact}
                        onChange={handleInputChange}
                        mask="999 99 999 99"
                        disabled={false}
                        maskChar=""
                      >
                        {() => <TextField
                          id="contact"
                          name="contact"
                          variant="standard"
                          sx={{ width: '100%' }}
                          label="Contact"
                        />}
                      </InputMask>
                      <br />
                    </Box>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Date d'embauche"
                        id="hiring_date"
                        name="hiring_date"
                        value={hiringdate}
                        onChange={hiringDate}
                        renderInput={(params) =>
                          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <TextField
                              {...params}
                              variant="standard"
                              sx={{ width: '100%' }}
                              id="hiring_date"
                              name="hiring_date"
                            /><br />
                          </Box>
                        }
                      />
                    </LocalizationProvider>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <EngineeringIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        id="code_chantier"
                        value={monthlyemployee.code_chantier}
                        onChange={handleInputChange}
                        name="code_chantier"
                        label="Code"
                        variant="standard"
                        sx={{ width: '100%' }}
                      /><br />
                    </Box>
                    <Box  sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <ClassIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        id="cnaps_num"
                        value={monthlyemployee.cnaps_num}
                        onChange={handleInputChange}
                        name="cnaps_num"
                        label="Numéro CNAPS"
                        variant="standard"
                        sx={{ width: '100%', mt:8 }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              
                {!showMotif ? 
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    id="motif"
                    value={monthlyemployee.motif}
                    onChange={handleInputChange}
                    name="motif"
                    label="Entrer le motif de son status"
                    variant="standard"
                    sx={{ width: '100%', mt: 3 }}
                  /><br />
                </Box>
                : ''}
                <br /><br /><br />

                <Button
                  size="medium"
                  variant="outlined"
                  color="primary"
                  sx={{ width: 250 }}
                  startIcon={<AddIcon />}
                  onClick={updateEmployee}
                >
                  Modifier
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}

export default UpdateMonthlyEmployee