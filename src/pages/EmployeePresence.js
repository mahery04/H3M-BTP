import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function EmployeePresence() {
  return (
    <div>
        <Button 
            variant="contained"
            href={'/presence/dailypresence'}
        >
            Retour
        </Button> 
        <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
            Listes des présences des employés
        </Typography>
    </div>
  )
}

export default EmployeePresence