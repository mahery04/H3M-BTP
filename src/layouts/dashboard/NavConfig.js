// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [

  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  
  {
    category: 'home',
    title: 'Dashboard',
    path: '/dashboard/home',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    category: 'employee',
    title: 'Employé Journalier',
    path: '/employee/dailyemployee',
    icon: getIcon('ic:outline-today'),
  },
  {
    category: 'employee',
    title: 'Employé Mensuel',
    path: '/employee/monthlyemployee',
    icon: getIcon('ic:baseline-calendar-month'),
  },
  // {
  //   category: 'tools',
  //   title: 'Nouveau outil',
  //   path: '/tools/new-tool',
  //   icon: getIcon('ic:baseline-plus'),
  // },
  {
    category: 'tools',
    title: 'Outillages personnel',
    path: '/tools/personnal',
    icon: getIcon('la:user'),
  },
  {
    category: 'tools',
    title: 'Outillages commun',
    path: '/tools/common',
    icon: getIcon('la:users'),
  },
  {
    category: 'presence',
    title: 'Présence journalier',
    path: '/presence/dailypresence',
    icon: getIcon('ic:outline-today'),
  },
  {
    category: 'presence',
    title: 'Présence mensuel',
    path: '/presence/monthlypresence',
    icon: getIcon('ic:baseline-calendar-month'),
  },
];

export default navConfig;
