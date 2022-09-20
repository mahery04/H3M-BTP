import React, { useState, useEffect } from 'react';

import { Button, Card, CardContent, Container, Typography, Box, InputLabel, MenuItem, FormControl} from '@mui/material';

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

import Select from '@mui/material/Select';
import moment from 'moment';

import commonToolsService from '../services/commonToolsService'

function UpdateCommonTools() {

  const [date, setDate] = useState(null);
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
  },[])

  const initialToolsState = {
    id:                     null,
    purchase_date:          date,
    identification_number:  '',
    article_name:           '',
    assignation_place:      '',
    statue:                 statue,
    historical:             '',
    material_number:        '',
    // responsable:            responsable,
    tooling_id:             affectation,
  }

  const findData = useParams()
  const tool_id = findData.id

  const [loaded, setLoaded] = useState(false)
  const [tools, setTools] = useState(initialToolsState)

  useEffect(() => {
    const load = async () => {
      const res = await commonToolsService.get(tool_id)
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
    setTools({ ...tools, purchase_date: d })
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

  const updateTools = e => {
    e.preventDefault()

    var data = {
      purchase_date:          tools.purchase_date,
      identification_number:  tools.identification_number,
      article_name:           tools.article_name,
      assignation_place:      tools.assignation_place,
      statue:                 tools.statue,
      historical:             tools.historical,
      material_number:        tools.material_number,
    //   responsable:            tools.responsable,
      tooling_id:             tools.tooling_id,
    }

    commonToolsService.update(tool_id, data).then(res => {
        setTools({
          id:                     res.data.id,
          purchase_date:          res.data.purchase_date,
          identification_number:  res.data.identification_number,
          article_name:           res.data.article_name,
          assignation_place:      res.data.assignation_place,
          statue:                 res.data.statue,
          historical:             res.data.historical,
          material_number:        parseInt(res.data.material_number),
        //   responsable:            res.data.responsable,
          tooling_id:             res.data.tooling_id,
        })
    }).catch(err => {
        console.log(err)
    })
      navigate('/tools/common?updated')

  }

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Modification de l'outil
      </Typography>

      <Container maxWidth="xxl">
        <Card sx={{ height: 820, width: '95%' }}>
          <CardContent>
            <form onSubmit={updateTools} noValidate autoComplete='off'>
              <Box sx={{ flexGrow: 1 }}>
                <Container maxWidth="xl" sx={{ lineHeight: 5 }}>

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date d'achat"
                      id="purchase_date"
                      name="purchase_date"
                      value={tools.purchase_date}
                      onChange={insertDate}
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
                      id="identification_number" 
                      value={tools.identification_number} 
                      onChange={handleInputChange} 
                      name="identification_number" 
                      label="Numéro d'identification" 
                      variant="standard" 
                      sx={{ width: '100%' }}
                    /><br />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <FeedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                      id="article_name" 
                      value={tools.article_name}
                      onChange={handleInputChange}
                      name="article_name" 
                      label="Nom article" 
                      variant="standard" 
                      sx={{ width: '100%' }}
                    /><br />
                  </Box>

                 
                {/* <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PortraitIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <FormControl variant="standard" sx={{ width: '100%', marginTop: 4 }}>
                        <InputLabel htmlFor="grouped-native-select" id="responable">Responsable</InputLabel>
                        <Select
                            native
                            id="grouped-native-select"
                            label="Responsable"
                            value={tools.responsable}
                            onChange={handleResponsableChange}
                        >
                            <option value=''></option>
                            {employees.map(employee => (
                                <option key={employee.matricule} value={`${employee.firstname} ${employee.lastname}`}>{employee.firstname} {employee.lastname}</option>
                            ))}
                        </Select>
                    </FormControl><br />
                </Box> */}

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <LocationOnIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                      id="assignation_place" 
                      value={tools.assignation_place}
                      onChange={handleInputChange}
                      name="assignation_place" 
                      label="Lieu d'affectation" 
                      variant="standard" 
                      sx={{ width: '100%' }}
                    /><br />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <MoreHorizIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <FormControl variant="standard" sx={{ width: '100%', marginTop: 4 }}>
                      <InputLabel id="statue">Etat</InputLabel>
                      <Select
                        labelId="statue"
                        id="statue"
                        value={tools.statue}
                        onChange={handleStatueChange}
                        label="Age"
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
                    <TwoKIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                      type="number"
                      id="material_number" 
                      value={tools.material_number}
                      onChange={handleInputChange}
                      name="material_number" 
                      label="Nombre de matériels" 
                      variant="standard" 
                      sx={{ width: '100%' }}
                    /><br />
                  </Box>

                  <TextField 
                    id="historical" 
                    value={tools.historical}
                    onChange={handleInputChange}
                    name="historical" 
                    label="Historique" 
                    variant="standard" 
                    sx={{ width: '100%', marginTop: 4 }} 
                  />
                  <br /><br />

                  <Button
                    size="medium"
                    variant="outlined"
                    color="primary"
                    sx={{ width: 250 }}
                    startIcon={<AddIcon />}
                    onClick={updateTools}
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

export default UpdateCommonTools