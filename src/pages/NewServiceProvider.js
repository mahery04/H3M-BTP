import React, { useEffect, useState } from 'react';

import { Button, Card, Grid, TextField,CardContent, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl, Divider, Chip, InputAdornment } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';


function NewServiceProvider() {
  return (
    <div>
        <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
          Nouveau Prestataire
          <Button
            size="medium"
            variant="outlined"
            color="primary"
            sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
            startIcon={<ArrowBackIcon />}
            href='/service-provider/personnal'
          >
          Retour
          </Button>
        </Typography>
    </div>
  )
}

export default NewServiceProvider