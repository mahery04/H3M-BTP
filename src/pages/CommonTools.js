import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import moment from 'moment'
import swal from '@sweetalert/with-react';

import commonToolsService from '../services/commonToolsService'


function CommonTools() {

  const [commontools, setCommontools] = useState([])

  const getCommonTools = () => {
    commonToolsService.getAll().then((res) => {
      setCommontools(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getCommonTools()
  }, [])

  const columns = [
    { field: 'purchase_date',         headerName: 'Date d\'achat',            width: 100 },
    { field: 'identification_number', headerName: 'Numéro d\'identification', width: 200 },
    { field: 'article_name',          headerName: 'Nom de l\'article',        width: 200 },
    { field: 'assignation_place',     headerName: 'Lieu d\'affectation',      width: 200 },
    { field: 'statue',                headerName: 'Etat',                     width: 200 },
    { field: 'material_number',       headerName: 'Nombre de matériel',       width: 200, type: 'number' },
    { field: 'historical',            headerName: 'Historique',               width: 100 },
    { field: 'action',                headerName: 'Action',                   width: 150, type: 'actions',
      renderCell: (data) => {
        return (
          <>
            <Link to={'/tools/updatecommon/' + data.id}>
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
  
  const rows = commontools.map(commontool => ({
    id:                     commontool.tool_id,
    purchase_date:          moment(commontool.purchase_date).format('YYYY-MM-DD'),
    identification_number:  commontool.identification_number,
    article_name:           commontool.article_name,
    assignation_place:      commontool.assignation_place,
    statue:                 commontool.statue,
    material_number:        commontool.material_number,
    etat:                   commontool.etat,
    historical:             commontool.historical,
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
        commonToolsService.remove(id)
        const newTabList = commontools.filter((commontool) => commontool.id !== id)
        setCommontools(newTabList)
        document.location.reload(true)
      }
    });
  }

  const breadcrumbs = [
    <Typography key="1">
      Outillage
    </Typography>,
    <Typography key="2">
      Outillage Commun
    </Typography>,
  ];

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Outillage Commun
        <Typography variant="h4" sx={{ px: 5, mt: 2, ml: -5, mb: 2 }}>
          Outillage
        </Typography>
        <Stack spacing={2}>
          <Breadcrumbs separator="." aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>

        {/* <Link to='/employee/new-dailyemployee'>
          <Button
            size="medium"
            variant="outlined"
            color="primary"
            sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
            startIcon={<AddIcon />}
            href=''
          >
            Nouveau employé
          </Button>
        </Link> */}
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

export default CommonTools