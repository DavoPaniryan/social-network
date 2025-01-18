import { useContext } from 'react';
import { BASE_URL } from '../../../../helpers/constants';
import { AccountContext } from '../context';
import { IAccountContext, IPost } from '../../../../helpers/types';
import { METHODS, useHttpMutation } from '../../../../helpers/useHttp';

export const AccountPosts = () => {
    const { account, refetch } = useContext<IAccountContext>(AccountContext);
    const [react] = useHttpMutation(() => {
        refetch();
    });
    console.log(account.posts);

    const toggleLike = (postId: string) => {
        react('/posts/react/' + postId, METHODS.POST);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {account?.posts?.map((post: IPost) => (
                <div
                    key={post.id}
                    className="bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                    <img
                        src={BASE_URL + post.picture}
                        alt="Post Thumbnail"
                        className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <div className="flex justify-between items-center">
                        <p className="text-gray-300 line-clamp-3 mr-2">
                            {post.title}
                        </p>
                        {/* Heart button */}
                        <button
                            onClick={() => toggleLike(post.id)}
                            className="focus:outline-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill={post.isLiked ? 'red' : 'white'}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 transition-colors duration-200">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.42 3.42 5 5.5 5c1.74 0 3.41 1.01 4.13 2.44.22.43.84.43 1.06 0C13.09 6.01 14.76 5 16.5 5 18.58 5 20 6.42 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
