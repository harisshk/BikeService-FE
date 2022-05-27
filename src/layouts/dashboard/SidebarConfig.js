// component
import Iconify from '../../components/Iconify';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Dashboard',
    path: '/home',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'Services',
    role: 'CUSTOMER',
    icon: <MiscellaneousServicesIcon />,
    children: [
      {
        title: 'My Services',
        path: '/services/all',
      },
      {
        title: 'Book a Service',
        path: '/services/new',
      },
    ],
  },
  {
    title: 'Bikes',
    role: 'CUSTOMER',
    icon: <TwoWheelerIcon />,
    children: [
      {
        title: 'My Bikes',
        path: '/bike/all',
      },
      {
        title: 'Add New',
        path: '/bike/add',
      },
    ],
  },
  {
    title: 'Services',
    role: 'OWNER',
    icon: <MiscellaneousServicesIcon />,
    children: [
      {
        title: 'All Services',
        path: '/services/all',
      },
    ],
  },
];

export default sidebarConfig;
