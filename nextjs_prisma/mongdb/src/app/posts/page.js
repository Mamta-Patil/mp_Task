'use client';

import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import { useState, useEffect } from 'react';
// import PostForm from '../components/PostForm';
// import PostList from '../compone nts/PostList';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [error, setError] = useState(null);

  // Fetch posts and users on mount
  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

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

  const handleSubmit = async (postData) => {
    try {
      const method = editingPost ? 'PUT' : 'POST';
      const url = editingPost ? `/api/posts/${editingPost.id}` : '/api/posts';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }

      setEditingPost(null);
      fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }
      fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Posts</h1>
        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded-md mb-6 text-center">
            Error: {error}
          </p>
        )}

        {/* Post Form */}
        <div className="mb-8">
          <PostForm
            onSubmit={handleSubmit}
            initialData={editingPost}
            users={users}
          />
        </div>

        {/* Post List */}
        {posts.length === 0 ? (
          <p className="text-gray-600 text-center">No posts found.</p>
        ) : (
          <PostList
            posts={posts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}