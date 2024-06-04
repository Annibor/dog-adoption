import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Dogs from './pages/Dogs'
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';

const router = createBrowserRouter([
  {
    path: '/dogs',
    element: <Dogs />,
  },
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
  {
    path: '*',
    element: <PageNotFound />,
  },

])


function App() {
  return <RouterProvider router={router} />;
}

export default App