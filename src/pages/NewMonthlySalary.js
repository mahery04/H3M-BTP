import React, { useEffect, useState } from 'react';

import { Button, Stack, Breadcrumbs, Card, CardContent, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl, Divider, Chip, InputAdornment } from '@mui/material';

import { Grid, TextField } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import WorkIcon from '@mui/icons-material/Work';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 
import { useNavigate,useParams } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import dayjs from 'dayjs';

import CurrencyTextField from '@unicef/material-ui-currency-textfield';

import moment from 'moment'
import swal from '@sweetalert/with-react';

import monthlySalaryService from '../services/monthlySalaryService';
import monthlyEmployeeService from '../services/monthlyEmployeeService';


function NewMonthlySalary() {

  const [monthlyEmployees, setMonthlyEmployees] = useState('')
  const [monthlyPresences, setMonthlyPresences] = useState('')
  const [employees, setEmployees] = useState([])
  const [month, setMonth] = useState(dayjs())
  

  const findData = useParams()
  const monthlyemployee_id = findData.id
  const [employee, setEmployee] = useState({ matricule:'', firstname:'', lastname:'', salary:'' })

  useEffect(() => {
    monthlyEmployeeService.get(monthlyemployee_id).then((employee) => {
      setEmployee({ matricule: employee.data.matricule, firstname: employee.data.firstname, lastname: employee.data.lastname, salary:employee.data.salary })   
    })
  }, [monthlyemployee_id])
 
  const navigate = useNavigate()

  const getEmployees = () => {
    monthlySalaryService.getEmployees().then((res) => {
      setEmployees(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  console.log("EMPLOYEES ALL ", employees);

  useEffect(() => {
    getEmployees()
  }, [])

  
  const initialMonthlySalaryState = {
    id: null,
    month:moment(month.$d).format('MMMM YYYY'),
    monthlypresence_id: monthlyPresences,
    monthlyemployee_id: monthlyEmployees,
    montant_supplementaire: '',
    prime: null,
    conge: null,
    indeminite_transport: null,
    autres_indeminités:null,
    montant_non_imposable: '',
    avance_quinzaine:null,
    avance_speciale: null,
    enfant_charge: null,
    autres_deductions: null
  }

  const [monthlySalaries, setMonthlySalaries] = useState(initialMonthlySalaryState)

  const handleEmployeeChange = e => {
    const employeeValue = e.target.value
    setMonthlyEmployees(employeeValue)
    setMonthlySalaries({ ...monthlySalaries, monthlyemployee_id: employeeValue })
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setMonthlySalaries({ ...monthlySalaries, [name]: value })
  }

  const insertMonth = (newMonth) => {
    const m = moment(newMonth.$d).format('MMMM YYYY')
    setMonth(m)
    setMonthlySalaries({ ...monthlySalaries, month: m })
  }


  const savemonthlySalaries = e => {
    e.preventDefault()

    var data = {
      month: monthlySalaries.month,
      monthlypresence_id: monthlySalaries.monthlypresence_id,
      monthlyemployee_id: monthlyemployee_id,
      montant_supplementaire: monthlySalaries.montant_supplementaire,
      prime: monthlySalaries.prime,
      conge: monthlySalaries.conge,
      indeminite_transport: monthlySalaries.indeminite_transport,
      autres_indeminités: monthlySalaries.autres_indeminités,
      montant_non_imposable: monthlySalaries.montant_non_imposable,
      avance_quinzaine: monthlySalaries.avance_quinzaine,
      avance_speciale: monthlySalaries.avance_speciale,
      enfant_charge: monthlySalaries.enfant_charge,
      autres_deductions: monthlySalaries.autres_deductions
    }

    if (!data.monthlyemployee_id || !data.month ||!data.montant_supplementaire || !data.prime || !data.conge || !data.indeminite_transport || !data.autres_indeminités || !data.montant_non_imposable || !data.avance_quinzaine || !data.avance_speciale || !data.enfant_charge || !data.autres_deductions) {
      swal({
        title: "Un erreur est survenu!",
        text: "Des formulaires requis sont vides.",
        icon: "error",
        button: "OK",
      });
    } else {
      monthlySalaryService.create(data).then(res => {
        setMonthlySalaries({
          id: res.data.id,
          month: res.data.month,
          monthlyemployee_id: res.data.monthlyemployee_id,
          monthlypresence_id: res.data.monthlypresence_id,
          montant_supplementaire: res.data.montant_supplementaire,
          prime: res.data.prime,
          conge: res.data.conge,
          indeminite_transport: res.data.indeminite_transport,
          autres_indeminités: res.data.autres_indeminités,
          montant_non_imposable: res.data.montant_non_imposable,
          avance_quinzaine: res.data.avance_quinzaine,
          avance_speciale: res.data.avance_speciale,
          enfant_charge: res.data.enfant_charge,
          autres_deductions: res.data.autres_deductions 
        })
      }).catch(err => {
        console.log(err)
      })
      navigate(`/state-pay/personnal/${monthlyemployee_id}?inserted`)
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

  
  console.log("PRM ", monthlySalaries);

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Nouvelle fiche de paie
        <Stack spacing={2}>
          <Breadcrumbs separator="." aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
          startIcon={<ArrowBackIcon />}
          href={`/state-pay/personnal/` + monthlyemployee_id}
        >
          Retour
        </Button>
      </Typography>
      <Container maxWidth="xxl">
        <Card sx={{ height: 'auto', width: '95%' }}>
          <CardContent>
            <form onSubmit={savemonthlySalaries} noValidate autoComplete='off'>
              <Box sx={{ flexGrow: 1 }}>
                <Container maxWidth="xl" sx={{ lineHeight: 5 }}>
                  {/* <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PortraitIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <FormControl variant="standard" sx={{ width: '100%', marginTop: 4 }}>
                      <InputLabel id="statue">Employé(e) *</InputLabel>
                      <Select
                        labelId="employee"
                        id="employee"
                        onChange={handleEmployeeChange}
                        label="Age"
                      >
                        {employees.map(employee => (
                          <MenuItem key={employee.monthlyemployee_id} value={employee.monthlyemployee_id}>{employee.matricule} - {employee.firstname} {employee.lastname}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      views={['year', 'month']}
                      label="Mois et Année"
                      minDate={dayjs('2019-01-01')}
                      maxDate={dayjs('2035-12-31')}
                      value={month}
                      onChange={insertMonth}
                      renderInput={(params) => <TextField sx={{ mt: 5, width: '100%' }} variant="standard" {...params} helperText={null} />}
                    />
                  </LocalizationProvider>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <CurrencyTextField
                        label="Montant heure supplémentaire *"
                        variant="standard"
                        id="montant_supplementaire"
                        name="montant_supplementaire"
                        value={monthlySalaries.montant_supplementaire}
                        currencySymbol="Ar"
                        //minimumValue="0"
                        outputFormat="string"
                        decimalCharacter="."
                        digitGroupSeparator=","
                        onChange={(event, value)=> setMonthlySalaries({...monthlySalaries, montant_supplementaire: value })}
                        style={{width: '100%', marginTop: '2%'}}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <CurrencyTextField
                        label="Prime *"
                        variant="standard"
                        id="prime"
                        name="prime"
                        value={monthlySalaries.prime}
                        currencySymbol="Ar"
                        //minimumValue="0"
                        outputFormat="string"
                        decimalCharacter="."
                        digitGroupSeparator=","
                        onChange={(event, value)=> setMonthlySalaries({...monthlySalaries, prime: value })}
                        style={{width: '100%', marginTop: '2%'}}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <CurrencyTextField
                        label="Congé *"
                        variant="standard"
                        id="conge"
                        name="conge"
                        value={monthlySalaries.conge}
                        currencySymbol="Ar"
                        //minimumValue="0"
                        outputFormat="string"
                        decimalCharacter="."
                        digitGroupSeparator=","
                        onChange={(event, value)=> setMonthlySalaries({...monthlySalaries, conge: value })}
                        style={{width: '100%', marginTop: '2%'}}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <CurrencyTextField
                        label="Indemnité de transport *"
                        variant="standard"
                        id="indeminite_transport"
                        name="indeminite_transport"
                        value={monthlySalaries.indeminite_transport}
                        currencySymbol="Ar"
                        //minimumValue="0"
                        outputFormat="string"
                        decimalCharacter="."
                        digitGroupSeparator=","
                        onChange={(event, value)=> setMonthlySalaries({...monthlySalaries, indeminite_transport: value })}
                        style={{width: '100%', marginTop: '2%'}}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <CurrencyTextField
                        label="Autres indemnités *"
                        variant="standard"
                        id="autres_indeminités"
                        name="autres_indeminités"
                        value={monthlySalaries.autres_indeminités}
                        currencySymbol="Ar"
                        //minimumValue="0"
                        outputFormat="string"
                        decimalCharacter="."
                        digitGroupSeparator=","
                        onChange={(event, value)=> setMonthlySalaries({...monthlySalaries, autres_indeminités: value })}
                        style={{width: '100%', marginTop: '2%'}}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <CurrencyTextField
                        label="Montant heure non imposable *"
                        variant="standard"
                        id="montant_non_imposable"
                        name="montant_non_imposable"
                        value={monthlySalaries.montant_non_imposable}
                        currencySymbol="Ar"
                        //minimumValue="0"
                        outputFormat="string"
                        decimalCharacter="."
                        digitGroupSeparator=","
                        onChange={(event, value)=> setMonthlySalaries({...monthlySalaries, montant_non_imposable: value })}
                        style={{width: '100%', marginTop: '2%'}}
                      />
                    </Box>
                  
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <CurrencyTextField
                        label="Avance quinzaine *"
                        variant="standard"
                        id="avance_quinzaine"
                        name="avance_quinzaine"
                        value={monthlySalaries.avance_quinzaine}
                        currencySymbol="Ar"
                        //minimumValue="0"
                        outputFormat="string"
                        decimalCharacter="."
                        digitGroupSeparator=","
                        onChange={(event, value)=> setMonthlySalaries({...monthlySalaries, avance_quinzaine: value })}
                        style={{width: '100%', marginTop: '2%'}}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <CurrencyTextField
                        label="Avance spéciale *"
                        variant="standard"
                        id="avance_speciale"
                        name="avance_speciale"
                        value={monthlySalaries.avance_speciale}
                        currencySymbol="Ar"
                        //minimumValue="0"
                        outputFormat="string"
                        decimalCharacter="."
                        digitGroupSeparator=","
                        onChange={(event, value)=> setMonthlySalaries({...monthlySalaries, avance_speciale: value })}
                        style={{width: '100%', marginTop: '2%'}}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <CurrencyTextField
                        label="Enfant à charge *"
                        variant="standard"
                        id="enfant_charge"
                        name="enfant_charge"
                        value={monthlySalaries.enfant_charge}
                        currencySymbol="Ar"
                        //minimumValue="0"
                        outputFormat="string"
                        decimalCharacter="."
                        digitGroupSeparator=","
                        onChange={(event, value)=> setMonthlySalaries({...monthlySalaries, enfant_charge: value })}
                        style={{width: '100%', marginTop: '2%'}}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <CurrencyTextField
                        label="Autres déductions *"
                        variant="standard"
                        id="autres_deductions"
                        name="autres_deductions"
                        value={monthlySalaries.autres_deductions}
                        currencySymbol="Ar"
                        //minimumValue="0"
                        outputFormat="string"
                        decimalCharacter="."
                        digitGroupSeparator=","
                        onChange={(event, value)=> setMonthlySalaries({...monthlySalaries, autres_deductions: value })}
                        style={{width: '100%', marginTop: '2%'}}
                      />
                    </Box> <br/>

                  <Button
                    size="medium"
                    variant="outlined"
                    color="primary"
                    sx={{ width: 250 }}
                    startIcon={<AddIcon />}
                    onClick={savemonthlySalaries}
                  >
                    Ajouter
                  </Button>
                </Container>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}

export default NewMonthlySalary