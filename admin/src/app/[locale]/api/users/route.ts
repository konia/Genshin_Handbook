import { NextRequest, NextResponse } from 'next/server';

import { status } from '@/constants';
import prismaDB from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const user = await req.json();

  const userData = await prismaDB.user.findFirst({
    where: {
      email: user.email,
      password: user.password
    }
  });

  if (!userData) {
    return NextResponse.json(status.unregister);
  } else {
    return NextResponse.json({
      code: 200,
      data: {
        name: userData.name,
        id: userData.userId
      }
    });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userData = await prismaDB.user.findFirst({
    where: { email: searchParams.get('email') as string }
  });
  console.log('11', userData);

  return NextResponse.json({
    code: 200,
    data: userData || {}
  });
}

// export async function POST(req: NextRequest) {
//   try {
//     const user = await req.json();
//     const userData = await prismaDB.user.create({
//       data: {
//         name: `${user.firstName} ${user.lastName}`,
//         password: bcrypt
//         role: 'ADMIN'
//       }
//     });
//     return NextResponse.json({ code: 200, ...data });
//   } catch (error) {}
// }
