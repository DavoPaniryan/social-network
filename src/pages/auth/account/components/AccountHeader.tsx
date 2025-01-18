import { useContext } from 'react';
import { AccountContext } from '../context';
import { BASE_URL } from '../../../../helpers/constants';
import { ActionButton } from './ActionButton';

export const AccountHeader = () => {
    const context = useContext(AccountContext);
    if (!context) throw new Error('Out of provider...');

    const { account } = context;
    console.log(account);
    return (
        <>
            {account.picture && (
                <img
                    className="w-44 h-44 rounded-full object-cover border-indigo-500 border-solid border-4"
                    src={BASE_URL + account.picture}
                />
            )}
            <h1 className="text-2xl">
                {account.name} {account.surname}
            </h1>
            {account.following && account.isPrivate ? (
                <div className="flex gap-8">
                    <div className="flex flex-col">
                        <p className="text-sm font-bold text-blue-400">
                            {account?.followers?.length || 0}
                        </p>
                        <p className="text-gray-400 text-sm">Followers</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-bold text-blue-400">
                            {account?.following?.length || 0}
                        </p>
                        <p className="text-gray-400 text-sm">Following</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-bold text-blue-400">
                            {account.posts.length}
                        </p>
                        <p className="text-gray-400 text-sm">Posts</p>
                    </div>
                </div>
            ) : account.isPrivate ? (
                <h1>This account is Private</h1>
            ) : (
                ''
            )}

            <ActionButton />
        </>
    );
};
