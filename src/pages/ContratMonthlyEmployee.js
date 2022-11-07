import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import HandshakeIcon from '@mui/icons-material/Handshake';
import GradeIcon from '@mui/icons-material/Grade';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import DeleteIcon from '@mui/icons-material/Delete';


import { Box, Breadcrumbs, Button, IconButton, Link, Card, CardActions, CardContent, FormControl, Grid, InputLabel, Select, Stack, TextField,  MenuItem, Typography } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import axios from 'axios';
import moment from 'moment';
import swal from '@sweetalert/with-react';

import contratMonthlyEmployeeService from '../services/contratMonthlyEmployeeService';
import monthlyEmployeeService from '../services/monthlyEmployeeService';

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

const ContratMonthlyEmployee = () => {
    
    const findData = useParams()
    const monthlyemployee_id = findData.id

    const [startdate, setStartdate] = useState(null);
    const [contrat,setContrat] = useState('');
    const [contratLists,setContratLists] = useState([]);
    const [evaluation,setEvaluation] = useState('');
    const [sanction,setSanction] = useState('');
    const [employee, setEmployee] = useState({ matricule:'', firstname:'', lastname:'' })

    const initialContratState = {
        contrat_id: null,
        type_contrat: contrat,
        evaluation: evaluation,
        start_date: startdate,
        start_motif: '',
        sanction: sanction,
    }
    
    const navigate = useNavigate()
    const [contratMonthlyEmployee,setContratMonthlyEmployee] = useState(initialContratState)

    useEffect(() => {
        monthlyEmployeeService.get(monthlyemployee_id).then((employee) => {
            setEmployee({ matricule: employee.data.matricule, firstname: employee.data.firstname, lastname: employee.data.lastname })
        })
    }, [monthlyemployee_id])

    const getContratMonthlyEmployees = (id) => {
        contratMonthlyEmployeeService.getAll(id).then((res) => {
            setContratLists(res.data)
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getContratMonthlyEmployees(monthlyemployee_id)
    }, [monthlyemployee_id])

    const handleInputChange = e => {
        const { name, value } = e.target
        setContratMonthlyEmployee({ ...contratMonthlyEmployee, [name]: value })
    }

    const handleContratChange = (event) => {
        const postInput = event.target.value
        setContrat(postInput);
        setContratMonthlyEmployee({...contratMonthlyEmployee, type_contrat: postInput})
    }

    const handleEvaluationChange = (event) => {
        const postInput = event.target.value
        setEvaluation(postInput);
        setContratMonthlyEmployee({...contratMonthlyEmployee, evaluation: postInput})
    }

    const handleSanctionChange = (event) => {
        const postInput = event.target.value
        setSanction(postInput);
        setContratMonthlyEmployee({...contratMonthlyEmployee, sanction: postInput})
    }

    const startDate = (newDate) => {
        const d = moment(newDate).format('YYYY-MM-DD')
        setStartdate(d);
        setContratMonthlyEmployee({ ...contratMonthlyEmployee, start_date: d })
    }
    
    const saveContrat = e => {
        e.preventDefault()

        var data = {
            id: monthlyemployee_id, 
            contrat_id: contratMonthlyEmployee.contrat_id,
            type_contrat: contratMonthlyEmployee.type_contrat,
            evaluation: contratMonthlyEmployee.evaluation,
            start_date: contratMonthlyEmployee.start_date,
            start_motif: contratMonthlyEmployee.start_motif,
            sanction: contratMonthlyEmployee.sanction,
        }

        // if (data.contrat_id.length <= 0 || data.type_contrat.length <= 0 || data.start_date.length <= 0 || data.evaluation.length <= 0 || data.start_motif.length <= 0 || data.sanction.length <= 0) {
        //     swal({
        //         title: "Une erreur est survenu!",
        //         text: "Des formulaires requis sont vides.",
        //         icon: "error",
        //         button: "OK",
        //     });
        // } else {
            axios.post('http://localhost:4000/api/contratmonthlyemployee', data)
            .then((res) => {
                console.log(res.data);
            })
            window.location.reload();
        // }
    }

    const columns_tools = [
        { field: 'type_contrat', headerName: 'Type de contrat', width: 200 },
        { field: 'evaluation', headerName: 'Evaluation', width: 200},
        { field: 'start_date', headerName: 'Date de départ', width: 150,
            renderCell: (data) => {
                if (data.row.start_date) {
                return moment(data.row.start_date).format('YYYY-MM-DD') 
                }
            }
        },
        {field: 'sanction', headerName: 'Sanction', width: 200},
        { field: 'start_motif', headerName: 'Motif de départ', width: 200 },
        { field: 'action', headerName: 'Action', width: 150,
            renderCell: (data) => {
                return (
                <>
                    <Link href={'/employee/update-contrat-monthly-employee/' + data.id}>
                    <IconButton component="label">
                        <EditIcon />
                    </IconButton>
                    </Link>
                    <IconButton component="label" onClick={() => deleteMonthlyContrat(data.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
                )
            }
        },
    ];

    const rows = contratLists.map(contratList => ({
        id: contratList.contrat_id,
        type_contrat: contratList.type_contrat,
        evaluation: contratList.evaluation,
        start_date: contratList.start_date,
        start_motif: contratList.start_motif,
        sanction: contratList.sanction,
    }))

    const deleteMonthlyContrat = (id) => {
        swal({
          text: "Supprimer le contrat ?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if(willDelete) { 
            contratMonthlyEmployeeService.remove(id)
            const newTabList = contratLists.filter((monthlyemployeecontrat) => monthlyemployeecontrat.monthlyemployee_id !== id)
            setContratLists(newTabList)
            document.location.reload(true)
            // navigate('/employee/monthlyemployee?deleted')
          }
        });
      }

    const breadcrumbs = [
        <Typography key="1">
          {employee.matricule}
        </Typography>,
        <Typography key="2" color="text.primary">
          {employee.firstname} {employee.lastname}
        </Typography>,
    ];

  return (
    <div>
        <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
            Contrat de travail
            <Stack spacing={2}>
                <Breadcrumbs separator="." aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
            <Button
                size="medium"
                variant="outlined"
                color="primary"
                sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
                startIcon={<ArrowBackIcon />}
                href='/employee/monthlyemployee'
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
                        pageSize={4}
                        rowsPerPageOptions={[4]}
                        disableSelectionOnClick
                    />
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Card sx={{ minWidth: 275 }}>
                    <form onSubmit={saveContrat} noValidate autoComplete='off'>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                                Ajout de contrat
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <HandshakeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Type de contrat</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={contrat}
                                    onChange={handleContratChange}
                                    label="Type de contrat"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="INTERIMAIRE">INTERIMAIRE</MenuItem>
                                    <MenuItem value="JOURNALIER">JOURNALIER</MenuItem>
                                    <MenuItem value="SAISONNIER">SAISONNIER</MenuItem>
                                    <MenuItem value="APPRENTISSAGE">APPRENTISSAGE</MenuItem>
                                    <MenuItem value="CDD">CDD</MenuItem>
                                    <MenuItem value="CDI">CDI</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box><br/>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <GradeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Evaluation</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={evaluation}
                                    onChange={handleEvaluationChange}
                                    label="Evaluation"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="ESSAIE">ESSAIE</MenuItem>
                                    <MenuItem value="ESSAIE NON CONCLUANT">ESSAIE NON CONCLUANT</MenuItem>
                                    <MenuItem value="RENOUVELLEMENT">RENOUVELLEMENT</MenuItem>
                                    <MenuItem value="CONFIRMATION">CONFIRMATION</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box><br/>
                            
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Date de départ"
                                    id="start_date"
                                    name="start_date"
                                    value={startdate}
                                    onChange={startDate}
                                    renderInput={(params) =>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <TextField
                                        {...params}
                                        variant="standard"
                                        sx={{ width: '100%' }}
                                        id="start_date"
                                        name="start_date"
                                        /><br />
                                    </Box>
                                    }
                                />
                            </LocalizationProvider><br/>
                            
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <TrendingDownIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Sanction</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={sanction}
                                    onChange={handleSanctionChange}
                                    label="Sanction"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="AVERTISSEMENT VERBAL">AVERTISSEMENT VERBAL</MenuItem>
                                    <MenuItem value="AVERTISSEMENT ECRIT">AVERTISSEMENT ECRIT</MenuItem>
                                    <MenuItem value="DERNIER AVERTISSEMENT">DERNIER AVERTISSEMENT</MenuItem>
                                    <MenuItem value="MISE A PIED">MISE A PIED</MenuItem>
                                    <MenuItem value="BLAME">BLAME</MenuItem>
                                    <MenuItem value="LICENCIEMENT">LICENCIEMENT</MenuItem>
                                    </Select>
                                </FormControl><br/>
                            </Box><br/>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <EditIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    id="start_motif"
                                    value={contratMonthlyEmployee.start_motif}
                                    onChange={handleInputChange}
                                    name="start_motif"
                                    label="Motif de départ"
                                    variant="standard"
                                    multiline
                                    rows={2}
                                    sx={{ width: '100%' }}
                                /><br />
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={saveContrat}>Enregistrer</Button>
                        </CardActions>
                    </form>
                </Card>
            </Grid>
        </Grid>

    </div>
  )
}

export default ContratMonthlyEmployee