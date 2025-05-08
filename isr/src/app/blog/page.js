// import BlogCard from '../../components/BlogCard';

// export const revalidate = 60; // Revalidate every 60 seconds

// async function fetchPosts() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
//     next: { tags: ['blog-posts'] }, // Tag for on-demand revalidation
//   });
//   if (!res.ok) throw new Error('Failed to fetch posts');
//   return res.json();
// }

// export default async function Blog() {
//   const posts = await fetchPosts();

//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Blog Posts</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {posts.slice(0, 9).map(post => (
//           <BlogCard key={post.id} post={post} />
//         ))}
//       </div>
//     </div>
//   );
// }

import BlogCard from '../../components/BlogCard';

export const revalidate = 60; // Revalidate every 60 seconds

async function fetchPosts() {
  console.log('Fetching posts at:', new Date().toISOString()); // Log fetch time
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { tags: ['blog-posts'] },
  });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export default async function Blog() {
  const posts = await fetchPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 9).map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
