import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Grid, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import NumbersIcon from '@mui/icons-material/Numbers';
import BadgeIcon from '@mui/icons-material/Badge';
import WorkIcon from '@mui/icons-material/Work';
import PortraitIcon from '@mui/icons-material/Portrait';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ClassIcon from '@mui/icons-material/Class';
import CallIcon from '@mui/icons-material/Call';
import FeedIcon from '@mui/icons-material/Feed';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TwoKIcon from '@mui/icons-material/TwoK';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from 'moment';

import personnalToolsService from '../services/personnalToolsService'

function UpdatePersonnalTools() {

  const [date, setDate] = useState(null);
  const [affectation, setAffectation] = useState('');
  const [responsable, setResponsable] = useState('');
  const [statue, setStatue] = useState('');
  const [employees, setEmployees] = useState([]);

  const getEmployee = () => {
    personnalToolsService.getEmployee().then((res) => {
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
    responsable:            responsable,
    tooling_id:             affectation,
  }

  const findData = useParams()
  const tool_id = findData.id

  const [loaded, setLoaded] = useState(false)
  const [tools, setTools] = useState(initialToolsState)

  useEffect(() => {
    const load = async () => {
        const res = await personnalToolsService.get(tool_id)
        console.log(res.data)
        setTools(res.data)
        setLoaded(true)
    }
    if (tool_id && !loaded) load()
  }, [tool_id, loaded])

  console.log(loaded)

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

  console.log(tools.tooling_id, tools)

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
      responsable:            tools.responsable,
      tooling_id:             tools.tooling_id,
    }

    personnalToolsService.update(tool_id, data).then(res => {
        setTools({
          id:                     res.data.id,
          purchase_date:          res.data.purchase_date,
          identification_number:  res.data.identification_number,
          article_name:           res.data.article_name,
          assignation_place:      res.data.assignation_place,
          statue:                 res.data.statue,
          historical:             res.data.historical,
          material_number:        parseInt(res.data.material_number),
          responsable:            res.data.responsable,
          tooling_id:             res.data.tooling_id,
        })
        console.log(res.data)
    }).catch(err => {
        console.log(err)
    })
      navigate('/tools/personnal')

  }

  const breadcrumbs = [
    <Typography key="1">
      Outillage
    </Typography>,
    <Typography key="2">
      Modification de l'outil
    </Typography>,
  ];

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Modification de l'outil
        <Typography variant="h4" sx={{ px: 5, mt: 2, ml: -5, mb: 2 }}>
          Outillage
        </Typography>
        <Stack spacing={2}>
          <Breadcrumbs separator="." aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
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
                      type="number"
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

                 
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
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
                </Box>

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
                    Enregistrer
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

export default UpdatePersonnalTools