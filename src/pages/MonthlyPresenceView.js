import React, { useState, useEffect } from 'react'
import { Button, Card, CardContent, Container, TextField, Typography, FormControl, InputLabel, Select, Paper, Box } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import monthlyPresenceService from '../services/monthlyPresenceService';

import moment from 'moment';
import dayjs from 'dayjs';
import swal from '@sweetalert/with-react';

const MonthlyPresenceView = () => {

  const [months, setMonth] = useState([])
  const [monthValue, setMonthValue] = useState('')
  const [views, setViews] = useState([])

  const getMonths = () => {
    monthlyPresenceService.getMonth().then((res)=> {
      setMonth(res.data)
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

  const showData = e => {
    e.preventDefault()

    var data = { month: monthValue }
    monthlyPresenceService.globalView(data).then(res => {
      setViews(res.data)
    }).catch(err => {
      console.log(err)
    })
  }
  
  const columns = [
    { field: 'matricule',       headerName: 'Matricule',            width: 90},
    { field: 'firstname',       headerName: 'Nom',                  width: 200},
    { field: 'lastname',        headerName: 'Prénom',               width: 200},
    { field: 'post_name',       headerName: 'Poste occupé',         width: 150},
    { field: 'first_date',      headerName: 'Début',                width: 150},
    { field: 'last_date',       headerName: 'Fin',                  width: 150},
    { field: 'nb_present',      headerName: 'Total present',        width: 100},
    { field: 'nb_absent',       headerName: 'Total absent',         width: 100},
    { field: 'total_salary',    headerName: 'Total Salaire',        width: 100, type: 'action',
      renderCell: (data) => {
          if (data.row.total_salary) return `${data.row.total_salary} Ar`
      }
    },
    { field: 'total_advance',   headerName: 'Total Advance',        width: 150, type: 'action',
      renderCell: (data) => {
          if (data.row.total_advance) return `${data.row.total_advance} Ar`
      }
    },
    { field: 'signature',    headerName: 'Signature',               width: 100},
  ]

  const rows = views.map(view => ({
    id:           view.monthlyweekpresence_id,
    matricule:    view.matricule,
    firstname:    view.firstname,
    lastname:     view.lastname,
    post_name:    view.post_name,
    first_date:   moment(view.first_date).format('DD-MM-YYYY'),
    last_date:    moment(view.last_date).format('DD-MM-YYYY'),
    nb_present:   view.nb_present,
    nb_absent:    view.nb_absent,
    total_advance:view.total_advance,
    total_salary: view.total_salary,
  }))

  return (
    <>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Présence des employées mensuels - vue global
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
          startIcon={<ArrowBackIcon />}
          href='/presence/monthlypresence'
        >
          Retour
        </Button>
      </Typography>

      <Container maxWidth="xxl">
        <form onSubmit={showData} noValidate autoComplete='off'>
          <Card sx={{ minWidth: 275 }} container>
            <CardContent>
            <FormControl variant="standard" sx={{ width: 300 }}>
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
                    <option key={month.id} value={`${month.MONTH}`}>{month.MONTH} </option>
                  ))}
              </Select>
            </FormControl>
              &nbsp;&nbsp;&nbsp;
              <Button variant="contained" onClick={showData} sx={{ mt: 2 }}>Afficher</Button>
            </CardContent> 
          </Card>
        </form>
        

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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

export default MonthlyPresenceView