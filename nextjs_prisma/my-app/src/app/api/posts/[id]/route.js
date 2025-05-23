const { NextResponse } = require('next/server');
const prisma = require('../../../lib/prisma');

// GET: Fetch a single post
export async function GET(req, { params }) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
    });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
  }
}

// PUT: Update a post
export async function PUT(req, { params }) {
  try {
    const { title, content } = await req.json();
    const post = await prisma.post.update({
      where: { id: params.id },
      data: { title, content },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
  }
}

// DELETE: Delete a post
export async function DELETE(req, { params }) {
  try {
    await prisma.post.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
  }
}
