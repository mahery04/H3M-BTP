import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useNavigate } from 'react-router-dom';
import { Grid, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import NumbersIcon from '@mui/icons-material/Numbers';
import PortraitIcon from '@mui/icons-material/Portrait';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FeedIcon from '@mui/icons-material/Feed';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TwoKIcon from '@mui/icons-material/TwoK';

import moment from 'moment';
import swal from '@sweetalert/with-react';

import personnalToolsService from '../services/personnalToolsService'

function NewTools() {
  const [date, setDate] = useState(null);
  const [affectation, setAffectation] = useState('');
  const [responsable, setResponsable] = useState('');
  const [statue, setStatue] = useState('');
  const [employees, setEmployees] = useState([]);

  const getEmployee = () => {
    personnalToolsService.getEmployee().then((res) => {
      setEmployees(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getEmployee()
  },[])

  const initialToolsState = {
    id:                     null,
    purchase_date:          '',
    identification_number:  '',
    article_name:           '',
    assignation_place:      '',
    statue:                 statue,
    historical:             '',
    material_number:        '',
    affectation_type:       affectation,
    responsable:            responsable,
    tooling_id:             '',
  }

  const [tools, setTools] = useState(initialToolsState)

  const handleInputChange = e => {
    const { name, value } = e.target
    setTools({ ...tools, [name]: value })
  }

  const insertDate = (newDate) => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setDate(d)
    setTools({ ...tools, purchase_date: d })
  }

  const handleAffectationChange = (event) => {
    const affectation = event.target.value
    setAffectation(affectation);
    setTools({ ...tools, affectation_type: affectation })
  };

  const handleResponsableChange = (event) => {
    const employee = event.target.value
    setResponsable(employee);
    setTools({ ...tools, responsable: employee })
  };

  const handleStatueChange = (event) => {
    const state = event.target.value
    setStatue(state);
    setTools({ ...tools, statue: state })
  };

  console.log(tools.affectation_type, tools)

  let setDisable = false
  if (affectation === "Personnel") {
    setDisable = false
  } else {
    setDisable = true
  }

  const navigate = useNavigate()

  const saveTools = e => {
    e.preventDefault()

    var data = {
      purchase_date:          tools.purchase_date,
      identification_number:  tools.identification_number,
      article_name:           tools.article_name,
      assignation_place:      tools.assignation_place,
      statue:                 tools.statue,
      historical:             tools.historical,
      material_number:        tools.material_number,
      affectation_type:       tools.affectation_type,
      responsable:            tools.responsable,
      tooling_id:             tools.tooling_id,
    }
    if(tools.purchase_date <= 0 || tools.identification_number <= 0 ||  tools.article_name <= 0 ||  tools.assignation_place <= 0 ||  tools.statue <= 0 ||  tools.historical <= 0 ||  tools.material_number <= 0 ||  tools.affectation_type <= 0 ||  tools.responsable <= 0 ||  tools.tooling_id <= 0) {
      swal({
        title: "Un erreur est survenu!",
        text: "Veuillez remplir tous les formulaires",
        icon: "error",
        button: "OK",
      });
    } else {
      personnalToolsService.create(data).then(res => {
        setTools({
          id:                     res.data.id,
          purchase_date:          res.data.purchase_date,
          identification_number:  res.data.identification_number,
          article_name:           res.data.article_name,
          assignation_place:      res.data.assignation_place,
          statue:                 res.data.statue,
          historical:             res.data.historical,
          material_number:        parseInt(res.data.material_number),
          affectation_type:       res.data.affectation_type,
          responsable:            res.data.responsable,
          tooling_id:             res.data.tooling_id,
        })
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
      navigate('/tools/personnal?inserted')
    }
  }

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Création d'un nouveau outil
      </Typography>

      <Container maxWidth="xxl">
        <Card sx={{ height: 820, width: '95%' }}>
          <CardContent>
            <form onSubmit={saveTools} noValidate autoComplete='off'>
              <Box sx={{ flexGrow: 1 }}>
                <Container maxWidth="xl" sx={{ lineHeight: 5 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date d'achat"
                      id="purchase_date"
                      name="purchase_date"
                      value={date}
                      onChange={insertDate}
                      renderInput={(params) =>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                          <TextField {...params} variant="standard" sx={{ width: '100%' }} /><br />
                        </Box>
                      }
                    />
                  </LocalizationProvider>

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <NumbersIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                      id="identification_number" 
                      value={tools.identification_number} 
                      onChange={handleInputChange} 
                      name="identification_number" 
                      label="Numéro d'identification" 
                      variant="standard" 
                      sx={{ width: '100%' }}
                    /><br />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <FeedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                      id="article_name" 
                      value={tools.article_name}
                      onChange={handleInputChange}
                      name="article_name" 
                      label="Nom article" 
                      variant="standard" 
                      sx={{ width: '100%' }}
                    /><br />
                  </Box>

                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TrendingUpIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <FormControl variant="standard" sx={{ width: '100%', marginTop: 4 }}>
                          <InputLabel id="tooling_id">Type d'affectation</InputLabel>
                          <Select
                            labelId="tooling_id"
                            id="tooling_id"
                            value={affectation}
                            onChange={handleAffectationChange}
                            label="Age"
                          >
                            <MenuItem value={1}>
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value="Personnel">Personnel</MenuItem>
                            <MenuItem value="Commun">Commun</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>

                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <PortraitIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <FormControl variant="standard" sx={{ width: '100%', marginTop: 4 }}>
                          <InputLabel htmlFor="grouped-native-select" id="responable">Responsable</InputLabel>
                          <Select 
                            native 
                            id="grouped-native-select" 
                            label="Responsable"  
                            disabled={setDisable}
                            value={responsable}
                            onChange={handleResponsableChange}
                          >
                            <option value=''></option>
                            {employees.map(employee => (
                              <option key={employee.matricule} value={`${employee.firstname} ${employee.lastname}`}>{employee.firstname} {employee.lastname}</option>
                            ))}
                          </Select>
                        </FormControl><br />
                      </Box>
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <LocationOnIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                      id="assignation_place" 
                      value={tools.assignation_place}
                      onChange={handleInputChange}
                      name="assignation_place" 
                      label="Lieu d'affectation" 
                      variant="standard" 
                      sx={{ width: '100%' }}
                    /><br />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <MoreHorizIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <FormControl variant="standard" sx={{ width: '100%', marginTop: 4 }}>
                      <InputLabel id="statue">Etat</InputLabel>
                      <Select
                        labelId="statue"
                        id="statue"
                        value={statue}
                        onChange={handleStatueChange}
                        label="Age"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value='Nouveau'>Nouveau</MenuItem>
                        <MenuItem value='Occasion'>Occasion</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TwoKIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                      type="number"
                      id="material_number" 
                      value={tools.material_number}
                      onChange={handleInputChange}
                      name="material_number" 
                      label="Nombre de matériels" 
                      variant="standard" 
                      sx={{ width: '100%' }}
                    /><br />
                  </Box>
                  
                  <TextField 
                    id="historical" 
                    value={tools.historical}
                    onChange={handleInputChange}
                    name="historical" 
                    label="Historique" 
                    variant="standard" 
                    sx={{ width: '100%', marginTop: 4 }} 
                  />
                  <br /><br />

                  <Button
                    size="medium"
                    variant="outlined"
                    color="primary"
                    sx={{ width: 250 }}
                    startIcon={<AddIcon />}
                    onClick={saveTools}
                  >
                    Créer
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

export default NewTools