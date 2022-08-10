import React, { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import dailyEmployeeService from '../services/dailyEmployeeService';

import { useParams } from 'react-router-dom';

function EmployeePresence() {

    const initialEmployeeState = {
        id:           null,
        matricule:    '',
        firstname:    '',
        lastname:     ''
    }

    const findEmployee = useParams();
    const employee_id = findEmployee.id 
    const [loaded, setLoaded] = useState(false)
    const [dailyemployee, setDailyemployee] = useState(initialEmployeeState)


    useEffect(() => {
        const load = async () => {
          const res = await dailyEmployeeService.get(employee_id)
          console.log("RES LAVA BE ", res.data);
          setDailyemployee(res.data)
          setLoaded(true)
        }
        if (employee_id && !loaded) {
          load();
        }
    }, [employee_id, loaded])

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
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <b>N° Matricule : </b>{dailyemployee.matricule} <br/>
                <b>NOM : </b> {dailyemployee.firstname} <br/>
                <b>Prénom : </b> {dailyemployee.lastname} <br/>
            </CardContent>
        </Card>
    </div>
  )
}

export default EmployeePresence