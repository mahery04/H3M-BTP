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
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TwoKIcon from '@mui/icons-material/TwoK';
import ArchiveIcon from '@mui/icons-material/Archive';
import ReceiptIcon from '@mui/icons-material/Receipt';

import moment from 'moment';
import swal from '@sweetalert/with-react';

import personnalToolsService from '../services/personnalToolsService'

function NewPersonnalTools() {
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
    purchase_date:          null,
    identification_number:  '',
    vendor:                 '',
    invoice_number:         '',
    article_name:           '',
    // assignation_place:      '',
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
      invoice_number:         tools.invoice_number,
      article_name:           tools.article_name,
      // assignation_place:      tools.assignation_place,
      statue:                 tools.statue,
      historical:             tools.historical,
      material_number:        tools.material_number,
      tooling_id:             tools.tooling_id,
    }
    if(tools.identification_number <= 0 ||  tools.article_name <= 0 || tools.statue <= 0 ||  tools.material_number <= 0) {
      swal({
        title: "Une erreur est survenu!",
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
          vendor:                 res.data.vendor,
          invoice_number:         res.data.invoice_number,
          article_name:           res.data.article_name,
          // assignation_place:      res.data.assignation_place,
          statue:                 res.data.statue,
          historical:             res.data.historical,
          material_number:        parseInt(res.data.material_number),
          tooling_id:             res.data.tooling_id,
        })
      }).catch(err => {
        console.log(err)
      })
      navigate('/tools/personnal?inserted')
    }
  }

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Nouveau outil personnel
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
                    <ReceiptIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                      id="invoice_number" 
                      value={tools.invoice_number} 
                      onChange={handleInputChange} 
                      name="invoice_number" 
                      label="Numéro de facture" 
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
                    label="Historique" 
                    variant="standard" 
                    multiline
                    rows={4}
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

export default NewPersonnalTools