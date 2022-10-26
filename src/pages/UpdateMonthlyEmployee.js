import React, { useEffect, useState } from 'react';

import { Button, Card, CardContent, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl, Divider, Chip } from '@mui/material';

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
import HandshakeIcon from '@mui/icons-material/Handshake';
import GradeIcon from '@mui/icons-material/Grade';
import EditIcon from '@mui/icons-material/Edit';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

import moment from 'moment';
import InputMask from 'react-input-mask'
import swal from '@sweetalert/with-react';

import monthlyEmployeeService from '../services/monthlyEmployeeService'
import postDailyEmployeeService from '../services/postDailyEmployeeService';
import MonthlyEmployee from './MonthlyEmployee';

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
    group:        group,
    post_id:      postValue,
    status:       '',
    code_chantier: '',
    category:     '',
    hiring_date:  hiringdate,
    type_contrat: contrat,
    evaluation:   evaluation,
    start_date:   startdate,
    start_motif:  '',
    sanction:     sanction,
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
    setMonthlyemployee({...monthlyemployee, post_id: postInput})
  };

  const handleContratChange = (event) => {
    const postInput = event.target.value
    setContrat(postInput);
    setMonthlyemployee({...monthlyemployee, type_contrat: postInput})
  };

  const handleEvaluationChange = (event) => {
    const postInput = event.target.value
    setEvaluation(postInput);
    setMonthlyemployee({...monthlyemployee, evaluation: postInput})
  };

  const handleSanctionChange = (event) => {
    const postInput = event.target.value
    setSanction(postInput);
    setMonthlyemployee({...monthlyemployee, sanction: postInput})
  };

  const hiringDate = (newDate) => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setHiringdate(d);
    setMonthlyemployee({ ...monthlyemployee, hiring_date: d })
  }

  const startDate = (newDate) => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setStartdate(d);
    setMonthlyemployee({ ...monthlyemployee, start_date: d })
  }

  console.log(monthlyemployee);

  const navigate = useNavigate()

  const updateEmployee = e => {
    e.preventDefault();

    var data = {
      matricule:    monthlyemployee.matricule,
      firstname:    monthlyemployee.firstname,
      lastname:     monthlyemployee.lastname,
      cin:          monthlyemployee.cin,
      address:      monthlyemployee.address,
      contact:      monthlyemployee.contact,
      group:        monthlyemployee.group,
      post_id:      monthlyemployee.post_id,
      status:       monthlyemployee.status,
      code_chantier:monthlyemployee.code_chantier,
      category:     monthlyemployee.category,
      hiring_date:  monthlyemployee.hiring_date,
      type_contrat: monthlyemployee.type_contrat,
      evaluation:   monthlyemployee.evaluation,
      start_date:   moment(monthlyemployee.start_date).format('YYYY-MM-DD'),
      start_motif:  monthlyemployee.start_motif,
      sanction:     monthlyemployee.sanction,
      motif:        monthlyemployee.motif,
      ostie_num:    monthlyemployee.ostie_num,
      cnaps_num:    monthlyemployee.cnaps_num,
    }

    if(data.matricule.length <= 0 || data.firstname.length <= 0 || data.lastname.length <= 0 || data.cin.length <= 0 || data.address.length <= 0 || data.contact.length <= 0 || data.group.length <= 0 || data.post_id.length <= 0 || data.status.length <= 0 || data.code_chantier.length <= 0 || data.category.length <= 0 || data.hiring_date.length <= 0 || data.type_contrat.length <= 0 || data.evaluation.length <= 0 || data.ostie_num.length <= 0 || data.cnaps_num.length <= 0) {
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
              post_id:      res.data.post_id,
              status:       res.data.status,
              code_chantier:res.data.code_chantier,
              category:     res.data.category,
              hiring_date:  res.data.hiring_date,
              type_contrat: res.data.type_contrat,
              evaluation:   res.data.evaluation,
              start_date:   res.data.start_date,
              start_motif:  res.data.start_motif,
              sanction:     res.data.sanction,
              motif:        res.data.motif,
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
                      <FormControl variant="standard" sx={{ m: 1, width: '100%', mt: 6 }}>
                        <InputLabel htmlFor="grouped-native-select" id="post">Poste occupé</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={monthlyemployee.post_id}
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
                      <GroupsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <FormControl variant="standard" sx={{ m: 1, width: '100%', mt: 5 }}>
                        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={monthlyemployee.status}
                          onChange={handleStatusChange}
                          label="Status"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="Actif">Actif</MenuItem>
                          <MenuItem value="Congé">Congé</MenuItem>
                          <MenuItem value="Démission">Démission</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <PortraitIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        id="firstname"
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
                      <ClassIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        id="category"
                        value={monthlyemployee.category}
                        onChange={handleInputChange}
                        name="category"
                        label="Categorie"
                        variant="standard"
                        sx={{ width: '100%' }}
                      /><br />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <GroupsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <FormControl variant="standard" sx={{ m: 1, width: '100%', mt: 6 }}>
                        <InputLabel id="demo-simple-select-standard-label">Groupe</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={monthlyemployee.group}
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
                        value={monthlyemployee.hiring_date}
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
                  </Grid>
                </Grid>
                
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={6}>
                    <TextField
                      id="ostie_num"
                      value={monthlyemployee.ostie_num}
                      onChange={handleInputChange}
                      name="ostie_num"
                      label="Numéro OSTIE"
                      variant="standard"
                      sx={{ width: '100%', mt:3 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="cnaps_num"
                      value={monthlyemployee.cnaps_num}
                      onChange={handleInputChange}
                      name="cnaps_num"
                      label="Numéro CNAPS"
                      variant="standard"
                      sx={{ width: '100%', mt:3 }}
                    />
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

                <Divider>
                  <Chip label="CONTRAT DE TRAVAIL" />
                </Divider>
                
                <Grid container spacing={2} columns={12}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <HandshakeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Type de contrat</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={monthlyemployee.type_contrat}
                          onChange={handleContratChange}
                          label="Type de contrat"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="INTERIMAIRE">INTERIMAIRE</MenuItem>
                          <MenuItem value="JOURNALIER">JOURNALIER</MenuItem>
                          <MenuItem value="SAISONNIER">SAISONNIER</MenuItem>
                          <MenuItem value="APPRENTISSAGE">APPRENTISSAGE</MenuItem>
                          <MenuItem value="CDD">CDD</MenuItem>
                          <MenuItem value="CDI">CDI</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <GradeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Evaluation</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={monthlyemployee.evaluation}
                          onChange={handleEvaluationChange}
                          label="Evaluation"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="ESSAIE">ESSAIE</MenuItem>
                          <MenuItem value="ESSAIE NON CONCLUANT">ESSAIE NON CONCLUANT</MenuItem>
                          <MenuItem value="RENOUVELLEMENT">RENOUVELLEMENT</MenuItem>
                          <MenuItem value="CONFIRMATION">CONFIRMATION</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Date de départ"
                        id="start_date"
                        name="start_date"
                        value={monthlyemployee.start_date}
                        onChange={startDate}
                        renderInput={(params) =>
                          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <TextField
                              {...params}
                              variant="standard"
                              sx={{ width: '100%', mt: 1 }}
                              id="start_date"
                              name="start_date"
                            /><br />
                          </Box>
                        }
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <TrendingDownIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Sanction</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={monthlyemployee.sanction}
                          onChange={handleSanctionChange}
                          label="Sanction"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="AVERTISSEMENT VERBAL">AVERTISSEMENT VERBAL</MenuItem>
                          <MenuItem value="AVERTISSEMENT ECRIT">AVERTISSEMENT ECRIT</MenuItem>
                          <MenuItem value="DERNIER AVERTISSEMENT">DERNIER AVERTISSEMENT</MenuItem>
                          <MenuItem value="MISE A PIED">MISE A PIED</MenuItem>
                          <MenuItem value="BLAME">BLAME</MenuItem>
                          <MenuItem value="LICENCIEMENT">LICENCIEMENT</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <EditIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        id="start_motif"
                        value={monthlyemployee.start_motif}
                        onChange={handleInputChange}
                        name="start_motif"
                        label="Motif de départ"
                        variant="standard"
                        sx={{ width: '100%' }}
                      /><br />
                    </Box>
                  </Grid>
                </Grid><br /><br />

                <Button
                  size="medium"
                  variant="outlined"
                  color="primary"
                  sx={{ width: 250 }}
                  startIcon={<AddIcon />}
                  onClick={updateEmployee}
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

export default UpdateMonthlyEmployee