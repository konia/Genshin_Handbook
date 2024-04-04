import { NextRequest, NextResponse } from 'next/server';
import { compareSync } from 'bcrypt-ts';

import prismaDB from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const userForm = await req.json();
    const user = await prismaDB.user.findFirst({
      where: {
        email: userForm.email
      }
    });
    const password = compareSync(userForm.password, user?.password!);
    return NextResponse.json({
      code: 200,
      data: password ? { email: user?.email, name: user?.name, role: user?.role } : {}
    });
  } catch (error) {
    return NextResponse.json({ code: 200, data: error });
  }
}
