import React, { useEffect, useState } from 'react';

import { Typography, Paper, Container, Box, Button } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import HistoryIcon from '@mui/icons-material/History';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

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
    // { field: 'id', headerName: 'Id', width: 150 },
    { field: 'matricule', headerName: 'Matricule',    width: 100 },
    { field: 'firstname', headerName: 'Nom',          width: 200 },
    { field: 'lastname',  headerName: 'Prénom',       width: 200 },
    { field: 'contact',   headerName: 'Contact',      width: 150 },
    { field: 'post_name', headerName: 'Post occupé',  width: 100 },
    { field: 'action',    headerName: 'Action',       width: 200, type: 'action',
      renderCell: (data) => {
        return (
          <>
            <Link to={'/presence/dailypresence-history/' + data.id}>
              <Tooltip title="Historique">
                <IconButton component="label">
                  <HistoryIcon />
                </IconButton>
              </Tooltip>
            </Link>
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
    id:         dailyEmployee.dailyemployee_id,
    matricule:  dailyEmployee.matricule,
    firstname:  dailyEmployee.firstname,
    lastname:   dailyEmployee.lastname,
    contact:    dailyEmployee.contact,
    post_name:  dailyEmployee.post_name
  }))

  return (
    <>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Présence des employés journaliers
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
          startIcon={<VisibilityIcon />}
          href='/presence/dailypresence-view'
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
    </>
  )
}

export default DailyPresence