import React, { useEffect, useState } from 'react';

import { Button, Card, CardContent, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

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
import InputMask from 'react-input-mask';
import swal from '@sweetalert/with-react';

import dailyEmployeeService from '../services/dailyEmployeeService';
import postDailyEmployeeService from '../services/postDailyEmployeeService';

function UpdateDailyEmployee(props) {
  
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [posts, setPost] = useState([]);
  const [postValue,setPostValue] = useState('');
  const [group,setGroup] = useState('');
  const [status,setStatus] = useState('');

  const getPostDailyEmployees = () => {
    postDailyEmployeeService.getAllPosts().then((res) => {
      setPost(res.data)
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getPostDailyEmployees()
  },[])

  const initialEmployeeState = {
    id:           null,
    matricule:    '',
    firstname:    '',
    lastname:     '',
    cin:          null,
    address:      '',
    contact:      '',
    post_id:      postValue,
    code_chantier: '',
    group:        group,
    category:     '',
    hiring_date:  date,
    status:       '',
    remarque:     ''
  }

  const findData = useParams()
  const dailyemployee_id = findData.id
  
  const [loaded, setLoaded] = useState(false)
  const [dailyemployee, setDailyemployee] = useState(initialEmployeeState)

  useEffect(() => {
    const load = async () => {
      const res = await dailyEmployeeService.get(dailyemployee_id)
      console.log("RES LAVA BE ", res.data);
      setDailyemployee(res.data)
      setLoaded(true)
    }
    if (dailyemployee_id && !loaded) {
      load();
    }
  }, [dailyemployee_id, loaded])

  console.log(loaded)

  const handleInputChange = e => {
    const { name, value } = e.target
    setDailyemployee({ ...dailyemployee, [name]: value })
  }

  const handleGroupChange = (event) => {
    setGroup(event.target.value);
    setDailyemployee({...dailyemployee, group: event.target.value })
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setDailyemployee({...dailyemployee, status: event.target.value })
  };

  const handlePostChange = (event) => {
    const postInput = event.target.value
    setPostValue(postInput);
    setDailyemployee({...dailyemployee, post_id: postInput})
  };

  const insertDate = (newDate) => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setDate(d);
    setDailyemployee({ ...dailyemployee, hiring_date: d })
  }

  console.log(dailyemployee)

  const navigate = useNavigate()

  const saveEmployee = e => {
    e.preventDefault()

    var data = {
      matricule:    dailyemployee.matricule,
      firstname:    dailyemployee.firstname,
      lastname:     dailyemployee.lastname,
      cin:          dailyemployee.cin,
      address:      dailyemployee.address,
      contact:      dailyemployee.contact,
      post_id:      dailyemployee.post_id,
      code_chantier:dailyemployee.code_chantier,
      group:        dailyemployee.group,
      category:     dailyemployee.category,
      hiring_date:  dailyemployee.hiring_date,
      status:       dailyemployee.status,
      remarque:     dailyemployee.remarque
    }

    if(data.matricule.length <= 0 || data.firstname.length <= 0 || data.lastname.length <= 0 || data.cin.length <= 0 || data.address.length <= 0 || data.contact.length <= 0 || data.post_id.length <= 0 || data.code_chantier.length <= 0 || data.group.length <= 0 || data.category.length <= 0 || data.hiring_date.length <= 0 || data.status.length <= 0) {
      swal({
        title: "Un erreur est survenue!",
        text: "Des formulaires requis sont vides.",
        icon: "error",
        button: "OK",
      });
    } else {
      dailyEmployeeService.update(dailyemployee_id, data).then(res => {
        setDailyemployee({
          id:           res.data.id,
          matricule:    res.data.matricule,
          firstname:    res.data.firstname,
          lastname:     res.data.lastname,
          cin:          res.data.cin,
          address:      res.data.address,
          contact:      res.data.contact,
          post_id:      res.data.post_id,
          code_chantier:res.data.code_chantier,
          group:        res.data.group,   
          category:     res.data.category,
          hiring_date:  res.data.hiring_date,
          status:       res.data.status,
          remarque:     res.data.remarque
        })
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
      navigate('/employee/dailyemployee?updated')
    }
  }

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Modification d'un employé journalier
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
          startIcon={<ArrowBackIcon />}
          href='/employee/dailyemployee'
        >
          Retour
        </Button>
      </Typography>

      <Container maxWidth="xxl">
        <Card sx={{ height: 700, width: '95%' }}>
          <CardContent>
            <form onSubmit={saveEmployee} noValidate autoComplete='off'>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ lineHeight: 6 }}>
                  <Grid item xs={2} sm={4} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <NumbersIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        id="matricule"
                        value={dailyemployee.matricule}
                        onChange={handleInputChange}
                        name="matricule"
                        label="Numéro matricule"
                        variant="standard"
                        sx={{ width: '100%' }}
                      /><br />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <InputMask
                        value={dailyemployee.cin}
                        onChange={handleInputChange}
                        mask="999 999 999 999"
                        disabled={false}
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
                      <FormControl variant="standard" sx={{ m: 1, width: '100%', mt: 6 }}>
                        <InputLabel htmlFor="grouped-native-select" id="post">Poste occupé</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={dailyemployee.post_id}
                          onChange={handlePostChange}
                          label="Post occupé"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {posts.map(post => (
                            <MenuItem key={post.post_id} value={`${post.post_id}`}>{post.post_name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <EngineeringIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        id="code_chantier"
                        value={dailyemployee.code_chantier}
                        onChange={handleInputChange}
                        name="code_chantier"
                        label="Code chantier"
                        variant="standard"
                        sx={{ width: '100%' }}
                      /><br />
                    </Box>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <PortraitIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        id="firstname"
                        value={dailyemployee.firstname}
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
                        value={dailyemployee.address}
                        onChange={handleInputChange}
                        name="address"
                        label="Adresse"
                        variant="standard"
                        sx={{ width: '100%' }}
                      /><br />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <ClassIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        id="category"
                        value={dailyemployee.category}
                        onChange={handleInputChange}
                        name="category"
                        label="Catégorie"
                        variant="standard"
                        sx={{ width: '100%' }}
                      /><br />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <GroupsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <FormControl variant="standard" sx={{ m: 1, width: '100%', mt: 7 }}>
                        <InputLabel id="demo-simple-select-standard-label">Groupe</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={dailyemployee.group}
                          onChange={handleGroupChange}
                          label="Groupe"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
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
                        id="lastname"
                        value={dailyemployee.lastname}
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
                        value={dailyemployee.contact}
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
                        value={date}
                        onChange={insertDate}
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
                      <GroupsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <FormControl variant="standard" sx={{ m: 1, width: '100%', mt: 7 }}>
                        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={dailyemployee.status}
                          onChange={handleStatusChange}
                          label="Status"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="Actif">Actif</MenuItem>
                          <MenuItem value="Démission">Démission</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    id="remarque"
                    value={dailyemployee.remarque}
                    onChange={handleInputChange}
                    name="remarque"
                    label="Remarque"
                    variant="standard"
                    sx={{ width: '100%', mt: 7 }}
                  /><br />
                </Box> <br /><br /><br />

                <Button
                  size="medium"
                  variant="outlined"
                  color="primary"
                  sx={{ width: 250 }}
                  startIcon={<AddIcon />}
                  onClick={saveEmployee}
                >
                  Enregistrer
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}

export default UpdateDailyEmployee