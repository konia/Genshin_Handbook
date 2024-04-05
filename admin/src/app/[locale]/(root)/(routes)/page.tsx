'use client';
import { redirect, useParams } from 'next/navigation';

export default function LocalePage() {
  const { locale } = useParams();
  redirect(`/${locale}/dashboard`);
}
