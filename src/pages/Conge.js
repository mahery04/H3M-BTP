import React, { useState, useEffect } from 'react';

import { Button, Paper, Container, Chip, Stack, Box, Typography, Tooltip, Link } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import swal from '@sweetalert/with-react';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import moment from 'moment'
import congeService from '../services/congeService'
import { useNavigate } from 'react-router-dom';

import Label from '../components/Label';


function Conge() {

    const notification = () => {
        let url = window.location.href
        let param = url.split('?')
        if(param[1] === 'inserted') {
          swal("", "Congé enregistré !", "success");
        } else if(param[1] === 'deleted') {
          swal("", "Congé supprimé avec succés!", "success");
        } else if(param[1] === 'updated') {
          swal("", "Congé modifié avec succés!", "success");
        } else if (param[1] === 'validated') {
          swal("", "Congé validé avec succés!", "success");
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

    const updateValidation = (id) => {
        swal({
          text: "Voulez-vous vraiment valider ?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((validate) => {     
          if (validate) {
            congeService.validation(id)
            // const valide = views.filter(view => view.permission_id)
            // console.log("VAL", valide.validation);
            // isDisabled = true
            // window.location.reload()
            navigate('/conge/personnal?validated')
          }
        });
      }

  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

    const columns = [
        { field: 'matricule', headerName: 'Matricule', width: 100 },
        { field: 'firstname', headerName: 'Nom', width: 200 },
        { field: 'lastname', headerName: 'Prénom', width: 200 },
        { field: 'hiring_date', headerName: 'Date d\'embauche', width: 200 },
        { field: 'post_occupe', headerName: 'Poste occupé', width: 200 },
        { field: 'category', headerName: 'Catégorie', width: 200 },
        { field: 'group', headerName: 'Groupe', width: 200 },
        { field: 'conge_motif', headerName: 'Motif de congé', width: 200,
            renderCell: (data) => {
                if (data.row.conge_motif)
                return (
                <Tooltip title={data.row.conge_motif}>
                    <InfoIcon sx={{ color: 'grey' }}/>
                </Tooltip>
                )
            }  
        },
        { field: 'start_conge', headerName: 'Date de départ', width: 250 },
        { field: 'end_conge', headerName: 'Date de retour', width: 250 },
        { field: 'number_days', headerName: 'Nombre de jour congé', width: 250,
            renderCell: (data) => {
                if (data.row.number_days) {
                return data.row.number_days + " jours"
                }
            }
        },
        { field: 'conge_before_request', headerName: 'Solde congé avant demande', width: 250,
            renderCell: (data) => {
                if (data.row.conge_before_request) {
                return data.row.conge_before_request + " jours"
                }
            }
        },
        { field: 'new_solde_conge', headerName: 'Nouveau solde congé', width: 200,
            renderCell: (data) => {
                if (data.row.new_solde_conge < 0 || data.row.new_solde_conge > 90) {
                    // return data.row.new_solde_conge + " jours"
                    return ( <Label variant="ghost" color='error'>{data.row.new_solde_conge + " jours"}</Label> )
                }
            }
        },
        { field: 'visa_rh', headerName: 'Visa RH', width: 250,
            renderCell: (data) => {
                if (data.row.visa_rh === 'En attente') {
                return ( <Label variant="ghost" color='warning'>{data.row.visa_rh}</Label> )
                } else if(data.row.visa_rh === 'Accordé') {
                return ( <Label variant="ghost" color='success'>{data.row.visa_rh}</Label> )
                } else if (data.row.visa_rh === 'Non accordé') {
                return ( <Label variant="ghost" color='error'>{data.row.visa_rh}</Label> )
                }
            }
        },

        {
            field: 'approval_direction', headerName: 'Approbation direction', width: 200,
            renderCell: (data) => {
              if (data.row.approval_direction === 'NON VALIDE') {
                return ( <Label variant="ghost" color='error'>{data.row.approval_direction}</Label> )
              } else if(data.row.approval_direction === 'VALIDE') {
                return ( <Label variant="ghost" color='success'>{data.row.approval_direction}</Label> )
              }
            }
        },

        { field: 'action', headerName: 'Action', width: 250, type: 'action',
            renderCell: (data) => {
                if (userInfo.role_id === 1) {
                if (data.row.approval_direction === "VALIDE") {
                    return (
                    <>
                        <Link href={'/conge/update-conge/' + data.id}>
                        <IconButton component="label">
                            <EditIcon />
                        </IconButton>
                        </Link>
                        <IconButton component="label">
                        <CheckCircleIcon />
                        </IconButton>
                        <IconButton component="label" onClick={() => deleteConge(data.id)}>
                        <DeleteIcon sx={{ color: "red" }} />
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
                        <IconButton component="label" onClick={() => updateValidation(data.id)}>
                        <CheckCircleIcon sx={{ color: "green" }} />
                        </IconButton>
                        <IconButton component="label" onClick={() => deleteConge(data.id)}>
                        <DeleteIcon sx={{ color: "red" }} />
                        </IconButton>
                    </>
                    )
                }
                } else {
                return (
                    <>
                    <Link href={'/conge/update-permission/' + data.id}>
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
        hiring_date: conge.hiring_date,
        post_occupe: conge.post_occupe,
        category: conge.category,
        group: conge.group,
        conge_motif: conge.conge_motif,
        start_conge: moment(conge.start_conge).format('DD-MM-YYYY'),
        end_conge: moment(conge.end_conge).format('DD-MM-YYYY'),
        number_days: conge.number_days,
        conge_before_request: conge.conge_before_request,
        new_solde_conge: conge.new_solde_conge,
        visa_rh : conge.visa_rh,
        approval_direction: conge.approval_direction
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