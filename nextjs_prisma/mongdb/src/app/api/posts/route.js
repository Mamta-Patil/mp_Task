// app/api/posts/route.js
import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';
import { ObjectId } from 'mongodb';

// Validate ObjectId
const isValidObjectId = (id) => ObjectId.isValid(id);

// GET: Fetch all posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: true }, // Include author for the relation
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('GET /api/posts error:', error);
    return NextResponse.json({ error: 'Error fetching posts: ' + error.message }, { status: 500 });
  }
}

// POST: Create a new post
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, content, userId } = body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    // Validate userId if provided
    if (userId) {
      if (!isValidObjectId(userId)) {
        return NextResponse.json({ error: 'Invalid userId: Must be a valid ObjectId' }, { status: 400 });
      }
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return NextResponse.json({ error: 'User not found for the provided userId' }, { status: 404 });
      }
    }

    // Create the post
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId, // Will be null if not provided
      },
      include: { author: true }, // Include author in response
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('POST /api/posts error:', error);
    return NextResponse.json({ error: 'Error creating post: ' + error.message }, { status: 500 });
  }
}