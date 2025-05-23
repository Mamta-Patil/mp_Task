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
    const { title, content } = await req.json();
    const post = await prisma.post.create({
      data: { title, content },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}