import React,{useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 
import { Grid, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';

import moment from 'moment';

import dailyEmployeeService from '../services/dailyEmployeeService';


function NewDailyPresence() {

  const [dailyEmployees,setDailyEmployees] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [dateStart, setdateStart] = useState(null);
  const [dateEnd, setdateEnd] = useState(null);
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  }

  const findData = useParams();
  const dailyemployee_id = findData.id

  useEffect(() => {
    const load = async () => {
      const res = await dailyEmployeeService.get(dailyemployee_id)
      setDailyEmployees(res.data)
      setLoaded(true)
    }
    if (dailyemployee_id && !loaded) {
      load();
    }
  }, [dailyemployee_id, loaded])

  const insertStartDate = (newDate) => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setdateStart(d);
    setDailyEmployees({ ...dailyEmployees, start_date: d })
  }

  const insertEndDate = (newDate) => {
    const d = moment(newDate).format('YYYY-MM-DD')
    setdateEnd(d);
    setDailyEmployees({ ...dailyEmployees, end_date: d })
  }

  const rows = [
    { id: 1, day: 'Lundi', presence: 'p', avance: '0.00ar', salary: '7500ar',action:'a' },
    { id: 2, day: 'Lundi', presence: 'p', avance: '0.00ar', salary: '7500ar',action:'a' },
  ];
  
  const columns = [
    { field: 'day', headerName: 'Jour', width: 200 },
    { field: 'presence', headerName: 'Présence', width: 200 },
    { field: 'avance', headerName: 'Avance', width: 200 },
    { field: 'salary', headerName: 'Salaire', width: 200 },
    { field: 'action', headerName: 'Action', width: 200, type: 'action',
      renderCell: () => {
        return (
          <>
            <Button variant="contained">Contained</Button>
          </>
        )
      }
    } ,
  ]
  return (
    <div>
      <Container maxWidth="xxl">
        <Card sx={{ height: 900, width: '100%' }}>
          <Box sx={{ ml:8, mt:5, fontSize:'18px'}}> 
            <div>
              <b>N° Matricule :</b> {dailyEmployees.matricule} <br/>
              <b>Nom : </b> {dailyEmployees.firstname} <br/>
              <b>Prénom :</b> {dailyEmployees.lastname} <br/>
              <b>Poste occupé : </b> {dailyEmployees.post_name}<br/>  
            </div>             
          </Box>
          <CardContent>
            <form>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ lineHeight: 6 }}>
                  <Grid item xs={2} sm={4} md={4}>
                    <FormControl variant="standard" sx={{ ml: 40, width:'70%',mt:-15 }}>
                      <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={age}
                        onChange={handleChange}
                        label="Mois"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Date de début"
                        id="start_date"
                        name="start_date"
                        value={dateStart} 
                        onChange={insertStartDate}
                        renderInput={(params) =>
                          <Box sx={{ mt:-15 }}>
                            <TextField 
                              {...params} 
                              variant="standard" 
                              sx={{ width:'70%', ml: 25 }} 
                              id="start_date" 
                              name="start_date" 
                            /><br />
                          </Box>
                        }
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Date de fin"
                        id="end_date"
                        name="end_date"
                        value={dateEnd}
                        onChange={insertEndDate}
                        renderInput={(params) =>
                          <Box sx={{ mt:-15 }}>
                            <TextField 
                              {...params} 
                              variant="standard" 
                              sx={{ width:'70%',ml:10 }} 
                              id="end_date" 
                              name="end_date" 
                            /><br />
                          </Box>
                        }
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Box>
            </form>
            <Paper sx={{ width: '100%', overflow: 'hidden', mt:-10 }}>
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
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}

export default NewDailyPresence