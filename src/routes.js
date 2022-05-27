import React from 'react';
import { Navigate, useRoutes, useLocation, useNavigate } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

// Screens
import Login from './screens/auth/login';
import Signup from './screens/auth/signup';
import BikeList from './screens/bikes/bikeList';
import BikeForm from './screens/bikes/bikeForm';
import Dashboard from './screens/dashboard';
import CreateService from './screens/serviceApplications/serviceForm';
import ServiceList from './screens/serviceApplications/serviceList';
import FeatureList from './screens/features/featureList';
import FeatureForm from './screens/features/featureForm';
// ----------------------------------------------------------------------

export default function Router({ isLoggedIn, role }) {
  const location = useLocation();
  const navigate = useNavigate()

  const getBrandText = () => {
    const brandText = location.pathname;
    switch (brandText) {
      case '/home':
        return 'Home'
      case '/bike/all':
        return 'Bikes'
      case '/bike/add':
        return 'Add Bike'
      case '/edit/:id':
        return 'Edit Bike'
      case '/services/all':
        return 'Services'
      case '/services/new':
        return 'Book Service'
      default:
        return '';
    }
  };

  const checkedLogin = isLoggedIn ?
    <DashboardLayout title={getBrandText()} />
    : <Navigate to="/login" />

  const CheckRole = ({ children, requiredRole }) => {
    if (requiredRole === role) {
      return (children)
    } else {
      navigate('/login', { replace: true })
    }
  }
  return useRoutes([
    {
      path: '/',
      element: checkedLogin,
      children: [
        { path: '', element: <Navigate to="/home" /> },
        { path: 'home', element: <Dashboard /> }
      ]
    },
    {
      path: '/bike',
      element: checkedLogin,
      children: [
        { path: 'all', element: <CheckRole requiredRole='CUSTOMER'><BikeList /></CheckRole> },
        { path: 'add', element: <CheckRole requiredRole='CUSTOMER'><BikeForm /></CheckRole> },
        { path: 'edit/:id', element: <CheckRole requiredRole='CUSTOMER'><BikeForm /></CheckRole> },
      ]
    },
    {
      path: '/features',
      element: checkedLogin,
      children: [
        { path: 'all', element: <CheckRole requiredRole='OWNER'><FeatureList /></CheckRole> },
        { path: 'add', element: <CheckRole requiredRole='OWNER'><FeatureForm /></CheckRole> },
        { path: 'edit/:id', element: <CheckRole requiredRole='OWNER'><FeatureForm /></CheckRole> },
      ]
    },
    {
      path: '/services',
      element: checkedLogin,
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
      ]
    },
    { path: '*', element: <Navigate to="/login" replace /> }
  ]);
}
