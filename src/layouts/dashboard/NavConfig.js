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
    icon: getIcon('material-symbols:10k-outline-sharp'),
  },
  {
    category: 'employee',
    title: 'Employé Mensuel',
    path: '/employee/monthlyemployee',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    category: 'tools',
    title: 'Nouveau outil',
    path: '/tools/new-tool',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    category: 'tools',
    title: 'Personnel',
    path: '/tools/personnal',
    icon: getIcon('eva:pie-chart-2-fill'),
  },

  {
    category: 'tools',
    title: 'Commun',
    path: '/tools/common',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
];

export default navConfig;
