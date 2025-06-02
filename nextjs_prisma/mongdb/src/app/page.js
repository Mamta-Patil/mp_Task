'use client';

import { useState, useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        console.error('Fetched data is not an array:', data);
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    }
  };

  // Create or update a post
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
        throw new Error('Failed to save post');
      }

      await fetchPosts();
      setEditingPost(null); // Reset form after successful submission
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  // Delete a post
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to delete post');
      }
      await fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Edit a post
  const handleEdit = (post) => {
    if (post) {
      setEditingPost(post); // Only set if post is valid
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Blog Posts</h1>
      <PostForm onSubmit={handleSubmit} initialData={editingPost} />
      <PostList posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  );
}
