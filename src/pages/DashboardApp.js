import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';

import AppWidgetSummary from '../sections/@dashboard/app/AppWidgetSummary';

import monthlyEmployeeService from '../services/monthlyEmployeeService';
import dailyEmployeeService from '../services/dailyEmployeeService'
import fullEmployeeService from '../services/fullEmployeeService'

import { useEffect, useState } from 'react';
import swal from '@sweetalert/with-react';

// ----------------------------------------------------------------------

export default function DashboardApp() {

  const user = JSON.parse(sessionStorage.getItem('userInfo'))

  const notification = () => {
    let url = window.location.href
    let param = url.split('?')
    if (param[1] === 'welcome' && user.role_id === 1) {
      swal("Bienvenu !", `Vous êtes connecté en tant que ${user.role_name}`, "success")
    }
    else if (param[1] === 'welcome' && user.role_id === 2) {
      swal("Bienvenu !", `Vous êtes connecté en tant que ${user.role_name}`, "success")
    }
    else if(param[1] === 'welcome' && user.role_id === 5) {
      swal("Bienvenue !", ` ${user.role_name}`, "success");
    } else if(param[1] === 'welcome' && user.role_id === 3) {
      swal("Bienvenue !", ` ${user.role_name}`, "success");
    }
  }
  notification()

  const [dailyemployeeCount, setDailyemployeeCount] = useState(0)
  const [monthlyemployeeCount, setMonthlyemployeeCount] = useState(0)
  const [btpCount, setBtpCount] = useState(0)
  const [sipCount, setSipCount] = useState(0)
  const [parapharmaceutiqueCount, setParapharmaceutiqueCount] = useState(0)

  const getDailyemployeeCount = () => {
    dailyEmployeeService.getCount().then((res) => { setDailyemployeeCount(res.data.total_dailyemployee) }).catch(err => { console.log(err) })
  }

  const getMonthlyemployeeCount = () => {
    monthlyEmployeeService.getCount().then((res) => { setMonthlyemployeeCount(res.data.total_monthlyemployee) }).catch(err => { console.log(err) })
  }

  const getBtpCount = () => {
    fullEmployeeService.btpCount().then((res) => { setBtpCount(res.data.btp_count) }).catch(err => { console.log(err) })
  }

  const getSipCount = () => {
    fullEmployeeService.sipCount().then((res) => { setSipCount(res.data.sip_count) }).catch(err => { console.log(err) })
  }

  const getParapharmaceutiqueCount = () => {
    fullEmployeeService.parapharmaceutiqueCount().then((res) => { setParapharmaceutiqueCount(res.data.parapharmaceutique_count) }).catch(err => { console.log(err) })
  }

  useEffect(() => {
    getDailyemployeeCount()
    getMonthlyemployeeCount()
    getBtpCount()
    getSipCount()
    getParapharmaceutiqueCount()
  }, [])


  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Effectifs des employés journaliers et mensuels
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={10} sm={6} md={6}>
            <AppWidgetSummary title="Employés journaliers" total={dailyemployeeCount} icon={'ic:outline-today'} />
          </Grid>

          <Grid item xs={10} sm={6} md={6}>
            <AppWidgetSummary title="Employés mensuels" total={monthlyemployeeCount} color="warning" icon={'ic:sharp-calendar-month'} />
          </Grid>
        </Grid><br />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="BTP" total={btpCount} color="warning" icon={'ant-design:shopping-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="SIP" total={sipCount} color="error" icon={'ant-design:shopping-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Parapharmaceutique" total={parapharmaceutiqueCount} color="success" icon={'ant-design:shopping-filled'} />
          </Grid>
        </Grid>

      </Container>
    </Page>
  );
}
