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

import MonthlyPresenceService from '../services/monthlyPresenceService'
import moment from 'moment';

const MonthlyPresence = () => {

  const navigate = useNavigate()
  const [monthlyPresences, setMonthlyPresences] = useState([])

  const getMonthlyPresences = () => {
    MonthlyPresenceService.getAll().then((res) => {
      setMonthlyPresences(res.data)
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getMonthlyPresences()
  }, [])

  const deletePresence = (id) => {
    swal({
      text: "Supprimer la présence ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          MonthlyPresenceService.remove(id)
          const newTabList = monthlyPresences.filter(monthlyPresence => monthlyPresence.monthlypresence_id !== id)
          setMonthlyPresences(newTabList)
          navigate('/presence/monthlypresence/?deleted')
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
    { field: 'absence_reason', headerName: 'Motif d\'absence', width: 150,
      renderCell: (data) => {
        if (data.row.absence_reason)
        return (
          <Tooltip title={data.row.absence_reason}>
            <InfoIcon sx={{ color: 'grey' }}/>
          </Tooltip>
        )
      }  
    },
    { field: 'start_date', headerName: 'Date de départ', width: 150 },
    { field: 'return_date', headerName: 'Date de retour', width: 150 },
    { field: 'number_days_absence', headerName: 'Nombre de jour d\'absence', width: 200 },
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
          return (
            <>
              <Link href={'/presence/updatemonthlypresence/' + data.id}>
                <IconButton component="label">
                  <EditIcon />
                </IconButton>
              </Link>
              <IconButton component="label">
                <CheckCircleIcon sx={{ color: "green" }} />
              </IconButton>
              <IconButton component="label" onClick={() => deletePresence(data.id)}>
                <DeleteIcon sx={{ color: "red" }} />
              </IconButton>
            </>
          )
        } else {
          return (
            <>
              <Link href={'/conge/update-conge/' + data.id}>
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

  const rows = monthlyPresences.map(monthlyEmployee => ({
    id: monthlyEmployee.monthlyemployee_id,
    matricule: monthlyEmployee.matricule,
    firstname: monthlyEmployee.firstname,
    lastname: monthlyEmployee.lastname,
    hiring_date:monthlyEmployee.hiring_date,
    post_occupe: monthlyEmployee.post_occupe,
    category: monthlyEmployee.category,
    group: monthlyEmployee.group,
    absence_reason: monthlyEmployee.absence_reason,
    start_date: moment(monthlyEmployee.start_date).format("DD-MM-YYYY"),
    return_date: moment(monthlyEmployee.return_date).format("DD-MM-YYYY"),
    number_days_absence: monthlyEmployee.number_days_absence,
    visa_rh: monthlyEmployee.visa_rh,
    approval_direction: monthlyEmployee.approval_direction
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
          startIcon={<AddIcon />}
          href='/presence/newmonthlypresence'
        >
          Nouvelle présence
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