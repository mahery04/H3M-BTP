import React, { useEffect, useState } from 'react';

import { Button, Card, Grid, TextField,CardContent, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl, Divider, Chip, InputAdornment } from '@mui/material';

import InputMask from 'react-input-mask';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import BadgeIcon from '@mui/icons-material/Badge';
import PortraitIcon from '@mui/icons-material/Portrait';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import WorkIcon from '@mui/icons-material/Work';


function NewServiceProvider() {
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
              <form noValidate autoComplete='off'>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ lineHeight: 6 }}>
                    <Grid item xs={2} sm={4} md={4}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <PortraitIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                          id="firstname"
                          // value={dailyemployee.matricule}
                          // onChange={handleInputChange}
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
                          // value={dailyemployee.address}
                          // onChange={handleInputChange}
                          name="address"
                          label="Adresse"
                          variant="standard"
                          sx={{ width: '100%' }}
                        /><br />
                      </Box>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Début de contrat"
                            id="start_contract"
                            name="start_contract"
                            // value={startconge}
                            // onChange={insertStartconge}
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
                          // value={dailyemployee.matricule}
                          // onChange={handleInputChange}
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
                          // value={dailyemployee.contact}
                          // onChange={handleInputChange}
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
                            label="Fin de contrat"
                            id="end_contract"
                            name="end_contract"
                            // value={startconge}
                            // onChange={insertStartconge}
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
                          // value={dailyemployee.cin}
                          // onChange={handleInputChange}
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
                          // value={monthlyemployee.post_occupe}
                          // onChange={handleInputChange}
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
                          // value={monthlyemployee.salary}
                          currencySymbol="Ar"
                          //minimumValue="0"
                          outputFormat="string"
                          decimalCharacter="."
                          digitGroupSeparator=","
                          // onChange={(event, value)=> setMonthlyemployee({...monthlyemployee, salary: value })}
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
                    // onClick={saveEmployee}
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