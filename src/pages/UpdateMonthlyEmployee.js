import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Grid, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import IconButton from '@mui/material/IconButton';
import NumbersIcon from '@mui/icons-material/Numbers';
import BadgeIcon from '@mui/icons-material/Badge';
import WorkIcon from '@mui/icons-material/Work';
import PortraitIcon from '@mui/icons-material/Portrait';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ClassIcon from '@mui/icons-material/Class';
import CallIcon from '@mui/icons-material/Call';
import moment from 'moment';

import monthlyEmployeeService from '../services/monthlyEmployeeService'


function UpdateMonthlyEmployee(props) {
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

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

  const findData = useParams()
  const monthlyemployee_id = findData.id
  
  const [loaded, setLoaded] = useState(false)
  const [monthlyemployee, setMonthlyemployee] = useState(initialEmployeeState)

  useEffect(() => {
    const load = async () => {
      const res = await monthlyEmployeeService.get(monthlyemployee_id)
      console.log("RES LAVA BE ", res.data);
      setMonthlyemployee(res.data)
      setLoaded(true)
    }
    if (monthlyemployee_id && !loaded) {
      load();
    }
  }, [monthlyemployee_id, loaded])

  console.log(loaded)

  const handleInputChange = e => {
    const { name, value } = e.target
    setMonthlyemployee({ ...monthlyemployee, [name]: value })
  }

  const navigate = useNavigate();

  const insertDate = (newDate) => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setDate(d);
    setMonthlyemployee({ ...monthlyemployee, hiring_date: d })
  }

  
  const updateEmployee = e => {
    e.preventDefault();

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
    console.log(monthlyemployee)

    monthlyEmployeeService.update(monthlyemployee_id, data).then(res => {
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
            ostie_num:    res.data.ostie_num,
            cnaps_num:    res.data.cnaps_num,
        })
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
    navigate('/employee/monthlyemployee')
  }
  console.log(monthlyemployee)

  const breadcrumbs = [
    <Typography key="1">
      Employé(e)s
    </Typography>,
    <Typography key="2">
      Modification d'un employé mensuel
    </Typography>,
  ];

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Modification d'un employé mensuel
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
        <Card sx={{ height: 500, width: '95%' }}>
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
                        variant="standard" sx={{ width: '100%' }} 
                      /><br />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField 
                        id="cin" 
                        value={monthlyemployee.cin} 
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
                        value={monthlyemployee.post} 
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
                      <TextField 
                        id="contact" 
                        value={monthlyemployee.contact} 
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
                        name="hiring_date"
                        value={monthlyemployee.hiring_date}
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
                </Grid><br />
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
                  onClick={updateEmployee}
                >
                  Modifier
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