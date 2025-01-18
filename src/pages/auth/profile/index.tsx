import { useOutletContext } from 'react-router-dom';
import { AddPost } from './components/AddPost';
import { PostList } from './components/PostList';
import { ProfileHeader } from './components/ProfileHeader';
import { Search } from './components/Search';
import { IContext } from '../../../helpers/types';

export const Profile = () => {
    const { user } = useOutletContext<IContext>();

    return (
        user && (
            <div className="flex flex-col bg-gray-900 text-gray-100 min-h-screen">
                {/* Верхняя часть с AddPost и ProfileHeader */}
                <div className="flex items-start mb-2">
                    {' '}
                    {/* Reduced margin */}
                    {/* AddPost слева */}
                    <div className="flex-shrink-0">
                        <AddPost />
                    </div>
                    {/* ProfileHeader близко к AddPost */}
                    <div className="">
                        <ProfileHeader />
                    </div>
                    {/* Search справа в углу */}
                    <div className="ml-auto">
                        <Search />
                    </div>
                </div>

                {/* Посты */}
                <div className="flex flex-col mt-2">
                    {' '}
                    {/* Negative margin to pull it higher */}
                    <PostList />
                </div>
            </div>
        )
    );
};
