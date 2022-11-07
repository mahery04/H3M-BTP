import React, { useEffect, useState } from 'react'

import { useParams, useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArticleIcon from '@mui/icons-material/Article';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import { Box, Breadcrumbs, Button, Card, CardActions, CardContent, FormControl, Grid, IconButton, InputLabel, Modal, Select, Stack, TextField, Tooltip, Typography } from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';

import axios from 'axios'
import moment from 'moment'
import swal from '@sweetalert/with-react';

import personnalToolsService from '../services/personnalToolsService';
import toolsDailyEmployee from '../services/toolsDailyEmployee';
import dailyEmployeeService from '../services/dailyEmployeeService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ToolsDailyEmployee = () => {
    
    const findData = useParams()
    const dailyemployee_id = findData.id

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [identifiant, setIdentifiant] = useState(dailyemployee_id);
    const [numberTool,setNumberTool] = useState(null);
    const [materialNumber, setMaterialNumber] = useState(null);
    const [renderNumber, setRenderNumber] = useState(0)
    const [numberMax, setNumberMax] = useState(null)
    const [toolLists,setToolLists] = useState([]);
    const [toolValue,setToolValue] = useState();
    const [tools,setTool] = useState([]);
    const [dateLoan, setDateLoan] = useState(null);
    const [dateDelivery, setDateDelivery] = useState(null);
    const [employee, setEmployee] = useState({ matricule:'', firstname:'', lastname:'' })

    const initialToolState = {
        dailyemployee_id:   identifiant,
        tool_id:            null,
        number:             '',
        loan_date:          '',
        delivery_date:      '',
    }
    
    const navigate = useNavigate()
    const [toolDailyEmployee,setToolDailyEmployee] = useState(initialToolState)

    const getTools = () => {
        personnalToolsService.getAll().then((res) => {
            setTool(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const getToolsDailyEmployees = (id) => {
        toolsDailyEmployee.getAllById(id).then((res) => {
          setToolLists(res.data) 
        })
    }

    useEffect(() => {
        getTools()
        getToolsDailyEmployees(dailyemployee_id)
    }, [dailyemployee_id])

    useEffect(() => {
        toolsDailyEmployee.getNumber(toolDailyEmployee.tool_id).then((res) => {
          setNumberTool(res.data[0].material_number)
        })
    },[toolDailyEmployee.tool_id, numberTool])

    useEffect(() => {
        dailyEmployeeService.get(dailyemployee_id).then((employee) => {
            setEmployee({ matricule: employee.data.matricule, firstname: employee.data.firstname, lastname: employee.data.lastname })
        })
    }, [dailyemployee_id])

    const getMaterialNumber = (e) => {
        const min = null;
        const max = numberTool;
    
        const materialNumber = +e.target.value;
    
        if (materialNumber > max) {
          setMaterialNumber(max) 
          setToolDailyEmployee({...toolDailyEmployee, number: max})
        } else if (materialNumber < min) {
          setMaterialNumber(min)   
          setToolDailyEmployee({...toolDailyEmployee, number: min})
        } else {
          setMaterialNumber(materialNumber)   
          setToolDailyEmployee({...toolDailyEmployee, number: materialNumber})
        }
    
    }

    const handleToolChange = (event) => {
        const { name, value } = event.target
        setToolValue(toolValue);
        setToolDailyEmployee({ ...toolDailyEmployee, [name]: value })
    };

    const insertDateLoan = (newDate) => {
        const d = moment(newDate).format('YYYY-MM-DD')
        setDateLoan(d);
        setToolDailyEmployee({...toolDailyEmployee, loan_date: d })
    }

    const insertDateDelivery = (newDate) => {
        const d = moment(newDate).format('YYYY-MM-DD')
        setDateDelivery(d);
        setToolDailyEmployee({...toolDailyEmployee, delivery_date: d })
    }

    const rows = toolLists.map(toolList => ({
        id:             toolList.tools_dailyemployee_id,
        article_name:   toolList.article_name,
        number:         toolList.number,
        loan_date:      moment(toolList.loan_date).format('YYYY-MM-DD'),
        delivery_date:  toolList.delivery_date,
    }))

    const saveTools = e => {
        e.preventDefault()

        var data = {
            dailyemployee_id:   dailyemployee_id,
            tool_id:            toolDailyEmployee.tool_id,
            number:             toolDailyEmployee.number,
            loan_date:          toolDailyEmployee.loan_date,
            delivery_date:      toolDailyEmployee.delivery_date,
        }

        if (data.tool_id.length <= 0 || data.number.length <= 0 || data.loan_date.length <= 0) {
            swal({
                title: "Une erreur est survenue!",
                text: "Des formulaires requis sont vides.",
                icon: "error",
                button: "OK",
            });
        } else {
            axios.post('http://localhost:4000/api/toolsdailyemployee', data)
            .then((res) => {
                console.log(res.data);
            })
            window.location.reload();
        }
        
    }

    const columns_tools = [
        // { field: 'id',              headerName: 'Id',                   width: 50,  align: 'center' },
        { field: 'article_name',    headerName: 'Nom du matériel',      width: 200, align: 'center' },
        { field: 'number',          headerName: 'Nombre',               width: 100,  align: 'center' },
        { field: 'loan_date',       headerName: 'Date d\'emprunt',      width: 200, align: 'center' },
        { field: 'delivery_date',   headerName: 'Date de remise',       width: 200, align: 'center', type: 'action', 
            renderCell: (data) => {
                if (!data.row.delivery_date) {
                    return ''
                } else {
                    return moment(data.row.delivery_date).format('YYYY-MM-DD')
                }
            }
        },
        { field: 'action',          headerName: 'Rendre',               width: 90, type: 'action',
            renderCell: (data) => {
                return (
                    <>
                        <Link to={`/employee/toolsdailyemployee/${dailyemployee_id}?id=${data.id}?render=${data.row.number}`}>
                            <IconButton component="label">
                                <KeyboardReturnIcon onClick={handleOpen} />
                            </IconButton>
                        </Link>
                    </>
                )
            }
        },
    ];

    const urlFull = window.location.href;
    var materialId = null
    var materialRender = null
    const urlSplit = urlFull.split('?')
    if (urlSplit[1] != null) {
        var materialId = urlSplit[1].split('=')
    }
    if (urlSplit[2] != null) {
        var materialRender = urlSplit[2].split('=')
    }
    if (open === true) {
        var set = setTimeout(() => {
            setRenderNumber(materialRender[1])
        }, 50)
        if (renderNumber !== 0) clearTimeout(set)
    }
    if (open === false) {
        var set = setTimeout(() => {
            setRenderNumber(0)
        }, 50)
        if (renderNumber == 0) clearTimeout(set)
    }

    const getNumberMax = e => {
        const min = null
        const max = renderNumber

        const numberMax = +e.target.value
        if (numberMax > max) {
            setNumberMax(max)
        } else if (numberMax < min) {
            setNumberMax(min)
        } else {
            setNumberMax(numberMax)
        }
    }

    const updateRender = (e) => {
        e.preventDefault()
        toolsDailyEmployee.render(materialId[1], {number: numberMax}).then(res => {
            console.log(res.data)
        })
        window.location.reload();
    }

    const breadcrumbs = [
        <Typography key="1">
          {employee.matricule}
        </Typography>,
        <Typography key="2" color="text.primary">
          {employee.firstname} {employee.lastname}
        </Typography>,
    ];

  return (
      <div>
          <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
              Materiels empruntés
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
                  href='/employee/dailyemployee'
              >
                  Retour
              </Button>
          </Typography>

          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                      Entrer le nombre du matériel à rendre
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <form onSubmit={updateRender} noValidate autoComplete='off'>
                          <TextField
                              hiddenLabel
                              type="number"
                              id="number"
                              value={numberMax}
                              onChange={getNumberMax}
                              variant="outlined"
                              size="small"
                          /> &nbsp;
                          <Button variant="contained" onClick={updateRender} sx={{ height: 32 }}>Valider</Button>
                      </form>
                  </Typography>
              </Box>
          </Modal>

          <Grid container spacing={2}>
              <Grid item xs={8}>
                  <Box sx={{ height: 380, width: '100%', backgroundColor: 'white' }}>
                      <DataGrid
                          rows={rows}
                          columns={columns_tools}
                          components={{ Toolbar: GridToolbar }}
                          pageSize={4}
                          rowsPerPageOptions={[4]}
                          disableSelectionOnClick
                      />
                  </Box>
              </Grid>
              <Grid item xs={4}>
                  <Card sx={{ minWidth: 275 }}>
                      <form onSubmit={saveTools} noValidate autoComplete='off'>
                          <CardContent>
                              <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                                  Nouveau matériels empruntés
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                  <ArticleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                  <FormControl variant="standard" sx={{ width: '100%', marginTop: 4 }}>
                                      <InputLabel htmlFor="grouped-native-select" id="nametool">Nom du matériel</InputLabel>
                                      <Select
                                          native
                                          id="grouped-native-select"
                                          label="Nom du matériel"
                                          name="tool_id"
                                          value={toolValue}
                                          onChange={handleToolChange}
                                      >
                                          <option value=''></option>
                                          {tools.map(tool => (
                                              <option key={tool.tool_id} value={`${tool.tool_id}`}>{tool.article_name} </option>
                                          ))}
                                      </Select>
                                  </FormControl>
                              </Box><br />
                              <LocalizationProvider dateAdapter={AdapterDateFns}>
                                  <DatePicker
                                      label="Date d'emprunt"
                                      id="loan_date"
                                      name="loan_date"
                                      value={dateLoan}
                                      onChange={insertDateLoan}
                                      renderInput={(params) =>
                                          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                              <TextField
                                                  {...params}
                                                  variant="standard"
                                                  sx={{ width: '100%' }}
                                                  id="loan_date"
                                                  name="loan_date"
                                              />
                                          </Box>
                                      }
                                  />
                              </LocalizationProvider><br />
                              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                  <ConfirmationNumberIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                  <TextField
                                      id="standard-number"
                                      name="number"
                                      label="Nombre de matériel"
                                      type='number'
                                      value={materialNumber}
                                      onChange={getMaterialNumber}
                                      variant="standard"
                                      sx={{ width: '100%' }}
                                  />

                              </Box><br />
                              <LocalizationProvider dateAdapter={AdapterDateFns}>
                                  <DatePicker
                                      label="Date de remise"
                                      id="delivery_date"
                                      name="delivery_date"
                                      value={dateDelivery}
                                      onChange={insertDateDelivery}
                                      renderInput={(params) =>
                                          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                              <TextField
                                                  {...params}
                                                  variant="standard"
                                                  sx={{ width: '100%' }}
                                                  id="delivery_date"
                                                  name="delivery_date"
                                              />
                                          </Box>
                                      }
                                  />
                              </LocalizationProvider><br />

                          </CardContent>
                          <CardActions>
                              <Button size="small" onClick={saveTools}>Enregistrer</Button>
                          </CardActions>
                      </form>
                  </Card>
              </Grid>
          </Grid>

      </div>
  )
}

export default ToolsDailyEmployee