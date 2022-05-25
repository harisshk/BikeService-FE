// component
import Iconify from '../../components/Iconify';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'Applications',
    path: '/applications',
    role: 'ADMIN',
    icon: <AppRegistrationIcon />
  },
  {
    title: 'Users',
    role: 'ADMIN',
    children: [
      {
        title: 'Add User',
        path: '/users/add',
      },
      {
        title: 'Admin',
        path: '/users/admin',
      },
      {
        title: 'Screeners',
        path: '/users/screener',
      },
      {
        title: 'Evaluators',
        path: '/users/evaluator',
      },
      {
        title: 'Students',
        path: '/users/student',
      },
    ],
    icon: getIcon('akar-icons:person')
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon('eva:file-text-fill')
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill')
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill')
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill')
  // }
];

export default sidebarConfig;
