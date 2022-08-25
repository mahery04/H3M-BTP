import React,{useState, useEffect} from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 
import { Grid, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

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

  console.log("DAILYID", dailyemployee_id);

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
   
  return (
    <div>
      <Container maxWidth="xxl">
        <Card sx={{ height: 800, width: '100%' }}>
          <Box sx={{ ml:8, mt:5, fontSize:'18px'}}> 
            <div>
              <b>N° Matricule :</b> {dailyEmployees.matricule} <br/>
              <b>Nom : </b> {dailyEmployees.firstname} <br/>
              <b>Prénom :</b> {dailyEmployees.lastname} <br/>
              <b>Poste occupé : </b> {dailyEmployees.post_name}<br />  
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
          </CardContent>
        </Card>
      </Container>

    </div>
  )
}

export default NewDailyPresence