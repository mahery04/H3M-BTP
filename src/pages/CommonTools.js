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

import commonToolsService from '../services/commonToolsService'
import Label from '../components/Label';

const CommonTools = () => {

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
    { field: 'purchase_date',         headerName: 'Date d\'achat',            width: 150,
      renderCell: (data) => {
        if (data.row.purchase_date) {
          return moment(data.row.purchase_date).format('DD-MM-YYYY')
        } 
      }
    },
    { field: 'identification_number', headerName: 'Numéro d\'identification', width: 200 },
    { field: 'vendor', headerName: 'Fournisseur', width: 150 },
    { field: 'num_fact', headerName: 'Numéro facture', width: 150 },
    { field: 'article_name',          headerName: 'Nom de l\'article',        width: 200 },
    // { field: 'assignation_place',     headerName: 'Lieu d\'affectation',      width: 150, type: 'number' },
    { field: 'statue',                headerName: 'Etat',                     width: 80, type: 'action',
      renderCell: (data) => {
        if (data.row.statue === 'Nouveau') {
          return (<Label variant="ghost" color='success'>Nouveau</Label>)
        } else if (data.row.statue === 'Occasion') {
          return (<Label variant="ghost" color='warning'>Occasion</Label>)
        }
      }},
    { field: 'material_number',       headerName: 'Nombre de matériel',       width: 150, type: 'number' },
    { field: 'historical',            headerName: 'Lieu d\'affectation',               width: 200,
      renderCell: (data) => {
        if (data.row.historical)
        return (
          <Tooltip title={data.row.historical}>
            <InfoIcon sx={{ color: 'grey' }}/>
          </Tooltip>
        )
      }
    },
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
    purchase_date:          commontool.purchase_date,
    identification_number:  commontool.identification_number,
    vendor:                 commontool.vendor,
    num_fact:               commontool.num_fact,
    article_name:           commontool.article_name,
    // assignation_place:      commontool.assignation_place,
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

  return (
      <div>
          <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
              Outillages Communs
              <Button
                  size="medium"
                  variant="outlined"
                  color="primary"
                  sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
                  startIcon={<AddIcon />}
                  href='/tools/newcommontool'
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

export default CommonTools