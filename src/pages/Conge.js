import React, { useState, useEffect } from 'react';

import { Button, Paper, Container, Chip, Stack, Box, Typography, Link } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from '@sweetalert/with-react';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import moment from 'moment'
import congeService from '../services/congeService'
import { useNavigate } from 'react-router-dom';

function Conge() {

    const notification = () => {
        let url = window.location.href
        let param = url.split('?')
        if(param[1] === 'inserted') {
          swal("", "Congé enregistrée !", "success");
        } else if(param[1] === 'deleted') {
          swal("", "Congé supprimé avec succés!", "success");
        } else if(param[1] === 'updated') {
          swal("", "Congé modifié avec succés!", "success");
        }
    }
    
    notification()

    const navigate = useNavigate()
    const [conges, setConges] = useState([])

    const getConges = () => {
        congeService.getAll().then(res => {
            setConges(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getConges()
    }, [])

    const deleteConge = (id) => {
        swal({
            text: "Supprimer le congé ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    congeService.remove(id)
                    const newTabList = conges.filter(conge => conge.conge_id !== id)
                    setConges(newTabList)
                    navigate('/conge/personnal?deleted')
                }
            });
    }

    const columns = [
        { field: 'employee', headerName: 'Employé', width: 450 },
        { field: 'start_conge', headerName: 'Début de congé', width: 250 },
        { field: 'end_conge', headerName: 'Fin de congé', width: 250 },
        { field: 'action', headerName: 'Action', width: 250, type: 'action',
            renderCell: (data) => {
                return (
                <>
                    <Link href={'/conge/update-conge/' + data.id}>
                        <IconButton component="label" onClick={() => deleteConge(data.id)}>
                            <EditIcon />
                        </IconButton>
                    </Link>
                    <IconButton component="label" onClick={() => deleteConge(data.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
                )
            }
        },
    ]

    const rows = conges.map(conge => ({
        id: conge.conge_id,
        employee: conge.employee,
        start_conge: moment(conge.start_conge).format('DD-MM-YYYY'),
        end_conge: moment(conge.end_conge).format('DD-MM-YYYY'),
    }))


  return (
    <div>
        <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
            Listes des congés des employés
            <Button
                size="medium"
                variant="outlined"
                color="primary"
                sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
                startIcon={<AddIcon />}
                href='/conge/new'
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
    </div>
  )
}

export default Conge