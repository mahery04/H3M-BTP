import React, { useEffect, useState } from 'react';

import { Button, Card, Grid, TextField,CardContent, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl, Divider, Chip, InputAdornment } from '@mui/material';

import InputMask from 'react-input-mask';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import BadgeIcon from '@mui/icons-material/Badge';
import PortraitIcon from '@mui/icons-material/Portrait';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import WorkIcon from '@mui/icons-material/Work';

import moment from 'moment';
import swal from '@sweetalert/with-react';

import serviceProviderService from '../services/serviceProviderService';


function NewServiceProvider() {

  const [startContract, setStartContract] = useState(null)
  const [endContract, setEndContract] = useState(null)
  const [personnalProvider, setPersonnalProvider] = useState([])

  const initialStateServiceProvider = {
    id: null,
    firstname: '',
    lastname: '',
    cin: null,
    address: '',
    contact: '',
    start_contract: startContract,
    end_contract: endContract,
    post_occupe: '',
    salary:''
  }

  const [serviceProviders, setServiceProviders] = useState(initialStateServiceProvider)
  
  const handleInputChange = e => {
    const { name, value } = e.target
    setServiceProviders({...serviceProviders, [name] : value})
  }
  
  const insertStartContract = newDate => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setStartContract(d)
    setServiceProviders({...serviceProviders, startContract: d})
  }

  const insertEndContract = newDate => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setEndContract(d)
    setServiceProviders({...serviceProviders, endContract: d})
  }

  const navigate = useNavigate()

  const savePersonnalProvider = e => {
    e.preventDefault()

    var data = {
      firstname: serviceProviders.firstname,
      lastname: serviceProviders.lastname,
      cin: serviceProviders.cin,
      address: serviceProviders.address,
      contact: serviceProviders.contact,
      start_contract: serviceProviders.start_contract,
      end_contract: serviceProviders.end_contract,
      post_occupe: serviceProviders.post_occupe,
      salary: serviceProviders.salary
    }

    if (data.firstname.length <= 0 || data.lastname.length <= 0 || data.start_contract.length <= 0 || data.end_contract.length <= 0 || data.post_occupe.length <= 0 ) {
      swal({
        title: "Une erreur est survenue!",
        text: "Des formulaires requis sont vides.",
        icon: "error",
        button: "OK",
      });
    } else {
      serviceProviderService.create(data).then(res => {
        setServiceProviders({
          id: res.data.id,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          cin: res.data.cin,
          address: res.data.cin,
          contact: res.data.contact,
          start_contract: res.data.start_contract,
          end_contract: res.data.end_contract,
          post_occupe: res.data.post_occupe,
          salary: res.data.post_occupe
        })
      }).catch(err => {
        console.log(err)
      })
      navigate('/service-provider/personnal?inserted')
    }
  }
  
  return (
    <div>
        <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
          Nouveau Prestataire
          <Button
            size="medium"
            variant="outlined"
            color="primary"
            sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
            startIcon={<ArrowBackIcon />}
            href='/service-provider/personnal'
          >
          Retour
          </Button>
        </Typography>
        <Container maxWidth="xxl">
          <Card sx={{ height: 'auto', width: '95%' }}>
            <CardContent>
              <form onSubmit={savePersonnalProvider} noValidate autoComplete='off'>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ lineHeight: 6 }}>
                    <Grid item xs={2} sm={4} md={4}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <PortraitIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                          id="firstname"
                          value={serviceProviders.firstname}
                          onChange={handleInputChange}
                          name="firstname"
                          required
                          label="Nom"
                          variant="standard"
                          sx={{ width: '100%' }}
                        /><br />
                      </Box> 
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <LocationOnIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                          id="address"
                          value={serviceProviders.address}
                          onChange={handleInputChange}
                          name="address"
                          label="Adresse"
                          variant="standard"
                          sx={{ width: '100%' }}
                        /><br />
                      </Box>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Début de contrat *"
                            id="start_contract"
                            name="start_contract"
                            value={startContract}
                            onChange={insertStartContract}
                            renderInput={(params) =>
                              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                              <TextField {...params} variant="standard" sx={{ width: '100%' }} /><br />
                              </Box>
                            }
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <PortraitIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                          id="lastname"
                          value={serviceProviders.lastname}
                          onChange={handleInputChange}
                          name="lastname"
                          required
                          label="Prénom"
                          variant="standard"
                          sx={{ width: '100%' }}
                        /><br />
                      </Box> 
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <CallIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <InputMask
                          value={serviceProviders.contact}
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
                        </InputMask><br />
                      </Box>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Fin de contrat *"
                            id="end_contract"
                            name="end_contract"
                            value={endContract}
                            onChange={insertEndContract}
                            renderInput={(params) =>
                              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                              <TextField {...params} variant="standard" sx={{ width: '100%' }} /><br />
                              </Box>
                            }
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <InputMask
                          value={serviceProviders.cin}
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
                        </InputMask> <br />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                          id="post_occupe"
                          value={serviceProviders.post_occupe}
                          onChange={handleInputChange}
                          name="post_occupe"
                          label="Poste occupé"
                          required
                          variant="standard"
                          sx={{ width: '100%' }}
                        /><br />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <CurrencyTextField
                          label="Salaire *"
                          variant="standard"
                          id="salary"
                          name="salary"
                          value={serviceProviders.salary}
                          currencySymbol="Ar"
                          //minimumValue="0"
                          outputFormat="string"
                          decimalCharacter="."
                          digitGroupSeparator=","
                          onChange={(event, value)=> setServiceProviders({...serviceProviders, salary: value })}
                          style={{width: '100%', marginTop: '10%'}}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <br/><br /><br />
                  <Button
                    size="medium"
                    variant="outlined"
                    color="primary"
                    sx={{ width: 250 }}
                    startIcon={<AddIcon />}
                    onClick={savePersonnalProvider}
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

export default NewServiceProvider