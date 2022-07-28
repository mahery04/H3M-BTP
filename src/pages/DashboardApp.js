import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppCurrentVisits,
//   AppWebsiteVisits,
//   AppTrafficBySite,
//   AppWidgetSummary,
//   AppCurrentSubject,
//   AppConversionRates,
// } from '../sections/@dashboard/app';

import AppWidgetSummary from '../sections/@dashboard/app/AppWidgetSummary';
import AppCurrentVisits from '../sections/@dashboard/app/AppCurrentVisits';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Dashboard Employés
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={10} sm={6} md={8}>
            <AppWidgetSummary title="Employés journaliers" total={714000} icon={'ic:outline-today'} />
          </Grid>

          <Grid item xs={10} sm={6} md={8}>
            <AppWidgetSummary title="Employés mensuels" total={1723315} color="warning" icon={'ic:sharp-calendar-month'} />
          </Grid>
        </Grid>

      </Container>
    </Page>
  );
}
