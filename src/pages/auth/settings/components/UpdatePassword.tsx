import { useForm } from 'react-hook-form';
import { METHODS, useHttpMutation } from '../../../../helpers/useHttp';
import { IResponse } from '../../../../helpers/types';
import { useNavigate } from 'react-router-dom';

interface IPassword {
    old: string;
    newpwd: string;
}

export const UpdatePassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IPassword>();
    const navigate = useNavigate();

    const [updatePassword, error] = useHttpMutation<IResponse, IPassword>(
        () => {
            navigate('/profile');
        },
    );

    const handleUpdate = (data: IPassword) => {
        updatePassword('/update/password', METHODS.PATCH, data);
    };

    return (
        <div className="bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-500 mb-4">
                Update Password
            </h2>
            {error && <p className="text-red-400">{error}</p>}
            <form onSubmit={handleSubmit(handleUpdate)}>
                {errors.old && (
                    <p className="text-red-400">{errors.old.message}</p>
                )}
                <div className="mb-4">
                    <label
                        htmlFor="currentPassword"
                        className="block text-gray-700 mb-1">
                        Current Password
                    </label>
                    <input
                        {...register('old', {
                            required: 'please fill old password',
                        })}
                        type="password"
                        id="currentPassword"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-400 focus:border-blue-400"
                        placeholder="Enter current password"
                    />
                </div>
                {errors.newpwd && (
                    <p className="text-red-400">{errors.newpwd.message}</p>
                )}
                <div className="mb-4">
                    <label
                        htmlFor="newPassword"
                        className="block text-gray-700 mb-1">
                        New Password
                    </label>
                    <input
                        {...register('newpwd', {
                            required: 'please fill  new password',
                        })}
                        type="password"
                        id="newPassword"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-400 focus:border-blue-400"
                        placeholder="Enter new password"
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
