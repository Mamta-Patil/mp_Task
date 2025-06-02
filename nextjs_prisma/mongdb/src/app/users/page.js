'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [newPost, setNewPost] = useState({}); // Object to store new post data for each user
  const [error, setError] = useState(null);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/user');
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }
      setNewUser({ name: '', email: '' });
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateUser = async (id) => {
    try {
      const res = await fetch(`/api/user/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`/api/user/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const createPostForUser = async (userId, e) => {
    e.preventDefault();
    const postData = newPost[userId] || { title: '', content: '' };
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...postData, userId }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }
      setNewPost((prev) => ({ ...prev, [userId]: { title: '', content: '' } }));
      fetchUsers(); // Refresh user list to show the new post
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePostChange = (userId, field, value) => {
    setNewPost((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [field]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Users</h1>
        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded-md mb-6 text-center">
            Error: {error}
          </p>
        )}

        {/* Create User Form */}
        <form
          onSubmit={createUser}
          className="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                required
              />
            </div>
            <div className="flex-1">
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              Create User
            </button>
          </div>
        </form>

        {/* User List */}
        {users.length === 0 ? (
          <p className="text-gray-600 text-center">No users found.</p>
        ) : (
          <ul className="space-y-6">
            {users.map((user) => (
              <li
                key={user.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200"
              >
                {editingUser && editingUser.id === user.id ? (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                      <input
                        type="text"
                        value={editingUser.name}
                        onChange={(e) =>
                          setEditingUser({ ...editingUser, name: e.target.value })
                        }
                        className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        required
                      />
                      <input
                        type="email"
                        value={editingUser.email}
                        onChange={(e) =>
                          setEditingUser({ ...editingUser, email: e.target.value })
                        }
                        className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        required
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => updateUser(user.id)}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-md hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Link href={`/users/${user.id}`}>
                          <strong className="text-xl text-gray-800 hover:text-blue-600 transition duration-200">
                            {user.name}
                          </strong>
                        </Link>
                        <span className="text-gray-600 ml-2">({user.email})</span>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() =>
                            setEditingUser({ id: user.id, name: user.name, email: user.email })
                          }
                          className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-md hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Existing Posts */}
                    <div className="mt-4">
                      <strong className="text-gray-700">Posts:</strong>
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

                    {/* Create Post Form for this User */}
                    <form
                      onSubmit={(e) => createPostForUser(user.id, e)}
                      className="mt-4 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Post Title"
                            value={newPost[user.id]?.title || ''}
                            onChange={(e) =>
                              handlePostChange(user.id, 'title', e.target.value)
                            }
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            required
                          />
                        </div>
                        <div className="flex-1">
                          <textarea
                            placeholder="Post Content"
                            value={newPost[user.id]?.content || ''}
                            onChange={(e) =>
                              handlePostChange(user.id, 'content', e.target.value)
                            }
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
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}