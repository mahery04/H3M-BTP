import React, { useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import { Button, Paper, Container, Chip, Stack, Box, Typography, Link } from '@mui/material'

import moment from 'moment'
import swal from '@sweetalert/with-react';

import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import cantineService from '../services/cantineService'

const Cantine = () => {

    const notification = () => {
        let url = window.location.href
        let param = url.split('?')
        if(param[1] === 'inserted') {
          swal("", "Cantine enregistrée !", "success");
        } else if(param[1] === 'deleted') {
          swal("", "Cantine supprimé avec succés!", "success");
        } else if(param[1] === 'updated') {
          swal("", "Cantine modifié avec succés!", "success");
        }
    }
    
    notification()

    const navigate = useNavigate()


    const [cantines, setCantines] = useState([])

    const getCantines = () => {
        cantineService.getAll().then(res => {
            setCantines(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getCantines()
    }, {})

    const columns = [
        { field: 'month',                   headerName: 'Mois de',                  width: 250 },
        { field: 'date',                    headerName: 'Date',                     width: 250 },
        { field: 'nb_people',               headerName: 'Personnes',                width: 250,
            renderCell: (data) => {
                return (`${data.row.nb_people} personnes`)
            }
        },
        {
            field: 'total_kapoka_vary', headerName: 'Total Kapoaka Vary', width: 250,
            renderCell: (data) => {
                return (`${data.row.total_kapoka_vary} Kapoaka`)
            }
        },
        {
            field: 'total_budget_vary', headerName: 'Total "Budget Vary"', width: 250,
            renderCell: (data) => {
                return (`${data.row.total_budget_vary} Ar`)
            }
        },
        {
            field: 'total_kapoka_voamaina', headerName: 'Total Kapoaka Voamaina', width: 250,
            renderCell: (data) => {
                return (`${data.row.total_kapoka_voamaina} Kapoaka`)
            }
        },
        {
            field: 'total_budget_voamaina', headerName: 'Total "Budget Voamaina"', width: 250,
            renderCell: (data) => {
                return (`${data.row.total_budget_voamaina} Ar`)
            }
        },
        {
            field: 'total_depense', headerName: 'Total depense', width: 200, type: 'action',
            renderCell: (data) => {
                return (`${data.row.total_depense} Ar`)
            }
        },
        {
            field: 'action', headerName: 'Action', width: 200, type: 'action',
            renderCell: (data) => {
                return (
                    <>
                        <IconButton component="label" onClick={() => deleteCantine(data.id)}>
                            <DeleteIcon />
                        </IconButton>

                    </>
                )
            }
        }
    ]

    const rows = cantines.map(cantine => ({
        id:                     cantine.id_cantine,
        month:                  cantine.month,
        date:                   moment(cantine.first_date).format('DD-MM-YYYY'),
        nb_people:              cantine.nb_people,
        total_kapoka_vary:      cantine.total_kapoka_vary,
        total_budget_vary:      cantine.total_budget_vary,
        total_kapoka_voamaina:  cantine.total_kapoka_voamaina,
        total_budget_voamaina:  cantine.total_budget_voamaina,
        total_depense:          cantine.total_depense,
    }))

    const deleteCantine = (id) => {
        swal({
          text: "Supprimer la cantine ?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if(willDelete) { 
            cantineService.remove(id)
            const newTabList = cantines.filter((cantine) => cantine.id !== id)
            setCantines(newTabList)
            navigate('/cantine/budget?deleted')
          }
        });
      }

    return (
        <>
            <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
                Budget Cantine
                <Button
                    size="medium"
                    variant="outlined"
                    color="primary"
                    sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
                    startIcon={<AddIcon />}
                    href='/cantine/new'
                >
                    Nouveau
                </Button>
            </Typography>

            <Container maxWidth="xxl">
                <Paper sx={{ width: '95%', overflow: 'hidden' }}>
                    <Box sx={{ height: 450, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            components={{ Toolbar: GridToolbar }}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                        />
                    </Box>
                </Paper>
            </Container>
        </>
    )
}

export default Cantine