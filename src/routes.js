import React from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

//
import Login from './screens/auth/login';
// ----------------------------------------------------------------------

export default function Router({ isLoggedIn }) {
  const location = useLocation();
  const getBrandText = () => {
    const brandText = location.pathname;
    switch (brandText) {
      case '/dashboard':
        return 'Dashboard'
      case '/applications':
        return 'Applications'
      case '/users/add':
        return 'Add User'
      case '/users/admin':
        return 'Admin'
      case '/users/evaluator':
        return 'Evaluators'
      case '/users/screener':
        return 'Screeners'
      case '/users/student':
        return 'Students'
      default:
        break;
    }
  };
  return useRoutes([
    {
      path: '/',
      element: isLoggedIn ? <DashboardLayout title={getBrandText()} /> : <Navigate to="/login" />,
    //   children: [
    //     { path: '', element:  <Navigate to="/dashboard" />  },
    //     { path: 'dashboard', element: <Dashboard />  },
    //     { path: 'products', element: <Products /> },
    //     { path: 'applications', element: <ApplicationList /> },

    //   ]
    },
    {
      path: '/users',
      element: isLoggedIn ? <DashboardLayout title={getBrandText()} /> : <Navigate to="/login" />,
    //   children: [
    //     { path: '', element:<Navigate to="/" /> },
    //     { path: 'add', element: <AddUser /> },
    //     { path: 'admin', element: <UserList /> },
    //     { path: 'screener', element: <UserList /> },
    //     { path: 'evaluator', element: <UserList /> },
    //     { path: 'student', element: <UserList /> },

    //   ]
    },
    {
      path: '/',
      element: !isLoggedIn ? <LogoOnlyLayout /> : <Navigate to="/dashboard" />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        // { path: 'register', element: <Register /> },
        // { path: '404', element: <NotFound /> },
        // { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}