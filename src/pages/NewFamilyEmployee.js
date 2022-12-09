import React, { useEffect, useState } from 'react';

import { Button, Card, CardContent, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl, Divider, Chip, InputAdornment } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PortraitIcon from '@mui/icons-material/Portrait';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AddIcon from '@mui/icons-material/Add';
import NumbersIcon from '@mui/icons-material/Numbers';

import { useNavigate } from 'react-router-dom';
import swal from '@sweetalert/with-react';

import employeeFamilyService from '../services/employeeFamilyService'
import { TextField } from '@material-ui/core';

const NewFamilyEmployee = () => {

    const [monthlyEmployees, setMonthlyEmployees] = useState('')
    const [employees, setEmployees] = useState([])

    const navigate = useNavigate()

    const getEmployees = () => {
        employeeFamilyService.getEmployee().then((res) => {
            setEmployees(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getEmployees()
    }, [])

    const initialFamilyState = {
        id: null,
        monthlyemployee_id: monthlyEmployees,
        name_conjoint: '',
        number_child: null,
    }

    const [family, setFamily] = useState(initialFamilyState)

    const handleEmployeeChange = e => {
        const employeeValue = e.target.value
        setMonthlyEmployees(employeeValue)
        setFamily({ ...family, monthlyemployee_id: employeeValue })
    }

    const handleInputChange = e => {
        const { name, value } = e.target
        setFamily({ ...family, [name]: value })
    }

    console.log(family)

    const saveFamily = e=> {
        e.preventDefault()

        var data = {
            monthlyemployee_id: family.monthlyemployee_id,
            name_conjoint: family.name_conjoint,
            number_child: family.number_child,
        }

        if(!data.monthlyemployee_id || !data.name_conjoint || !data.number_child) {
            swal({
                title: "Une erreur est survenue!",
                text: "Des formulaires requis sont vides.",
                icon: "error",
                button: "OK",
            });
        } else {
            employeeFamilyService.create(data).then(res => {
                setFamily({
                    monthlyemployee_id: res.data.monthlyemployee_id,
                    name_conjoint: res.data.name_conjoint,
                    number_child: res.data.number_child,
                })
            }).catch(err => {
                console.log(err)
            })
            navigate('/family/personnal?inserted')
        }
    }

    return (
        <>
            <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
                Insertion situation familiale
                <Button
                    size="medium"
                    variant="outlined"
                    color="primary"
                    sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
                    startIcon={<ArrowBackIcon />}
                    href='/family/personnal'
                >
                    Retour
                </Button>
            </Typography>

            <Container maxWidth="xxl">
                <Card sx={{ height: 'auto', width: '95%' }}>
                    <CardContent>
                        <form onSubmit={saveFamily} noValidate autoComplete='off'>
                            <Box sx={{ flexGrow: 1 }}>
                                <Container maxWidth="xl" sx={{ lineHeight: 5 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <PortraitIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <FormControl variant="standard" sx={{ width: '100%', marginTop: 4 }}>
                                            <InputLabel id="statue">Employé(e) *</InputLabel>
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
                                                    <MenuItem key={employee.monthlyemployee_id} value={employee.monthlyemployee_id}>{employee.matricule} - {employee.firstname} {employee.lastname}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <NoteAltIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            id="name_conjoint"
                                            value={family.name_conjoint}
                                            onChange={handleInputChange}
                                            name="name_conjoint"
                                            required
                                            label="Nom du conjoint"
                                            variant="standard"
                                            sx={{ width: '100%' }}
                                        /><br />
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <NumbersIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            type="number"
                                            id="number_child"
                                            value={family.number_child}
                                            onChange={handleInputChange}
                                            name="number_child"
                                            required
                                            label="Nombre d'enfant"
                                            variant="standard"
                                            sx={{ width: '100%' }}
                                        /><br />
                                    </Box>

                                    <br />
                                    <Button
                                        size="medium"
                                        variant="outlined"
                                        color="primary"
                                        sx={{ width: 250 }}
                                        startIcon={<AddIcon />}
                                        onClick={saveFamily}
                                    >
                                        Ajouter
                                    </Button>
                                </Container>
                            </Box>

                            
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}

export default NewFamilyEmployee