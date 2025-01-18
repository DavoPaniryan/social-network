import { useContext } from 'react';
import { AccountContext } from '../context';
import { METHODS, useHttpMutation } from '../../../../helpers/useHttp';
import { IResponse } from '../../../../helpers/types';

export const ActionButton: React.FC = () => {
    const context = useContext(AccountContext);
    if (!context) throw new Error('Out of provider...');

    const { account, refetch } = context;
    const { following, followsMe, requested } = account.connection;

    const [makeRequest] = useHttpMutation<IResponse>(refetch);

    const handleRequest = () => {
        try {
            if (following) {
                makeRequest(`/account/unfollow/${account.id}`, METHODS.POST);
            } else if (requested) {
                makeRequest(`/request/cancel/${account.id}`, METHODS.DELETE);
            } else {
                makeRequest(`/account/follow/${account.id}`, METHODS.POST);
            }
        } catch (error) {
            console.error('Action failed:', error);
        }
    };

    const getButtonLabel = () => {
        if (following) return 'Unfollow';
        if (requested) return 'Cancel';
        if (followsMe) return 'Follow Back';
        return 'Follow';
    };

    return (
        <button
            onClick={handleRequest}
            className="px-4 py-2 my-2 rounded-md bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors">
            {getButtonLabel()}
        </button>
    );
};
