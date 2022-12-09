import React, { useState, useEffect } from 'react'
import { Button, Card, CardContent, Container, TextField, Typography, FormControl, InputLabel, Select, Paper, Box, Link } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import Label from '../components/Label';
import dailyPresenceService from '../services/dailyPresenceService';
import monthlySalaryService from '../services/monthlySalaryService';

import moment from 'moment';
import swal from '@sweetalert/with-react';

const PaymentGlobalView = () => {

  const [months, setMonth] = useState([])
  const [monthValue, setMonthValue] = useState('')
  const [views, setViews] = useState([])

  const getMonths = () => {
    monthlySalaryService.getMonth().then((res) => {
      setMonth(res.data)
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getMonths()
  }, [])

  console.log("MONTH ", months);

  const handleMonthChange = (e) => {
    const monthPresence = e.target.value
    setMonthValue(monthPresence)
  }

  const showData = e => {
    e.preventDefault()

    var data = { month: monthValue }
    monthlySalaryService.globalView(data).then(res => {
      setViews(res.data)
    }).catch(err => {
      console.log(err)
    })
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
    { field: 'month', headerName: 'Mois', width: 150 },
    { field: 'matricule', headerName: 'Matricule', width: 100 },
    { field: 'firstname', headerName: 'Nom', width: 200 },
    { field: 'lastname', headerName: 'Prénom', width: 200 },
    {
      field: 'hiring_date', headerName: 'Date d\'embauche', width: 200,
      renderCell: (data) => {
        if (data.row.hiring_date) {
          return moment(data.row.hiring_date).format('YYYY-MM-DD')
        }
      }
    },
    { field: 'post_occupe', headerName: 'Poste occupé', width: 250 },
    { field: 'category', headerName: 'Catégorie', width: 200 },
    { field: 'group', headerName: 'Groupe', width: 200,
    
    },
    {
      field: 'salary', headerName: 'Salaire de base', width: 150,
      renderCell: (data) => {
        return data.row.salary + " Ar"
      }
    },
    {
      field: 'number_work', headerName: 'Nombres de jours travaillés', width: 200,
      renderCell: (data) => {
        return data.row.number_work + " jours"
      }
    },
    {
      field: 'montant_supplementaire', headerName: 'Montant  supplémentaire', width: 200,
      renderCell: (data) => {
        return data.row.montant_supplementaire + " Ar"
      }
    },
    {
      field: 'absence', headerName: 'Absence', width: 100,
      renderCell: (data) => {
        return data.row.absence + " jours"
      }
    },
    {
      field: 'prime', headerName: 'Prime', width: 100,
      renderCell: (data) => {
        return data.row.prime + " Ar"
      }
    },
    {
      field: 'conge', headerName: 'Congé', width: 100,
      renderCell: (data) => {
        return data.row.conge + " Ar"
      }
    },
    {
      field: 'indeminite_transport', headerName: 'Indeminité de transport', width: 200,
      renderCell: (data) => {
        return data.row.indeminite_transport + " Ar"
      }
    },
    {
      field: 'autres_indeminités', headerName: 'Autres indeminités', width: 150,
      renderCell: (data) => {
        return data.row.autres_indeminités + " Ar"
      }
    },
    {
      field: 'salary_brut', headerName: 'Salaire brut', width: 220,
      renderCell: (data) => {
        // var numberDaysOneMonth = 30
        // var number_work_days = numberDaysOneMonth - data.row.number_days_absence
        // return ((data.row.salary * number_work_days / 30) + data.row.montant_supplementaire - data.row.number_days_absence + data.row.prime + data.row.indeminite_transport + data.row.conge + data.row.autres_indeminités).toFixed(2) + " Ariary"
        return data.row.salary_brut + " Ar"
      }
    },
    {
      field: 'ostie_part_employee', headerName: 'OSTIE part employé', width: 200,
      renderCell: (data) => {
        // var numberDaysOneMonth = 30
        // var number_work_days = numberDaysOneMonth - data.row.number_days_absence
        // var salaryBrut = ((data.row.salary * number_work_days / 30) + data.row.montant_supplementaire - data.row.number_days_absence + data.row.prime + data.row.indeminite_transport + data.row.conge + data.row.autres_indeminités).toFixed(2)
        // return Math.min((217000 * 8) * (1 / 100), (salaryBrut * (1 / 100))).toFixed(2) + " Ar"
        return data.row.ostie_part_employee + " Ar"
      }
    },
    {
      field: 'cnaps_part_employee', headerName: 'CNAPS part employé', width: 200,
      renderCell: (data) => {
        // var numberDaysOneMonth = 30
        // var number_work_days = numberDaysOneMonth - data.row.number_days_absence
        // var salaryBrut = ((data.row.salary * number_work_days / 30) + data.row.montant_supplementaire - data.row.number_days_absence + data.row.prime + data.row.indeminite_transport + data.row.conge + data.row.autres_indeminités).toFixed(2)
        // return Math.min((217000 * 8) * (1 / 100), (salaryBrut * (1 / 100))).toFixed(2) + " Ar"
        return data.row.cnaps_part_employee + " Ar"
      }
    },
    {
      field: 'montant_heure_imposable', headerName: 'Montant heure imposable', width: 200,
      renderCell: (data) => {
        // var numberDaysOneMonth = 30
        // var number_work_days = numberDaysOneMonth - data.row.number_days_absence
        // var salaryBrut = ((data.row.salary * number_work_days / 30) + data.row.montant_supplementaire - data.row.number_days_absence + data.row.prime + data.row.indeminite_transport + data.row.conge + data.row.autres_indeminités).toFixed(2)
        // var ostiePartEmployee = Math.min((217000 * 8) * (1 / 100), (salaryBrut * (1 / 100))).toFixed(2)
        // var cnapsPartEmployee = Math.min((217000 * 8) * (1 / 100), (salaryBrut * (1 / 100))).toFixed(2)
        // return (salaryBrut - ostiePartEmployee - cnapsPartEmployee).toFixed(2) + " Ar"
        return data.row.montant_heure_imposable + " Ar"
      }
    },
    {
      field: 'irsa', headerName: 'IRSA', width: 150,
      renderCell: (data) => {
        // var numberDaysOneMonth = 30
        // var number_work_days = numberDaysOneMonth - data.row.number_days_absence
        // var salaryBrut = ((data.row.salary * number_work_days / 30) + data.row.montant_supplementaire - data.row.number_days_absence + data.row.prime + data.row.indeminite_transport + data.row.conge + data.row.autres_indeminités).toFixed(2)
        // var ostiePartEmployee = Math.min((217000 * 8) * (1 / 100), (salaryBrut * (1 / 100))).toFixed(2)
        // var cnapsPartEmployee = Math.min((217000 * 8) * (1 / 100), (salaryBrut * (1 / 100))).toFixed(2)
        // var montantImposable = (salaryBrut - ostiePartEmployee - cnapsPartEmployee).toFixed(2)

        // if (montantImposable <= 400000) {
        //   return Math.max((5 / 100) * (montantImposable - 350000)).toFixed(2) + " Ar"
        // } else if (montantImposable <= 500000) {
        //   return Math.max((montantImposable - 400000) * (10 / 100) + 2500).toFixed(2) + " Ar"
        // } else if (montantImposable <= 600000) {
        //   return Math.max((montantImposable - 500000) * (15 / 100) + 12500).toFixed(2) + " Ar"
        // } else if (montantImposable > 600000) {
        //   return Math.max((montantImposable - 600000) * (20 / 100) + 27500).toFixed(2) + " Ar"
        // } else {
        //   return 3000
        // }
        return data.row.irsa + " Ar"
      }
    },
    {
      field: 'montant_non_imposable', headerName: 'Montant  supplémentaire non imposable', width: 300,
      renderCell: (data) => {
        return data.row.montant_non_imposable + " Ar"
      }
    },
    {
      field: 'avance_quinzaine', headerName: 'Avance quinzaine', width: 150,
      renderCell: (data) => {
        return data.row.avance_quinzaine + " Ar"
      }
    },
    {
      field: 'avance_speciale', headerName: 'Avance spéciale', width: 150,
      renderCell: (data) => {
        return data.row.avance_speciale + " Ar"
      }
    },
    {
      field: 'enfant_charge', headerName: 'Enfant à charge', width: 150,
      renderCell: (data) => {
        return data.row.enfant_charge + " Ar"
      }
    },
    {
      field: 'autres_deductions', headerName: 'Autres déductions', width: 150,
      renderCell: (data) => {
        return data.row.autres_deductions + " Ar"
        
      }
    },
    {
      field: 'salary_net', headerName: 'Salaire net', width: 220,
      renderCell: (data) => {
        // var numberDaysOneMonth = 30
        // var number_work_days = numberDaysOneMonth - data.row.number_days_absence
        // var salaryBrut = ((data.row.salary * number_work_days / 30) + data.row.montant_supplementaire - data.row.number_days_absence + data.row.prime + data.row.indeminite_transport + data.row.conge + data.row.autres_indeminités).toFixed(2)
        // var ostiePartEmployee = Math.min((217000 * 8) * (1 / 100), (salaryBrut * (1 / 100))).toFixed(2)
        // var cnapsPartEmployee = Math.min((217000 * 8) * (1 / 100), (salaryBrut * (1 / 100))).toFixed(2)
        // var montantImposable = (salaryBrut - ostiePartEmployee - cnapsPartEmployee).toFixed(2)

        // if (montantImposable <= 400000) {
        //   var Irsa = Math.max((5 / 100) * (montantImposable - 350000))
        // } else if (montantImposable <= 500000) {
        //   var Irsa = Math.max((montantImposable - 400000) * (10 / 100) + 2500)
        // } else if (montantImposable <= 600000) {
        //   var Irsa = Math.max((montantImposable - 500000) * (15 / 100) + 12500)
        // } else if (montantImposable > 600000) {
        //   var Irsa = Math.max((montantImposable - 600000) * (20 / 100) + 27500)
        // } else {
        //   var Irsa = 3000
        // }

        // return (montantImposable - Irsa - data.row.avance_quinzaine - data.row.avance_speciale - data.row.enfant_charge + data.row.montant_non_imposable - data.row.autres_deductions).toFixed(2) + " Ariary"
        return data.row.salary_net + " Ar"

      }
    },
    {
      field: 'ostie_part_patronale', headerName: 'OSTIE part patronale', width: 200,
      renderCell: (data) => {
        // var numberDaysOneMonth = 30
        // var number_work_days = numberDaysOneMonth - data.row.number_days_absence
        // var salaryBrut = ((data.row.salary * number_work_days / 30) + data.row.montant_supplementaire - data.row.number_days_absence + data.row.prime + data.row.indeminite_transport + data.row.conge + data.row.autres_indeminités).toFixed(2)
        // return Math.min((217000 * 8) * (5 / 100), (salaryBrut * (5 / 100))).toFixed(2) + " Ar"
        return data.row.ostie_part_patronale + " Ar"

      }
    },
    {
      field: 'cnaps_part_patronale', headerName: 'CNAPS part patronale', width: 200,
      renderCell: (data) => {
        // var numberDaysOneMonth = 30
        // var number_work_days = numberDaysOneMonth - data.row.number_days_absence
        // var salaryBrut = ((data.row.salary * number_work_days / 30) + data.row.montant_supplementaire - data.row.number_days_absence + data.row.prime + data.row.indeminite_transport + data.row.conge + data.row.autres_indeminités).toFixed(2)
        // return Math.min((217000 * 8) * (13 / 100), (salaryBrut * (13 / 100))).toFixed(2) + " Ar"
        return data.row.cnaps_part_patronale + " Ar"
      }
    },
    {
      field: 'fmfp', headerName: 'FMPF', width: 200,
      renderCell: (data) => {
        // var numberDaysOneMonth = 30
        // var number_work_days = numberDaysOneMonth - data.row.number_days_absence
        // var salaryBrut = ((data.row.salary * number_work_days / 30) + data.row.montant_supplementaire - data.row.number_days_absence + data.row.prime + data.row.indeminite_transport + data.row.conge + data.row.autres_indeminités).toFixed(2)
        // return Math.min((217000 * 8) * (1 / 100), (salaryBrut * (1 / 100))).toFixed(2) + " Ar"
        return data.row.fmpf + " Ar"
      }
    },

    {
      field: 'action', headerName: 'Action', width: 100, type: 'action',
      renderCell: (data) => {
        if (userInfo.role_id === 1) {
          return (
            <>
              <Link href={'/monthly-salary/update-monthly/' + data.id}>
                <IconButton component="label">
                  <EditIcon />
                </IconButton>
              </Link>
              {/* <IconButton component="label">
                <DeleteIcon />
              </IconButton> */}
            </>
          )
        } else {
          return (
            <>
              <Link href={'/monthly-salary/update-monthly/' + data.id}>
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

  console.log("VIEW", views);

  const rows = views.map(view => ({
    id: view.monthlysalary_id,
    month: view.month,
    matricule: view.matricule,
    firstname: view.firstname,
    lastname: view.lastname,
    hiring_date: view.hiring_date,
    post_occupe: view.post_occupe,
    category: view.category,
    group: view.group,
    salary: view.salary,
    number_work: view.number_work,
    montant_supplementaire: view.montant_supplementaire,
    absence: view.absence,
    prime: view.prime,
    conge: view.conge,
    indeminite_transport: view.indeminite_transport,
    autres_indeminités: view.autres_indeminités,
    salary_brut: view.salary_brut,
    ostie_part_employee: view.ostie_part_employee,
    cnaps_part_employee: view.cnaps_part_employee,
    montant_heure_imposable: view.montant_heure_imposable,
    irsa: view.irsa,
    montant_non_imposable: view.montant_non_imposable,
    avance_quinzaine: view.avance_quinzaine,
    avance_speciale: view.avance_speciale,
    enfant_charge: view.enfant_charge,
    autres_deductions: view.autres_deductions,
    salary_net: view.salary_net,
    ostie_part_patronale: view.ostie_part_patronale,
    cnaps_part_patronale: view.cnaps_part_patronale,
    fmpf: view.fmpf
  }))

  return (
    <>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Listes des états de paie des employés mensuels - vue global
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, width: 250, marginLeft: '70%' }}
          startIcon={<ArrowBackIcon />}
          href='/monthly-salary/personnal'
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
                    <option key={month.id} value={`${month.month}`}>{month.month} </option>
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

export default PaymentGlobalView