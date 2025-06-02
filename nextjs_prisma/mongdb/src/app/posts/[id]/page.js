'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error('Failed to fetch post');
        const data = await res.json();
        setPost(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPost();
  }, [id]);

  if (error) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-red-500 bg-red-100 p-3 rounded-md text-center">
        Error: {error}
      </p>
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-gray-600">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <div className="space-y-3">
          <p className="text-gray-600">{post.content}</p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Created At:</strong>{' '}
            {new Date(post.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Updated At:</strong>{' '}
            {new Date(post.updatedAt).toLocaleString()}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Author:</strong>{' '}
            {post.author ? (
              <Link
                href={`/users/${post.author.id}`}
                className="text-blue-600 hover:underline hover:text-blue-800 transition duration-200"
              >
                {post.author.name} ({post.author.email})
              </Link>
            ) : (
              'None'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}