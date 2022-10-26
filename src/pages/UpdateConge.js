import React, { useEffect, useState } from 'react';

import { Button, Card, CardContent, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl, Divider, Chip, InputAdornment, Stack, Breadcrumbs } from '@mui/material';

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
import { useNavigate, useParams } from 'react-router-dom';

function UpdateConge() {

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
            congeService.update(conge_id,data).then(res => {
                setConge({
                    id: res.data.id,
                    employee: res.data.employee,
                    start_conge: res.data.start_conge,
                    end_conge: res.data.end_conge
                })
            }).catch(err => {
                console.log(err)
            })
            navigate('/conge/personnal?updated')
        }
    }

    console.log(conge);

    const breadcrumbs = [
        <Typography key="1">
            {conge.employee}
        </Typography>,
    ];

  return (
    <div>
        <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
            Modification congé
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
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {employees.map(employee => (
                                            <MenuItem key={employee.matricule} value={`${employee.matricule} - ${employee.firstname} ${employee.lastname}`}>{employee.matricule} - {employee.firstname} {employee.lastname}</MenuItem>
                                        ))}
                                    </Select>
                                    </FormControl>
                                </Box> */}

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Début du congé"
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
                                        label="Fin du congé"
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
                                <br />

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