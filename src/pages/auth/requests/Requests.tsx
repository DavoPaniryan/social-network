import { useOutletContext } from 'react-router-dom';
import { BASE_URL } from '../../../helpers/constants';
import { IContext, IRequets, IResponse } from '../../../helpers/types';
import {
    METHODS,
    useHttpMutation,
    useHttpQuery,
} from '../../../helpers/useHttp';

export const Requests = () => {
    const { data } = useHttpQuery<IResponse>('/requests');
    const requests: IRequets | null = data?.payload
        ? (data?.payload as IRequets)
        : null;
    const { refetch } = useOutletContext<IContext>();

    const [makeRequest] = useHttpMutation(() => {
        refetch();
    });

    const handleAccept = (id: number) => {
        makeRequest('/requests/accept/' + id, METHODS.PATCH);
    };

    const handleDecline = (id: number) => {
        makeRequest('/requests/decline/' + id, METHODS.PATCH);
    };

    if (!requests) {
        return <h1>You have no reuqests</h1>;
    }

    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <div className="max-w-2xl mx-auto bg-gray-400 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Requests to Me
                </h2>
                <ul className="space-y-4">
                    {requests.map((request) => (
                        <li
                            key={request.user.id}
                            className="flex items-center justify-between p-4 bg-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center">
                                <img
                                    src={BASE_URL + request.user.picture}
                                    alt={request.name}
                                    className="w-12 h-12 rounded-full object-cover mr-4"
                                />
                                <span className="text-gray-700 font-medium">
                                    {request.user.name}
                                </span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleAccept(request.id)}
                                    className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors">
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleDecline(request.id)}
                                    className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors">
                                    Decline
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
