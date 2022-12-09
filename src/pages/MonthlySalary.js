import React, { useEffect, useState } from 'react';

import { Button, Paper, Container, Chip, Stack, Box, Typography, Link, Modal } from '@mui/material'

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import moment from 'moment'

import monthlySalaryService from '../services/monthlySalaryService';
import monthlyEmployeeService from '../services/monthlyEmployeeService';


function MonthlySalary() {

    const [monthlyEmployees, setMonthlyemployees] = useState([])
    const [monthlySalaries, setmonthlySalaries] = useState([])

    const getMonthlyEmployees = () => {
      monthlyEmployeeService.getAll().then((res) => {
        setMonthlyemployees(res.data)
      }).catch(err => {
        console.log(err);
      })
    }

    useEffect(() => {
      getMonthlyEmployees()
    }, [])

    console.log("ME ", monthlyEmployees);
    // var date = new Date(monthlySalaries[0].return_date)
    // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    // console.log("FM ", lastDay.getDate()-monthlySalaries[0].number_days_absence);
    

    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

    const columns = [
        { field: 'matricule', headerName: 'Matricule', width: 100 },
        { field: 'firstname', headerName: 'Nom', width: 250 },
        { field: 'lastname', headerName: 'Prénom', width: 250 },
        { field: 'hiring_date', headerName: 'Date d\'embauche', width: 150, 
          renderCell: (data) => {
            if (data.row.hiring_date) {
              return moment(data.row.hiring_date).format('YYYY-MM-DD') 
            }
          }
        },
        { field: 'post_occupe', headerName: 'Poste occupé', width: 150 },
        { field: 'category', headerName: 'Catégorie', width: 200 },
        { field: 'group', headerName: 'Groupe', width: 100 },
        // { field: 'salary', headerName: 'Salaire de base', width: 150,
        //     renderCell: (data) => {
        //         return data.row.salary + " Ar"
        //     }
        // },
        // { field: 'number_work', headerName: 'Nombres de jours travaillés', width: 200,
        //     renderCell: (data) => {
        //         var date = new Date(data.row.return_date)
        //         // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        //         var numberDaysOneMonth = 30
        //             return numberDaysOneMonth-data.row.number_days_absence  + " jours"
        //     }
        // },
        // { field: 'hours_supplementary', headerName: 'Heure supplémentaire', width: 200,
        //     renderCell: (data) => {
        //        return data.row.heure_supplementaire +" h"+" : "+data.row.minute_supplementaire +" mn"
        //     }
        // },
        // { field: 'absence', headerName: 'Absence', width: 100,
        //     renderCell: (data) => {
        //         return data.row.number_days_absence + " jours"
        //     }
        // },
        // { field: 'prime', headerName: 'Prime', width: 100,
        //     renderCell: (data) => {
        //         return data.row.prime + " Ar"
        //     }
        // },
        // { field: 'conge', headerName: 'Congé', width: 100,
        //     renderCell: (data) => {
        //         return data.row.conge + " Ar"
        //     }
        // },
        // { field: 'indeminite_transport', headerName: 'Indeminité de transport', width: 200,
        //     renderCell: (data) => {
        //         return data.row.indeminite_transport + " Ar"
        //     }
        // },
        // { field: 'autres_indeminités', headerName: 'Autres indeminités', width: 150,
        //     renderCell: (data) => {
        //         return data.row.autres_indeminités + " Ar"
        //     }
        // },
        // { field: 'salary_brut', headerName: 'Salaire brut', width: 220,
        //     renderCell: (data) => {
        //         var date = new Date(data.row.return_date)
        //         var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        //         return ((data.row.salary*(lastDay.getDate()-data.row.number_days_absence)/30)+data.row.heure_supplementaire-data.row.number_days_absence+data.row.prime+data.row.indeminite_transport+data.row.conge+data.row.autres_indeminités).toFixed(2)+" Ariary"
        //     }
        // },
        // { field: 'ostie_part', headerName: 'OSTIE part employé', width: 200,
        //     renderCell: (data) => {
        //         var date = new Date(data.row.return_date)
        //         var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        //         var salaryBrut = (data.row.salary*(lastDay.getDate()-data.row.number_days_absence)/30)+data.row.heure_supplementaire-data.row.number_days_absence+data.row.prime+data.row.indeminite_transport+data.row.conge+data.row.autres_indeminités
        //         return Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)+" Ar"
        //     }
        // },
        // { field: 'cnaps_part', headerName: 'CNAPS part employé', width: 200,
        //     renderCell: (data) => {
        //         var date = new Date(data.row.return_date)
        //         var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        //         var salaryBrut = (data.row.salary*(lastDay.getDate()-data.row.number_days_absence)/30)+data.row.heure_supplementaire-data.row.number_days_absence+data.row.prime+data.row.indeminite_transport+data.row.conge+data.row.autres_indeminités
        //         return Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)+" Ar"
        //     }
        // },
        // { field: 'montant_imposable', headerName: 'Montant imposable', width: 200,
        //     renderCell: (data) => {
        //         var date = new Date(data.row.return_date)
        //         var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        //         var salaryBrut = (data.row.salary*(lastDay.getDate()-data.row.number_days_absence)/30)+data.row.heure_supplementaire-data.row.number_days_absence+data.row.prime+data.row.indeminite_transport+data.row.conge+data.row.autres_indeminités
        //         var ostiePartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100)))
        //         var cnapsPartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100)))
        //         return (salaryBrut-ostiePartEmployee-cnapsPartEmployee).toFixed(2)+" Ar"
        //     }
        // },
        // { field: 'irsa', headerName: 'IRSA', width: 150,
        //     renderCell: (data) => {
        //         var date = new Date(data.row.return_date)
        //         var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        //         var salaryBrut = (data.row.salary*(lastDay.getDate()-data.row.number_days_absence)/30)+data.row.heure_supplementaire-data.row.number_days_absence+data.row.prime+data.row.indeminite_transport+data.row.conge+data.row.autres_indeminités
        //         var ostiePartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100)))
        //         var cnapsPartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100)))
        //         var montantImposable = salaryBrut-ostiePartEmployee-cnapsPartEmployee
                
        //         if (montantImposable <= 400000) {
        //             return Math.max((5/100)*(montantImposable-350000)).toFixed(2) +" Ar"
        //         } else if(montantImposable <= 500000) {
        //             return Math.max((montantImposable-400000)*(10/100) + 2500).toFixed(2) +" Ar"
        //         } else if (montantImposable <= 600000) {
        //             return Math.max((montantImposable-500000)*(15/100) + 12500).toFixed(2) +" Ar"
        //         } else if(montantImposable > 600000) {
        //             return Math.max((montantImposable-600000)*(20/100) + 27500).toFixed(2) +" Ar"
        //         } else {
        //             return 3000
        //         }
        //     }
        // },
        // { field: 'heure_non_imposable', headerName: 'Heure supplémentaire non imposable', width: 300,
        // renderCell: (data) => {
        //     return data.row.heure_non_imposable+ " h : " + data.row.minute_non_imposable + " mn"
        // }
        // },
        // { field: 'avance_quinzaine', headerName: 'Avance quinzaine', width: 150,
        //     renderCell: (data) => {
        //         return (data.row.avance_quinzaine).toFixed(2) + " Ar"
        //     }
        // },
        // { field: 'avance_speciale', headerName: 'Avance spéciale', width: 150,
        //     renderCell: (data) => {
        //         return (data.row.avance_speciale).toFixed(2) + " Ar"
        //     }
        // },
        // { field: 'enfant_charge', headerName: 'Enfant à charge', width: 150,
        //     renderCell: (data) => {
        //         return (data.row.enfant_charge).toFixed(2) + " Ar"
        //     }
        // },
        // { field: 'autres_deductions', headerName: 'Autres déductions', width: 150,
        //     renderCell: (data) => {
        //         return (data.row.autres_deductions).toFixed(2) + " Ar"
        //     }
        // },
        // { field: 'salary_net', headerName: 'Salaire net', width: 220,
        //     renderCell: (data) => {
        //         var date = new Date(data.row.return_date)
        //         var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        //         var salaryBrut = (data.row.salary*(lastDay.getDate()-data.row.number_days_absence)/30)+data.row.heure_supplementaire-data.row.number_days_absence+data.row.prime+data.row.indeminite_transport+data.row.conge+data.row.autres_indeminités
        //         var ostiePartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100)))
        //         var cnapsPartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100)))
        //         var montantImposable = salaryBrut-ostiePartEmployee-cnapsPartEmployee

        //         if (montantImposable <= 400000) {
        //             var Irsa = Math.max((5/100)*(montantImposable-350000))
        //         } else if(montantImposable <= 500000) {
        //             var Irsa = Math.max((montantImposable-400000)*(10/100) + 2500)
        //         } else if (montantImposable <= 600000) {
        //             var Irsa = Math.max((montantImposable-500000)*(15/100) + 12500)
        //         } else if(montantImposable > 600000) {
        //             var Irsa = Math.max((montantImposable-600000)*(20/100) + 27500)
        //         } else {
        //             return 3000
        //         }

        //         return (montantImposable-Irsa-data.row.avance_quinzaine-data.row.avance_speciale-data.row.enfant_charge+data.row.heure_non_imposable-data.row.autres_deductions).toFixed(2) + " Ariary"
        //     }
        // },
        // { field: 'ostie_patronale', headerName: 'OSTIE part patronale', width: 200,
        //     renderCell: (data) => {
        //         var date = new Date(data.row.return_date)
        //         var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        //         var salaryBrut = (data.row.salary*(lastDay.getDate()-data.row.number_days_absence)/30)+data.row.heure_supplementaire-data.row.number_days_absence+data.row.prime+data.row.indeminite_transport+data.row.conge+data.row.autres_indeminités
        //         return Math.min((217000*8)*(5/100),(salaryBrut*(5/100))).toFixed(2) + " Ar"
        //     }
        // },
        // { field: 'cnaps_patronale', headerName: 'CNAPS part patronale', width: 200,
        //     renderCell: (data) => {
        //         var date = new Date(data.row.return_date)
        //         var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        //         var salaryBrut = (data.row.salary*(lastDay.getDate()-data.row.number_days_absence)/30)+data.row.heure_supplementaire-data.row.number_days_absence+data.row.prime+data.row.indeminite_transport+data.row.conge+data.row.autres_indeminités
        //         return Math.min((217000*8)*(13/100),(salaryBrut*(13/100))).toFixed(2) + " Ar"
        //     }
        // },
        // { field: 'fmfp', headerName: 'FMPF', width: 200,
        //     renderCell: (data) => {
        //         var date = new Date(data.row.return_date)
        //         var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        //         var salaryBrut = (data.row.salary*(lastDay.getDate()-data.row.number_days_absence)/30)+data.row.heure_supplementaire-data.row.number_days_absence+data.row.prime+data.row.indeminite_transport+data.row.conge+data.row.autres_indeminités
        //         return Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2) + " Ar"
        //     }
        // },
        {
          field: 'etat_paie', headerName: 'Fiche de paie', width: 200, type: 'action',
            renderCell: (data) => {
              return (
                <>
                  <Stack direction="row">
                    <Link underline="none" href={'/state-pay/personnal/' + data.id}>
                      <Chip 
                        icon={<AddCircleIcon/>} 
                        label="Voir fiche de paie"
                        sx={{cursor:'pointer'}}
                        variant="outlined"
                        color="warning"
                      />
                    </Link>
                  </Stack>
                </>
              )
            }
          },

        // {field: 'action', headerName: 'Action', width: 100, type: 'action',
        //   renderCell: (data) => {
        //     if (userInfo.role_id === 1) {
        //       return (
        //         <>
        //           <Link href={'/monthly-salary/update-monthly/' + data.id}>
        //             <IconButton component="label">
        //               <EditIcon />
        //             </IconButton>
        //           </Link>
        //           <IconButton component="label">
        //             <DeleteIcon />
        //           </IconButton>
        //         </>
        //       )
        //     } else {
        //       return (
        //         <>
        //           <Link href={'/monthly-salary/update-monthly/' + data.id}>
        //             <IconButton component="label">
        //               <EditIcon />
        //             </IconButton>
        //           </Link>
        //         </>
        //       )
        //     }
        //   }
        // },
    ];

    const rows = monthlyEmployees.map(monthlyEmployee => ({
      id: monthlyEmployee.monthlyemployee_id,
      matricule: monthlyEmployee.matricule,
      firstname: monthlyEmployee.firstname,
      lastname: monthlyEmployee.lastname,
      hiring_date: monthlyEmployee.hiring_date,
      post_occupe: monthlyEmployee.post_occupe,
      category: monthlyEmployee.category,
      group: monthlyEmployee.group,
      // salary: monthlyEmployee.salary,
      // return_date: monthlyEmployee.return_date,
      // number_days_absence: monthlyEmployee.number_days_absence,
      // heure_supplementaire: monthlyEmployee.heure_supplementaire,
      // minute_supplementaire: monthlyEmployee.minute_supplementaire,
      // prime: monthlyEmployee.prime,
      // conge: monthlyEmployee.conge,
      // indeminite_transport: monthlyEmployee.indeminite_transport,
      // autres_indeminités: monthlyEmployee.autres_indeminités,
      // heure_non_imposable: monthlyEmployee.heure_non_imposable,
      // minute_non_imposable: monthlyEmployee.minute_non_imposable,
      // avance_quinzaine: monthlyEmployee.avance_quinzaine,
      // avance_speciale: monthlyEmployee.avance_speciale,
      // enfant_charge: monthlyEmployee.enfant_charge,
      // autres_deductions: monthlyEmployee.autres_deductions
    
    }))

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Listes personnels des états de paie mensuel
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
          startIcon={<VisibilityIcon />}
          href='/state-pay/paiement-global-view'
        >
          Vue global 
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

export default MonthlySalary