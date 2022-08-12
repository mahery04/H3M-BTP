import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { useNavigate } from 'react-router-dom';
import { Grid, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 

import NumbersIcon from '@mui/icons-material/Numbers';
import BadgeIcon from '@mui/icons-material/Badge';
import WorkIcon from '@mui/icons-material/Work';
import PortraitIcon from '@mui/icons-material/Portrait';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ClassIcon from '@mui/icons-material/Class';
import CallIcon from '@mui/icons-material/Call';
import moment from 'moment';

import dailyEmployeeService from '../services/dailyEmployeeService'


function NewDailyEmployee() {
  const [date, setDate] = useState(null);

  const initialEmployeeState = {
    id:           null,
    matricule:    '',
    firstname:    '',
    lastname:     '',
    cin:          null,
    address:      '',
    contact:      '',
    post:         '',
    category:     '',
    hiring_date:  date,
  }

  const [dailyemployee, setDailyemployee] = useState(initialEmployeeState)

  const handleInputChange = e => {
    const { name, value } = e.target
    setDailyemployee({ ...dailyemployee, [name]: value })
  }

  const insertDate = (newDate) => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setDate(d);
    setDailyemployee({ ...dailyemployee, hiring_date: d })
  }

  // console.log(moment(date).format('YYYY-MM-DD'))

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
      post:         dailyemployee.post,
      category:     dailyemployee.category,
      hiring_date:  dailyemployee.hiring_date,
    }

    dailyEmployeeService.create(data).then(res => {
      setDailyemployee({
        id:           res.data.id,
        matricule:    res.data.matricule,
        firstname:    res.data.firstname,
        lastname:     res.data.lastname,
        cin:          res.data.cin,
        address:      res.data.address,
        contact:      res.data.contact,
        post:         res.data.post,
        category:     res.data.category,
        hiring_date:  res.data.hiring_date,
      })
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
    navigate('/employee/dailyemployee')

  }

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Nouveau Employé Journalier
      </Typography>

      <Container maxWidth="xxl">

        {/* <Paper sx={{ width: '95%', overflow: 'hidden' }}>
          <Box sx={{ height: 500, width: '100%' }}>
            lorem
          </Box>
        </Paper> */}

        <Card sx={{ height: 500, width: '95%' }}>
          <CardContent>

            <form onSubmit={saveEmployee} noValidate autoComplete='off'>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ lineHeight: 6 }}>
                  <Grid item xs={2} sm={4} md={4}>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <NumbersIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField 
                        id="matricule" 
                        required
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
                      <TextField 
                        id="cin" 
                        required
                        value={dailyemployee.cin} 
                        onChange={handleInputChange} 
                        name="cin" 
                        label="Numéro CIN" 
                        variant="standard" 
                        sx={{ width: '100%' }} 
                      /><br />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField 
                        id="post" 
                        required
                        value={dailyemployee.post} 
                        onChange={handleInputChange} 
                        name="post" 
                        label="Poste occupé" 
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
                        required
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
                        required
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
                        required
                        value={dailyemployee.category} 
                        onChange={handleInputChange} 
                        name="category" 
                        label="Catégorie" 
                        variant="standard" 
                        sx={{ width: '100%' }} 
                      /><br />
                    </Box>

                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <PortraitIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField 
                        id="lastname" 
                        required
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
                      <TextField 
                        id="contact" 
                        required
                        value={dailyemployee.contact} 
                        onChange={handleInputChange} 
                        name="contact" 
                        label="Contact" 
                        variant="standard" 
                        sx={{ width: '100%' }} 
                      /><br />
                    </Box>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Date d'embauche"
                        id="hiring_date"
                        required
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
                              required
                              name="hiring_date" 
                            /><br />
                          </Box>
                        }
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid><br /><br /><br /><br />
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