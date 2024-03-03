import { NextRequest, NextResponse } from 'next/server';

import prismaDB from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const userForm = await req.json();
    const user = await prismaDB.user.create({
      data: {
        ...userForm,
        role: 'ADMIN'
      }
    });
    return NextResponse.json({ code: 200, ...user });
  } catch (error) {}
}
