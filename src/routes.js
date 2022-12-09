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
import UpdateMonthlyPresence from './pages/UpdateMonthlyPresence';
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
import UpdateContratMonthlyEmployee from './pages/UpdateContratMonthlyEmployee';
import ServiceProvider from './pages/ServiceProvider';
import NewServiceProvider from './pages/NewServiceProvider';
import UpdateServiceProvider from './pages/UpdateServiceProvider';
import Permission from './pages/Permission';
import NewPermission from './pages/NewPermission';
import UpdatePermission from './pages/UpdatePermission';
import MonthlySalary from './pages/MonthlySalary';
import NewMonthlySalary from './pages/NewMonthlySalary';
import UpdateMonthlySalary from './pages/UpdateMonthlySalary';
import EtatPaiePersonnalMensuel from './pages/EtatPaiePersonnalMensuel';
import PaymentGlobalView from './pages/PaymentGlobalView';
import SalaryServiceProvider from './pages/SalaryServiceProvider';
import NewSalaryServiceProvider from './pages/newSalaryServiceProvider';
import UpdateSalaryServiceProvider from './pages/UpdateSalaryServiceProvider';
import HistoryTool from './pages/HistoryTool';
import NewHistoryTool from './pages/NewHistoryTool';
import UpdateHistoryTool from './pages/UpdateHistoryTool';
import Trash from './pages/Trash';
import FamilyEmployee from './pages/FamilyEmployee';
import NewFamilyEmployee from './pages/NewFamilyEmployee';
import UpdateFamilyEmployee from './pages/UpdateFamilyEmployee';



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
        { path: 'update-contrat-monthly-employee/:id', element: !user? <Navigate to="/login" /> : <UpdateContratMonthlyEmployee /> },

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
        { path: 'newmonthlypresence', element: !user? <Navigate to="/login" /> : <NewMonthlyPresence /> },
        { path: 'updatemonthlypresence/:id', element: !user? <Navigate to="/login" /> : <UpdateMonthlyPresence /> },
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
        { path: 'permission', element: !user? <Navigate to="/login" /> : <Permission /> },
        { path: 'new-permission', element: !user? <Navigate to="/login" /> : <NewPermission /> },
        { path: 'update-permission/:id', element: !user? <Navigate to="/login" /> : <UpdatePermission /> },
      ]
    },
    {
      path: '/service-provider', element: <DashboardLayout />,
      children: [
        { path: 'personnal', element: !user? <Navigate to="/login" /> : <ServiceProvider /> },
        { path: 'new', element: !user? <Navigate to="/login" /> : <NewServiceProvider /> },
        { path: 'update-service-provider/:id', element: !user? <Navigate to="/login" /> : <UpdateServiceProvider /> },
      ]
    },
    {
      path: '/monthly-salary', element: <DashboardLayout />,
      children: [
        { path: 'personnal', element: !user? <Navigate to="/login" /> : <MonthlySalary /> },
        { path: 'new/:id', element: !user? <Navigate to="/login" /> : <NewMonthlySalary /> },
        { path: 'update-monthly/:id', element: !user? <Navigate to="/login" /> : <UpdateMonthlySalary /> },
      ]
    },
    {
      path: '/state-pay', element: <DashboardLayout />,
      children: [
        { path: 'personnal/:id', element: !user? <Navigate to="/login" /> : <EtatPaiePersonnalMensuel /> },
        { path: 'new', element: !user? <Navigate to="/login" /> : <NewMonthlySalary /> },
        { path: 'update-monthly/:id', element: !user? <Navigate to="/login" /> : <UpdateMonthlySalary /> },
        { path: 'paiement-global-view', element: !user? <Navigate to="/login" /> : <PaymentGlobalView /> },
      ]
    },
    {
      path: '/salary', element: <DashboardLayout />,
      children: [
        { path: 'personnal/:id', element: !user? <Navigate to="/login" /> : <SalaryServiceProvider /> },
        { path: 'new', element: !user? <Navigate to="/login" /> : <NewSalaryServiceProvider /> },
        { path: 'update-salary-provider/:id', element: !user? <Navigate to="/login" /> : <UpdateSalaryServiceProvider /> },
      ]
    },
    {
      path: '/history', element: <DashboardLayout />,
      children: [
        { path: 'tool/:id', element: !user? <Navigate to="/login" /> : <HistoryTool /> },
        { path: 'new', element: !user? <Navigate to="/login" /> : <NewHistoryTool /> },
        { path: 'update-tool/:id', element: !user? <Navigate to="/login" /> : <UpdateHistoryTool /> },

      ]
    },
    {
      path: '/trash', element: <DashboardLayout />,
      children: [
        { path: 'tool', element: !user? <Navigate to="/login" /> : <Trash /> },
      ]
    },
    {
      path: '/family', element: <DashboardLayout />,
      children: [
        { path: 'personnal', element: !user? <Navigate to="/login" /> : <FamilyEmployee /> },
        { path: 'new', element: !user? <Navigate to="/login" /> : <NewFamilyEmployee /> },
        { path: 'update/:id', element: !user? <Navigate to="/login" /> : <UpdateFamilyEmployee /> },
      ]
    },
  ]);
}
