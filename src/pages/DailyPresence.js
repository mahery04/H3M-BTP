import React, { useState,useEffect } from 'react'

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { GridToolbar } from '@mui/x-data-grid-premium';

import dailyEmployeeService from '../services/dailyEmployeeService';


const DailyPresence = () => {

    const [dailyemployees, setDailyemployees] = useState([]);

    const getDailyemployees = () => {
        dailyEmployeeService.getAll().then((res) => {
          setDailyemployees(res.data)
        }).catch(err => {
          console.log(err)
        })
    }

    useEffect(() => {
        getDailyemployees()
    },[])

    const columns = [
        { field: 'matricule',   headerName: 'Matricule',        width: 250 },
        { field: 'firstname',   headerName: 'Nom',              width: 250 },
        { field: 'lastname',    headerName: 'Prénom',           width: 250 },
        { field: 'action',      headerName: 'Action',           width: 250, type: 'actions',
          renderCell: (data) => {
            return (
              <>
                <Button 
                    variant="contained" 
                    sx={{backgroundColor:'#11E893'}}
                    href={'/presence/employeepresence/' + data.id}
                >
                    Voir présence
                </Button>
              </>
            )
          }
        },
    ];

    const rows = dailyemployees.map(dailyemployee => ({ 
        id:           dailyemployee.dailyemployee_id, 
        matricule:    dailyemployee.matricule, 
        firstname:    dailyemployee.firstname, 
        lastname:     dailyemployee.lastname, 
      }))
    
    return (
        <div>
            <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
                Présence des employés
            </Typography>
            <Container>
                <Paper sx={{ width: '95%', overflow: 'hidden' }}>
                    <Box sx={{ height: 450, width: '100%' }}>
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

export default DailyPresence