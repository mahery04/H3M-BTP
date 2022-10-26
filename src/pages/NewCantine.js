import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupIcon from '@mui/icons-material/Group';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import AddIcon from '@mui/icons-material/Add';
import { Grid, InputAdornment, TextField } from '@mui/material';
import { Button, Card, CardContent, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import dayjs from 'dayjs';
import swal from '@sweetalert/with-react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import cantineService from '../services/cantineService'
import { useNavigate } from 'react-router-dom';

const NewCantine = () => {

  const [month, setMonth] = useState(dayjs())
  const [date, setDate] = useState(null)
  const [selectOne, setSelectOne] = useState('')
  const [selectTwo, setSelectTwo] = useState('')

  const navigate = useNavigate()

  const initialCantineState = {
    id:         null,
    month:      moment(month.$d).format('MMMM YYYY'),
    date:       date,
    nb_people:  null,
    select_one: selectOne,
    price_one:  null,
    select_two: selectTwo,
    price_two:  null
  }

  const [cantine, setCantine] = useState(initialCantineState)

  const insertMonth = (newMonth) => {
    const m = moment(newMonth.$d).format('MMMM YYYY')
    setMonth(m)
    setCantine({ ...cantine, month: m })
  }

  const insertDate = (newLastdate) => {
    const d = moment(newLastdate).format('YYYY-MM-DD')
    setDate(d)
    setCantine({ ...cantine, date: d })
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setCantine({ ...cantine, [name]: value })
  }

  const handleSelectOne = e => {
    const valueOne = e.target.value
    setSelectOne(valueOne)
    setCantine({ ...cantine, select_one: valueOne})
  }

  const handleSelectTwo = e => {
    const valueTwo = e.target.value
    setSelectTwo(valueTwo)
    setCantine({ ...cantine, select_two: valueTwo})
  }

  const saveCantine = e => {
    e.preventDefault()

    var data = {
      month:      cantine.month,
      date:       cantine.date,
      nb_people:  cantine.nb_people,
      select_one: cantine.select_one,
      price_one:  cantine.price_one,
      select_two: cantine.select_two,
      price_two:  cantine.price_two,
    }

    if (!data.month || !data.date || !data.nb_people || !data.select_one || !data.price_one || !data.select_two || !data.price_two) {
      swal({
        title: "Un erreur est survenue!",
        text: "Des formulaires requis sont vides.",
        icon: "error",
        button: "OK",
      });
    } else {
      cantineService.create(data).then(res => {
        setCantine({
          id:         res.data.id,
          month:      res.data.month,
          date:       res.data.date,
          nb_people:  res.data.nb_people,
          select_one: res.data.select_one,
          price_one:  res.data.price_one,
          select_two: res.data.select_two,
          price_two:  res.data.price_two,
        })
      }).catch(err => {
        console.log(err)
      })
      navigate('/cantine/budget?inserted')
    }
  }

  return (
    <>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Budget Cantine
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
          startIcon={<ArrowBackIcon />}
          href='/cantine/budget'
        >
          Retour
        </Button>
      </Typography>

      <Container maxWidth="xxl">
        <Card sx={{ height: 'auto', width: '95%' }}>
          <CardContent>
            <form onSubmit={saveCantine} noValidate autoComplete='off'>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ lineHeight: 6 }}>
                  <Grid item xs={2} sm={4} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        views={['year', 'month']}
                        label="Mois et Année"
                        minDate={dayjs('2012-03-01')}
                        maxDate={dayjs('2023-06-01')}
                        value={month}
                        onChange={insertMonth}
                        renderInput={(params) => <TextField variant="standard" {...params} helperText={null} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  
                  <Grid item xs={2} sm={4} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={insertDate}
                        renderInput={(params) =>
                          <Box>
                            <TextField
                              {...params}
                              variant="standard"
                              id="date"
                              name="date"
                            /><br />
                          </Box>
                        }
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <Box sx={{ display: 'flex' }}>
                      <GroupIcon sx={{ color: 'action.active', mr: 1, my: 0.5, mt: 2.5 }} />
                      <TextField
                        type='number'
                        id="nb_people"
                        value={cantine.nb_people}
                        onChange={handleInputChange}
                        name="nb_people"
                        label="Nombre de personne"
                        variant="standard"
                        sx={{ width: '100%' }}
                      /><br />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ lineHeight: 6 }}>
                  <Grid item xs={2} sm={4} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <SoupKitchenIcon sx={{ color: 'action.active', my: 0.5, mt: 2.5 }} />
                      <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Nombre "Kapoaka Vary"</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={selectOne}
                          onChange={handleSelectOne}
                          label="Nombre kapoaka vary"
                        >
                          <MenuItem value={''}>
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={0.5}>0.5 K</MenuItem>
                          <MenuItem value={1}>1 K</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      id="price_one"
                      name="price_one"
                      label="Prix unitaire 'Kapoka Vary'"
                      sx={{ mt: 1 }}
                      value={cantine.price_one}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Ar</InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ lineHeight: 6 }}>
                  <Grid item xs={2} sm={4} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <SoupKitchenIcon sx={{ color: 'action.active', my: 0.5, mt: 2.5 }} />
                      <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Nombre "Kapoaka Voamaina"</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={selectTwo}
                          onChange={handleSelectTwo}
                          label="Nombre kapoaka voamaina"
                        >
                          <MenuItem value={''}>
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={0.5}>0.5 K</MenuItem>
                          <MenuItem value={1}>1 K</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      id="price_two"
                      name="price_two"
                      label="Prix unitaire 'Kapoka Voamaina'"
                      sx={{ mt: 1 }}
                      value={cantine.price_two}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Ar</InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid><br /><br />
                <Button
                  size="medium"
                  variant="outlined"
                  color="primary"
                  sx={{ width: 250 }}
                  startIcon={<AddIcon />}
                  onClick={saveCantine}
                >
                  Enregistrer
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default NewCantine