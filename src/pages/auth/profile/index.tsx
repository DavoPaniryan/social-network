import { useOutletContext } from 'react-router-dom';
import { IContext } from '../../../helpers/types';
import { ProfileHeader } from './components/ProfileHeader';

export const Profile = () => {
    const { user } = useOutletContext<IContext>();

    return (
        user && (
            <>
                <ProfileHeader />
            </>
        )
    );
};
