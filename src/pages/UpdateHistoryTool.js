import React, { useState, useEffect } from 'react';

import { Button, Card, CardContent, Container, Typography, Box, InputLabel, MenuItem, FormControl } from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import AddIcon from '@mui/icons-material/Add';
import NumbersIcon from '@mui/icons-material/Numbers';
import PortraitIcon from '@mui/icons-material/Portrait';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FeedIcon from '@mui/icons-material/Feed';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TwoKIcon from '@mui/icons-material/TwoK';
import ArchiveIcon from '@mui/icons-material/Archive';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Select from '@mui/material/Select';
import moment from 'moment';

import commonToolsService from '../services/commonToolsService';
import historyToolService from '../services/historyToolService';

function UpdateHistoryTool() {

  const [date, setDate] = useState(null);
  const [etat, setetat] = useState('');
  const [affectation, setAffectation] = useState('');
  const [responsable, setResponsable] = useState('');
  const [statue, setStatue] = useState('');
  const [employees, setEmployees] = useState([]);

  const getEmployee = () => {
    commonToolsService.getEmployee().then((res) => {
      setEmployees(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getEmployee()
  }, [])

  const initialToolsState = {
    id: null,
    date_transfert: date,
    lieu_transfert: '',
    etat: etat,
    observation: '',
  }

  const findData = useParams()
  const tool_id = findData.id

  const [loaded, setLoaded] = useState(false)
  const [tools, setTools] = useState(initialToolsState)

  useEffect(() => {
    const load = async () => {
      const res = await historyToolService.get(tool_id)
      setTools(res.data)
      setLoaded(true)
    }
    if (tool_id && !loaded) load()
  }, [tool_id, loaded])


  const handleInputChange = e => {
    const { name, value } = e.target
    setTools({ ...tools, [name]: value })
  }

  const insertDate = (newDate) => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setDate(d)
    setTools({ ...tools, date_transfert: d })
  }

  const handleResponsableChange = (event) => {
    const employee = event.target.value
    setResponsable(employee);
    setTools({ ...tools, responsable: employee })
  };

  const handleStatueChange = (event) => {
    const state = event.target.value
    setStatue(state);
    setTools({ ...tools, statue: state })
  };

  const navigate = useNavigate()

  const updateHistoryTool = e => {
    e.preventDefault()

    var data = {
      date_transfert: moment(tools.date_transfert).format('YYYY-MM-DD'),
      lieu_transfert: tools.lieu_transfert,
      etat: tools.etat,
      observation: tools.observation,
    }

    historyToolService.update(tool_id, data).then(res => {
      setTools({
        id: res.data.history_tool_id,
        date_transfert: res.data.date_transfert,
        lieu_transfert: res.data.lieu_transfert,
        etat: res.data.etat,
        observation: res.data.observation,
      })
    }).catch(err => {
      console.log(err)
    })
    navigate('/history/tool/'+tools.id+'?updated')
  }

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Modification de l'historique
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, width: 250, marginLeft: '70%' }}
          startIcon={<ArrowBackIcon />}
          href='/tools/common'
        >
          Retour
        </Button>
      </Typography>

      <Container maxWidth="xxl">
        <Card sx={{ height: 'auto', width: '95%' }}>
          <CardContent>
            <form onSubmit={updateHistoryTool} noValidate autoComplete='off'>
              <Box sx={{ flexGrow: 1 }}>
                <Container maxWidth="xl" sx={{ lineHeight: 5 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date de transfert"
                      id="date_transfert"
                      name="date_transfert"
                      value={tools.date_transfert}
                      //onChange={insertDate}
                      renderInput={(params) =>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                          <TextField {...params} variant="standard" sx={{ width: '100%' }} /><br />
                        </Box>
                      }
                    />
                  </LocalizationProvider>

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <NumbersIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                      id="lieu_transfert"
                      value={tools.lieu_transfert}
                      onChange={handleInputChange}
                      name="lieu_transfert"
                      label="Lieu de transfert"
                      variant="standard"
                      sx={{ width: '100%' }}
                    /><br />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <MoreHorizIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <FormControl variant="standard" sx={{ width: '100%', marginTop: 4 }}>
                      <InputLabel id="etat">Etat</InputLabel>
                      <Select
                        labelId="etat"
                        id="etat"
                        value={tools.etat}
                        onChange={handleStatueChange}
                        label="Etat"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value='Nouveau'>Nouveau</MenuItem>
                        <MenuItem value='Occasion'>Occasion</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <FeedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                      id="observation"
                      value={tools.observation}
                      onChange={handleInputChange}
                      name="observation"
                      label="Observation"
                      variant="standard"
                      sx={{ width: '100%' }}
                    /><br />
                  </Box>
                  <br />

                  <Button
                    size="medium"
                    variant="outlined"
                    color="primary"
                    sx={{ width: 250 }}
                    startIcon={<AddIcon />}
                    onClick={updateHistoryTool}
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

export default UpdateHistoryTool