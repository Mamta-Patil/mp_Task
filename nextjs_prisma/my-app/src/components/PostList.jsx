'use client';

export default function PostList({ posts, onEdit, onDelete }) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto my-20">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 my-10"
        >
          <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
          <p className="mt-2 text-gray-600">{post.content}</p>
          <div className="mt-4 flex space-x-3">
            <button
              onClick={() => onEdit(post)}
              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-md hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}