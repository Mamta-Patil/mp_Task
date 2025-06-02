import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// GET: Fetch a single user
export async function GET(req, { params }) {
  const { id } = params;
  const userId = parseInt(id);

  if (isNaN(userId)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { posts: true },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error('GET /api/users/[id] error:', error);
    return NextResponse.json({ error: 'Error fetching user: ' + error.message }, { status: 500 });
  }
}

// PUT: Update a user
export async function PUT(req, { params }) {
  const { id } = params;
  const userId = parseInt(id);

  if (isNaN(userId)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const { name, email } = await req.json();
    const user = await prisma.user.update({
      where: { id: userId },
      data: { name, email },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error('PUT /api/users/[id] error:', error);
    return NextResponse.json({ error: 'Error updating user: ' + error.message }, { status: 400 });
  }
}

// DELETE: Delete a user
export async function DELETE(req, { params }) {
  const { id } = params;
  const userId = parseInt(id);

  if (isNaN(userId)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    return NextResponse.json({ message: 'User deleted' });
  } catch (error) {
    console.error('DELETE /api/users/[id] error:', error);
    return NextResponse.json({ error: 'Error deleting user: ' + error.message }, { status: 400 });
  }
}