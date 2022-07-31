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
  { field: 'date', headerName: 'Date d\'achat', width: 100 },
  { field: 'identification', headerName: 'Numéro d\'ifentification', width: 200 },
  { field: 'name', headerName: 'Nom de l\'article', width: 200 },
  { field: 'responsable', headerName: 'Responsable', width: 200 },
  { field: 'affectation', headerName: 'Lieu d\'affectation', width: 200 },
  { field: 'etat', headerName: 'Etat', width: 100 },
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
  { id: 1, date: '2019-03-12', identification: 'test_numero', name: 'test_nom', responsable: 'test_responsable', affectation: 'test_affectation', etat: 'test_etat' },
  { id: 2, date: '2019-03-12', identification: 'test_numero', name: 'test_nom', responsable: 'test_responsable', affectation: 'test_affectation', etat: 'test_etat' },
  { id: 3, date: '2019-03-12', identification: 'test_numero', name: 'test_nom', responsable: 'test_responsable', affectation: 'test_affectation', etat: 'test_etat' },
  { id: 4, date: '2019-03-12', identification: 'test_numero', name: 'test_nom', responsable: 'test_responsable', affectation: 'test_affectation', etat: 'test_etat' },
  { id: 5, date: '2019-03-12', identification: 'test_numero', name: 'test_nom', responsable: 'test_responsable', affectation: 'test_affectation', etat: 'test_etat' },
  { id: 6, date: '2019-03-12', identification: 'test_numero', name: 'test_nom', responsable: 'test_responsable', affectation: 'test_affectation', etat: 'test_etat' },
  { id: 7, date: '2019-03-12', identification: 'test_numero', name: 'test_nom', responsable: 'test_responsable', affectation: 'test_affectation', etat: 'test_etat' },

];


function PersonnalTools() {

  const breadcrumbs = [
    <Typography key="1">
      Outillage
    </Typography>,
    <Typography key="2">
      Outillage Personnel
    </Typography>,
  ];

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Outillage Personnel
        <Typography variant="h4" sx={{ px: 5, mt: 2, ml: -5, mb: 2 }}>
          Outillage
        </Typography>
        <Stack spacing={2}>
          <Breadcrumbs separator="." aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>

        {/* <Link to='/employee/new-dailyemployee'>
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
        </Link> */}
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

export default PersonnalTools