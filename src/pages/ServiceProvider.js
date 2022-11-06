import React, { useEffect, useState } from 'react';
import { Button, Paper, Container, Chip, Stack, Box, Typography, Link, Modal } from '@mui/material'

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { useNavigate } from 'react-router-dom';

import swal from '@sweetalert/with-react';

import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import moment from 'moment'
import serviceProviderService from '../services/serviceProviderService';


function ServiceProvider() {

    const notification = () => {
        let url = window.location.href
        let param = url.split('?')
        if(param[1] === 'inserted') {
          swal("", "Prestataire enregistré !", "success");
        } else if(param[1] === 'deleted') {
          swal("", "Prestataire supprimé avec succés!", "success");
        } else if(param[1] === 'updated') {
          swal("", "Prestataire modifié avec succés!", "success");
        }
    }

    notification()

    const navigate = useNavigate()
    const [providers, setproviders] = useState([])

    const getListsServiceProvider = () => {
        serviceProviderService.getAll().then((res) => {
            setproviders(res.data)
        }).catch(err => {
            console.log(err)
        }) 
    }

    useEffect(() => {
      getListsServiceProvider()
    }, [])
    
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

    const columns = [
        { field: 'firstname', headerName: 'Nom', width: 200 },
        { field: 'lastname', headerName: 'Prénom', width: 200 },
        { field: 'cin', headerName: 'Numéro CIN', width: 150, type: 'number' },
        { field: 'address', headerName: 'Adresse', width: 200 },
        { field: 'contact', headerName: 'Contact', width: 150 },
        { field: 'start_contract', headerName: 'Début de contrat', width: 150 },
        { field: 'end_contract', headerName: 'Fin de contrat', width: 150 },
        { field: 'number_days', headerName: 'Nombre de jours', width: 150,
            renderCell: (data) => {
                if (data.row.number_days) {
                return data.row.number_days + " jours"
                }
            }
        },
        { field: 'post_occupe', headerName: 'Poste occupé', width: 200 },
        { field: 'salary', headerName: 'Salaire', width: 200,
            renderCell: (data) => {
                if (data.row.salary) {
                return data.row.salary + " Ar"
                }
            }
        },
        { field: 'action', headerName: 'Action', width: 200, type: 'action',
            renderCell: (data) => {
                if (userInfo.role_id === 1) {
                    return (
                    <>
                        <Link href={'/conge/update-conge/' + data.id}>
                            <IconButton component="label">
                                <EditIcon />
                            </IconButton>
                        </Link>
                        <IconButton component="label" onClick={() => deleteprovider(data.id)}>
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
    ];

    const rows = providers.map(provider => ({
        id: provider.provider_id,
        firstname: provider.firstname,
        lastname: provider.lastname,
        cin: provider.cin,
        address: provider.address,
        contact: provider.contact,
        start_contract: moment(provider.start_contract).format('DD-MM-YYYY'),
        end_contract: moment(provider.end_contract).format('DD-MM-YYYY'),
        number_days: provider.number_days,
        post_occupe: provider.post_occupe,
        salary: provider.salary
    }))

    const deleteprovider = (id) => {
        swal({
          text: "Supprimer le prestataire de la liste ?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if(willDelete) { 
            serviceProviderService.remove(id)
            const newTabList = providers.filter((provider) => provider.id !== id)
            setproviders(newTabList)
            document.location.reload(true)
          } 
        });
      }

      console.log("PROVIDERS ", providers);

  return (
    <div>
        <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
            Listes des prestataires 
            <Button
            size="medium"
            variant="outlined"
            color="primary"
            sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
            startIcon={<AddIcon />}
            href='/service-provider/new'
            >
            Nouveau prestataire
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

export default ServiceProvider