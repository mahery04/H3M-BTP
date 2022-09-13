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
import DailyPresence from './pages/DailyPresence';
import MonthlyPresence from './pages/MonthlyPresence';
import UpdateDailyEmployee from './pages/UpdateDailyEmployee';
import UpdateMonthlyEmployee from './pages/UpdateMonthlyEmployee';
import UpdatePersonnalTools from './pages/UpdatePersonnalTools';
import EmployeePresence from './pages/EmployeePresence';
import ToolsDailyEmployee from './pages/ToolsDailyEmployee';
import NewDailyPresence from './pages/NewDailyPresence';
import ToolsMonthlyEmployee from './pages/ToolsMonthlyEmployee';
import CommonTools from './pages/CommonTools';
import UpdateCommonTools from './pages/UpdateCommonTools';
import NewPersonnalTools from './pages/NewPersonnalTools';
import NewCommonTools from './pages/NewCommonTools';
import NewMonthlyPresence from './pages/NewMonthlyPresence';
import DailyPresenceHistory from './pages/DailyPresenceHistory';


// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/', element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/home" /> },
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
        { path: 'updatedailyemployee/:id', element: <UpdateDailyEmployee /> },
        { path: 'monthlyemployee', element: <MonthlyEmployee /> },
        { path: 'new-monthlyemployee', element: <NewMonthlyEmployee /> },
        { path: 'updatemonthlyemployee/:id', element: <UpdateMonthlyEmployee /> },
        { path: 'toolsdailyemployee/:id', element: <ToolsDailyEmployee /> },
        { path: 'toolsmonthlyemployee/:id', element: <ToolsMonthlyEmployee /> },
      ]
    },
    {
      path: '/tools', element: <DashboardLayout />,
      children: [
        { path: 'personnal', element: <PersonnalTools /> },
        { path: 'newpersonnaltool', element: <NewPersonnalTools /> },
        { path: 'newcommontool', element: <NewCommonTools /> },
        { path: 'common', element: <CommonTools /> },
        { path: 'updatepersonnal/:id', element: <UpdatePersonnalTools /> },
        { path: 'updatecommon/:id', element: <UpdateCommonTools /> },
      ]
    },
    {
      path: '/presence', element: <DashboardLayout />,
      children: [
        { path: 'dailypresence', element: <DailyPresence /> },
        { path: 'monthlypresence', element: <MonthlyPresence /> },
        { path: 'employeepresence/:id', element: <EmployeePresence /> },
        { path: 'newdailypresence/:id', element: <NewDailyPresence /> },
        { path: 'newmonthlypresence/:id', element: <NewMonthlyPresence /> },
        { path: 'dailypresence-history/:id', element: <DailyPresenceHistory /> },
      ]
    },
    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
