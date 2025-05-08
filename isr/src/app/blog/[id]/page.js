export const revalidate = 60; // Revalidate every 60 seconds

async function fetchPost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { tags: [`post-${id}`] }, // Tag for on-demand revalidation
  });
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}

export default async function Post({ params }) {
  const post = await fetchPost(params.id);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">{post.body}</p>
      <a href="/blog" className="text-blue-600 hover:underline">← Back to Blog</a>
    </div>
  );
}

// Generate static paths for the first 10 posts
export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  return posts.slice(0, 10).map(post => ({
    id: String(post.id),
  }));
}