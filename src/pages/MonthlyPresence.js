import React, { useEffect, useState } from 'react';

import { Typography, Paper, Container, Box, Button } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { Link } from 'react-router-dom';

import MonthlyEmployeeService from '../services/monthlyEmployeeService'

const MonthlyPresence = () => {

  const [monthlyEmployees, setMonthlyemployees] = useState([])

  const getMonthlyEmployees = () => {
    MonthlyEmployeeService.getAll().then((res) => {
      setMonthlyemployees(res.data)
      console.log(res.data)
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getMonthlyEmployees()
  }, [])

  const columns = [
    // { field: 'id', headerName: 'Id', width: 150 },
    { field: 'matricule', headerName: 'Matricule',    width: 100 },
    { field: 'firstname', headerName: 'Nom',          width: 200 },
    { field: 'lastname',  headerName: 'Prénom',       width: 200 },
    { field: 'contact',   headerName: 'Contact',      width: 150 },
    { field: 'post_name', headerName: 'Post occupé',  width: 100 },
    { field: 'action',    headerName: 'Action',       width: 150, type: 'action',
      renderCell: (data) => {
        return (
          <>
            <Link to={'/presence/newmonthlypresence/' + data.id}>
            <Button 
              variant="outlined" 
              size="medium"
            >
              Voir présence
            </Button>
            </Link>
          </>
        )
      }
    },
  ];

  const rows = monthlyEmployees.map(monthlyEmployee => ({
    id:         monthlyEmployee.monthlyemployee_id,
    matricule:  monthlyEmployee.matricule,
    firstname:  monthlyEmployee.firstname,
    lastname:   monthlyEmployee.lastname,
    contact:    monthlyEmployee.contact,
    post_name:  monthlyEmployee.post_name
  }))

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Présence des employés mensuels
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
          startIcon={<VisibilityIcon />}
          href='/employee/new-dailyemployee'
        >
          Vue global
        </Button>
      </Typography>

      <Container maxWidth="xxl">
        <Paper sx={{ width: '95%', overflow: 'hidden' }}>
          <Box sx={{ height: 450, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </Box>
        </Paper>
      </Container>
    </div>
  )
}

export default MonthlyPresence