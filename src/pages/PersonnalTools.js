import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Paper, Container, Typography, Box, Tooltip } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import { Link } from 'react-router-dom';

import moment from 'moment'
import swal from '@sweetalert/with-react';

import personnalToolsService from '../services/personnalToolsService'
import Label from '../components/Label';



function PersonnalTools() {

  const notification = () => {
    let url = window.location.href
    let param = url.split('?')
    if (param[1] === 'inserted') {
      swal("", "Outil inseré avec succés!", "success");
    } else if (param[1] === 'deleted') {
      swal("", "Outil supprimé avec succés!", "success");
    } else if (param[1] === 'updated') {
      swal("", "Outil modifié avec succés!", "success");
    }
  }
  notification()

  const navigate = useNavigate()

  const [personnaltools, setPersonnaltools] = useState([])

  const getPersonnalTools = () => {
    personnalToolsService.getAll().then((res) => {
      setPersonnaltools(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getPersonnalTools()
  }, [])

  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

  const columns = [
    {
      field: 'purchase_date', headerName: 'Date d\'achat', width: 150,
      renderCell: (data) => {
        if (data.row.purchase_date) {
          return moment(data.row.purchase_date).format('DD-MM-YYYY')
        }
      }
    },
    { field: 'identification_number', headerName: 'Numéro d\'identification', width: 200 },
    { field: 'vendor', headerName: 'Fournisseur', width: 150 },
    { field: 'invoice_number', headerName: 'Numéro de facture', width: 150 },
    { field: 'article_name', headerName: 'Nom de l\'article', width: 200 },
    {
      field: 'statue', headerName: 'Etat', width: 80, type: 'action',
      renderCell: (data) => {
        if (data.row.statue === 'Nouveau') {
          return (<Label variant="ghost" color='success'>Nouveau</Label>)
        } else if (data.row.statue === 'Occasion') {
          return (<Label variant="ghost" color='warning'>Occasion</Label>)
        }
      }
    },
    { field: 'material_number', headerName: 'Nombre de matériel', width: 150, type: 'number' },
    { field: 'historical', headerName: 'Lieu d\'affectation', width: 150, 
      renderCell: (data) => {
        if (data.row.historical)
        return (
          <Tooltip title={data.row.historical}>
            <InfoIcon sx={{ color: 'grey' }}/>
          </Tooltip>
        )
      }
    },
    // { field: 'assignation_place', headerName: 'Lieu d\'affectation', width: 150, type: 'number' },
    {
      field: 'action', headerName: 'Action', width: 200, type: 'actions',
      renderCell: (data) => {
        if (userInfo.role_id === 1) {
          return (
            <>
              <Link to={'/tools/updatepersonnal/' + data.id}>
                <IconButton component="label">
                  <EditIcon />
                </IconButton>
              </Link>
  
              <IconButton component="label" onClick={() => deleteTool(data.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          )         
        } else {
          return (
            <>
              <Link to={'/tools/updatepersonnal/' + data.id}>
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

  const rows = personnaltools.map(personnaltool => ({
    id: personnaltool.tool_id,
    purchase_date: personnaltool.purchase_date,
    identification_number: personnaltool.identification_number,
    vendor: personnaltool.vendor,
    invoice_number: personnaltool.invoice_number,
    article_name: personnaltool.article_name,
    // assignation_place: personnaltool.assignation_place,
    statue: personnaltool.statue,
    material_number: personnaltool.material_number,
    etat: personnaltool.etat,
    historical: personnaltool.historical,
  }))

  // for (let i = 0; i < 10; i += 1) {
  //   const bio = [];
  
  //   for (let j = 0; j < randomInt(3, 8); j += 1) {
  //     bio.push(personnaltools.historical)
  //   }
  // }


  const deleteTool = (id) => {
    swal({
      text: "Supprimer le matériel de la liste ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        personnalToolsService.remove(id)
        const newTabList = personnaltools.filter((personnaltool) => personnaltool.id !== id)
        setPersonnaltools(newTabList)
        navigate('/tools/personnal?deleted')
      }
    });
  }


  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Outillages Personnels
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
          startIcon={<AddIcon />}
          href='/tools/newpersonnaltool'
        >
          Nouveau outil
        </Button>
      </Typography>

      <Container maxWidth="xxl">

        <Paper sx={{ width: '95%', overflow: 'hidden' }}>
          <Box sx={{ height: 500, width: '100%' }}>
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

export default PersonnalTools