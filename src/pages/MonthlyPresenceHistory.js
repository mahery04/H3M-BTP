import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import moment from 'moment'

import { Box, Breadcrumbs, Button, Container, Paper, Stack, Typography } from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import monthlyEmployeeService from '../services/monthlyEmployeeService'
import monthlyPresenceService from '../services/monthlyPresenceService'

const MonthlyPresenceHistory = () => {

    // //Get monthlyemployee
    const findData = useParams()
    const monthlyemployee_id = findData.id
    const [employee, setEmployee] = useState({ matricule: '', firstname: '', lastname: '' })

    useEffect(() => {
        monthlyEmployeeService.get(monthlyemployee_id).then((employee) => {
            setEmployee({ matricule: employee.data.matricule, firstname: employee.data.firstname, lastname: employee.data.lastname })
        })
    }, [monthlyemployee_id])

    // //Get history
    const [historicals, setHistoricals] = useState([])

    const getHistoricals = () => {
        monthlyPresenceService.history(monthlyemployee_id).then((res) => {
            setHistoricals(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getHistoricals()
    }, [])

    const columns = [
        { field: 'month',           headerName: 'Mois de',              width: 200},
        { field: 'first_date',      headerName: 'Date de début',        width: 200},
        { field: 'last_date',       headerName: 'Date de fin',          width: 200},
        { field: 'nb_present',      headerName: 'Total Jour Présent',   width: 150},
        { field: 'nb_absent',       headerName: 'Total Jour Absent',    width: 150},
        { field: 'advance',         headerName: 'Total Avance',         width: 150, type: 'action',
            renderCell: (data) => {
                if (data.row.advance) return `${data.row.advance} Ar`
            }
        },
        { field: 'total_salary',    headerName: 'Total salaire',        width: 200, type: 'action',
            renderCell: (data) => {
                if (data.row.total_salary) return `${data.row.total_salary} Ar`
            }
        }
    ]
    const rows = historicals.map(historical => ({
        id:             historical.monthlyweekpresence_id,
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
                    href='/presence/monthlypresence'
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

export default MonthlyPresenceHistory