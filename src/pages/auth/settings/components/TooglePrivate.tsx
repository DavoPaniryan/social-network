import { useOutletContext } from 'react-router-dom';
import { METHODS, useHttpMutation } from '../../../../helpers/useHttp';
import { IContext } from '../../../../helpers/types';

export const ToggleAccountPrivacy = () => {
    const [toogle] = useHttpMutation(() => {});
    const { user } = useOutletContext<IContext>();

    const handleToggle = () => {
        toogle('/account/set', METHODS.PATCH);
    };
    console.log(user);

    return (
        <div className="bg-gray-800 shadow-md rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-blue-500 mb-4">
                Account Privacy
            </h2>
            <button
                onClick={handleToggle}
                className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400">
                {user?.isPrivate ? (
                    <>
                        <img
                            src="https://cdn1.iconfinder.com/data/icons/essentials-pack/96/lock_padlock_security_protection_privacy-128.png"
                            alt="Private"
                            className="w-6 h-6 mr-2"
                        />
                        Private
                    </>
                ) : (
                    <>
                        <img
                            src="https://cdn1.iconfinder.com/data/icons/essentials-pack/96/unlock_open_password_lock_key-128.png"
                            alt="Public"
                            className="w-6 h-6 mr-2"
                        />
                        Public
                    </>
                )}
            </button>
        </div>
    );
};
