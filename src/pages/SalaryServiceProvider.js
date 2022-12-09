import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import HandshakeIcon from '@mui/icons-material/Handshake';
import GradeIcon from '@mui/icons-material/Grade';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WorkIcon from '@mui/icons-material/Work';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

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

import contratDailyEmployeeService from '../services/contratDailyEmployeeService';
import dailyEmployeeService from '../services/dailyEmployeeService';
import salaryServiceProviderService from '../services/salaryServiceProviderService';
import serviceProviderService from '../services/serviceProviderService';


const SalaryServiceProvider = () => {
    
    const findData = useParams()
    const dailyemployee_id = findData.id

    const [startdate, setStartdate] = useState(null);
    const [enddate, setEnddate] = useState(null);
    const [datePaiement, setDatePaiement] = useState(null);
    const [paiementDate, setPaimentDate] = useState(null);
    const [contratLists,setContratLists] = useState([]);
    const [salary,setsalary] = useState('');
    const [employee, setEmployee] = useState({firstname:'', lastname:'' })

    const initialContratState = {
        salary_provider_id: null,
        date_paiement: paiementDate,
        start_date: startdate,
        end_date: enddate,
        salary: salary,
    }
    
    const navigate = useNavigate()
    const [contratDailyEmployee,setContratDailyEmployee] = useState(initialContratState)

    useEffect(() => {
        serviceProviderService.get(dailyemployee_id).then((employee) => {
        setEmployee({ firstname: employee.data.firstname, lastname: employee.data.lastname })
      })
    }, [dailyemployee_id])

    const getContratDailyEmployees = (id) => {
        salaryServiceProviderService.getAll(id).then((res) => {
            setContratLists(res.data)
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getContratDailyEmployees(dailyemployee_id)
    }, [])

    const handleInputChange = e => {
        const { name, value } = e.target
        setContratDailyEmployee({ ...contratDailyEmployee, [name]: value })
    }

    const handlesalaryChange = (event) => {
        const postInput = event.target.value
        setsalary(postInput);
        setContratDailyEmployee({...contratDailyEmployee, salary: postInput})
    }

    const dateForPaiement = (newDate) => {
      const d = moment(newDate).format('YYYY-MM-DD')
      setDatePaiement(d);
      setContratDailyEmployee({ ...contratDailyEmployee, date_paiement: d })
  }

    const startDate = (newDate) => {
        const d = moment(newDate).format('YYYY-MM-DD')
        setStartdate(d);
        setContratDailyEmployee({ ...contratDailyEmployee, start_date: d })
    }

    const endDate = (newDate) => {
      const d = moment(newDate).format('YYYY-MM-DD')
      setEnddate(d);
      setContratDailyEmployee({ ...contratDailyEmployee, end_date: d })
  }

    
    const saveContrat = e => {
        e.preventDefault()

        var data = {
            id: dailyemployee_id,
            salary_provider_id: contratDailyEmployee.salary_provider_id,
            date_paiement: contratDailyEmployee.date_paiement,
            start_date: contratDailyEmployee.start_date,
            end_date: contratDailyEmployee.end_date,
            salary: contratDailyEmployee.salary,
        }

        // if (data.salary_provider_id.length <= 0 || data.date_paiement.length <= 0 || data.start_date.length <= 0 || data.evaluation.length <= 0 || data.end_date.length <= 0 || data.salary.length <= 0) {
        //     swal({
        //         title: "Un erreur est survenu!",
        //         text: "Des formulaires requis sont vides.",
        //         icon: "error",
        //         button: "OK",
        //     });
        // } else {
            axios.post('http://localhost:4000/api/salaryserviceprovider', data)
            .then((res) => {
                console.log(res.data);
            })
            window.location.reload();
        // }
    }

    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

    const columns_tools = [
        { field: 'date_paiement', headerName: 'Date de paiement', width: 200 },
        { field: 'start_date', headerName: 'Début de préstation ', width: 150,
            renderCell: (data) => {
                if (data.row.start_date) {
                return moment(data.row.start_date).format('DD-MM-YYYY') 
                }
            }
        },
        { field: 'end_date', headerName: 'Fin de préstation ', width: 150,
            renderCell: (data) => {
                if (data.row.start_date) {
                return moment(data.row.end_date).format('DD-MM-YYYY') 
                }
            }
        },
        { field: 'salary', headerName: 'Salaire', width: 200, 
          renderCell: (data) => {
            return data.row.salary +" Ar"
          }
        },
    ];

    const rows = contratLists.map(contratList => ({
        id: contratList.salary_provider_id,
        date_paiement: moment(contratList.date_paiement).format("DD-MM-YYYY"),
        start_date: contratList.start_date,
        end_date: contratList.end_date,
        salary: contratList.salary,
    }))

    const deleteDailyContrat = (id) => {
        swal({
          text: "Supprimer ?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if(willDelete) { 
            salaryServiceProviderService.remove(id)
            const newTabList = contratLists.filter((dailyemployeecontrat) => dailyemployeecontrat.salary_provider_id !== id)
            setContratLists(newTabList)
            document.location.reload(true)
            // navigate('/employee/dailyemployee?deleted')
          }
        });
      }

    const breadcrumbs = [
        <Typography key="1">
          {employee.firstname} {employee.lastname}
        </Typography>
    ];

    console.log("SERVICE PROVIDER ", contratDailyEmployee);
    console.log("SALARY PRESTATAIRE ", contratLists);


  return (
    <div>
        <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
            Listes paiement mensuels du préstataire
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
                href='/service-provider/personnal'
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
                                Ajout de paiement
                            </Typography> <br/>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Date de paiement"
                                        id="date_paiement"
                                        name="date_paiement"
                                        value={datePaiement}
                                        onChange={dateForPaiement}
                                        renderInput={(params) =>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <TextField {...params} variant="standard" sx={{ width: '100%' }} /><br />
                                            </Box>
                                        }
                                    />
                                </LocalizationProvider>
                            <br/>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Début de préstation"
                                        id="start_date"
                                        name="start_date"
                                        value={startdate}
                                        onChange={startDate}
                                        renderInput={(params) =>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <TextField {...params} variant="standard" sx={{ width: '100%' }} /><br />
                                            </Box>
                                        }
                                    />
                                </LocalizationProvider>
                            <br/>
                            
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Fin de préstation"
                                    id="end_date"
                                    name="end_date"
                                    value={enddate}
                                    onChange={endDate}
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
                            <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <CurrencyTextField
                              label="Salaire "
                              variant="standard"
                              id="salary"
                              name="salary"
                              value={contratDailyEmployee.salary}
                              currencySymbol="Ar"
                              //minimumValue="0"
                              outputFormat="string"
                              decimalCharacter="."
                              digitGroupSeparator=","
                              onChange={(event, value)=> setContratDailyEmployee({...contratDailyEmployee, salary: value })}
                              style={{width: '100%', marginTop: '10%'}}
                            />
                            </Box><br/>
                            
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

export default SalaryServiceProvider