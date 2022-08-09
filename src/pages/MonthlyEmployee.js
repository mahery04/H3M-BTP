import React, { useState, useEffect } from 'react';

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
import moment from 'moment';
import swal from '@sweetalert/with-react';

import monthlyEmployeeService from '../services/monthlyEmployeeService';


function MonthlyEmployee() {

  const [monthlyemployees, setMonthlyemployees] = useState([])

  const getMonthlyEmployees = () => {
    monthlyEmployeeService.getAll().then((res) => {
      setMonthlyemployees(res.data)
    }).catch(err => {
      console.log(err)
    }) 
  }

  useEffect(() => {
    getMonthlyEmployees()
  },[])

  const columns = [
    { field: 'id',          headerName: 'Id',               width: 100 },
    { field: 'matricule',   headerName: 'Matricule',        width: 100 },
    { field: 'firstname',   headerName: 'Nom',              width: 200 },
    { field: 'lastname',    headerName: 'Prénom',           width: 200 },
    { field: 'cin',         headerName: 'Numéro CIN',       width: 200, type: 'number' },
    { field: 'address',     headerName: 'Adresse',          width: 200 },
    { field: 'contact',     headerName: 'Contact',          width: 200 },
    { field: 'post',        headerName: 'Poste occupé',     width: 200 },
    { field: 'category',    headerName: 'Categorie',        width: 200 },
    { field: 'hiring_date', headerName: 'Date d\'embauche', width: 150 },
    { field: 'ostie_num',   headerName: 'Ostie',            width: 200 },
    { field: 'cnaps_num',   headerName: 'CNAPS',            width: 200 },
    { field: 'action',      headerName: 'Action',           width: 150, type: 'actions',
    renderCell: (data) => {
      return (
        <>
          <Link to={'/employee/updatemonthlyemployee/' + data.id}>
            <IconButton component="label">
              <EditIcon />
            </IconButton>
          </Link>
          
          <IconButton component="label" onClick={() => deleteMonthlyemployee(data.id)}>
            <DeleteIcon />
          </IconButton>

        </>
      )
    }
    },
  
  ];
  
  const rows = monthlyemployees.map(monthlyemployee => ({ 
    id:           monthlyemployee.monthlyemployee_id, 
    matricule:    monthlyemployee.matricule, 
    firstname:    monthlyemployee.firstname, 
    lastname:     monthlyemployee.lastname, 
    cin:          monthlyemployee.cin, 
    address:      monthlyemployee.address, 
    contact:      monthlyemployee.contact, 
    post:         monthlyemployee.post, 
    category:     monthlyemployee.category, 
    hiring_date:  moment(monthlyemployee.hiring_date).format('YYYY-MM-DD'),
    ostie_num:    monthlyemployee.ostie_num,
    cnaps_num:    monthlyemployee.cnaps_num,
  }))

  const deleteMonthlyemployee = (id) => {
    swal({
      text: "Supprimer l'employé de la liste ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if(willDelete) { 
        monthlyEmployeeService.remove(id)
        const newTabList = monthlyemployees.filter((monthlyemployee) => monthlyemployee.id !== id)
        setMonthlyemployees(newTabList)
        document.location.reload(true)
      }
    });
  }

  const breadcrumbs = [
    <Typography key="1">
      Employé(e)s
    </Typography>,
    <Typography key="2">
      Employées Mensuels
    </Typography>,
  ];

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Employées Mensuels
        <Typography variant="h4" sx={{ px: 5, mt: 2, ml: -5, mb: 2 }}>
          Employé(e)s
        </Typography>
        <Stack spacing={2}>
          <Breadcrumbs separator="." aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>

        
          <Button
            size="medium"
            variant="outlined"
            color="primary"
            sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
            startIcon={<AddIcon />}
            href="/employee/new-monthlyemployee"
          >
            Nouveau employé
          </Button>
      
      </Typography>

      <Container maxWidth="xxl">

        <Paper sx={{ width: '95%', overflow: 'hidden' }}>
          <Box sx={{ height: 520, width: '100%' }}>
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

export default MonthlyEmployee