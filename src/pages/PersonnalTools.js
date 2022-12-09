import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Paper, Container, Typography, Box, Stack, Chip, Tooltip,Link } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleIcon from '@mui/icons-material/AddCircle';


// import { Link } from 'react-router-dom';

import moment from 'moment'
import swal from '@sweetalert/with-react';

import personnalToolsService from '../services/personnalToolsService'
import trashService from '../services/trashService';
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
    // { field: 'historical_tool', headerName: 'Historique du matériel', width: 200, type: 'action',
    //   renderCell: (data) => {
    //     return (
    //       <>
    //         <Stack direction="row">
    //           <Link underline="none" href={'/history/tool/' + data.id}>
    //             <Chip 
    //               icon={<AddCircleIcon/>} 
    //               label="Voir historique"
    //               sx={{cursor:'pointer'}}
    //               variant="outlined"
    //               color="warning"
    //             />
    //           </Link>
    //         </Stack>
    //       </>
    //     )
    //   }
    // }, 
    {
      field: 'action', headerName: 'Action', width: 200, type: 'action',
      renderCell: (data) => {
        if (userInfo.role_id === 1) {
          return (
            <>
              <Link underline="none" href={'/tools/updatepersonnal/' + data.id}>
                <IconButton component="label">
                  <EditIcon />
                </IconButton>
              </Link>
  
              <IconButton component="label" onClick={() => deleteTool(data.row)}>
                <DeleteIcon />
              </IconButton>
            </>
          )         
        } else {
          return (
            <>
              <Link underline="none" href={'/tools/updatepersonnal/' + data.id}>
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
    // etat: personnaltool.etat,
    // historical: personnaltool.historical,
  }))


  const deleteTool = (data) => {
    swal({
      text: "Supprimer le matériel de la liste ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        var sendDeleteToolToTrash = {
          tool_id: data.id,
          purchase_date: moment(data.purchase_date).format("YYYY-MM-DD"),
          identification_number: data.identification_number,
          article_name: data.article_name,
          statue: data.statue,
        }
        trashService.create(sendDeleteToolToTrash)
        personnalToolsService.remove(data.id)
         const newTabList = personnaltools.filter((personnaltool) => personnaltool.tool_id !== data.id)
        setPersonnaltools(newTabList)
        navigate('/tools/personnal?deleted')
      }
    });
  }

  
  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Listes des outils
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, width: 250, marginLeft: '70%' }}
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