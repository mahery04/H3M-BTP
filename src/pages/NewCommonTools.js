import React, { useState, useEffect } from 'react';

import { Button, Card, CardContent, Container, Typography, Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { Grid, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import AddIcon from '@mui/icons-material/Add';
import NumbersIcon from '@mui/icons-material/Numbers';
import PortraitIcon from '@mui/icons-material/Portrait';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FeedIcon from '@mui/icons-material/Feed';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArchiveIcon from '@mui/icons-material/Archive';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TwoKIcon from '@mui/icons-material/TwoK';

import moment from 'moment';
import swal from '@sweetalert/with-react';

import commonToolsService from '../services/commonToolsService'

function NewCommonTools() {
  const [date, setDate] = useState(null);
  const [affectation, setAffectation] = useState('');
  const [responsable, setResponsable] = useState('');
  const [statue, setStatue] = useState('');
  const [employees, setEmployees] = useState([]);

  const getEmployee = () => {
    commonToolsService.getEmployee().then((res) => {
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
    purchase_date:          null,
    identification_number:  '',
    vendor:                 '',
    num_fact:         '',
    article_name:           '',
    // assignation_place:      '',
    statue:                 statue,
    historical:             '',
    material_number:        '',
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
      vendor:                 tools.vendor,
      num_fact:               tools.num_fact,
      article_name:           tools.article_name,
      // assignation_place:      tools.assignation_place,
      statue:                 tools.statue,
      historical:             tools.historical,
      material_number:        tools.material_number,
    }
    if(tools.identification_number <= 0 ||  tools.article_name <= 0 || tools.statue <= 0 ||  tools.material_number <= 0) {
      swal({
        title: "Une erreur est survenu!",
        text: "Veuillez remplir tous les formulaires",
        icon: "error",
        button: "OK",
      });
    } else {
      commonToolsService.create(data).then(res => {
        setTools({
          id:                     res.data.id,
          purchase_date:          res.data.purchase_date,
          vendor:                 res.data.vendor,
          num_fact:               res.data.num_fact,
          identification_number:  res.data.identification_number,
          article_name:           res.data.article_name,
          // assignation_place:      res.data.assignation_place,
          statue:                 res.data.statue,
          historical:             res.data.historical,
          material_number:        parseInt(res.data.material_number),
        })
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
      navigate('/tools/common?inserted')
    }
  }

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Nouveau outil commun
      </Typography>

      <Container maxWidth="xxl">
        <Card sx={{ height: '100%', width: '95%' }}>
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
                      id="num_fact" 
                      value={tools.num_fact} 
                      onChange={handleInputChange} 
                      name="num_fact" 
                      label="Numéro facture" 
                      variant="standard" 
                      sx={{ width: '100%' }}
                    /><br />
                  </Box>

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
                    <ArchiveIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                      id="vendor" 
                      value={tools.vendor} 
                      onChange={handleInputChange} 
                      name="vendor" 
                      label="Fournisseur" 
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

                  {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
                  </Grid> */}

                  {/* <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
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
                  </Box> */}

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
                    label="Lieu d'affectation" 
                    multiline
                    rows={4}
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

export default NewCommonTools