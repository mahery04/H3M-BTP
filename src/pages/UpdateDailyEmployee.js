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
import InputMask from 'react-input-mask';
import swal from '@sweetalert/with-react';

import dailyEmployeeService from '../services/dailyEmployeeService';
import postDailyEmployeeService from '../services/postDailyEmployeeService';

function UpdateDailyEmployee(props) {
  
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [startdate, setStartdate] = useState(null);
  const [posts, setPost] = useState([]);
  const [postValue,setPostValue] = useState('');
  const [group,setGroup] = useState('');
  const [contrat,setContrat] = useState('');
  const [evaluation,setEvaluation] = useState('');
  const [status,setStatus] = useState('');
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
    post_id:      postValue,
    code_chantier: '',
    group:        group,
    category:     '',
    hiring_date:  date,
    type_contrat: contrat,
    evaluation:   evaluation,
    start_date:   startdate,
    start_motif:  '',
    sanction:     sanction,
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
      setDailyemployee(res.data)
      setLoaded(true)
    }
    if (dailyemployee_id && !loaded) {
      load();
    }
  }, [dailyemployee_id, loaded])

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

  const handleContratChange = (event) => {
    const postInput = event.target.value
    setContrat(postInput);
    setDailyemployee({...dailyemployee, type_contrat: postInput})
  };

  const handleEvaluationChange = (event) => {
    const postInput = event.target.value
    setEvaluation(postInput);
    setDailyemployee({...dailyemployee, evaluation: postInput})
  };

  const insertDate = (newDate) => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setDate(d);
    setDailyemployee({ ...dailyemployee, hiring_date: d })
  }

  const startDate = (newDate) => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setStartdate(d);
    setDailyemployee({ ...dailyemployee, start_date: d })
  }

  const handleSanctionChange = (event) => {
    const postInput = event.target.value
    setSanction(postInput);
    setDailyemployee({...dailyemployee, sanction: postInput})
  };

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
      type_contrat: dailyemployee.type_contrat,
      evaluation:   dailyemployee.evaluation,
      start_date:   moment(dailyemployee.start_date).format('YYYY-MM-DD'),
      start_motif:  dailyemployee.start_motif,
      sanction:     dailyemployee.sanction,
      status:       dailyemployee.status,
      remarque:     dailyemployee.remarque
    }

    if(!data.matricule || !data.firstname || !data.lastname || !data.post_id || !data.group || !data.status) {
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
          type_contrat: res.data.type_contrat,
          evaluation:   res.data.evaluation,
          start_date:   res.data.start_date,
          start_motif:  res.data.start_motif,
          sanction:     res.data.sanction,
          status:       res.data.status,
          remarque:     res.data.remarque
        })
      }).catch(err => {
        console.log(err)
      })
      navigate('/employee/dailyemployee?updated')
    }
  }

  console.log(dailyemployee)

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
        <Card sx={{ height: 'auto', width: '95%' }}>
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
                        value={dailyemployee.hiring_date}
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
                  />
                </Box> <br /><br />
                
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
                          value={dailyemployee.type_contrat}
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
                          value={dailyemployee.evaluation}
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
                        value={dailyemployee.start_date}
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
                          value={dailyemployee.sanction}
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
                        value={dailyemployee.start_motif}
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