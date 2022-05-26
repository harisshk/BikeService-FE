import React from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

// Screens
import Login from './screens/auth/login';
import Signup from './screens/auth/signup';
import BikeList from './screens/bikes/bikeList';
import AddBike from './screens/bikes/newBikeForm';
import Dashboard from './screens/dashboard';
import CreateService from './screens/serviceApplications/serviceForm';
import ServiceList from './screens/serviceApplications/serviceList';
// ----------------------------------------------------------------------

export default function Router({ isLoggedIn }) {
  const location = useLocation();
  const getBrandText = () => {
    const brandText = location.pathname;
    switch (brandText) {
      case '/home':
        return 'Home'
      case '/bike/all':
        return 'Bikes'
      case '/bike/add':
        return 'Add Bike'
      case '/services/all':
        return 'Services'
      case '/services/new':
        return 'Book Service'
      default:
        return '';
    }
  };
  return useRoutes([
    {
      path: '/',
      element: isLoggedIn ? <DashboardLayout title={getBrandText()} /> : <Navigate to="/login" />,
      children: [
        { path: '', element:  <Navigate to="/home" />  },
        { path: 'home', element: <Dashboard />  },
        // { path: 'products', element: <Products /> },
        // { path: 'applications', element: <ApplicationList /> },
      ]
    },
    {
      path: '/bike',
      element: isLoggedIn ? <DashboardLayout title={getBrandText()} /> : <Navigate to="/login" />,
      children: [
        { path: 'all', element: <BikeList /> },
        { path: 'add', element: <AddBike /> },
      ]
    },
    {
      path: '/services',
      element: isLoggedIn ? <DashboardLayout title={getBrandText()} /> : <Navigate to="/login" />,
      children: [
        { path: 'all', element: <ServiceList /> },
        { path: 'new', element: <CreateService /> },
      ]
    },
    {
      path: '/',
      element: !isLoggedIn ? <LogoOnlyLayout /> : <Navigate to="/home" />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <Signup /> },
        // { path: '404', element: <NotFound /> },
        // { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
