import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import { jsPDF } from "jspdf";

// import {
//     DataGridPremium,
//     GridToolbarContainer, 
//     GridToolbarColumnsButton,
//     GridToolbarFilterButton,
//     GridToolbarExport,
//     GridToolbarDensitySelector,
// } from '@mui/x-data-grid-premium';


import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';

import EditIcon from '@mui/icons-material/Edit';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import HandshakeIcon from '@mui/icons-material/Handshake';
import GradeIcon from '@mui/icons-material/Grade';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';


import { Box, Breadcrumbs, Button, Paper, Container,IconButton, Link, Card, CardActions, CardContent, FormControl, Grid, InputLabel, Select, Stack, TextField,  MenuItem, Typography } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import axios from 'axios';
import moment from 'moment';
import swal from '@sweetalert/with-react';

import monthlyEmployeeService from '../services/monthlyEmployeeService';
import monthlySalaryService from '../services/monthlySalaryService'; 


function EtatPaiePersonnalMensuel() {

    // function CustomToolbar() {
    //     return (
    //       <GridToolbarContainer>
    //         <GridToolbarExport />
    //         <GridToolbarColumnsButton />
    //         <GridToolbarFilterButton />
    //         <GridToolbarDensitySelector />
    //       </GridToolbarContainer>
    //     );
    // }

    const notification = () => {
        let url = window.location.href
        let param = url.split('?')
        if(param[1] === 'inserted') {
          swal("", "Etat inseré avec succés!", "success");
        } else if(param[1] === 'deleted') {
          swal("", "Etat supprimé avec succés!", "success");
        } else if(param[1] === 'updated') {
          swal("", "Etat modifié avec succés!", "success");
        }
    }
      notification()

    const findData = useParams()
    const monthlyemployee_id = findData.id
    const [employee, setEmployee] = useState({ 
        matricule:'', 
        firstname:'', 
        lastname:'', 
        salary:'',
        category:'',
        post_occupe: ''
     })
    const [monthlyEmployees, setMonthlyemployees] = useState([])

    const getMonthlyEmployees = () => {
        monthlySalaryService.getAll(monthlyemployee_id).then((res) => {
          setMonthlyemployees(res.data)
        }).catch(err => {
          console.log(err);
        })
    }
  
      useEffect(() => {
        getMonthlyEmployees()
      }, [])

    useEffect(() => {
        monthlyEmployeeService.get(monthlyemployee_id).then((employee) => {
            setEmployee({ 
                matricule: employee.data.matricule, 
                firstname: employee.data.firstname, 
                lastname: employee.data.lastname, 
                salary:employee.data.salary,
                category:employee.data.category,
                post_occupe: employee.data.post_occupe
            })   
        })
    }, [monthlyemployee_id])


    const columns = [
        { field: 'month', headerName: 'Mois', width: 150,
          
        },
        { field: 'salary', headerName: 'Salaire de base', width: 150,
            renderCell: (data) => {
                return data.row.salary + " Ar"
            }
        },
        { field: 'number_work', headerName: 'Nombres de jours travaillés', width: 200,
            renderCell: (data) => {
                // var numberDaysOneMonth = 30
                // return numberDaysOneMonth-data.row.number_days_absence  + " jours"
                return data.row.number_work + " jours"
            }
        },
        { field: 'montant_supplementaire', headerName: 'Montant heure supplémentaire', width: 200,
            renderCell: (data) => {
               return data.row.montant_supplementaire + " Ar"
            }
        },
        { field: 'absence', headerName: 'Absence', width: 100,
            renderCell: (data) => {
                return data.row.absence + " jours"
            }
        },
        { field: 'prime', headerName: 'Prime', width: 100,
            renderCell: (data) => {
                return data.row.prime + " Ar"
            }
        },
        { field: 'conge', headerName: 'Congé', width: 100,
            renderCell: (data) => {
                return data.row.conge + " Ar"
            }
        },
        { field: 'indeminite_transport', headerName: 'Indeminité de transport', width: 200,
            renderCell: (data) => {
                return data.row.indeminite_transport + " Ar"
            }
        },
        { field: 'autres_indeminités', headerName: 'Autres indeminités', width: 150,
            renderCell: (data) => {
                return data.row.autres_indeminités + " Ar"
            }
        },
        { field: 'salary_brut', headerName: 'Salaire brut', width: 220,
            renderCell: (data) => {
                // var numberDaysOneMonth = 30
                // var number_work_days = numberDaysOneMonth-data.row.number_days_absence 
                // return ((data.row.salary*number_work_days/30)+data.row.montant_supplementaire-data.row.number_days_absence+data.row.prime+data.row.indeminite_transport+data.row.conge+data.row.autres_indeminités).toFixed(2)+" Ariary"
                return data.row.salary_brut+" Ar" 
            }
        },
        { field: 'ostie_part_employee', headerName: 'OSTIE part employé', width: 200,
            renderCell: (data) => {
                // var numberDaysOneMonth = 30
                // var number_work_days = numberDaysOneMonth-data.row.number_days_absence 
                // var salaryBrut = ((data.row.salary*number_work_days/30)+data.row.montant_supplementaire-data.row.number_days_absence+data.row.prime+data.row.indeminite_transport+data.row.conge+data.row.autres_indeminités).toFixed(2)
                // return Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)+" Ar"
                return data.row.ostie_part_employee+" Ar"
            }
        },
        { field: 'cnaps_part_employee', headerName: 'CNAPS part employé', width: 200,
            renderCell: (data) => {
                // var numberDaysOneMonth = 30
                // var number_work_days = numberDaysOneMonth-data.row.number_days_absence 
                // var salaryBrut = ((data.row.salary*number_work_days/30)+data.row.montant_supplementaire-data.row.number_days_absence+data.row.prime+data.row.indeminite_transport+data.row.conge+data.row.autres_indeminités).toFixed(2)
                // return Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)+" Ar"
                return data.row.cnaps_part_employee+" Ar"
            }
        },
        { field: 'montant_heure_imposable', headerName: 'Montant heure imposable', width: 200,
            renderCell: (data) => {
                // var numberDaysOneMonth = 30
                // var number_work_days = numberDaysOneMonth-data.row.number_days_absence 
                // var salaryBrut = ((data.row.salary*number_work_days/30)+data.row.montant_supplementaire-data.row.number_days_absence+data.row.prime+data.row.indeminite_transport+data.row.conge+data.row.autres_indeminités).toFixed(2)
                // var ostiePartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)
                // var cnapsPartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)
                // return (salaryBrut-ostiePartEmployee-cnapsPartEmployee).toFixed(2)+" Ar"
                return data.row.montant_heure_imposable+" Ar"
            }
        },
        { field: 'irsa', headerName: 'IRSA', width: 150,
            renderCell: (data) => {
                // var numberDaysOneMonth = 30
                // var number_work_days = numberDaysOneMonth-data.row.number_days_absence 
                // var salaryBrut = ((data.row.salary*number_work_days/30)+data.row.montant_supplementaire-data.row.number_days_absence+data.row.prime+data.row.indeminite_transport+data.row.conge+data.row.autres_indeminités).toFixed(2)
                // var ostiePartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)
                // var cnapsPartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)
                // var montantImposable = (salaryBrut-ostiePartEmployee-cnapsPartEmployee).toFixed(2)
                
                // if (montantImposable <= 400000) {
                //     return Math.max((5/100)*(montantImposable-350000)).toFixed(2) +" Ar"
                // } else if(montantImposable <= 500000) {
                //     return Math.max((montantImposable-400000)*(10/100) + 2500).toFixed(2) +" Ar"
                // } else if (montantImposable <= 600000) {
                //     return Math.max((montantImposable-500000)*(15/100) + 12500).toFixed(2) +" Ar"
                // } else if(montantImposable > 600000) {
                //     return Math.max((montantImposable-600000)*(20/100) + 27500).toFixed(2) +" Ar"
                // } else {
                //     return 3000
                // }
                return data.row.irsa+" Ar"
            }
        },
        { field: 'montant_non_imposable', headerName: 'Montant  supplémentaire non imposable', width: 300,
            renderCell: (data) => {
                return data.row.montant_non_imposable+ " Ar"
            }
        },
        { field: 'avance_quinzaine', headerName: 'Avance quinzaine', width: 150,
            renderCell: (data) => {
                return (data.row.avance_quinzaine).toFixed(2) + " Ar"
            }
        },
        { field: 'avance_speciale', headerName: 'Avance spéciale', width: 150,
            renderCell: (data) => {
                return (data.row.avance_speciale).toFixed(2) + " Ar"
            }
        },
        { field: 'enfant_charge', headerName: 'Enfant à charge', width: 150,
            renderCell: (data) => {
                return (data.row.enfant_charge).toFixed(2) + " Ar"
            }
        },
        { field: 'autres_deductions', headerName: 'Autres déductions', width: 150,
            renderCell: (data) => {
                return (data.row.autres_deductions).toFixed(2) + " Ar"
            }
        },
        { field: 'salary_net', headerName: 'Salaire net', width: 220,
            renderCell: (data) => {
                // var numberDaysOneMonth = 30
                // var number_work_days = numberDaysOneMonth-data.row.number_days_absence 
                // var salaryBrut = ((data.row.salary*number_work_days/30)+data.row.montant_supplementaire-data.row.number_days_absence+data.row.prime+data.row.indeminite_transport+data.row.conge+data.row.autres_indeminités).toFixed(2)
                // var ostiePartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)
                // var cnapsPartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)
                // var montantImposable = (salaryBrut-ostiePartEmployee-cnapsPartEmployee).toFixed(2)

                // if (montantImposable <= 400000) {
                //     var Irsa = Math.max((5/100)*(montantImposable-350000))
                // } else if(montantImposable <= 500000) {
                //     var Irsa = Math.max((montantImposable-400000)*(10/100) + 2500)
                // } else if (montantImposable <= 600000) {
                //     var Irsa = Math.max((montantImposable-500000)*(15/100) + 12500)
                // } else if(montantImposable > 600000) {
                //     var Irsa = Math.max((montantImposable-600000)*(20/100) + 27500)
                // } else {
                //     var Irsa = 3000
                // }

                // return (montantImposable-Irsa-data.row.avance_quinzaine-data.row.avance_speciale-data.row.enfant_charge+data.row.montant_non_imposable-data.row.autres_deductions).toFixed(2) + " Ariary"
                return data.row.salary_net+" Ar"
            }
        },
        { field: 'ostie_part_patronale', headerName: 'OSTIE part patronale', width: 200,
            renderCell: (data) => {
                // var numberDaysOneMonth = 30
                // var number_work_days = numberDaysOneMonth-data.row.number_days_absence 
                // var salaryBrut = ((data.row.salary*number_work_days/30)+data.row.montant_supplementaire-data.row.number_days_absence+data.row.prime+data.row.indeminite_transport+data.row.conge+data.row.autres_indeminités).toFixed(2)
                // return Math.min((217000*8)*(5/100),(salaryBrut*(5/100))).toFixed(2) + " Ar"
                return data.row.ostie_part_patronale+" Ar"
            }
        },
        { field: 'cnaps_part_patronale', headerName: 'CNAPS part patronale', width: 200,
            renderCell: (data) => {
                // var numberDaysOneMonth = 30
                // var number_work_days = numberDaysOneMonth-data.row.number_days_absence 
                // var salaryBrut = ((data.row.salary*number_work_days/30)+data.row.montant_supplementaire-data.row.number_days_absence+data.row.prime+data.row.indeminite_transport+data.row.conge+data.row.autres_indeminités).toFixed(2)
                // return Math.min((217000*8)*(13/100),(salaryBrut*(13/100))).toFixed(2) + " Ar"
                return data.row.cnaps_part_patronale+" Ar"
            }
        },
        { field: 'fmpf', headerName: 'FMPF', width: 200,
            renderCell: (data) => {
                // var numberDaysOneMonth = 30
                // var number_work_days = numberDaysOneMonth-data.row.number_days_absence 
                // var salaryBrut = ((data.row.salary*number_work_days/30)+data.row.montant_supplementaire-data.row.number_days_absence+data.row.prime+data.row.indeminite_transport+data.row.conge+data.row.autres_indeminités).toFixed(2)
                // return Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2) + " Ar"
                return data.row.fmpf+" Ar"
            }
        },
        {field: 'action', headerName: 'Action', width: 100, type: 'action',
        //   renderCell: (data) => {
        //     const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        //     if (userInfo.role_id === 1) {
        //       return (
        //         <>
        //           <Link href={'/monthly-salary/update-monthly/' + data.id}>
        //             <IconButton component="label">
        //               <EditIcon />
        //             </IconButton>
        //           </Link>
        //           <IconButton component="label" onClick={() => deleteMonthlySalary(data.id)}>
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
            renderCell: (data) => {
              return (
                <>
                  <Link href={'/monthly-salary/update-monthly/' + data.id}>
                    <IconButton component="label">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton component="label" onClick={() => printPDF(data.row)}>
                    <DownloadForOfflineIcon />
                  </IconButton>
                </>
              )
            }
        }
    ]
 
    const rows = monthlyEmployees.map(monthlyEmployee => ({
        id: monthlyEmployee.monthlysalary_id,
        month: monthlyEmployee.month,
        salary: monthlyEmployee.salary,
        montant_supplementaire: monthlyEmployee.montant_supplementaire,
        number_work: monthlyEmployee.number_work,
        absence: monthlyEmployee.absence,
        prime: monthlyEmployee.prime,
        conge: monthlyEmployee.conge,
        indeminite_transport: monthlyEmployee.indeminite_transport,
        autres_indeminités: monthlyEmployee.autres_indeminités,
        salary_brut: monthlyEmployee.salary_brut,
        ostie_part_employee: monthlyEmployee.ostie_part_employee,
        cnaps_part_employee: monthlyEmployee.cnaps_part_employee,
        montant_heure_imposable: monthlyEmployee.montant_heure_imposable,
        irsa: monthlyEmployee.irsa,
        montant_non_imposable: monthlyEmployee.montant_non_imposable,
        avance_quinzaine: monthlyEmployee.avance_quinzaine,
        avance_speciale: monthlyEmployee.avance_speciale,
        enfant_charge: monthlyEmployee.enfant_charge,
        autres_deductions: monthlyEmployee.autres_deductions,
        salary_net: monthlyEmployee.salary_net,
        ostie_part_patronale: monthlyEmployee.ostie_part_patronale,
        cnaps_part_patronale: monthlyEmployee.cnaps_part_patronale,
        fmpf: monthlyEmployee.fmpf
    }))

    console.log("MES ", monthlyEmployees);
    const navigate = useNavigate()

    const deleteMonthlySalary = (id) => {
        swal({
          text: "Supprimer l'état de la liste ?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if(willDelete) { 
            monthlySalaryService.remove(id)
            const newTabList = monthlyEmployees.filter((monthlyemployee) => monthlyemployee.monthlyemployee_id !== id)
            setMonthlyemployees(newTabList)
            document.location.reload(true)
            // navigate('/state-pay/personnal?deleted')
          }
        })
    }

    const printPDF = (data) => {
        const doc = new jsPDF();
        const img = new Image();

        var hour = 173.33;
        var tauxDays = employee.salary/30
        var tauxHours = employee.salary/hour
        var montantNumberWork = data.number_work*tauxDays
        var tauxSuplementaire30 = tauxHours*1.3
        var montantSuplementaire30 = data.montant_supplementaire*tauxSuplementaire30
        var tauxSuplementaire40 = tauxHours*1.4
        var montantSuplementaire40 = data.montant_supplementaire*tauxSuplementaire40
        var tauxSuplementaire50 = tauxHours*1.5
        var montantSuplementaire50 = data.montant_supplementaire*tauxSuplementaire50
        var conge = data.conge
        var montantAllocationConge = conge * tauxDays
        var dayFerié = 0
        var tauxDayFerié = tauxHours*2
        var montantDayFerié = dayFerié*tauxDayFerié
        var preavis = 0
        var montantPreavis = preavis*tauxDays
        var transport = 0
        var tauxTransport = 1000
        var montantTransport = transport*tauxTransport
        var absence = 0
        var tauxAbsence = -tauxDays
        var montantAbsence =  absence*tauxAbsence
        var salaryBrut = montantNumberWork+montantSuplementaire30+montantSuplementaire40+montantSuplementaire50+montantAllocationConge+montantDayFerié+montantPreavis+montantTransport+montantAbsence
        var montantCnapsPatronale = data.cnaps_part_patronale
        var montantOstiePatronale = data.ostie_part_patronale
        var montantRevenuImposable = data.montant_heure_imposable
        var montantIrsa = data.irsa
        var salaryNet = salaryBrut - montantCnapsPatronale - montantOstiePatronale - montantIrsa

        img.src = require("../assets/images/FP.png");
       
        img.onload = () => {
            doc.addImage(img, "png", 15,0,185,295)
            doc.setFontSize(8)
            doc.text(data.month, 48,49.6)
            doc.setFontSize(5)
            doc.text(employee.firstname, 43,55.2)
            doc.setFontSize(5)
            doc.text(employee.lastname, 43,61)
            doc.setFontSize(5)
            doc.text(employee.matricule, 85,61.2)
            doc.setFontSize(5)
            doc.text(employee.category, 85,67)
            doc.setFontSize(5)
            doc.text(employee.post_occupe, 43,67)
            doc.setFontSize(6)
            doc.text(hour.toString(), 63,72.7) //heure normale
            doc.setFontSize(6)
            doc.text(hour.toString(), 135,72.7) //maxi
            doc.setFontSize(6)
            doc.text("AP : 00", 172,72.7) //app
            doc.setFontSize(8)
            doc.text((employee.salary.toFixed(2)).toString(), 168,78)
            doc.setFontSize(6)
            doc.text((tauxDays.toFixed(2)).toString(), 135,61.2)
            doc.setFontSize(6)
            doc.text((tauxHours.toFixed(2)).toString(), 135,67)
            doc.setFontSize(6)
            doc.text(data.number_work.toString(), 63,84.4)
            doc.setFontSize(6)
            doc.text(tauxDays.toFixed(2).toString(), 76,84.4) //taux days jour travaillés
            doc.setFontSize(6)
            doc.text(montantNumberWork.toFixed(2).toString(), 88,84.4)  //montant days jour travaillés
            doc.setFontSize(6)
            // Supplementaire  30%
            doc.text(data.montant_supplementaire.toFixed(2).toString(), 63,90) //supplementaire 30%
            doc.setFontSize(6)
            doc.text(tauxSuplementaire30.toFixed(2).toString(), 76,90) //taux supplementaire 30%
            doc.setFontSize(6)
            doc.text(montantSuplementaire30.toFixed(2).toString(), 88,90)  // montant supplementaire 30%

            // Supplementaire  40%
            doc.text(data.montant_supplementaire.toFixed(2).toString(), 63,95.6) //supplementaire 40%
            doc.setFontSize(6)
            doc.text(tauxSuplementaire40.toFixed(2).toString(), 76,95.6) //taux supplementaire 40%
            doc.setFontSize(6)
            doc.text(montantSuplementaire40.toFixed(2).toString(), 88,95.6) // montant supplementaire 40%

            // Supplementaire  50%
            doc.text(data.montant_supplementaire.toFixed(2).toString(), 63,101.3) //supplementaire 50%
            doc.setFontSize(6)
            doc.text(tauxSuplementaire50.toFixed(2).toString(), 76,101.3) //taux supplementaire 50%
            doc.setFontSize(6)
            doc.text(montantSuplementaire50.toFixed(2).toString(), 88,101.3) // montant supplementaire 50%

            doc.setFontSize(6)
            doc.text(conge.toFixed(2).toString(), 63,107.3) //Allocation conge
            doc.setFontSize(6)
            doc.text(tauxDays.toFixed(2).toString(), 76,107.3) //Taux days allocation conge
            doc.setFontSize(6)
            doc.text(montantAllocationConge.toFixed(2).toString(), 88,107.3) //Montant days allocation conge

            doc.setFontSize(6)
            doc.text(dayFerié.toFixed(2).toString(), 63,124.8)
            doc.setFontSize(6)
            doc.text(tauxDayFerié.toFixed(2).toString(), 76,124.8) // taux jour ferié
            doc.setFontSize(6)
            doc.text(montantDayFerié.toFixed(2).toString(), 88,124.8)

            doc.setFontSize(6)
            doc.text(preavis.toFixed(2).toString(), 63, 130.5)
            doc.setFontSize(6)
            doc.text(tauxDays.toFixed(2).toString(), 76, 130.5) // taux jour preavis
            doc.setFontSize(6)
            doc.text(montantPreavis.toFixed(2).toString(), 88, 130.5)

            doc.setFontSize(6)
            doc.text(transport.toFixed(2).toString(), 63, 136.5)
            doc.setFontSize(6)
            doc.text(tauxTransport.toFixed(2).toString(), 76, 136.5) // taux jour transport
            doc.setFontSize(6)
            doc.text(montantTransport.toFixed(2).toString(), 88, 136.5)
            doc.setFontSize(6)
            doc.text(absence.toFixed(2).toString(), 63, 142.2)
            doc.setFontSize(6)
            doc.text(tauxAbsence.toFixed(2).toString(), 75.5, 142.2) // retenu pour absence
            doc.setFontSize(6)
            doc.text(montantAbsence.toFixed(2).toString(), 88, 142.2) //montant revenu absence
            doc.setFontSize(7)
            doc.text(salaryBrut.toFixed(2).toString(), 87, 148.2) //Salaire brute
            doc.setFontSize(6)
            doc.text(montantCnapsPatronale.toFixed(2).toString(), 87, 153.8)
            doc.setFontSize(6)
            doc.text(montantOstiePatronale.toFixed(2).toString(), 87, 159.4) 
            doc.setFontSize(6)
            doc.text(montantRevenuImposable.toFixed(2).toString(), 87, 165) 
            doc.setFontSize(6)
            doc.text(montantIrsa.toFixed(2).toString(), 87, 170.6) 
            doc.setFontSize(7)
            doc.text(salaryNet.toFixed(2).toString(), 87, 176.2) //salary net
            doc.setFontSize(6)
            doc.text("AVANCE ICI", 87, 181.8) //Avance
            doc.setFontSize(6)
            doc.text("NET A PAYER ICI", 87, 194) //Net à payer


            doc.save("Bulletin de paie " + employee.firstname +" "+employee.lastname) 
        }
    }

    const breadcrumbs = [
        <Typography key="1">
          {employee.matricule}
        </Typography>,
        <Typography key="2" color="text.primary">
          {employee.firstname} {employee.lastname}
        </Typography>,
    ]

    console.log("MONTHLY EMPLOYEE ", employee);
    
    return (
    <div>
        <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
            Fiche de paie
            <Stack spacing={2}>
                <Breadcrumbs separator="." aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
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
        <Button
            size="medium"
            variant="outlined"
            color="primary"
            sx={{ ml: 4, width: 250, mb:5, mt: -5 }}
            startIcon={<AddIcon />}
            href={`/monthly-salary/new/`+ monthlyemployee_id}
        >
            Nouvelle fiche de paie
        </Button> 
        <Container maxWidth="xxl">
            <Paper sx={{ width: '95%', overflow: 'hidden' }}>
            <Box sx={{ height: 450, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    // components={{
                    //     Toolbar: CustomToolbar
                    // }}
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

export default EtatPaiePersonnalMensuel