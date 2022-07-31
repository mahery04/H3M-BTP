import React, { useState } from 'react';

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

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
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


function NewDailyEmployee() {
  const [date, setDate] = useState(null);

  const breadcrumbs = [
    <Typography key="1">
      Employé(e)s
    </Typography>,
    <Typography key="2">
      Nouvelle employée journalier
    </Typography>,
  ];

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Nouvelle Employées Journalier
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

        <Card sx={{ height: 500, width: '95%'}}>
          <CardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ lineHeight: 6 }}>
              <Grid item xs={2} sm={4} md={4}>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <NumbersIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id="matricule" label="Numéro matricule" variant="standard" sx={{ width: '100%' }} /><br />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id="cin" label="Numéro CIN" variant="standard" sx={{ width: '100%' }} /><br />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id="post" label="Poste occupé" variant="standard" sx={{ width: '100%' }} /><br />
                </Box>
                
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <PortraitIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id="firstname" label="Nom" variant="standard" sx={{ width: '100%' }} /><br />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <LocationOnIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id="address" label="Adresse" variant="standard" sx={{ width: '100%' }} /><br />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <ClassIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id="category" label="Categorie" variant="standard" sx={{ width: '100%' }} /><br />
                </Box>

              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <PortraitIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id="lastname" label="Prénom" variant="standard" sx={{ width: '100%' }} /><br />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <CallIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id="contact" label="Contact" variant="standard" sx={{ width: '100%' }} /><br />
                </Box>
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date d'embauche"
                      value={date}
                      onChange={(newDate) => {
                        setDate(newDate);
                      }}
                      renderInput={(params) => 
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                          <TextField {...params} variant="standard" sx={{ width: '100%' }} /><br />
                        </Box>
                      }
                    />
                </LocalizationProvider>
              </Grid>
            </Grid><br/><br/><br/><br/>
            <Button
              size="medium"
              variant="outlined"
              color="primary"
              sx={{ width: 250 }}
              startIcon={<AddIcon />}
              href=''
            >
              Enregistrer
            </Button>
          </Box>
          </CardContent>
        </Card>


      </Container>
    </div>
  )
}

export default NewDailyEmployee