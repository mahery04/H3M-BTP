import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import moment from 'moment'
import swal from '@sweetalert/with-react';

import dailyEmployeeService from '../services/dailyEmployeeService'


function DailyEmployee() {

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
    { field: 'action',      headerName: 'Action',           width: 150, type: 'actions',
      renderCell: (data) => {
        return (
          <>
            <Link to={'/employee/updatedailyemployee/' + data.id}>
              <IconButton component="label">
                <EditIcon />
              </IconButton>
            </Link>
            
            <IconButton component="label" onClick={() => deleteDailyemployee(data.id)}>
              <DeleteIcon />
            </IconButton>

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
    cin:          dailyemployee.cin, 
    address:      dailyemployee.address, 
    contact:      dailyemployee.contact, 
    post:         dailyemployee.post, 
    category:     dailyemployee.category, 
    hiring_date:  moment(dailyemployee.hiring_date).format('YYYY-MM-DD')
  }))

  const deleteDailyemployee = (id) => {
    swal({
      text: "Supprimer l'employé de la liste ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if(willDelete) { 
        dailyEmployeeService.remove(id)
        const newTabList = dailyemployees.filter((dailyemployee) => dailyemployee.id !== id)
        setDailyemployees(newTabList)
        document.location.reload(true)
      }
    });
  }

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Listes des employé(e)s journaliers
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
          startIcon={<AddIcon />}
          href='/employee/new-dailyemployee'
        >
          Nouveau employé
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