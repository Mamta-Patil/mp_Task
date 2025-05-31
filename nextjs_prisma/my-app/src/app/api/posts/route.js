const { NextResponse } = require('next/server');
const prisma = require('../../lib/prisma');

// GET: Fetch all posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}

// POST: Create a new post
export async function POST(req) {
  try {
    const { title, content ,userId} = await req.json();
    const post = await prisma.post.create({
      data: { title, content,userId },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}

// import { PrismaClient } from '../../../../src/app/lib/prisma';
// import { ObjectId } from 'mongodb';

// const prisma = new PrismaClient();

// // Validate ObjectId
// const isValidObjectId = (id) => ObjectId.isValid(id);

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       const { title, content, userId } = req.body;

//       // Validate required fields
//       if (!title || !content) {
//         return res.status(400).json({ error: 'Title and content are required' });
//       }

//       // Validate userId if provided
//       if (userId && !isValidObjectId(userId)) {
//         return res.status(400).json({ error: 'Invalid user ID' });
//       }

//       // Check if user exists (if userId is provided)
//       if (userId) {
//         const user = await prisma.user.findUnique({ where: { id: userId } });
//         if (!user) {
//           return res.status(404).json({ error: 'User not found' });
//         }
//       }

//       // Create the post
//       const post = await prisma.post.create({
//         data: {
//           title,
//           content,
//           userId, // Will be null if userId is not provided
//         },
//         include: { author: true },
//       });

//       return res.status(201).json(post);
//     } catch (error) {
//       return res.status(500).json({ error: 'Error creating post: ' + error.message });
//     }
//   }

//   if (req.method === 'GET') {
//     // Handle GET /api/posts (already implemented in previous responses)
//     try {
//       const posts = await prisma.post.findMany({
//         include: { author: true },
//       });
//       return res.status(200).json(posts);
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   }

//   return res.status(405).json({ error: 'Method not allowed' });
// }

