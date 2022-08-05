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
import FeedIcon from '@mui/icons-material/Feed';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function NewTools() {
  const [date, setDate] = useState(null);
  const [affectation, setAffectation] = React.useState('');

  const handleChange = (event) => {
    setAffectation(event.target.value);
  };

  const breadcrumbs = [
    <Typography key="1">
      Outillage
    </Typography>,
    <Typography key="2">
      Nouveau outil
    </Typography>,
  ];

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Nouveau outil
        <Typography variant="h4" sx={{ px: 5, mt: 2, ml: -5, mb: 2 }}>
          Outillage
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

        <Card sx={{ height: 760, width: '95%' }}>
          <CardContent>
            <Box sx={{ flexGrow: 1 }}>
              <Container maxWidth="xl" sx={{ lineHeight: 5 }}>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date d'achat"
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

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <NumbersIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id="matricule" label="Numéro d'identification" variant="standard" sx={{ width: '100%' }} /><br />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <FeedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id="matricule" label="Nom article" variant="standard" sx={{ width: '100%' }} /><br />
                </Box>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <TrendingUpIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <FormControl variant="standard" sx={{ width: '100%', marginTop: 4 }}>
                        <InputLabel id="demo-simple-select-standard-label">Type d'affectation</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={affectation}
                          onChange={handleChange}
                          label="Age"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={1}>Personnel</MenuItem>
                          <MenuItem value={2}>Commun</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <PortraitIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField id="matricule" label="Responsable" variant="standard" sx={{ width: '100%' }} /><br />
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <LocationOnIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id="matricule" label="Lieu d'affectation" variant="standard" sx={{ width: '100%' }} /><br />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <MoreHorizIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <FormControl variant="standard" sx={{ width: '100%', marginTop: 4 }}>
                    <InputLabel id="demo-simple-select-standard-label">Etat</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={affectation}
                      onChange={handleChange}
                      label="Age"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>Personnel</MenuItem>
                      <MenuItem value={2}>Commun</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <TextField id="matricule" label="Historique" variant="standard" sx={{ width: '100%', marginTop: 4 }} />
                <br /><br />

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

              </Container>

            </Box>
          </CardContent>
        </Card>


      </Container>
    </div>
  )
}

export default NewTools