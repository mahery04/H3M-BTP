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
import DailyPresenceView from './pages/DailyPresenceView';
import MonthlyPresenceHistory from './pages/MonthlyPresenceHistory';
import MonthlyPresenceView from './pages/MonthlyPresenceView';
import Cantine from './pages/Cantine';
import NewCantine from './pages/NewCantine';
import Conge from './pages/Conge';
import NewConge from './pages/NewConge';
import UpdateConge from './pages/UpdateConge';
import ContratDailyEmployee from './pages/ContratDailyEmployee';
import UpdateContratDailyEmployee from './pages/UpdateContratDailyEmployee';
import ContratMonthlyEmployee from './pages/ContratMonthlyEmployee';


// ----------------------------------------------------------------------

export default function Router() {
  const user = sessionStorage.getItem('userInfo')

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
        { path: 'home', element: !user? <Navigate to="/login" /> : <DashboardApp /> },
      ]
    },
    {
      path: '/employee', element: <DashboardLayout />, 
      children: [
        { path: 'dailyemployee', element: !user? <Navigate to="/login" /> : <DailyEmployee /> },
        { path: 'new-dailyemployee', element: !user? <Navigate to="/login" /> : <NewDailyEmployee /> },
        { path: 'updatedailyemployee/:id', element: !user? <Navigate to="/login" /> : <UpdateDailyEmployee /> },
        { path: 'monthlyemployee', element: !user? <Navigate to="/login" /> : <MonthlyEmployee /> },
        { path: 'new-monthlyemployee', element: !user? <Navigate to="/login" /> : <NewMonthlyEmployee /> },
        { path: 'updatemonthlyemployee/:id', element: !user? <Navigate to="/login" /> : <UpdateMonthlyEmployee /> },
        { path: 'toolsdailyemployee/:id', element: !user? <Navigate to="/login" /> : <ToolsDailyEmployee /> },
        { path: 'toolsmonthlyemployee/:id', element: !user? <Navigate to="/login" /> : <ToolsMonthlyEmployee /> },
        { path: 'contrat-daily-employee/:id', element: !user? <Navigate to="/login" /> : <ContratDailyEmployee /> },
        { path: 'update-contrat-daily-employee/:id', element: !user? <Navigate to="/login" /> : <UpdateContratDailyEmployee /> },
        { path: 'contrat-monthly-employee/:id', element: !user? <Navigate to="/login" /> : <ContratMonthlyEmployee /> },


      ]
    },
    {
      path: '/tools', element: <DashboardLayout />,
      children: [
        { path: 'personnal', element: !user? <Navigate to="/login" /> : <PersonnalTools /> },
        { path: 'newpersonnaltool', element: !user? <Navigate to="/login" /> : <NewPersonnalTools /> },
        { path: 'newcommontool', element: !user? <Navigate to="/login" /> : <NewCommonTools /> },
        { path: 'common', element: !user? <Navigate to="/login" /> : <CommonTools /> },
        { path: 'updatepersonnal/:id', element: !user? <Navigate to="/login" /> : <UpdatePersonnalTools /> },
        { path: 'updatecommon/:id', element: !user? <Navigate to="/login" /> : <UpdateCommonTools /> },
      ]
    },
    {
      path: '/presence', element: <DashboardLayout />,
      children: [
        { path: 'dailypresence', element: !user? <Navigate to="/login" /> : <DailyPresence /> },
        { path: 'monthlypresence', element: !user? <Navigate to="/login" /> : <MonthlyPresence /> },
        { path: 'employeepresence/:id', element: !user? <Navigate to="/login" /> : <EmployeePresence /> },
        { path: 'newdailypresence/:id', element: !user? <Navigate to="/login" /> : <NewDailyPresence /> },
        { path: 'newmonthlypresence/:id', element: !user? <Navigate to="/login" /> : <NewMonthlyPresence /> },
        { path: 'dailypresence-history/:id', element: !user? <Navigate to="/login" /> : <DailyPresenceHistory /> },
        { path: 'dailypresence-view', element: !user? <Navigate to="/login" /> : <DailyPresenceView /> },
        { path: 'monthlypresence-history/:id', element: !user? <Navigate to="/login" /> : <MonthlyPresenceHistory /> },
        { path: 'monthlypresence-view', element: !user? <Navigate to="/login" /> : <MonthlyPresenceView /> },
      ]
    },
    {
      path: '/cantine', element: <DashboardLayout />,
      children: [
        { path: 'budget', element: !user? <Navigate to="/login" /> : <Cantine /> },
        { path: 'new', element: !user? <Navigate to="/login" /> : <NewCantine /> },
      ]
    },

    {
      path: '/conge', element: <DashboardLayout />,
      children: [
        { path: 'personnal', element: !user? <Navigate to="/login" /> : <Conge /> },
        { path: 'new', element: !user? <Navigate to="/login" /> : <NewConge /> },
        { path: 'update-conge/:id', element: !user? <Navigate to="/login" /> : <UpdateConge /> },
      ]
    },
    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
