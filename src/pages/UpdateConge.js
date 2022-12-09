import React, { useEffect, useState } from 'react';

import { Button, Card, CardContent, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl, Divider, Chip, InputAdornment } from '@mui/material';

import { Grid, TextField } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import PortraitIcon from '@mui/icons-material/Portrait';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import moment from 'moment'
import swal from '@sweetalert/with-react';
import congeService from '../services/congeService'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateConge() {

    const [monthlyEmployees, setMonthlyEmployee] = useState('')
    const [employees, setEmployees] = useState([])
    const [startconge, setStartconge] = useState(null)
    const [endconge, setEndconge] = useState(null)
    const [visaRh, setVisaRh] = useState('')
    const [congeTime, setCongeTime] = useState(null)

    const navigate = useNavigate()

    const getEmployees = () => {
        congeService.getEmployee().then((res) => {
            setEmployees(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getEmployees()
    },[])

    
    const initialCongeState = {
        id:             null,
        monthlyemployee_id:       monthlyEmployees,
        conge_motif: '',
        start_conge:    '',
        end_conge:      '',
        // conge_before_request:'',
        visa_rh: visaRh,
    }

    const findData = useParams()
    const conge_id = findData.id
    const [loaded, setLoaded] = useState(false)
    
    const [conge, setConge] = useState(initialCongeState)

    useEffect(() => {
        const load = async () => {
          const res = await congeService.get(conge_id)
          setConge(res.data)
          setLoaded(true)
        }
        if (conge_id && !loaded) {
          load();
        }
    }, [conge_id, loaded])
    
    const handleEmployeeChange = e => {
        const employeeValue = e.target.value
        setMonthlyEmployee(employeeValue)
        setConge({ ...conge, monthlyemployee_id: employeeValue })
    }

    const handleInputChange = e => {
        const { name, value } = e.target
        setConge({ ...conge, [name]: value })
    }

    const handleVisaChange = (event) => {
        setVisaRh(event.target.value);
        setConge({...conge, visa_rh: event.target.value })
    }

    const insertStartconge = newDate => {
        const d = moment(newDate).format('YYYY-MM-DD')
        setStartconge(d)
        setConge({ ...conge, start_conge: d })
    }

    const insertEndconge = newDate => {
        const d = moment(newDate).format('YYYY-MM-DD')
        setEndconge(d)
        setConge({ ...conge, end_conge: d })
    }

    console.log(conge)

    const saveConge = e => {
        e.preventDefault()

        var data = {
            monthlyemployee_id: conge.monthlyemployee_id,
            conge_motif: conge.conge_motif,
            start_conge: conge.start_conge,
            end_conge: conge.end_conge,
            // conge_before_request: conge.conge_before_request,
            visa_rh: conge.visa_rh
        }


        if (!data.monthlyemployee_id) {
            swal({
                title: "Une erreur est survenue!",
                text: "Des formulaires requis sont vides.",
                icon: "error",
                button: "OK",
            });
        } else {
            congeService.update(conge_id,data).then(res => {
                setConge({
                    id: res.data.id,
                    monthlyemployee_id: res.data.monthlyemployee_id,
                    conge_motif: res.data.conge_motif,
                    start_conge: res.data.start_conge,
                    end_conge: res.data.end_conge,
                    // conge_before_request: res.data.conge_before_request,
                    visa_rh: res.data.visa_rh
        
                })
            }).catch(err => {
                console.log(err)
            })
            navigate('/conge/personnal?updated')
        }
    }

  return (
    <div>
        <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
            Modification de congé
            <Button
            size="medium"
            variant="outlined"
            color="primary"
            sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
            startIcon={<ArrowBackIcon />}
            href='/conge/personnal'
            >
                Retour
            </Button>
        </Typography>
        <Container maxWidth="xxl">
            <Card sx={{ height: 'auto', width: '95%' }}>
                <CardContent>
                    <form onSubmit={saveConge} noValidate autoComplete='off'>
                        <Box sx={{ flexGrow: 1 }}>
                            <Container maxWidth="xl" sx={{ lineHeight: 5 }}>
                                {/* <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <PortraitIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <FormControl variant="standard" sx={{ width: '100%', marginTop: 4 }}>
                                    <InputLabel id="statue">Employée</InputLabel>
                                    <Select
                                        labelId="employee"
                                        id="employee"
                                        onChange={handleEmployeeChange}
                                        label="Age"
                                    >
                                        {employees.map(employee => (
                                            <MenuItem key={employee.monthlyemployee_id} value={employee.monthlyemployee_id}>{employee.matricule} - {employee.firstname} {employee.lastname}</MenuItem>
                                        ))}
                                    </Select>
                                    </FormControl>
                                </Box> */}

                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <NoteAltIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField
                                    id="conge_motif"
                                    value={conge.conge_motif}
                                    onChange={handleInputChange}
                                    name="conge_motif"
                                    label="Motif de congé"
                                    variant="standard"
                                    sx={{ width: '100%' }}
                                    /><br />
                                </Box>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Date de départ"
                                        id="start_conge"
                                        name="start_conge"
                                        value={conge.start_conge}
                                        onChange={insertStartconge}
                                        renderInput={(params) =>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <TextField {...params} variant="standard" sx={{ width: '100%' }} /><br />
                                            </Box>
                                        }
                                    />
                                </LocalizationProvider>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Date de retour"
                                        id="end_conge"
                                        name="end_conge"
                                        value={conge.end_conge}
                                        onChange={insertEndconge}
                                        renderInput={(params) =>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <TextField {...params} variant="standard" sx={{ width: '100%' }} /><br />
                                            </Box>
                                        }
                                    />
                                </LocalizationProvider>
                            
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <DoneAllIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <FormControl variant="standard" sx={{ m: 1, width: '100%', mt: 7 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Visa RH</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={conge.visa_rh}
                                        onChange={handleVisaChange}
                                        label="Visa RH *"
                                    >
                                        <MenuItem value="En attente">En attente</MenuItem>
                                        <MenuItem value="Accordé">Accordé</MenuItem>
                                        <MenuItem value="Non accordé">Non accordé</MenuItem>
                                    </Select>
                                    </FormControl>
                                </Box>
                                <Button
                                    size="medium"
                                    variant="outlined"
                                    color="primary"
                                    sx={{ width: 250 }}
                                    startIcon={<AddIcon />}
                                    onClick={saveConge}
                                >
                                    Modifier
                                </Button>
                            </Container>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Container>

    </div>
  )
}

export default UpdateConge