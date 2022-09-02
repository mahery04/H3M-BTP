import React, { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { Link } from 'react-router-dom';

import dailyEmployeeService from '../services/dailyEmployeeService';

function DailyPresence() {

  const [dailyEmployees, setDailyemployees] = useState([]);

  const getDailyemployees = () => {
    dailyEmployeeService.getAll().then((res) => {
      setDailyemployees(res.data)
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getDailyemployees()
  }, [])
  

  const columns = [
    { field: 'id', headerName: 'Id', width: 150 },
    { field: 'matricule', headerName: 'Matricule', width: 200 },
    { field: 'firstname', headerName: 'Nom', width: 250 },
    { field: 'lastname', headerName: 'Prénom', width: 250 },
    { field: 'contact', headerName: 'Contact', width: 250 },
    { field: 'post_name', headerName: 'Post occupé', width: 250 },
    { field: 'action', headerName: 'Action', width: 150, type: 'action',
      renderCell: (data) => {
        return (
          <>
            <Link to={'/presence/newdailypresence/' + data.id}>
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

  const rows = dailyEmployees.map(dailyEmployee => ({
    id: dailyEmployee.dailyemployee_id,
    matricule: dailyEmployee.matricule,
    firstname: dailyEmployee.firstname,
    lastname: dailyEmployee.lastname,
    contact: dailyEmployee.contact,
    post_name: dailyEmployee.post_name
  }))

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Présence des employés
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

export default DailyPresence