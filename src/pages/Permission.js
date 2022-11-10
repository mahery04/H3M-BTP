import React, { useEffect, useState } from 'react';

import { Typography, Paper, Container, Box, Button, Link, Tooltip, IconButton } from '@mui/material';


import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import swal from '@sweetalert/with-react';
import { useNavigate } from 'react-router-dom';

import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Label from '../components/Label';
import moment from 'moment';

import permissionService from '../services/permissionService';

const Permission = () => {

  const navigate = useNavigate()
  const [permissions, setPermissions] = useState([])

  const getpermissions = () => {
    permissionService.getAll().then((res) => {
      setPermissions(res.data)
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getpermissions()
  }, [])

  const deletePermission = (id) => {
    swal({
      text: "Supprimer cette permission ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          permissionService.remove(id)
          const newTabList = permissions.filter(permission => permission.permission_id !== id)
          setPermissions(newTabList)
          navigate('/conge/permission/?deleted')
        }
      });
  }

  const updateValidation = (id) => {
    swal({
      text: "Voulez-vous vraiment valider ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((validate) => {     
      if (validate) {
        permissionService.validation(id)
        // const valide = views.filter(view => view.permission_id)
        // console.log("VAL", valide.validation);
        // isDisabled = true
        window.location.reload()
      }
    });
  }

  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

  const columns = [
    // { field: 'id', headerName: 'Id', width: 150 },
    { field: 'matricule', headerName: 'Matricule', width: 100 },
    { field: 'firstname', headerName: 'Nom', width: 200 },
    { field: 'lastname', headerName: 'Prénom', width: 200 },
    { field: 'hiring_date', headerName: 'Date d\'embauche', width: 150,
      renderCell: (data) => {
        if (data.row.hiring_date)
        return moment(data.row.hiring_date).format("DD-MM-YYYY")
      }  
    },
    { field: 'post_occupe', headerName: 'Post occupé', width: 150 },
    { field: 'category', headerName: 'Catégorie', width: 150 },
    { field: 'group', headerName: 'Groupe', width: 150 },
    { field: 'permission_reason', headerName: 'Motif de permission', width: 150,
      renderCell: (data) => {
        if (data.row.permission_reason)
        return (
          <Tooltip title={data.row.permission_reason}>
            <InfoIcon sx={{ color: 'grey' }}/>
          </Tooltip>
        )
      }  
    },
    { field: 'start_time', headerName: 'Heure de départ', width: 150 },
    { field: 'return_time', headerName: 'Heure de retour', width: 150 },
    { field: 'number_time_permission', headerName: 'Nombre d\'heure de permission', width: 250 },
    { field: 'permission_before_request', headerName: 'Solde permission avant demande', width: 300 },
    { field: 'new_solde_permission', headerName: 'Nouveau solde permission', width: 250 },
    { field: 'visa_rh', headerName: 'Visa RH', width: 150,
      renderCell: (data) => {
        if (data.row.visa_rh === 'En attente') {
          return ( <Label variant="ghost" color='warning'>{data.row.visa_rh}</Label> )
        } else if(data.row.visa_rh === 'Accordé') {
          return ( <Label variant="ghost" color='success'>{data.row.visa_rh}</Label> )
        } else if (data.row.visa_rh === 'Non accordé') {
          return ( <Label variant="ghost" color='error'>{data.row.visa_rh}</Label> )
        }
      }
    },
    {
      field: 'approval_direction', headerName: 'Approbation direction', width: 200,
      renderCell: (data) => {
        if (data.row.approval_direction === 'NON VALIDE') {
          return ( <Label variant="ghost" color='error'>{data.row.approval_direction}</Label> )
        } else if(data.row.approval_direction === 'VALIDE') {
          return ( <Label variant="ghost" color='success'>{data.row.approval_direction}</Label> )
        }
      }
    },
    {
      field: 'action', headerName: 'Action', width: 250, type: 'action',
        renderCell: (data) => {
          if (userInfo.role_id === 1) {
            if (data.row.approval_direction === "VALIDE") {
              return (
                <>
                  <Link href={'/conge/update-permission/' + data.id}>
                    <IconButton component="label">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton component="label">
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton component="label" onClick={() => deletePermission(data.id)}>
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
                </>
              )
            } else {
              return (
                <>
                  <Link href={'/conge/update-permission/' + data.id}>
                    <IconButton component="label">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton component="label" onClick={() => updateValidation(data.id)}>
                    <CheckCircleIcon sx={{ color: "green" }} />
                  </IconButton>
                  <IconButton component="label" onClick={() => deletePermission(data.id)}>
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
                </>
              )
            }
          } else {
            return (
              <>
                <Link href={'/conge/update-permission/' + data.id}>
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

  const rows = permissions.map(permission => ({
    id: permission.permission_id,
    matricule: permission.matricule,
    firstname: permission.firstname,
    lastname: permission.lastname,
    hiring_date:permission.hiring_date,
    post_occupe: permission.post_occupe,
    category: permission.category,
    group: permission.group,
    permission_reason: permission.permission_reason,
    start_time: permission.start_time,
    return_time: permission.return_time,
    number_time_permission: permission.number_time_permission,
    permission_before_request: permission.permission_before_request,
    new_solde_permission: permission.new_solde_permission,
    visa_rh: permission.visa_rh,
    approval_direction: permission.approval_direction
  }))




  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Permission des employé(e)s
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
          startIcon={<AddIcon />}
          href='/conge/new-permission'
        >
          Nouvelle permission
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

export default Permission