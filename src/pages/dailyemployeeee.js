import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { Link } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArticleIcon from '@mui/icons-material/Article';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import FilterTiltShiftIcon from '@mui/icons-material/FilterTiltShift';

import moment from 'moment'
import swal from '@sweetalert/with-react';

import dailyEmployeeService from '../services/dailyEmployeeService';
import personnalToolsService from '../services/personnalToolsService';
import toolsDailyEmployee from '../services/toolsDailyEmployee';

import axios from 'axios';

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  borderRadius: '8px',
  width: '60%',
  height: '750px'
};

function DailyEmployee() {

  const notification = () => {
    let url = window.location.href
    let param = url.split('?')
    console.log(param[1])
    if(param[1] === 'inserted') {
      swal("", "Employé inseré avec succés!", "success");
    } else if(param[1] === 'deleted') {
      swal("", "Employé supprimé avec succés!", "success");
    } else if(param[1] === 'updated') {
      swal("", "Employé modifié avec succés!", "success");
    }
  }
  notification()

  const [dailyemployees, setDailyemployees] = useState([]);
  const [tools,setTool] = useState([]);
  const [toolLists,setToolLists] = useState([]);
  const [toolValue,setToolValue] = useState();
  const [dateLoan, setDateLoan] = useState(null);
  const [dateDelivery, setDateDelivery] = useState(null);
  const [materialNumber, setMaterialNumber] = useState(null);
  const [open, setOpen] = useState(false);
  const [identifiant, setIdentifiant] = useState(null);
  const [numberTool,setNumberTool] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const label = { inputProps: { 'aria-label': 'Checkbox demo' }}

  const getDailyemployees = () => {
    dailyEmployeeService.getAll().then((res) => {
      setDailyemployees(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

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
      // console.log('tools :', res.data)
      // const toolLists = res.data
      console.log("STATE TOOLS ", toolLists);
    })
  }

  useEffect(() => { 
    getDailyemployees()
    getTools()
  },[])

  useEffect(() => {
    const url = window.location.href;
    const id = url.split("?");
    if (open === true) {
      const interval = setInterval(() => {
        getToolsDailyEmployees(id[1])
      }, 500);
      return () => clearInterval(interval);
    }
    
  })

  const initialToolState = {
    dailyemployee_id: identifiant,
    tool_id:          null,
    number:           '',
    loan_date:        '',
    delivery_date:    '',
    observation:      ''
  }

  const [toolDailyEmployee,setToolDailyEmployee] = useState(initialToolState)

  const handleToolChange = (event) => {
    const { name, value } = event.target
    setToolValue(toolValue);
    setToolDailyEmployee({...toolDailyEmployee, [name]: value})
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

  if (open === true) {
    const urlFull = window.location.href;
    const idu = urlFull.split("?");
    var set = setTimeout(() => {
      setIdentifiant(idu[1])
      setToolDailyEmployee({...toolDailyEmployee, dailyemployee_id: identifiant })
      
    }, 50); 

    if (toolDailyEmployee.dailyemployee_id !== null) {
      clearTimeout(set)
    }
  }

  if (open === false) {
    var set = setTimeout(() => {
      setToolLists([])
      setIdentifiant(null)
      setToolDailyEmployee({...toolDailyEmployee, dailyemployee_id: identifiant })
    }, 1000); 

    if (toolDailyEmployee.dailyemployee_id == null) {
      clearTimeout(set)
    }
  }

  console.log("TOOLSDAILYEMPLOYEE ",toolDailyEmployee);

  useEffect(() => {
    toolsDailyEmployee.getNumber(toolDailyEmployee.tool_id).then((res) => {
      setNumberTool(res.data[0].material_number)
    })
  },[toolDailyEmployee.tool_id, numberTool])

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

    console.log("MTR", materialNumber);
  }

  const columns = [
    { field: 'id',            headerName: 'Id',                 width: 50 },
    { field: 'matricule',     headerName: 'Matricule',          width: 100 },
    { field: 'firstname',     headerName: 'Nom',                width: 100 },
    { field: 'lastname',      headerName: 'Prénom',             width: 100 },
    { field: 'cin',           headerName: 'Numéro CIN',         width: 150, type: 'number' },
    { field: 'address',       headerName: 'Adresse',            width: 100 },
    { field: 'post_name',     headerName: 'Poste occupé',       width: 150 },
    { field: 'code_chantier', headerName: 'Code Chantier',      width: 150 },
    { field: 'group',         headerName: 'Groupe',             width: 100 },
    { field: 'contact',       headerName: 'Contact',            width: 150 },
    { field: 'category',      headerName: 'Catégorie',          width: 100 },
    { field: 'hiring_date',   headerName: 'Date d\'embauche',   width: 150 },
    { field: 'tools',         headerName: 'Matériels empruntés',width: 150 ,type: 'action',
      renderCell: (data) => {
        return (
          <>
            <Stack direction="row">
              <Link to={'/employee/dailyemployee?' + data.id}>
                <Chip 
                  icon={<AddCircleIcon/>} 
                  label="Voir"
                  onClick={handleOpen}
                  variant="outlined"
                  color="primary"
                />
              </Link>
            </Stack>
          </>
        )
      }},
    { field: 'remarque', headerName: 'Remarque', width: 200 },
    { field: 'action', headerName: 'Action', width: 150, type: 'action',
      renderCell: (data) => {
        return (
          <>
            <Link to={'/employee/updatedailyemployee/' + data.id}>
              <IconButton component="label">
                <EditIcon />
              </IconButton>
            </Link>
            {/* <IconButton component="label" onClick={() => deleteDailyemployee(data.id)}>
              <DeleteIcon />
            </IconButton> */}
          </>
        )
      }
    },
  ];

  const rows = dailyemployees.map(dailyemployee => ({ 
    id:           dailyemployee.dailyemployee_id, 
    matricule:    dailyemployee.matricule, 
    firstname:    dailyemployee.firstname, 
    lastname:     dailyemployee.lastname, 
    cin:          dailyemployee.cin, 
    address:      dailyemployee.address, 
    contact:      dailyemployee.contact, 
    post_name:    dailyemployee.post_name, 
    code_chantier:dailyemployee.code_chantier,
    group:        dailyemployee.group,
    category:     dailyemployee.category, 
    hiring_date:  moment(dailyemployee.hiring_date).format('YYYY-MM-DD'),
    tools:        '',
    remarque:     dailyemployee.remarque
  }))

  const toolsArray = toolLists.map(toolList => ({
    id:             toolList.tools_dailyemployee_id,
    article_name:   toolList.article_name,
    number:         toolList.number,
    loan_date:      toolList.loan_date,
    delivery_date:  toolList.delivery_date,
    observation:    toolList.observation,
  }))

  const columns_tools = [
    { field: 'id',            headerName: 'Id',                 width: 50,  align:'center' },
    { field: 'article_name',  headerName: 'Nom du matériel',    width: 200, align:'center' },
    { field: 'number',        headerName: 'Nombre de matériel', width: 150, align:'center' },
    { field: 'loan_date',     headerName: 'Date d\'emprunt',    width: 200, align:'center' },
    { field: 'delivery_date', headerName: 'Date de remise',     width: 200, align:'center' },
    { field: 'observation',   headerName: 'Observation',        width: 250, align:'center' },
    { field: 'action',        headerName: 'Action',             width: 100, type: 'action',
      renderCell: (data) => {
        return (
          <>
            <Link to={'/employee/updatedailyemployee/' + data.id}>
              <IconButton component="label">
                <EditIcon />
              </IconButton>
            </Link>
          </>
        )
      }
    },
  ];

  const deleteDailyemployee = (id) => {
    swal({
      text: "Supprimer l'employé de la liste ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if(willDelete) { 
        dailyEmployeeService.remove(id)
        const newTabList = dailyemployees.filter((dailyemployee) => dailyemployee.id !== id)
        setDailyemployees(newTabList)
        document.location.reload(true)
      }
    });
  }

  const saveTools = e => {
    e.preventDefault()

    var data = {
      dailyemployee_id: toolDailyEmployee.dailyemployee_id,
      tool_id: toolDailyEmployee.tool_id,
      number: toolDailyEmployee.number,
      loan_date: toolDailyEmployee.loan_date,
      delivery_date: toolDailyEmployee.delivery_date,
      observation: toolDailyEmployee.observation
    }
    console.log("DATA ",data);

    // if ( data.number.length <= 0 || data.loan_date.length <= 0) {
    //   swal({
    //     title: "Un erreur est survenu",
    //     text: "Veuillez remplir tous les formulaires",
    //     icon: "error",
    //     button: "OK"
    //   });
    // } else {
    //   toolsDailyEmployee.create(data).then(res => {
    //     setToolDailyEmployee({
    //       dailyemployee_id: res.data.dailyemployee_id,
    //       tool_id: res.data.tool_id,
    //       number: res.data.number,
    //       loan_date: res.data.loan_date,
    //       delivery_date: res.data.delivery_date,
    //       observation: res.data.observation
    //     })
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // }

    axios.post('http://localhost:4000/api/toolsdailyemployee',data)
    .then((res)=> {
      console.log(res.data);  
    })
    window.location.reload();
  }

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Listes des employé(e)s journaliers
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
          startIcon={<AddIcon />}
          href='/employee/new-dailyemployee'
        >
          Nouveau employé
        </Button>
      </Typography>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ textAlign:'center', color:'DimGray', lineHeight:3 }}>
            Nouveau matériels empruntés
          </Typography>
          <Container maxWidth="xxl"> 
            <form onSubmit={saveTools} noValidate autoComplete='off'>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 5 }} columns={{ xs: 4, sm: 8, md: 8 }} sx={{ lineHeight: 5 }}>
                  <Grid item xs={2} sm={4} md={4}>
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
                            <option key={tool.tool_id} value={`${tool.tool_id}`}>{tool.article_name}</option>
                          ))}
                        </Select>
                      </FormControl><br />
                    </Box>
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
                            /><br />
                          </Box>
                        }
                      />
                    </LocalizationProvider>                    
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <ConfirmationNumberIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField 
                        type='number'
                        value={materialNumber}
                        id="number" 
                        name="number" 
                        label="Nombre de matériel" 
                        onChange={getMaterialNumber}
                        variant="standard" 
                        sx={{ width: '100%' }} 
                      />
                      <br />
                    </Box>
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
                            /><br />
                          </Box>
                        }
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Box>  
              <Box sx={{ display: 'flex', alignItems: 'flex-end', lineHeight:5 }}>
                <FilterTiltShiftIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField 
                  id="observation" 
                  name="observation" 
                  value={toolValue}
                  label="Observation" 
                  onChange={handleToolChange}
                  variant="standard" 
                  sx={{ width: '100%' }} 
                /><br />
              </Box> <br/> <br/>
              <Button
                size="medium"
                variant="outlined"
                color="primary"
                sx={{ width: '100%' }}
                startIcon={<AddIcon />}
                onClick={saveTools}
              >
                Enregistrer
              </Button>          
            </form>   <br/>
            <Box sx={{ height: 300, width: '100%' }}>
              <DataGrid
                rows={toolsArray}
                columns={columns_tools}
                components={{ Toolbar: GridToolbar }}
                pageSize={2}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
          </Box>
          </Container> 
        </Box>
      </Modal>

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

export default DailyEmployee