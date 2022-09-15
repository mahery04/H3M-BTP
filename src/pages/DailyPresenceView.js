import React, { useState, useEffect } from 'react'
import { Button, Card, CardContent, Container, TextField, Typography, FormControl, InputLabel, Select } from '@mui/material'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 

import dailyPresenceService from '../services/dailyPresenceService';

import moment from 'moment';
import dayjs from 'dayjs';
import swal from '@sweetalert/with-react';

const DailyPresenceView = () => {

  const [months, setMonth] = useState([])
  const [monthValue, setMonthValue] = useState('')
  
  const insertMonth = (newMonth) => {
    const m = moment(newMonth.$d).format('MMMM YYYY')
    setMonth(m)
  }

  const getMonths = () => {
    dailyPresenceService.getMonth().then((res)=> {
      setMonth(res.data)
      console.log("MONTH ", res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getMonths()
  }, [])

  const handleMonthChange = (e) => {
    const monthPresence = e.target.value
    setMonthValue(monthPresence)
  }
  

  return (
    <>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Présence des employées journaliers - vue global
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
          // startIcon={<VisibilityIcon />}
          href='/presence/dailypresence-view'
        >
          Retour
        </Button>
      </Typography>

      <Container maxWidth="xxl">
        <Card sx={{ minWidth: 275 }} container>
          <CardContent>
          <FormControl variant="standard" sx={{ width: '100%', marginTop: 4 }}>
            <InputLabel htmlFor="grouped-native-select" id="month">Mois</InputLabel>
            <Select
                native
                id="grouped-native-select"
                label="Mois et année"
                // name="month"
                value={monthValue}
                onChange={handleMonthChange}
            >
                <option value=''></option>
                {months.map(month => (
                  <option key={month.id} value={`${month.id}`}>{month.MONTH} </option>
                ))}
            </Select>
          </FormControl>
            {/* &nbsp;&nbsp;&nbsp;
            <Button variant="contained" sx={{ mt: 2 }}>Afficher</Button> */}
          </CardContent> 
        </Card>

        
      </Container>
    </>
  )
}

export default DailyPresenceView