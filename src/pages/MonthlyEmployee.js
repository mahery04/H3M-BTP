import React, { useState, useEffect } from 'react';

import { Button, Paper, Container, Typography, Box, Stack, Chip, Link, Modal } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import moment from 'moment';
import swal from '@sweetalert/with-react';

import monthlyEmployeeService from '../services/monthlyEmployeeService';
import Label from '../components/Label';

function MonthlyEmployee() {

  const [open, setOpen] = React.useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const notification = () => {
    let url = window.location.href
    let param = url.split('?')
    if(param[1] == 'inserted') {
      swal("", "Employé mensuel inseré avec succés!", "success");
    } else if(param[1] == 'deleted') {
      swal("", "Employé mensuel supprimé avec succés!", "success");
    } else if(param[1] == 'updated') {
      swal("", "Employé mensuel modifié avec succés!", "success");
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

  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

  const columns = [
    // { field: 'id', headerName: 'Id', width: 50 },
    { field: 'matricule', headerName: 'Matricule', width: 100 },
    { field: 'firstname', headerName: 'Nom', width: 200 },
    { field: 'lastname', headerName: 'Prénom', width: 200 },
    { field: 'cin', headerName: 'Numéro CIN', width: 150, type: 'number' },
    { field: 'address', headerName: 'Adresse', width: 200 },
    { field: 'contact', headerName: 'Contact', width: 150 },
    { field: 'group', headerName: 'Groupe', width: 200 },
    { field: 'post_occupe', headerName: 'Poste occupé', width: 150 },
    { field: 'salary', headerName: 'Salaire', width: 150,
      renderCell: (data) => {
        if (data.row.salary) {
          return data.row.salary + " Ar"
        }
      }
    },
    { field: 'code_chantier', headerName: 'Code Chantier', width: 150 },
    { field: 'category', headerName: 'Catégorie', width: 100 },
    {
      field: 'hiring_date', headerName: 'Date d\'embauche', width: 150,
      renderCell: (data) => {
        if (data.row.hiring_date) {
          return moment(data.row.hiring_date).format('DD-MM-YYYY')
        }
      }
    },
    {
      field: 'contrat', headerName: 'Contrat', width: 150, type: 'action',
        renderCell: (data) => {
          return (
            <>
              <Stack direction="row">
                <Link underline="none" href={'/employee/contrat-monthly-employee/' + data.id}>
                  <Chip 
                    icon={<AddCircleIcon/>} 
                    label="Voir contrat"
                    sx={{cursor:'pointer'}}
                    variant="outlined"
                    color="warning"
                  />
                </Link>
              </Stack>
            </>
          )
        }
    },
    {
      field: 'status', headerName: 'Status', width: 150, type: 'action',
      renderCell: (data) => {
        if (data.row.status === 'Actif') {
          return (<Label variant="ghost" color='success'>Actif</Label>)
        } else if (data.row.status === 'Démission') {
          return (<Label variant="ghost" color='error'>Démission</Label>)
        } //else if (data.row.status === 'Congé') {
          //return (<Label variant="ghost" color='warning'>Congé</Label>)
        // }
      }
    },
    {
      field: 'tools', headerName: 'Matériels empruntés', width: 150, type: 'action',
      renderCell: (data) => {
        return (
          <>
            <Stack direction="row">
              <Link underline="none" href={'/employee/toolsmonthlyemployee/' + data.id}>
                <Chip
                  icon={<AddCircleIcon />}
                  label="Voir"
                  sx={{ cursor: 'pointer' }}
                  variant="outlined"
                  color="primary"
                />
              </Link>
            </Stack>
          </>
        )
      }
    },
    // {
    //   field: 'motif', headerName: 'Motif', width: 80, type: 'action',
    //   renderCell: (data) => {
    //     if (data.row.motif)
    //       return (
    //         <Tooltip title={data.row.motif}>
    //           <InfoIcon sx={{ color: 'grey' }} />
    //         </Tooltip>
    //       )
    //   }
    // },
    { field: 'ostie_num', headerName: 'Numéro Ostie', width: 150 },
    { field: 'cnaps_num', headerName: 'Numéro CNAPS', width: 150 },
    { field: 'par', headerName: 'Fait par', width: 250 },
    {
      field: 'action', headerName: 'Action', width: 150, type: 'action',
      renderCell: (data) => {
        if (userInfo.role_id === 1) {
          return (
            <>
              <Link href={'/employee/updatemonthlyemployee/' + data.id}>
                <IconButton component="label">
                  <EditIcon />
                </IconButton>
              </Link>
              <IconButton component="label" onClick={() => deleteMonthlyemployee(data.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          )
        } else {
          return (
            <>
              <Link href={'/employee/updatemonthlyemployee/' + data.id}>
                <IconButton component="label">
                  <EditIcon />
                </IconButton>
              </Link>
            </>
          )
        }
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
    group:        monthlyemployee.group,
    post_occupe:  monthlyemployee.post_occupe,
    salary:       monthlyemployee.salary, 
    status:       monthlyemployee.status, 
    code_chantier:monthlyemployee.code_chantier, 
    category:     monthlyemployee.category, 
    hiring_date:  monthlyemployee.hiring_date,
    ostie_num:    monthlyemployee.ostie_num,
    cnaps_num:    monthlyemployee.cnaps_num,
    par: monthlyemployee.par
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
              disableSelectionOnClick
            />
          </Box>
        </Paper>
      </Container>
    </div>
  )
}

export default MonthlyEmployee