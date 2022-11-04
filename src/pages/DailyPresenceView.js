 import React, { useState, useEffect } from 'react'
import { Button, Card, CardContent, Container, TextField, Typography, FormControl, InputLabel, Select, Paper, Box, Link } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import Label from '../components/Label';
import dailyPresenceService from '../services/dailyPresenceService';

import moment from 'moment';
import swal from '@sweetalert/with-react';

const DailyPresenceView = () => {

  const [months, setMonth] = useState([])
  const [monthValue, setMonthValue] = useState('')
  const [views, setViews] = useState([])

  const getMonths = () => {
    dailyPresenceService.getMonth().then((res)=> {
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
    dailyPresenceService.globalView(data).then(res => {
      setViews(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  
    var isDisabled = false

    const updateValidation = (id) => {
      swal({
        text: "Voulez-vous vraiment valider ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((validate) => {     
        if (validate) {
          dailyPresenceService.validationUpdate(id)
          // const valide = views.filter(view => view.weekpresence_id)
          // console.log("VAL", valide.validation);
          // isDisabled = true
          window.location.reload()
        }
      });
    }

  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

  const columns = [
    { field: 'month',           headerName: 'Mois',                 width: 150},
    // { field: 'date',            headerName: 'Date',                 width: 150},
    { field: 'matricule',       headerName: 'Matricule',            width: 90},
    { field: 'firstname',       headerName: 'Nom',                  width: 200},
    { field: 'lastname',        headerName: 'Prénom',               width: 200},
    // { field: 'post_name',       headerName: 'Poste occupé',         width: 150},
    // { field: 'first_date',      headerName: 'Début',                width: 150},
    // { field: 'last_date',       headerName: 'Fin',                  width: 150},
    { field: 'day1',        headerName: 'Jour 1',               width: 120},
    { field: 'day2',        headerName: 'Jour 2',               width: 120},
    { field: 'day3',        headerName: 'Jour 3',               width: 120},
    { field: 'day4',        headerName: 'Jour 4',               width: 120},
    { field: 'day5',        headerName: 'Jour 5',               width: 120},
    { field: 'day6',        headerName: 'Jour 6',               width: 120},
    { field: 'day7',        headerName: 'Jour 7',               width: 120},

    { field: 'nb_present',      headerName: 'N/bre jour présent',       width: 150},
    { field: 'nb_half_day',      headerName: 'N/bre demi-journée',       width: 150},
    { field: 'nb_absent',      headerName: 'N/bre jour absent',       width: 150},
    // { field: 'nb_absent',       headerName: 'Total absence',        width: 150},
    { field: 'salary',           headerName: 'Salaire',                 width: 100,
      renderCell: (data) => {
        if (data.row.salary) return `${data.row.salary} Ar`
      }
    },
    { field: 'total_salary',    headerName: 'Montant',        width: 150, type: 'action',
      renderCell: (data) => {
        if (data.row.total_salary) return `${data.row.total_salary} Ar`
      }
    },
    { field: 'validation',          headerName: 'Status',               width: 100,
      renderCell: (data) => {
        if (data.row.validation === 'NON VALIDE') {
          return ( <Label variant="ghost" color='error'>{data.row.validation}</Label> )
        } else if(data.row.validation === 'VALIDE') {
          return ( <Label variant="ghost" color='success'>{data.row.validation}</Label> )
        }
      }
    },
    { field: 'signature',    headerName: 'Signature',        width: 100},
    { field: 'action',    headerName: 'Action',        width: 100,type:'action',
      renderCell: (data) => {     
        if (userInfo.role_id === 1) {
          if (data.row.validation === 'NON VALIDE') {
            return (
              <div>
                <Button onClick={() => updateValidation(data.id)} variant="contained" color="warning" disabled={isDisabled}>Valider</Button>
              </div>
            )
          } else if (data.row.validation === 'VALIDE') {
            return (
              <div>
                <Button variant="contained" color="warning" disabled>Valider</Button>
              </div>
            )
          }
        } 
      }
    },
  ]

  console.log("VIEW", views);
  
  const rows = views.map(view => ({
    id:           view.weekpresence_id,
    month:        view.month,
    matricule:    view.matricule,
    firstname:    view.firstname,
    lastname:     view.lastname,
    day1: view.full_date.split(' ')[0],
    day2: view.full_date.split(' ')[1],
    day3: view.full_date.split(' ')[2],
    day4: view.full_date.split(' ')[3],
    day5: view.full_date.split(' ')[4],
    day6: view.full_date.split(' ')[5],
    day7: view.full_date.split(' ')[6],
    nb_present:   view.nb_present,
    nb_half_day:  view.nb_half_day,
    nb_absent:    view.nb_absent,
    salary:       view.salary,
    validation:   view.validation,
    total_salary: view.total_salary,
  }))

  return (
    <>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Présence des employées journaliers - vue global
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
          startIcon={<ArrowBackIcon />}
          href='/presence/dailypresence'
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

export default DailyPresenceView