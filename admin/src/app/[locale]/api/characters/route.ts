import { NextRequest, NextResponse } from 'next/server';
import { format } from 'date-fns';
import { getLocale } from 'next-intl/server';
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
    const locale = await getLocale();
    console.log('userForm', locale);
    const characters = await prismaDB.character.create({
      data: {
        name: { locale: locale as string, value: userForm.name },
        star: userForm.star,
        characterVoice: userForm.characterVoice.split(','),
        weapon: userForm.weapon,
        region: userForm.region,

        constellation: userForm.constellation, // 命之座
        vision: userForm.vision, // 神之眼
        affiliation: userForm.affiliation, //所属
        title: userForm.title, //称号
        birthday: format(userForm.birthday, 'MM/dd')
      }
    });

    return NextResponse.json({ code: 200, data: characters });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ code: 200, data: error });
  }
}
