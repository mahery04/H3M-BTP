import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import HandshakeIcon from '@mui/icons-material/Handshake';
import GradeIcon from '@mui/icons-material/Grade';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkIcon from '@mui/icons-material/Work';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Box, Breadcrumbs, Button, IconButton, Link, Card, CardActions, CardContent, FormControl, Grid, InputLabel, Select, Stack, TextField, MenuItem, Typography } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import axios from 'axios';
import moment from 'moment';
import swal from '@sweetalert/with-react';

import historyToolService from '../services/historyToolService';
import commonToolsService from '../services/commonToolsService';

const HistoryTool = () => {

  const findData = useParams()
  const history_id = findData.id

  const [startdate, setStartdate] = useState(null);
  const [contrat, setContrat] = useState('');
  const [contratLists, setContratLists] = useState([]);
  const [etat, setetat] = useState('');
  const [observation, setobservation] = useState('');
  const [employee, setEmployee] = useState({ num_fact: '', identification_number: '', article_name: '' })

  const notification = () => {
    let url = window.location.href
    let param = url.split('?')
    if(param[1] === 'inserted') {
      swal("", "Historique inseré avec succés!", "success");
    } else if(param[1] === 'deleted') {
      swal("", "Historique supprimé avec succés!", "success");
    } else if(param[1] === 'updated') {
      swal("", "Historique modifié avec succés!", "success");
    }
  }
  notification()

  const initialHistoryToolState = {
    history_tool_id: null,
    date_transfert: startdate,
    lieu_transfert: '',
    etat: etat,
    observation: observation,
  }

  const navigate = useNavigate()
  const [historyTool, setHistoryTool] = useState(initialHistoryToolState)

  useEffect(() => {
    commonToolsService.get(history_id).then((employee) => {
      setEmployee({ num_fact: employee.data.num_fact, identification_number: employee.data.identification_number, article_name: employee.data.article_name })
    })
  }, [history_id])

  const gethistoryTools = (id) => {
    historyToolService.getAll(id).then((res) => {
      setContratLists(res.data)
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    gethistoryTools(history_id)
  }, [history_id])

  const handleInputChange = e => {
    const { name, value } = e.target
    setHistoryTool({ ...historyTool, [name]: value })
  }

  const handleContratChange = (event) => {
    const postInput = event.target.value
    setContrat(postInput);
    setHistoryTool({ ...historyTool, purchase_date: postInput })
  }

  const handleetatChange = (event) => {
    const postInput = event.target.value
    setetat(postInput);
    setHistoryTool({ ...historyTool, etat: postInput })
  }

  const handleobservationChange = (event) => {
    const postInput = event.target.value
    setobservation(postInput);
    setHistoryTool({ ...historyTool, observation: postInput })
  }

  const startDate = (newDate) => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setStartdate(d);
    setHistoryTool({ ...historyTool, date_transfert: d })
  }

  const saveHistoryTool = e => {
    e.preventDefault()

    var data = {
      id: history_id,
      history_tool_id: historyTool.history_tool_id,
      date_transfert: historyTool.date_transfert,
      lieu_transfert: historyTool.lieu_transfert,
      etat: historyTool.etat,
      observation: historyTool.observation,
    }

    // if (data.history_tool_id.length <= 0 || data.purchase_date.length <= 0 || data.date_transfert.length <= 0 || data.etat.length <= 0 || data.lieu_transfert.length <= 0 || data.observation.length <= 0) {
    //     swal({
    //         title: "Une erreur est survenu!",
    //         text: "Des formulaires requis sont vides.",
    //         icon: "error",
    //         button: "OK",
    //     });
    // } else {
    axios.post('http://localhost:4000/api/historytool', data)
      .then((res) => {
        console.log(res.data);
      })
    window.location.reload();
    // }
  }

  const columns_tools = [
    { field: 'date_transfert', headerName: 'Date de transfert', width: 150 },
    { field: 'lieu_transfert', headerName: 'Lieu de transfert', width: 200 },
    { field: 'etat', headerName: 'Etat', width: 150 },
    { field: 'observation', headerName: 'Observation', width: 200 },
    {
      field: 'action', headerName: 'Action', width: 150,
      renderCell: (data) => {
        return (
          <>
            <Link href={'/history/update-tool/' + data.id}>
              <IconButton component="label">
                <EditIcon />
              </IconButton>
            </Link>
            {/* <IconButton component="label" onClick={() => deleteHistoryTool(data.id)}>
              <DeleteIcon />
            </IconButton> */}
          </>
        )
      }
    },
  ];

  const rows = contratLists.map(contratList => ({
    id: contratList.history_tool_id,
    date_transfert: moment(contratList.date_transfert).format("DD-MM-YYYY"),
    lieu_transfert: contratList.lieu_transfert,
    etat: contratList.etat,
    observation: contratList.observation,
  }))

  const deleteHistoryTool = (id) => {
    swal({
      text: "Supprimer l'historique ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          historyToolService.remove(id)
          const newTabList = contratLists.filter((monthlyemployeecontrat) => monthlyemployeecontrat.history_id !== id)
          setContratLists(newTabList)
          document.location.reload(true)
          // navigate('/employee/monthlyemployee?deleted')
        }
      });
  }

  const breadcrumbs = [
    <Typography key="1">
      {employee.num_fact}
    </Typography>,
    <Typography key="2" color="text.primary">
      {employee.identification_number} {employee.article_name}
    </Typography>,
  ];

  console.log("INPUT ", historyTool);
  console.log("ContratLists ", contratLists.lieu_transfert);


  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Historique matériels
        <Stack spacing={2}>
          <Breadcrumbs separator="." aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, width: 250, marginLeft: '70%' }}
          startIcon={<ArrowBackIcon />}
          href='/tools/common'
        >
          Retour
        </Button>
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box sx={{ height: 380, width: '100%', backgroundColor: 'white' }}>
            <DataGrid
              rows={rows}
              columns={columns_tools}
              components={{ Toolbar: GridToolbar }}
              pageSize={5}
              rowsPerPageOptions={[4]}
              disableSelectionOnClick
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ minWidth: 275 }}>
            <form onSubmit={saveHistoryTool} noValidate autoComplete='off'>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                  Ajout historique
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date de transfert"
                    id="date_transfert"
                    name="date_transfert"
                    value={startdate}
                    onChange={startDate}
                    renderInput={(params) =>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField
                          {...params}
                          variant="standard"
                          sx={{ width: '100%' }}
                          id="date_transfert"
                          name="date_transfert"
                        /><br />
                      </Box>
                    }
                  />
                </LocalizationProvider><br />
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    id="lieu_transfert"
                    value={historyTool.lieu_transfert}
                    onChange={handleInputChange}
                    name="lieu_transfert"
                    label="Lieu de transfert"
                    variant="standard"
                    sx={{ width: '100%' }}
                  /><br />
                </Box><br />

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <MoreHorizIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <FormControl variant="standard" sx={{ width: '100%' }}>
                    <InputLabel id="statue">Etat</InputLabel>
                    <Select
                      labelId="etat"
                      id="etat"
                      value={etat}
                      onChange={handleetatChange}
                      label="Etat"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value='Nouveau'>Nouveau</MenuItem>
                      <MenuItem value='Occasion'>Occasion</MenuItem>
                    </Select>
                  </FormControl>
                </Box><br />
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <EditIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    id="observation"
                    value={observation}
                    onChange={handleobservationChange}
                    name="observation"
                    label="Observation"
                    variant="standard"
                    multiline
                    rows={2}
                    sx={{ width: '100%' }}
                  /><br />
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={saveHistoryTool}>Enregistrer</Button>
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>

    </div>
  )
}

export default HistoryTool