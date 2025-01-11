import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { METHODS, useHttpMutation } from '../../../../helpers/useHttp';
import { IResponse } from '../../../../helpers/types';

interface ILogin {
    password: string;
    login: string;
}

export const UpdateLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILogin>();
    const navigate = useNavigate();

    const [updateLogin, error] = useHttpMutation<IResponse, ILogin>(() => {
        navigate('/profile');
    });

    const handleUpdate = (data: ILogin) => {
        updateLogin('/update/login', METHODS.PATCH, data);
    };

    return (
        <div className="bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-500 mb-4">
                Update Login
            </h2>
            {error && <p className="text-red-400">{error}</p>}
            <form onSubmit={handleSubmit(handleUpdate)}>
                {errors.password && (
                    <p className="text-red-400">{errors.password.message}</p>
                )}
                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        {...register('password', {
                            required: 'please fill password',
                        })}
                        type="text"
                        id="username"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-400 focus:border-blue-400"
                        placeholder="Enter password"
                    />
                </div>
                {errors.login && (
                    <p className="text-red-400">{errors.login.message}</p>
                )}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-1">
                        New Login
                    </label>
                    <input
                        {...register('login', {
                            required: 'please fill login',
                        })}
                        type="text"
                        id="login"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-400 focus:border-blue-400"
                        placeholder="Enter new login"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Save Changes
                </button>
            </form>
        </div>
    );
};
