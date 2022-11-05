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

  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

    const columns = [
        { field: 'matricule', headerName: 'Matricule', width: 100 },
        { field: 'firstname', headerName: 'Nom', width: 200 },
        { field: 'lastname', headerName: 'Prénom', width: 200 },
        { field: 'post_occupe', headerName: 'Poste occupé', width: 200 },
        { field: 'start_conge', headerName: 'Début de congé', width: 250 },
        { field: 'end_conge', headerName: 'Fin de congé', width: 250 },
        { field: 'number_days', headerName: 'Nombre de congés', width: 250,
            renderCell: (data) => {
                if (data.row.number_days) {
                return data.row.number_days + " jours"
                }
            }
        },
        { field: 'salary', headerName: 'Salaire', width: 250,
            renderCell: (data) => {
                if (data.row.salary) {
                  return data.row.salary + " Ar"
                }
            }
        },
        { field: 'montant', headerName: 'Montant', width: 250,
            // renderCell: (data) => {
                
            // }
        },
        { field: 'action', headerName: 'Action', width: 250, type: 'action',
            renderCell: (data) => {
                if (userInfo.role_id === 1) {
                    return (
                    <>
                        <Link href={'/conge/update-conge/' + data.id}>
                            <IconButton component="label">
                                <EditIcon />
                            </IconButton>
                        </Link>
                        <IconButton component="label" onClick={() => deleteConge(data.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                    ) 
                } else {
                    return (
                        <>
                            <Link href={'/conge/update-conge/' + data.id}>
                                <IconButton component="label">
                                    <EditIcon />
                                </IconButton>
                            </Link>
                        </>
                    ) 
                }
            }
        },
    ]

    const rows = conges.map(conge => ({
        id: conge.conge_id,
        matricule: conge.matricule,
        firstname: conge.firstname,
        lastname: conge.lastname,
        post_occupe: conge.post_occupe,
        start_conge: moment(conge.start_conge).format('DD-MM-YYYY'),
        end_conge: moment(conge.end_conge).format('DD-MM-YYYY'),
        number_days: conge.number_days,
        salary: conge.salary,
    }))

    console.log("CONGES ", conges);

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