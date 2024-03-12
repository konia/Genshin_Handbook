import { NextRequest, NextResponse } from 'next/server';

import prismaDB from '@/lib/prisma';
import { SessionStorage } from '@/lib/utils';

export async function PATCH(req: NextRequest, { params }: { params: { email: string } }) {
  try {
    const { userId } = SessionStorage.get('user');
    const { name } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 403 });
    }

    if (!name) {
      return NextResponse.json({ error: 'Name is required', code: 100 });
    }

    if (!params.email) {
      return NextResponse.json({ error: 'Email is required', code: 110 });
    }

    const store = await prismaDB.user.updateMany({
      where: {
        id: params.email,
        userId
      },
      data: {
        name
      }
    });
    return NextResponse.json({ code: 200, ...store });
  } catch (error) {
    console.log('[STORE_PATCH]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
