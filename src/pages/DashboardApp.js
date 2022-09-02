import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';

import AppWidgetSummary from '../sections/@dashboard/app/AppWidgetSummary';

import monthlyEmployeeService from '../services/monthlyEmployeeService';
import dailyEmployeeService from '../services/dailyEmployeeService'
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function DashboardApp() {

  const [dailyemployeeCount, setDailyemployeeCount] = useState(0)
  const [monthlyemployeeCount, setMonthlyemployeeCount] = useState(0)

  const getDailyemployeeCount = () => {
    dailyEmployeeService.getCount().then((res) => { setDailyemployeeCount(res.data.total_dailyemployee) }).catch(err => { console.log(err) })
  }

  const getMonthlyemployeeCount = () => {
    monthlyEmployeeService.getCount().then((res) => { setMonthlyemployeeCount(res.data.total_monthlyemployee) }).catch(err => { console.log(err) })
  }

  useEffect(() => {
    getDailyemployeeCount()
    getMonthlyemployeeCount()
  }, [])

  console.log(dailyemployeeCount, monthlyemployeeCount)

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Effectifs des employés journaliers et mensuels
        </Typography>

        <Grid container spacing={3} sx={{justifyContent:'center'}}>
          <Grid item xs={10} sm={6} md={8} sx={{marginBottom:10}}>
            <AppWidgetSummary title="Employés journaliers" total={dailyemployeeCount} icon={'ic:outline-today'} />
          </Grid>

          <Grid item xs={10} sm={6} md={8}>
            <AppWidgetSummary title="Employés mensuels" total={monthlyemployeeCount} color="warning" icon={'ic:sharp-calendar-month'} />
          </Grid>
        </Grid>

      </Container>
    </Page>
  );
}
