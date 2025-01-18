import { Navigate, useParams } from 'react-router-dom';
import { useHttpQuery } from '../../../helpers/useHttp';
import { IAccount, IResponse } from '../../../helpers/types';
import { AccountHeader } from './components/AccountHeader';
import { AccountContext } from './context';
import { AccountPosts } from './components/AccountPosts';

export const Account = () => {
    const { id } = useParams();
    const { data, loading, error, refetch } = useHttpQuery<IResponse>(
        '/account/' + id,
    );
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <Navigate to="/profile" />;
    }

    const account: IAccount | null = data.payload
        ? (data.payload as IAccount)
        : null;

    return (
        account && (
            <AccountContext.Provider value={{ account, refetch }}>
                <AccountHeader />
                <AccountPosts />
            </AccountContext.Provider>
        )
    );
};
