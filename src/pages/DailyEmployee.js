import React, { useEffect, useState } from 'react';

import { Button, Paper, Container, Chip, Stack, Box, Typography, Link, Modal } from '@mui/material'
import Tooltip from '@mui/material/Tooltip';

import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

import { GridToolbar } from '@mui/x-data-grid-premium';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';

import moment from 'moment'
import swal from '@sweetalert/with-react';

import dailyEmployeeService from '../services/dailyEmployeeService';
import Label from '../components/Label';

function DailyEmployee() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const notification = () => {
    let url = window.location.href
    let param = url.split('?')
    if(param[1] === 'inserted') {
      swal("", "Employé inseré avec succés!", "success");
    } else if(param[1] === 'deleted') {
      swal("", "Employé supprimé avec succés!", "success");
    } else if(param[1] === 'updated') {
      swal("", "Employé modifié avec succés!", "success");
    }
  }
  notification()

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
    { field: 'id', headerName: 'Id', width: 50 },
    { field: 'matricule', headerName: 'Matricule', width: 100 },
    { field: 'firstname', headerName: 'Nom', width: 200 },
    { field: 'lastname', headerName: 'Prénom', width: 200 },
    { field: 'cin', headerName: 'Numéro CIN', width: 150, type: 'number' },
    { field: 'address', headerName: 'Adresse', width: 200 },
    { field: 'contact', headerName: 'Contact', width: 150 },
    { field: 'post_name', headerName: 'Poste occupé', width: 150 },
    { field: 'code_chantier', headerName: 'Code Chantier', width: 150 },
    { field: 'group', headerName: 'Groupe', width: 100 },
    { field: 'category', headerName: 'Catégorie', width: 100 },
    { field: 'hiring_date', headerName: 'Date d\'embauche', width: 150, 
      renderCell: (data) => {
        if (data.row.hiring_date) {
          return moment(data.row.hiring_date).format('YYYY-MM-DD') 
        }
      }
    },
    {
      field: 'contrat', headerName: 'Contrat', width: 150, type: 'action',
      renderCell: (data) => {
        return (
          <>
            <Stack direction="row">
              <Link underline="none" href={'/employee/contrat-daily-employee/' + data.id}>
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
      field: 'status', headerName: 'Status', width: 150,
      renderCell: (data) => {
        if (data.row.status==='Actif') {
          return( <Label variant="ghost" color='success'>Actif</Label> )
        } else if(data.row.status==='Démission') {
          return( <Label variant="ghost" color='error'>Démission</Label> )
        }
      }
    },
    {
      field: 'tools', headerName: 'Matériels empruntés', width: 150, type: 'action',
      renderCell: (data) => {
        return (
          <>
            <Stack direction="row">
              <Link underline="none" href={'/employee/toolsdailyemployee/' + data.id}>
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
    {
      field: 'remarque', headerName: 'Remarque', width: 100, type: 'action',
      renderCell: (data) => {
        if (data.row.remarque)
        return (
          <Tooltip title={data.row.remarque}>
            <InfoIcon sx={{ color: 'grey' }}/>
          </Tooltip>
        )
      }},
    {
      field: 'action', headerName: 'Action', width: 100, type: 'action',
      renderCell: (data) => {
        return (
          <>
            <Link href={'/employee/updatedailyemployee/' + data.id}>
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
    post_name:    dailyemployee.post_name, 
    code_chantier:dailyemployee.code_chantier,
    group:        dailyemployee.group,
    category:     dailyemployee.category, 
    hiring_date:  dailyemployee.hiring_date,
    type_contrat: dailyemployee.type_contrat,
    evaluation:   dailyemployee.evaluation,
    start_date:   dailyemployee.start_date,
    start_motif:  dailyemployee.start_motif,
    status:       dailyemployee.status,
    sanction:     dailyemployee.sanction,
    remarque:     dailyemployee.remarque
  }))

  const navigate = useNavigate()

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
        const newTabList = dailyemployees.filter((dailyemployee) => dailyemployee.dailyemployee_id !== id)
        setDailyemployees(newTabList)
        // document.location.reload(true)
        navigate('/employee/dailyemployee?deleted')
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
              disableSelectionOnClick
            />
          </Box>
        </Paper>
      </Container>
    </div>
  )
}

export default DailyEmployee