import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import moment from 'moment'

import { Box, Breadcrumbs, Button, Container, Paper, Stack, Typography } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import dailyEmployeeService from '../services/dailyEmployeeService'
import dailyPresenceService from '../services/dailyPresenceService'

const DailyPresenceHistory = () => {

    //Get dailyemployee
    const findData = useParams()
    const dailyemployee_id = findData.id
    const [employee, setEmployee] = useState({ matricule: '', firstname: '', lastname: '' })

    useEffect(() => {
        dailyEmployeeService.get(dailyemployee_id).then((employee) => {
            setEmployee({ matricule: employee.data.matricule, firstname: employee.data.firstname, lastname: employee.data.lastname })
        })
    }, [dailyemployee_id])

    //Get history
    const [historicals, setHistoricals] = useState([])

    const getHistoricals = () => {
        dailyPresenceService.history(dailyemployee_id).then((res) => {
            setHistoricals(res.data)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getHistoricals()
    }, [])

    const columns = [
        { field: 'month',           headerName: 'Mois de',          width: 150},
        { field: 'first_date',      headerName: 'Date de début',    width: 150},
        { field: 'last_date',       headerName: 'Date de fin',      width: 150},
        { field: 'nb_present',      headerName: 'Present',          width: 150},
        { field: 'nb_absent',       headerName: 'Absent',           width: 150},
        { field: 'total_salary',    headerName: 'Total salaire',    width: 150}
    ]
    const rows = historicals.map(historical => ({
        id:             historical.weekpresence_id,
        month:          historical.month,
        first_date:     moment(historical.first_date).format('YYYY-MM-DD'),
        last_date:      moment(historical.last_date).format('YYYY-MM-DD'),
        nb_present:     historical.nb_present,
        nb_absent:      historical.nb_absent,
        total_salary:   historical.total_salary,
    }))

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
                Historique de présence
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
                    href='/employee/dailyemployee'
                >
                    Retour
                </Button>
            </Typography>

            <Container maxWidth="lg">
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            components={{ Toolbar: GridToolbar }}
                            pageSize={7}
                            rowsPerPageOptions={[7]}
                            disableSelectionOnClick
                        />
                    </Box>
                </Paper>
            </Container>
        </div>
    )
}

export default DailyPresenceHistory