'use client';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { cn, SessionStorage } from '@/lib/utils';

export default function MainNav() {
  const pathname = usePathname();
  const user = SessionStorage.get('user') || null;
  const { locale } = useParams();
  const t = useTranslations('NAVIGATION');

  const [routes, setRoutes] = useState([
    {
      path: `/${locale}/dashboard`,
      name: t('DASHBOARD'),
      active: pathname.includes(`/${locale}/dashboard`)
    },
    {
      path: `/${locale}/characters`,
      name: t('CHARACTERS'),
      active: pathname.includes(`/${locale}/characters`)
    },
    {
      path: `/${locale}/artifacts`,
      name: t('ARTIFACTS'),
      active: pathname.includes(`/${locale}/artifacts`)
    }
  ]);

  useEffect(() => {
    if (user && user.role == 'ADMIN') {
      setRoutes([
        ...routes,
        {
          path: `/${locale}/configuration`,
          name: t('CONFIGURATION'),
          active: pathname.includes(`/${locale}/configuration`)
        }
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-8 flex items-center space-x-4">
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
