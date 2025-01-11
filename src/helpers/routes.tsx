import { createBrowserRouter } from 'react-router-dom';
import { Login } from '../pages/login';
import { Signup } from '../pages/signup';
import { Layout } from '../pages/auth/Layout';
import { Profile } from '../pages/auth/profile';
import { Settings } from '../pages/auth/settings/Settings';
export const routes = createBrowserRouter([
    { path: '', element: <Login /> },
    { path: 'signup', element: <Signup /> },
    {
        path: '/profile',
        element: <Layout />,
        children: [
            { path: '', element: <Profile /> },
            { path: 'settings', element: <Settings /> },
        ],
    },
]);
