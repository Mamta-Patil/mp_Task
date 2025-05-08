import Link from 'next/link';

export default function BlogCard({ post }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>
      <Link href={`/blog/${post.id}`} className="text-blue-600 hover:underline">
        Read More
      </Link>
    </div>
  );
}