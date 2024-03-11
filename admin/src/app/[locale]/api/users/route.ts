import { NextRequest, NextResponse } from 'next/server';
import { genSalt, hashSync } from 'bcrypt-ts';

import { status } from '@/constants';
import prismaDB from '@/lib/prisma';

// export async function POST(req: NextRequest) {
//   const user = await req.json();

//   const userData = await prismaDB.user.findFirst({
//     where: {
//       email: user.email,
//       password: user.password
//     }
//   });

//   if (!userData) {
//     return NextResponse.json(status.unregister);
//   } else {
//     return NextResponse.json({
//       code: 200,
//       data: {
//         name: userData.name,
//         id: userData.userId
//       }
//     });
//   }
// }

export async function GET(req: Request) {
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

    // const user = await prismaDB.user.create({
    //   data: {
    //     email: userForm.email,
    //     name: userForm.firstName + ' ' + userForm.lastName,
    //     password,
    //     role: 'ADMIN'
    //   }
    // });
    console.log('user', password);

    return NextResponse.json({ code: 200, data: '...user' });
  } catch (error) {}
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
