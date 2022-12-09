import React, { useEffect, useState } from 'react'

import { Button, Paper, Container, Typography, Box, Stack, Chip, Link, Modal } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { useNavigate } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import moment from 'moment';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import employeeFamilyService from '../services/employeeFamilyService'

const FamilyEmployee = () => {

  const notification = () => {
    let url = window.location.href
    let param = url.split('?')
    if(param[1] == 'inserted') {
      swal("", "Famille inserée avec succés!", "success");
    } else if(param[1] == 'deleted') {
      swal("", "Famille supprimée avec succés!", "success");
    } else if(param[1] == 'updated') {
      swal("", "Famille modifiée avec succés!", "success");
    }
  }
  notification()

  const [families, setFamilies] = useState([])

  const getEmployeeFamilies = () => {
    employeeFamilyService.getAll().then((res) => {
      setFamilies(res.data)
    }).catch(err => {
      console.log(err)
    }) 
  }

  useEffect(() => {
    getEmployeeFamilies()
  },[])

  const columns = [
    { field: 'matricule', headerName: 'Matricule', width: 100 },
    { field: 'firstname', headerName: 'Nom', width: 200 },
    { field: 'lastname', headerName: 'Prénom', width: 200 },
    { field: 'hiring_date', headerName: 'Date d\'embauche', width: 200,
      renderCell:(data) => {
        if (data.row.hiring_date) return moment(data.row.hiring_date).format('DD-MM-YYYY')
      }
    },
    { field: 'group', headerName: 'Groupe', width: 200 },
    { field: 'poste_occupe', headerName: 'Poste occupé', width: 200 },
    { field: 'address', headerName: 'Adresse', width: 200 },
    { field: 'contact', headerName: 'Contact', width: 200 },
    { field: 'name_conjoint', headerName: 'Nom du conjoint(e)', width: 200 },
    { field: 'number_child', headerName: 'Nombre d\'enfant', width: 200 },
    { field: 'action', headerName: 'Action', width: 200, type:'action',
      renderCell: (data) => {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        if (userInfo.role_id === 1) {
          return (
            <>
              <Link href={'/family/update/' + data.id}>
                <IconButton component="label">
                  <EditIcon />
                </IconButton>
              </Link>
              <IconButton component="label" onClick={() => deleteEmployeeFamily(data.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          )
        } else {
          return (
            <>
              <Link href={'/family/update/' + data.id}>
                <IconButton component="label">
                  <EditIcon />
                </IconButton>
              </Link>
            </>
          )
        }
      }
    },
  ]

  const rows = families.map(family=> ({
    id: family.family_id,
    matricule: family.matricule, 
    firstname: family.firstname, 
    lastname: family.lastname, 
    hiring_date: family.hiring_date, 
    group: family.group,
    post_occupe: family.post_occupe,
    address: family.address, 
    contact: family.contact,
    name_conjoint: family.name_conjoint,
    number_child: family.number_child,
  }))

  const navigate = useNavigate()

  const deleteEmployeeFamily = (id) => {
    swal({
      text: "Supprimer de la liste ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if(willDelete) { 
        employeeFamilyService.remove(id)
        const newTabList = families.filter((family) => family.family_id !== id)
        setFamilies(newTabList)
        // document.location.reload(true)
        navigate('/family/personnal?deleted')
      }
    });
  }

  return (
    <>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Listes des familles des employé(e)s
          <Button
            size="medium"
            variant="outlined"
            color="primary"
            sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
            startIcon={<AddIcon />}
            href="/family/new"
          >
            Nouveau famille
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
    </>
  )
}

export default FamilyEmployee