import { useNavigate, useOutletContext } from 'react-router-dom';
import { BASE_URL } from '../../../helpers/constants';
import { IContext, IUser } from '../../../helpers/types';

export const Following = () => {
    const { user } = useOutletContext<IContext>();
    const followings: IUser[] = user?.following as IUser[];
    const navigate = useNavigate();

    if (!followings?.length) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <h1 className="text-2xl font-semibold">
                    You have no followers
                </h1>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-100 mb-6">
                    Followings
                </h2>
                <ul className="space-y-4">
                    {followings.map((follower) => (
                        <li
                            onClick={() => navigate('/profile/' + follower.id)}
                            key={follower.id}
                            className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <div className="flex items-center">
                                <img
                                    src={BASE_URL + follower.picture}
                                    alt={`${follower.name} ${follower.surname}`}
                                    className="w-12 h-12 rounded-full object-cover mr-4"
                                />
                                <span className="text-gray-200 font-medium">
                                    {follower.name} {follower.surname}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
