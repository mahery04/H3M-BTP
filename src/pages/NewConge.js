import React, { useEffect, useState } from 'react';

import { Button, Card, CardContent, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl, Divider, Chip, InputAdornment } from '@mui/material';

import { Grid, TextField } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import PortraitIcon from '@mui/icons-material/Portrait';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import moment from 'moment'
import swal from '@sweetalert/with-react';
import congeService from '../services/congeService'
import { useNavigate } from 'react-router-dom';

function NewConge() {

    const [employee, setEmployee] = useState('')
    const [employees, setEmployees] = useState([{ matricule: '', firstname: '', lastname: '' }])
    const [startconge, setStartconge] = useState(null)
    const [endconge, setEndconge] = useState(null)

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
        employee:       employee,
        start_conge:    '',
        end_conge:      '',
    }
    
    const [conge, setConge] = useState(initialCongeState)
    
    const handleEmployeeChange = e => {
        const employeeValue = e.target.value
        setEmployee(employeeValue)
        setConge({ ...conge, employee: employeeValue })
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

    const saveConge = e => {
        e.preventDefault()

        var data = {
            employee: conge.employee,
            start_conge: conge.start_conge,
            end_conge: conge.end_conge
        }

        if (!data.employee || !data.start_conge || !data.end_conge) {
            swal({
                title: "Un erreur est survenue!",
                text: "Des formulaires requis sont vides.",
                icon: "error",
                button: "OK",
            });
        } else {
            congeService.create(data).then(res => {
                setConge({
                    id: res.data.id,
                    employee: res.data.employee,
                    start_conge: res.data.start_conge,
                    end_conge: res.data.end_conge
                })
            }).catch(err => {
                console.log(err)
            })
            navigate('/conge/personnal?inserted')
        }
    }

  return (
    <div>
        <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
            Nouveau congé
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
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <PortraitIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <FormControl variant="standard" sx={{ width: '100%', marginTop: 4 }}>
                                    <InputLabel id="statue">Employée</InputLabel>
                                    <Select
                                        labelId="employee"
                                        id="employee"
                                        onChange={handleEmployeeChange}
                                        label="Age"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {employees.map(employee => (
                                            <MenuItem key={employee.matricule} value={`${employee.matricule} - ${employee.firstname} ${employee.lastname}`}>{employee.matricule} - {employee.firstname} {employee.lastname}</MenuItem>
                                        ))}
                                    </Select>
                                    </FormControl>
                                </Box>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Début du congé"
                                        id="start_conge"
                                        name="start_conge"
                                        value={startconge}
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
                                        label="Fin du congé"
                                        id="end_conge"
                                        name="end_conge"
                                        value={endconge}
                                        onChange={insertEndconge}
                                        renderInput={(params) =>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <TextField {...params} variant="standard" sx={{ width: '100%' }} /><br />
                                            </Box>
                                        }
                                    />
                                </LocalizationProvider>
                                <br />

                                <Button
                                    size="medium"
                                    variant="outlined"
                                    color="primary"
                                    sx={{ width: 250 }}
                                    startIcon={<AddIcon />}
                                    onClick={saveConge}
                                >
                                    Ajouter
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

export default NewConge