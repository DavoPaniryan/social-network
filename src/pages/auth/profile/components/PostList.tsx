import { useState } from 'react';
import { IContext, IPost, IResponse } from '../../../../helpers/types';
import {
    useHttpQuery,
    useHttpMutation,
    METHODS,
} from '../../../../helpers/useHttp';
import { BASE_URL } from '../../../../helpers/constants';
import Modal from 'react-modal';
import { useOutletContext } from 'react-router-dom';

Modal.setAppElement('#root');

export const PostList = () => {
    const { data } = useHttpQuery<IResponse>('/posts');
    const posts: IPost[] | null = data?.payload
        ? (data?.payload as IPost[])
        : null;

    const [showModal, setShowModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

    const { refetch } = useOutletContext<IContext>();
    const [deletePost] = useHttpMutation<IResponse>(refetch);

    if (!posts?.length) {
        return <h1>No Posts</h1>;
    }

    const handleDeletePost = (post: IPost) => {
        setSelectedPost(post);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (selectedPost) {
            deletePost(`/posts/${selectedPost.id}`, METHODS.DELETE);
            setShowModal(false);
        }
    };

    const cancelDelete = () => {
        setShowModal(false);
    };

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow relative">
                        <img
                            src={BASE_URL + post.picture}
                            alt="Post Thumbnail"
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <div className="flex justify-between items-center">
                            <p className="text-gray-300 line-clamp-3 mr-2">
                                {post.title}
                            </p>
                            <strong>{post.likes.length} Likes</strong>
                        </div>
                        <button
                            onClick={() => handleDeletePost(post)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={showModal}
                onRequestClose={cancelDelete}
                contentLabel="Confirm Delete Post"
                className="bg-gray-800 rounded-lg p-6 max-w-sm mx-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <h2 className="text-2xl text-gray-200 mb-4">
                    Are you sure you want to delete this post?
                </h2>
                <div className="flex justify-between">
                    <button
                        onClick={cancelDelete}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                        No
                    </button>
                    <button
                        onClick={confirmDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        Yes
                    </button>
                </div>
            </Modal>
        </div>
    );
};
