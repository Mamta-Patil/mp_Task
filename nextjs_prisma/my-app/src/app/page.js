// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               src/app/page.js
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }




// 'use client';

// import { useState, useEffect } from 'react';
// import PostForm from './components/PostForm';
// import PostList from './components/PostList';

// export default function Home() {
//   const [posts, setPosts] = useState([]);
//   // const [editingPost, setEditingPost] = useState(null);
//   const [editingPost, setEditingPost] = useState(null);

//   // Fetch posts
//   const fetchPosts = async () => {
//     const res = await fetch('/api/posts');
//     const data = await res.json();
//     setPosts(data);
//   };

//   // Create or update post
//   const handleSubmit = async (postData) => {
//     const method = editingPost ? 'PUT' : 'POST';
//     const url = editingPost ? `/api/posts/${editingPost.id}` : '/api/posts';

//     await fetch(url, {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(postData),
//     });

//     await fetchPosts();
//     setEditingPost(null);
//   };

//   // Delete post
//   const handleDelete = async (id) => {
//     await fetch(`/api/posts/${id}`, { method: 'DELETE' });
//     await fetchPosts();
//   };

//   // Edit post
//   const handleEdit = (post) => {
//     setEditingPost(post);
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <main className="container mx-auto p-4">
//       <h1 className="text-3xl mb-4">Blog Posts</h1>
//       <PostForm onSubmit={handleSubmit} initialData={editingPost} />
//       <PostList posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
//     </main>
//   );
// }



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
