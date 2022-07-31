import React from 'react';

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

const columns = [
  { field: 'id', headerName: 'Id', width: 100 },
  { field: 'matricule', headerName: 'Matricule', width: 100 },
  { field: 'firstname', headerName: 'Nom', width: 200 },
  { field: 'lastname', headerName: 'Prénom', width: 200 },
  { field: 'cin', headerName: 'Numéro CIN', width: 200, type: 'number' },
  { field: 'address', headerName: 'Adresse', width: 200 },
  { field: 'contact', headerName: 'Contact', width: 200 },
  { field: 'post', headerName: 'Poste occupé', width: 200 },
  { field: 'category', headerName: 'Categorie', width: 200 },
  { field: 'hiring_date', headerName: 'Date d\'embauche', width: 150 },
  {
    field: 'action', headerName: 'Action', width: 150, type: 'actions',
    getActions: () => [
      <IconButton component="label">
        <EditIcon />
      </IconButton>,
      <IconButton component="label">
        <DeleteIcon />
      </IconButton>
    ]
  },

];

const rows = [
  { id: 1, matricule: 'test_matricule', firstname: 'test_nom', lastname: 'test_prenom', cin: 16453132, address: 'test_adresse', contact: '0331212323', post: 'test_poste', category: 'test_category', hiring_date: '2019-03-12' },
  { id: 2, matricule: 'test_matricule', firstname: 'test_nom', lastname: 'test_prenom', cin: 16453132, address: 'test_adresse', contact: '0331212323', post: 'test_poste', category: 'test_category', hiring_date: '2019-03-12' },
  { id: 3, matricule: 'test_matricule', firstname: 'test_nom', lastname: 'test_prenom', cin: 16453132, address: 'test_adresse', contact: '0331212323', post: 'test_poste', category: 'test_category', hiring_date: '2019-03-12' },
  { id: 4, matricule: 'test_matricule', firstname: 'test_nom', lastname: 'test_prenom', cin: 16453132, address: 'test_adresse', contact: '0331212323', post: 'test_poste', category: 'test_category', hiring_date: '2019-03-12' },
  { id: 5, matricule: 'test_matricule', firstname: 'test_nom', lastname: 'test_prenom', cin: 16453132, address: 'test_adresse', contact: '0331212323', post: 'test_poste', category: 'test_category', hiring_date: '2019-03-12' },
  { id: 6, matricule: 'test_matricule', firstname: 'test_nom', lastname: 'test_prenom', cin: 16453132, address: 'test_adresse', contact: '0331212323', post: 'test_poste', category: 'test_category', hiring_date: '2019-03-12' },

];


function DailyEmployee() {

  const breadcrumbs = [
    <Typography key="1">
      Employé(e)s
    </Typography>,
    <Typography key="2">
      Employées Journalier
    </Typography>,
  ];

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Employées Journalier
        <Typography variant="h4" sx={{ px: 5, mt: 2, ml: -5, mb: 2 }}>
          Employé(e)s
        </Typography>
        <Stack spacing={2}>
          <Breadcrumbs separator="." aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>

        <Link to='/employee/new-dailyemployee'>
          <Button
            size="medium"
            variant="outlined"
            color="primary"
            sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
            startIcon={<AddIcon />}
            href=''
          >
            Nouveau employé
          </Button>
        </Link>
      </Typography>

      <Container maxWidth="xxl">

        <Paper sx={{ width: '95%', overflow: 'hidden' }}>
          <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              pageSize={5}
              rowsPerPageOptions={[5]}
              // checkboxSelection
              disableSelectionOnClick
            />
          </Box>
        </Paper>

      </Container>
    </div>
  )
}

export default DailyEmployee