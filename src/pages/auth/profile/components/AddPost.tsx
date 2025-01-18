import { useState } from 'react';
import { METHODS, useHttpMutation } from '../../../../helpers/useHttp';
import { useOutletContext } from 'react-router-dom';
import { IContext, IPost, IResponse } from '../../../../helpers/types';

export const AddPost = () => {
    const [photo, setPhoto] = useState<Blob | null>(null);
    const [content, setContent] = useState<string>('');
    const [addPost] = useHttpMutation<IResponse, IPost>(() => {});
    const { refetch } = useOutletContext<IContext>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleContentChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setContent(event.target.value);
    };

    const handleCreate = () => {
        if (photo && content) {
            const form = new FormData();
            form.append('photo', photo);
            form.append('content', content);

            addPost('/posts', METHODS.POST, form)
                .then(() => {
                    refetch();
                })
                .catch((error: any) => {
                    console.error('Error creating post:', error);
                });
        } else {
            alert('Please add a photo and content!');
        }
    };

    return (
        <div className="bg-gray-800 text-gray-100 p-4 rounded-lg shadow-md w-72">
            <h2 className="text-lg font-bold mb-3 text-blue-400">
                Add New Post
            </h2>

            {/* File Input */}
            <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                    Upload Photo
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-gray-300 border border-gray-600 rounded-md bg-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Text Input */}
            <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                    Post Content
                </label>
                <input
                    type="text"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Write something..."
                    className="block w-full text-gray-300 border border-gray-600 rounded-md bg-gray-700 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Create Button */}
            <button
                onClick={handleCreate}
                className="w-full bg-blue-500 hover:bg-blue-400 text-white font-medium py-1 px-2 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Create
            </button>
        </div>
    );
};
