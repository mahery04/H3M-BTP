import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { useNavigate } from 'react-router-dom';
import { Grid, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 

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

import moment from 'moment';
import InputMask from 'react-input-mask';
import swal from '@sweetalert/with-react';

import dailyEmployeeService from '../services/dailyEmployeeService';
import postDailyEmployeeService from '../services/postDailyEmployeeService';


function NewDailyEmployee() {
  
  const [date, setDate] = useState(null);
  const [posts, setPost] = useState([]);
  const [postValue,setPostValue] = useState('');
  const [group,setGroup] = useState('');


  const getPostDailyEmployees = () => {
    postDailyEmployeeService.getAllPosts().then((res) => {
      setPost(res.data)
      console.log("POST OCCUPE", res.data);
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
    tools: '',
    remarque:     ''
  }

  const [dailyemployee, setDailyemployee] = useState(initialEmployeeState)

  const handleInputChange = e => {
    const { name, value } = e.target
    setDailyemployee({ ...dailyemployee, [name]: value })
  }

  const handleGroupChange = (event) => {
    setGroup(event.target.value);
    setDailyemployee({...dailyemployee, group: event.target.value })
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
      tools: '',
      remarque:     dailyemployee.remarque
    }

    if(data.matricule.length <= 0 || data.firstname.length <= 0 || data.lastname.length <= 0 || data.cin.length <= 0 || data.address.length <= 0 || data.contact.length <= 0 || data.post_id.length <= 0 || data.code_chantier.length <= 0 || data.group.length <= 0 || data.category.length <= 0 || data.hiring_date.length <= 0 || data.remarque.length <= 0) {
      swal({
        title: "Un erreur est survenue!",
        text: "Veuillez remplir tous les formulaires",
        icon: "error",
        button: "OK",
      });
    } else {
      dailyEmployeeService.create(data).then(res => {
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
          tools: '',
          remarque:     res.data.remarque
        })
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
      navigate('/employee/dailyemployee?inserted')
    }
  }

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Nouveau Employé Journalier
      </Typography>

      <Container maxWidth="xxl">
        <Card sx={{ height: 600, width: '95%' }}>
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
                      <FormControl variant="standard" sx={{ m: 1, width: '100%', mt: 6 }}>
                        <InputLabel htmlFor="grouped-native-select" id="post">Poste occupé</InputLabel>
                        <Select
                          native
                          id="grouped-native-select"
                          value={postValue}
                          onChange={handlePostChange}
                          label="Post occupé"
                        >
                          <option value=''></option>
                            {posts.map(post => (
                              <option key={post.post_id} value={`${post.post_id}`}>{post.post_name}</option>
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
                      <FormControl variant="standard" sx={{ m: 1, width: '100%', mt:7 }}>
                        <InputLabel id="demo-simple-select-standard-label">Groupe</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={group}
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
                      <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField 
                        id="remarque" 
                        value={dailyemployee.remarque} 
                        onChange={handleInputChange} 
                        name="remarque" 
                        label="Remarque" 
                        variant="standard" 
                        sx={{ width: '100%' }} 
                      /><br/>
                    </Box>
                  </Grid>
                </Grid><br/><br/><br/><br/>
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

export default NewDailyEmployee