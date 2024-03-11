'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { NAVIGATION } from '@/constants';
import { cn } from '@/lib/utils';

export default function MainNav({ content, className }: { content: string[]; className: string }) {
  const pathname = usePathname();
  const routes = [
    {
      path: `dashboard`,
      name: content[NAVIGATION.DASHBOARD],
      active: pathname.includes('dashboard')
    },
    {
      path: `characters`,
      name: content[NAVIGATION.CHARACTERS],
      active: pathname.includes('characters')
    },
    {
      path: `artifacts`,
      name: content[NAVIGATION.ARTIFACTS],
      active: pathname.includes('artifacts')
    }
  ];
  return (
    <div className={cn('flex items-center space-x-4 ', className)}>
      {routes.map((route) => (
        <Link
          href={route.path}
          key={route.name}
          className={cn(
            'text-sm transition-colors',
            route.active ? 'font-medium text-white hover:text-white' : 'text-slate-400 hover:text-slate-300'
          )}
        >
          {route.name}
        </Link>
      ))}
    </div>
  );
}
