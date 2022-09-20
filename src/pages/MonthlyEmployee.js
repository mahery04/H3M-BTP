import React, { useState, useEffect } from 'react';

import { Button, Paper, Container, Typography, Box, Stack, Chip, Link } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import moment from 'moment';
import swal from '@sweetalert/with-react';

import monthlyEmployeeService from '../services/monthlyEmployeeService';
import Label from '../components/Label';

function MonthlyEmployee() {

  const notification = () => {
    let url = window.location.href
    let param = url.split('?')
    if(param[1] == 'inserted') {
      swal("", "Employé inseré avec succés!", "success");
    } else if(param[1] == 'deleted') {
      swal("", "Employé supprimé avec succés!", "success");
    } else if(param[1] == 'updated') {
      swal("", "Employé modifié avec succés!", "success");
    }
  }
  notification()

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
    { field: 'id',            headerName: 'Id',               width: 50 },
    { field: 'matricule',     headerName: 'Matricule',        width: 100 },
    { field: 'firstname',     headerName: 'Nom',              width: 200 },
    { field: 'lastname',      headerName: 'Prénom',           width: 200 },
    { field: 'cin',           headerName: 'Numéro CIN',       width: 150, type: 'number' },
    { field: 'address',       headerName: 'Adresse',          width: 100 },
    { field: 'contact',       headerName: 'Contact',          width: 150 },
    { field: 'group',         headerName: 'Groupe',           width: 100 },
    { field: 'post_name',     headerName: 'Poste occupé',     width: 150 },
    { field: 'status',        headerName: 'Status',           width: 150, type: 'action',
      renderCell: (data) => {
        if (data.row.status==='Actif') {
          return( <Label variant="ghost" color='success'>Actif</Label> )
        } else if(data.row.status==='Démission') {
          return( <Label variant="ghost" color='error'>Démission</Label> )
        } else if (data.row.status === 'Congé') {
          return( <Label variant="ghost" color='warning'>Congé</Label> )
        }
      }},
    {field: 'tools',       headerName: 'Matériels empruntés', width: 150 ,type: 'action',
      renderCell: (data) => {
        return (
          <>
            <Stack direction="row">
              <Link underline="none" href={'/employee/toolsmonthlyemployee/' + data.id}>
                <Chip 
                  icon={<AddCircleIcon/>} 
                  label="Voir"
                  sx={{cursor:'pointer'}}
                  variant="outlined"
                  color="primary"
                />
              </Link>
            </Stack>
          </>
        )
      }},
    { field: 'code_chantier', headerName: 'Code Chantier',    width: 150 },
    { field: 'category',      headerName: 'Categorie',        width: 100 },
    { field: 'hiring_date',   headerName: 'Date d\'embauche', width: 150 },
    { field: 'motif',         headerName: 'Motif',            width: 80, type: 'action', 
      renderCell: (data) => {
        if (data.row.motif)
        return (
          <Tooltip title={data.row.motif}>
            <InfoIcon sx={{ color: 'grey' }}/>
          </Tooltip>
        )
      }},
    { field: 'ostie_num',     headerName: 'Ostie',            width: 150 },
    { field: 'cnaps_num',     headerName: 'CNAPS',            width: 150 },
    { field: 'action',        headerName: 'Action',           width: 70, type: 'action',
      renderCell: (data) => {
        return (
          <>
            <Link href={'/employee/updatemonthlyemployee/' + data.id}>
              <IconButton component="label">
                <EditIcon />
              </IconButton>
            </Link>
          </>
        )
      }},
  ];
  
  const rows = monthlyemployees.map(monthlyemployee => ({ 
    id:           monthlyemployee.monthlyemployee_id, 
    matricule:    monthlyemployee.matricule, 
    firstname:    monthlyemployee.firstname, 
    lastname:     monthlyemployee.lastname, 
    cin:          monthlyemployee.cin, 
    address:      monthlyemployee.address, 
    contact:      monthlyemployee.contact,
    group:        monthlyemployee.group,
    post_name:    monthlyemployee.post_name, 
    status:       monthlyemployee.status, 
    code_chantier:monthlyemployee.code_chantier, 
    category:     monthlyemployee.category, 
    hiring_date:  moment(monthlyemployee.hiring_date).format('YYYY-MM-DD'),
    motif:        monthlyemployee.motif,
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

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Listes des employé(e)s mensuels
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