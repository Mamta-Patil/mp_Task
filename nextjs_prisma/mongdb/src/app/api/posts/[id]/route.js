import { NextResponse } from 'next/server';
// import prisma from '../../../lib/prisma';
import { ObjectId } from 'mongodb';
import prisma from '@/app/lib/prisma';

// Validate ObjectId
const isValidObjectId = (id) => ObjectId.isValid(id);

// GET: Fetch a single post
export async function GET(req, { params }) {
  const { id } = params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error('GET /api/posts/[id] error:', error);
    return NextResponse.json({ error: 'Error fetching post: ' + error.message }, { status: 500 });
  }
}

// PUT: Update a post
export async function PUT(req, { params }) {
  const { id } = params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
  }

  try {
    const { title, content, userId } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    if (userId && !isValidObjectId(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    if (userId) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
    }

    const post = await prisma.post.update({
      where: { id },
      data: { title, content, userId },
      include: { author: true },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('PUT /api/posts/[id] error:', error);
    return NextResponse.json({ error: 'Error updating post: ' + error.message }, { status: 500 });
  }
}

// DELETE: Delete a post
export async function DELETE(req, { params }) {
  const { id } = params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
  }

  try {
    await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Post deleted' });
  } catch (error) {
    console.error('DELETE /api/posts/[id] error:', error);
    return NextResponse.json({ error: 'Error deleting post: ' + error.message }, { status: 400 });
  }
}