import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//

import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';

import DashboardApp from './pages/DashboardApp';
import DailyEmployee from './pages/DailyEmployee';
import NewDailyEmployee from './pages/NewDailyEmployee';
import MonthlyEmployee from './pages/MonthlyEmployee';
import NewMonthlyEmployee from './pages/NewMonthlyEmployee';
import PersonnalTools from './pages/PersonnalTools';
import CommonTools from './pages/CommonTools';
import NewTools from './pages/NewTools';


// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/', element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/dashboard', element: <DashboardLayout />, 
      children: [
        { path: 'home', element: <DashboardApp /> },
      ]
    },
    {
      path: '/employee', element: <DashboardLayout />, 
      children: [
        { path: 'dailyemployee', element: <DailyEmployee /> },
        { path: 'new-dailyemployee', element: <NewDailyEmployee /> },
        { path: 'monthlyemployee', element: <MonthlyEmployee /> },
        { path: 'new-monthlyemployee', element: <NewMonthlyEmployee /> },
      ]
    },
    {
      path: '/tools', element: <DashboardLayout />,
      children: [
        { path: 'personnal', element: <PersonnalTools /> },
        { path: 'new-tool', element: <NewTools /> },
        { path: 'common', element: <CommonTools /> },
      ]
    },
    // {
    //   path: '/presence', 
    // },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
