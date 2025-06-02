'use client';

import { useState, useEffect } from 'react';

export default function PostForm({ onSubmit, initialData = {}, users = [] }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [userId, setUserId] = useState(initialData?.userId || '');

  useEffect(() => {
    setTitle(initialData?.title || '');
    setContent(initialData?.content || '');
    setUserId(initialData?.userId || '');
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ title, content, userId: userId || null });
    if (!initialData?.id) {
      setTitle('');
      setContent('');
      setUserId('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          required
          placeholder="Enter post title"
        />
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 h-40 resize-y"
          required
          placeholder="Enter post content"
        />
      </div>
      <div>
        <label
          htmlFor="userId"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select Author (Optional)
        </label>
        <select
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        >
          <option value="" disabled>
            -- Choose an Author --
          </option>
          <option value="">No Author</option>
          {users.length === 0 ? (
            <option disabled>No users available</option>
          ) : (
            users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))
          )}
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
      >
        {initialData?.id ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
}