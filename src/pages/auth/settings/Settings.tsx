import { UpdateLogin } from './components/UpdateLogin';
import { UpdatePassword } from './components/UpdatePassword';

export const Settings = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold text-blue-500 mb-8">Settings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                <UpdatePassword />
                <UpdateLogin />
            </div>
        </div>
    );
};
