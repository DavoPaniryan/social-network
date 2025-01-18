import { createBrowserRouter } from 'react-router-dom';
import { Login } from '../pages/login';
import { Signup } from '../pages/signup';
import { Layout } from '../pages/auth/Layout';
import { Profile } from '../pages/auth/profile';
import { Settings } from '../pages/auth/settings/Settings';
import { Account } from '../pages/auth/account';
import { Requests } from '../pages/auth/requests/Requests';
import { Followers } from '../pages/auth/followers/Followers';
import { Following } from '../pages/auth/following/Following';

export const routes = createBrowserRouter([
    { path: '', element: <Login /> },
    { path: 'signup', element: <Signup /> },
    {
        path: 'profile',
        element: <Layout />,
        children: [
            { path: '', element: <Profile /> },
            { path: 'settings', element: <Settings /> },
            { path: 'requests', element: <Requests /> },
            { path: 'followers', element: <Followers /> },
            { path: 'followings', element: <Following /> },
            { path: ':id', element: <Account /> },
        ],
    },
]);
