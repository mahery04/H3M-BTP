import React, { useEffect, useState } from 'react';
import { Button, Paper, Container, Chip, Stack, Box, Typography, Link, Modal } from '@mui/material'

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function ServiceProvider() {


    const columns = [
        { field: 'firstname', headerName: 'Nom', width: 200 },
        { field: 'lastname', headerName: 'Prénom', width: 200 },
        { field: 'cin', headerName: 'Numéro CIN', width: 150, type: 'number' },
        { field: 'address', headerName: 'Adresse', width: 200 },
        { field: 'contact', headerName: 'Contact', width: 150 },
        { field: 'start_contract', headerName: 'Début de contrat', width: 150 },
        { field: 'end_contract', headerName: 'Fin de contrat', width: 150 },
        { field: 'number_days', headerName: 'Nombre de jours', width: 200 },
        { field: 'post', headerName: 'Poste occupé', width: 200 },
        { field: 'salary', headerName: 'Salaire', width: 200 },
        { field: 'action', headerName: 'Action', width: 200, type: 'action',
            // renderCell: (data) => {
            //     if (userInfo.role_id === 1) {
            //         return (
            //         <>
            //             <Link href={'/conge/update-conge/' + data.id}>
            //                 <IconButton component="label">
            //                     <EditIcon />
            //                 </IconButton>
            //             </Link>
            //             <IconButton component="label" onClick={() => deleteConge(data.id)}>
            //                 <DeleteIcon />
            //             </IconButton>
            //         </>
            //         ) 
            //     } else {
            //         return (
            //             <>
            //                 <Link href={'/conge/update-conge/' + data.id}>
            //                     <IconButton component="label">
            //                         <EditIcon />
            //                     </IconButton>
            //                 </Link>
            //             </>
            //         ) 
            //     }
            // }
        },
    ];

    const rows = []


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