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

import personnalToolsService from '../services/personnalToolsService'


function PersonnalTools() {

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
  },[])

  const columns = [
    { field: 'purchase_date',         headerName: 'Date d\'achat',            width: 200 },
    { field: 'identification_number', headerName: 'Numéro d\'identification', width: 200 },
    { field: 'article_name',          headerName: 'Nom de l\'article',        width: 250 },
    { field: 'statue',                headerName: 'Etat',                     width: 200 },
    { field: 'material_number',       headerName: 'Nombre de matériel',       width: 200, type: 'number' },
    { field: 'action',                headerName: 'Action',                   width: 200, type: 'actions',
      renderCell: (data) => {
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
      }
    },
  
  ];
  
  const rows = personnaltools.map(personnaltool => ({
    id:                     personnaltool.tool_id,
    purchase_date:          moment(personnaltool.purchase_date).format('YYYY-MM-DD'),
    identification_number:  personnaltool.identification_number,
    article_name:           personnaltool.article_name,
    assignation_place:      personnaltool.assignation_place,
    statue:                 personnaltool.statue,
    material_number:        personnaltool.material_number,
    affectation_type:       personnaltool.affectation_type,
    responsable:            personnaltool.responsable,
    etat:                   personnaltool.etat,
    historical:             personnaltool.historical,
  }))

  const deleteTool = (id) => {
    swal({
      text: "Supprimer le matériel de la liste ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if(willDelete) { 
        personnalToolsService.remove(id)
        const newTabList = personnaltools.filter((personnaltool) => personnaltool.id !== id)
        setPersonnaltools(newTabList)
        document.location.reload(true)
      }
    });
  }

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Listes des outillages 
          <Button
            size="medium"
            variant="outlined"
            color="primary"
            sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
            startIcon={<AddIcon />}
            href='/tools/new-tool'
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
              // checkboxSelection
              disableSelectionOnClick
            />
          </Box>
        </Paper>

      </Container>
    </div>
  )
}

export default PersonnalTools