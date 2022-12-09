import React, { useEffect, useState } from 'react';

import { Button, Card, CardContent, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl, Divider, Chip, InputAdornment } from '@mui/material';

import { Grid, TextField } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import PortraitIcon from '@mui/icons-material/Portrait';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import WorkIcon from '@mui/icons-material/Work';


import moment from 'moment'
import swal from '@sweetalert/with-react';
import { useNavigate, useParams } from 'react-router-dom';

import monthlySalaryService from '../services/monthlySalaryService';

function UpdateMonthlySalary() {

  const [monthlyEmployees, setMonthlyEmployees] = useState('')
  const [monthlyPresences, setMonthlyPresences] = useState('')
  const [employees, setEmployees] = useState([])
  const [startHeureSupplementaires, setstartHeureSupplementaires] = useState('')
  const [startMinutesSupplementaires, setstartMinutesSupplementaires] = useState('')
  const [startHeureNonImposables, setstartHeureNonImposables] = useState('')
  const [startMinutesNonImposables, setstartMinutesNonImposables] = useState('')

  const navigate = useNavigate()

  const getEmployees = () => {
    monthlySalaryService.getEmployees().then((res) => {
      setEmployees(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getEmployees()
  }, [])

  
  const initialMonthlySalaryState = {
    id: null,
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

  const findData = useParams()
  const monthlysalary_id = findData.id

  const [loaded, setLoaded] = useState(false)
  const [monthlySalaries, setMonthlySalaries] = useState(initialMonthlySalaryState)

  useEffect(() => {
    const load = async () => {
      const res = await monthlySalaryService.get(monthlysalary_id)
      setMonthlySalaries(res.data)
      setLoaded(true)
    }
    if (monthlysalary_id && !loaded) {
      load();
    }
  }, [monthlysalary_id, loaded])

  const handleEmployeeChange = e => {
    const employeeValue = e.target.value
    setMonthlyEmployees(employeeValue)
    setMonthlySalaries({ ...monthlySalaries, monthlyemployee_id: employeeValue })
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setMonthlySalaries({ ...monthlySalaries, [name]: value })
  }


  const insertstartHeureSupplementaires = newTime => {
    const d = newTime
    setstartHeureSupplementaires(d)
    setMonthlySalaries({ ...monthlySalaries, start_time: d })
  }

  const insertstartHeuresSupplementaires = (event) => {
    const d = event.target.value
    setstartHeureSupplementaires(d)
    setMonthlySalaries({...monthlySalaries, montant_supplementaire: d})
  }

  const insertstartMinutesSupplementaires = event => {
    const d = event.target.value
    setstartMinutesSupplementaires(d)
    setMonthlySalaries({...monthlySalaries, minute_supplementaire: d})
  }

  const insertstartHeuresNonImposables = (event) => {
    const d = event.target.value
    setstartHeureNonImposables(d)
    setMonthlySalaries({...monthlySalaries, montant_non_imposable: d})
  }

  const insertstartMinutesNonImposables = event => {
    const d = event.target.value
    setstartMinutesNonImposables(d)
    setMonthlySalaries({...monthlySalaries, minute_non_imposable: d})
  }

  const updatemonthlySalaries = e => {
    e.preventDefault()

    var data = {
        monthlyemployee_id: monthlySalaries.monthlyemployee_id,
        monthlypresence_id: monthlySalaries.monthlypresence_id,
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

    // if (!data.monthlyemployee_id || !data.montant_supplementaire || !data.minute_supplementaire || !data.prime || !data.conge || !data.indeminite_transport || !data.autres_indeminités || !data.montant_non_imposable || !data.minute_non_imposable || !data.avance_quinzaine || !data.avance_speciale || !data.enfant_charge || !data.autres_deductions) {
    //   swal({
    //     title: "Une erreur est survenue!",
    //     text: "Des formulaires requis sont vides.",
    //     icon: "error",
    //     button: "OK",
    //   });
    // } else {
      monthlySalaryService.update(monthlysalary_id, data).then(res => {
        setMonthlySalaries({
          id: res.data.id,
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
      navigate(`/state-pay/personnal/${monthlySalaries.monthlyemployee_id}?updated`)
    // }
  }

  console.log("MS ", monthlySalaries);

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Modification du fiche de paie 
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
          startIcon={<ArrowBackIcon />}
          href={`/state-pay/personnal/${monthlySalaries.monthlyemployee_id}`}
        >
          Retour
        </Button>
      </Typography>
      <Container maxWidth="xxl">
        <Card sx={{ height: 'auto', width: '95%' }}>
          <CardContent>
            <form onSubmit={updatemonthlySalaries} noValidate autoComplete='off'>
              <Box sx={{ flexGrow: 1 }}>
                <Container maxWidth="xl" sx={{ lineHeight: 5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <CurrencyTextField
                        label="Montant supplémentaire *"
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
                        label="Montant non imposable *"
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
                    onClick={updatemonthlySalaries}
                  >
                    Modifier
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

export default UpdateMonthlySalary