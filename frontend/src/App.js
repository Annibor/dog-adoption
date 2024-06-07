import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './api/axiosDefaults';

import Home from './pages/Home';
import Dogs from './pages/Dogs'
/*import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound'; */
import AppLayout from './ui/AppLayout';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/dogs',
        element: <Dogs />,
      },/*
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },

    ]
  },
  {
    path: '*',
    element: <PageNotFound />,
  },*/
  ]}

])


function App() {
  return <RouterProvider router={router} />;
}

export default App