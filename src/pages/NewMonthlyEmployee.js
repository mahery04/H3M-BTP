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
import InputMask from 'react-input-mask'
import swal from '@sweetalert/with-react';

import monthlyEmployeeService from '../services/monthlyEmployeeService';


function NewMonthlyEmployee() {
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
    ostie_num:    '',
    cnaps_num:    '',
  }

  const [monthlyemployee, setMonthlyemployee] = useState(initialEmployeeState)

  const handleInputChange = e => {
    const { name, value } = e.target
    setMonthlyemployee({ ...monthlyemployee, [name]: value })
  }

  const insertDate = (newDate) => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setDate(d);
    setMonthlyemployee({ ...monthlyemployee, hiring_date: d })
  }

  console.log(monthlyemployee)

  const navigate = useNavigate()

  const saveEmployee = e => {
    e.preventDefault()

    var data = {
      matricule:    monthlyemployee.matricule,
      firstname:    monthlyemployee.firstname,
      lastname:     monthlyemployee.lastname,
      cin:          monthlyemployee.cin,
      address:      monthlyemployee.address,
      contact:      monthlyemployee.contact,
      post:         monthlyemployee.post,
      category:     monthlyemployee.category,
      hiring_date:  monthlyemployee.hiring_date,
      ostie_num:    monthlyemployee.ostie_num,
      cnaps_num:    monthlyemployee.cnaps_num,
    } 

    if(data.matricule.length <= 0 || data.firstname.length <= 0 || data.lastname.length <= 0 || data.cin.length <= 0 || data.address.length <= 0 || data.contact.length <= 0 || data.post.length <= 0 || data.category.length <= 0 || data.hiring_date.length <= 0 || data.ostie_num.length <= 0 || data.cnaps_num.length <= 0) {
      swal({
        title: "Un erreur est survenue!",
        text: "Veuillez remplir tous les formulaires",
        icon: "error",
        button: "OK",
      });
    } else {
      monthlyEmployeeService.create(data).then(res => {
        setMonthlyemployee({
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
      navigate('/employee/monthlyemployee?inserted')
    }

    

  }

  const breadcrumbs = [
    <Typography key="1">
      Employé(e)s
    </Typography>,
    <Typography key="2">
      Nouveau employé mensuel
    </Typography>,
  ];

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Nouveau Employé Mensuel
        <Typography variant="h4" sx={{ px: 5, mt: 2, ml: -5, mb: 2 }}>
          Employé(e)s
        </Typography>
        <Stack spacing={2}>
          <Breadcrumbs separator="." aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>


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
                    <TextField 
                      id="post" 
                      value={monthlyemployee.post} 
                      onChange={handleInputChange} 
                      name="post" 
                      label="Poste occupé" 
                      variant="standard" 
                      sx={{ width: '100%'}}
                    /><br />
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

                </Grid>
              </Grid><br/>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <TextField 
                    id="ostie_num" 
                    value={monthlyemployee.ostie_num}
                    onChange={handleInputChange}
                    name="ostie_num"
                    label="Numéro OSTIE" 
                    variant="standard" 
                    sx={{ width: '100%' }}
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
                    sx={{ width: '100%' }}
                  />
                </Grid>
              </Grid>

              <br /><br /><br />
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

export default NewMonthlyEmployee