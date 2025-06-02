'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/user/${id}`);
      if (!res.ok) throw new Error('Failed to fetch user');
      const data = await res.json();
      setUser(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const createPost = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newPost, userId: id }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }
      setNewPost({ title: '', content: '' });
      fetchUser(); // Refresh user data to show the new post
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-red-500 bg-red-100 p-3 rounded-md text-center">
        Error: {error}
      </p>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-gray-600">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{user.name}</h1>
        <div className="space-y-3">
          <p className="text-gray-600">
            <strong className="text-gray-800">Email:</strong> {user.email}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Created At:</strong>{' '}
            {new Date(user.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Updated At:</strong>{' '}
            {new Date(user.updatedAt).toLocaleString()}
          </p>
          <div>
            <strong className="text-gray-800">Posts:</strong>
            {user.posts.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {user.posts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/posts/${post.id}`}
                      className="text-blue-600 hover:underline hover:text-blue-800 transition duration-200"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 mt-2">No posts.</p>
            )}
          </div>
        </div>

        {/* Create Post Form */}
        <form onSubmit={createPost} className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Add a New Post</h2>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Post Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                required
              />
            </div>
            <div className="flex-1">
              <textarea
                placeholder="Post Content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 h-20 resize-y"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-md hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200"
            >
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}