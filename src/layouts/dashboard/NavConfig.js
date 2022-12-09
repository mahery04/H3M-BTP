// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const user = JSON.parse(sessionStorage.getItem('userInfo'))

export let navConfig
if (user) {
  if (user.role_id == 1) {
    navConfig = [
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
      {
        category: 'tools',
        title: 'Listes des outils H3M',
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
        title: 'Employé journalier',
        path: '/presence/dailypresence',
        icon: getIcon('ic:outline-today'),
      },
      {
        category: 'absence',
        title: 'Employés mesuels',
        path: '/presence/monthlypresence',
        icon: getIcon('ic:baseline-calendar-month'),
      },
      {
        category: 'etat_mensuel',
        title: 'Permissions',
        path: '/conge/permission',
        icon: getIcon('material-symbols:back-hand'),
      },
      {
        category: 'etat_mensuel',
        title: 'Absences',
        path: '/presence/monthlypresence',
        icon: getIcon('ic:baseline-calendar-month'),
      },
      {
        category: 'etat_mensuel',
        title: 'Congés',
        path: '/conge/personnal',
        icon: getIcon('bx:money'),
      },
      {
        category: 'cantine',
        title: 'Budget cantine',
        path: '/cantine/budget',
        icon: getIcon('bx:money'),
      },
      // {
      //   category: 'conge',
      //   title: 'Listes des congés',
      //   path: '/conge/personnal',
      //   icon: getIcon('bx:money'),
      // },
      {
        category: 'conge',
        title: 'Listes des permissions',
        path: '/conge/permission',
        icon: getIcon('material-symbols:back-hand'),
      },
      {
        category: 'service-provider',
        title: 'Prestataire H3M',
        path: '/service-provider/personnal',
        icon: getIcon('la:user'),
      },
      {
        category: 'monthly-salary',
        title: 'Listes des états de paie mensuel',
        path: '/monthly-salary/personnal',
        icon: getIcon('la:user'),
      },
      {
        category: 'trash',
        title: 'Listes outillages supprimés',
        path: '/trash/tool',
        icon: getIcon('bx:money'),
      },
      {
        category: 'family',
        title: 'Famille des employées',
        path: '/family/personnal',
        icon: getIcon('bx:money'),
      },
    ];
  } else if (user.role_id == 2) {
    navConfig = [
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
        category: 'tools',
        title: 'Listes des outils H3M',
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
      //   category: 'cantine',
      //   title: 'Cantine',
      //   path: '',
      //   icon: getIcon('la:utensils'),
      // },
    ];
  } else if (user.role_id == 3) {
    navConfig = [
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
      {
        category: 'tools',
        title: 'Listes des outils H3M',
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
        title: 'Employé journalier',
        path: '/presence/dailypresence',
        icon: getIcon('ic:outline-today'),
      },
      {
        category: 'absence',
        title: 'Employés mesuels',
        path: '/presence/monthlypresence',
        icon: getIcon('ic:baseline-calendar-month'),
      },
      {
        category: 'etat_mensuel',
        title: 'Permissions',
        path: '/conge/permission',
        icon: getIcon('material-symbols:back-hand'),
      },
      {
        category: 'etat_mensuel',
        title: 'Absences',
        path: '/presence/monthlypresence',
        icon: getIcon('ic:baseline-calendar-month'),
      },
      {
        category: 'etat_mensuel',
        title: 'Congés',
        path: '/conge/personnal',
        icon: getIcon('bx:money'),
      },
      {
        category: 'cantine',
        title: 'Budget cantine',
        path: '/cantine/budget',
        icon: getIcon('bx:money'),
      },
      // {
      //   category: 'conge',
      //   title: 'Listes des congés',
      //   path: '/conge/personnal',
      //   icon: getIcon('bx:money'),
      // },
      {
        category: 'conge',
        title: 'Listes des permissions',
        path: '/conge/permission',
        icon: getIcon('material-symbols:back-hand'),
      },
      {
        category: 'service-provider',
        title: 'Prestataire H3M',
        path: '/service-provider/personnal',
        icon: getIcon('la:user'),
      },
      {
        category: 'monthly-salary',
        title: 'Listes des états de paie mensuel',
        path: '/monthly-salary/personnal',
        icon: getIcon('la:user'),
      },
      {
        category: 'family',
        title: 'Famille des employées',
        path: '/trash/tool',
        icon: getIcon('bx:money'),
      }
    ];
  } else if (user.role_id == 5) {
    navConfig = [
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
      {
        category: 'tools',
        title: 'Listes des outils H3M',
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
        title: 'Employé journalier',
        path: '/presence/dailypresence',
        icon: getIcon('ic:outline-today'),
      },
      {
        category: 'absence',
        title: 'Employés mesuels',
        path: '/presence/monthlypresence',
        icon: getIcon('ic:baseline-calendar-month'),
      },
      {
        category: 'etat_mensuel',
        title: 'Permissions',
        path: '/conge/permission',
        icon: getIcon('material-symbols:back-hand'),
      },
      {
        category: 'etat_mensuel',
        title: 'Absences',
        path: '/presence/monthlypresence',
        icon: getIcon('ic:baseline-calendar-month'),
      },
      {
        category: 'etat_mensuel',
        title: 'Congés',
        path: '/conge/personnal',
        icon: getIcon('bx:money'),
      },
      {
        category: 'cantine',
        title: 'Budget cantine',
        path: '/cantine/budget',
        icon: getIcon('bx:money'),
      },
      // {
      //   category: 'conge',
      //   title: 'Listes des congés',
      //   path: '/conge/personnal',
      //   icon: getIcon('bx:money'),
      // },
      {
        category: 'conge',
        title: 'Listes des permissions',
        path: '/conge/permission',
        icon: getIcon('material-symbols:back-hand'),
      },
      {
        category: 'service-provider',
        title: 'Prestataire H3M',
        path: '/service-provider/personnal',
        icon: getIcon('la:user'),
      },
      {
        category: 'monthly-salary',
        title: 'Listes des états de paie mensuel',
        path: '/monthly-salary/personnal',
        icon: getIcon('la:user'),
      },
      {
        category: 'family',
        title: 'Famille des employées',
        path: '/family/personnal',
        icon: getIcon('bx:money'),
      }
    ];
  }
}
