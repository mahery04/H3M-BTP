import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import { Button, Breadcrumbs, Card, CardContent, CardActions, Typography, Box, Select, Stack, MenuItem, InputLabel, FormControl, Divider, Chip } from '@mui/material';

import { Grid, TextField } from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HandshakeIcon from '@mui/icons-material/Handshake';
import GradeIcon from '@mui/icons-material/Grade';
import EditIcon from '@mui/icons-material/Edit';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

import moment from 'moment';
import swal from '@sweetalert/with-react';

import contratDailyEmployeeService from '../services/contratDailyEmployeeService';
import { id } from 'date-fns/locale';

function UpdateContratDailyEmployee() {

  const [startdate, setStartdate] = useState(null);
  const [contrat,setContrat] = useState('');
  const [evaluation,setEvaluation] = useState('');
  const [sanction,setSanction] = useState('');

  const initialDailyContratState = {
    id:           null,
    type_contrat:  contrat,
    evaluation:   evaluation,
    start_date:   startdate,
    start_motif:   '',
    sanction:    sanction,
  }

  const findData = useParams()
  const contrat_id = findData.id

  const [loaded, setLoaded] = useState(false)
  const [contratDailyEmployee, setContratDailyEmployee] = useState(initialDailyContratState)

  useEffect(() => {
    const load = async () => {
      const res = await contratDailyEmployeeService.get(contrat_id)
      setContratDailyEmployee(res.data)
      setLoaded(true)
    }
    if (contrat_id && !loaded) {
      load();
    }
  }, [contrat_id, loaded])
  
  const handleInputChange = e => {
    const { name, value } = e.target
    setContratDailyEmployee({ ...contratDailyEmployee, [name]: value })
  }

  const handleContratChange = (event) => {
    const postInput = event.target.value
    setContrat(postInput);
    setContratDailyEmployee({...contratDailyEmployee, type_contrat: postInput})
  }

  const handleEvaluationChange = (event) => {
    const postInput = event.target.value
    setEvaluation(postInput);
    setContratDailyEmployee({...contratDailyEmployee, evaluation: postInput})
  }

  const handleSanctionChange = (event) => {
    const postInput = event.target.value
    setSanction(postInput);
    setContratDailyEmployee({...contratDailyEmployee, sanction: postInput})
  }

  const startDate = (newDate) => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setStartdate(d);
    setContratDailyEmployee({ ...contratDailyEmployee, start_date: d })
  }

  const navigate = useNavigate()

  const saveContrat = e => {
    e.preventDefault()

    var data = {
      id: contratDailyEmployee.id,
      type_contrat: contratDailyEmployee.type_contrat,
      evaluation: contratDailyEmployee.evaluation,
      start_date: contratDailyEmployee.start_date,
      start_motif: contratDailyEmployee.start_motif,
      sanction: contratDailyEmployee.sanction,
    }

    // if (data.contrat_id.length <= 0 || data.type_contrat.length <= 0 || data.start_date.length <= 0 || data.evaluation.length <= 0 || data.start_motif.length <= 0 || data.sanction.length <= 0) {
    //   swal({
    //     title: "Un erreur est survenu!",
    //     text: "Des formulaires requis sont vides.",
    //     icon: "error",
    //     button: "OK",
    //   });
    // } else {
      contratDailyEmployeeService.update(contrat_id, data).then(res => {
        setContratDailyEmployee({
          id: res.data.contrat_id,
          type_contrat: res.data.type_contrat,
          evaluation: res.data.evaluation,
          start_date: res.data.start_date,
          start_motif: res.data.start_motif,
          sanction: res.data.sanction
        }).catch(err => {
          console.log(err);
        })
      })
      navigate(`/employee/contrat-daily-employee/${contratDailyEmployee.id}`)
    // }
  }

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Modification du contrat
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
      <Grid item xs={4}>
        <Card sx={{ minWidth: 275 }}>
          <form onSubmit={saveContrat} noValidate autoComplete='off'>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <HandshakeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">Type de contrat</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={contratDailyEmployee.type_contrat}
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
                </Box><br/>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <GradeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">Evaluation</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={contratDailyEmployee.evaluation}
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
                </Box><br/>
                  
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date de départ"
                    id="start_date"
                    name="start_date"
                    value={contratDailyEmployee.start_date}
                    onChange={startDate}
                    renderInput={(params) =>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <TextField
                        {...params}
                        variant="standard"
                        sx={{ width: '100%' }}
                        id="start_date"
                        name="start_date"
                      /><br />
                    </Box>
                    }
                  />
                </LocalizationProvider><br/>
                  
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <TrendingDownIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">Sanction</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={contratDailyEmployee.sanction}
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
                  </FormControl><br/>
                </Box><br/>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <EditIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    id="start_motif"
                    value={contratDailyEmployee.start_motif}
                    onChange={handleInputChange}
                    name="start_motif"
                    label="Motif de départ"
                    variant="standard"
                    multiline
                    rows={2}
                    sx={{ width: '100%' }}
                  /><br />
                </Box>
              </CardContent>
              <CardActions>
                <Button size="medium" onClick={saveContrat}>Modifier</Button>
              </CardActions>
          </form>
        </Card>
      </Grid>
    </div>
  )
}

export default UpdateContratDailyEmployee