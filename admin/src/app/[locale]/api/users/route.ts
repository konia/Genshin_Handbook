import { NextRequest, NextResponse } from 'next/server';
import { genSalt, hashSync } from 'bcrypt-ts';

import prismaDB from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const data = await prismaDB.user.findFirst({
      where: { email: searchParams.get('email') as string }
    });
    return NextResponse.json({
      code: 200,
      data: data || {}
    });
  } catch (error) {
    return NextResponse.json({
      code: 200,
      data: error
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userForm = await req.json();
    const salt = await genSalt(10);
    const password = await hashSync(userForm.passwordForm.password, salt);

    const user = await prismaDB.user.create({
      data: {
        email: userForm.email,
        name: userForm.firstName + ' ' + userForm.lastName,
        password
      }
    });
    return NextResponse.json({ code: 200, data: user });
  } catch (error) {
    return NextResponse.json({ code: 200, data: error });
  }
}
