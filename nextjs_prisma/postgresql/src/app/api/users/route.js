import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// GET: Fetch all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { posts: true }, // Include posts for the relation
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('GET /api/users error:', error);
    return NextResponse.json({ error: 'Error fetching users: ' + error.message }, { status: 500 });
  }
}

// POST: Create a new user
export async function POST(req) {
  try {
    const { name, email } = await req.json();
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }
    const user = await prisma.user.create({
      data: { name, email },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('POST /api/users error:', error);
    return NextResponse.json({ error: 'Error creating user: ' + error.message }, { status: 500 });
  }
}