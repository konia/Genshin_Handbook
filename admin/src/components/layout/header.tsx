import { useTranslations } from 'next-intl';
import React from 'react';

import Language from './language';
import MainNav from './main-nav';
import UserNav from './user-nav';

export default function Header() {
  const t = useTranslations('NAVIGATION');
  return (
    <header className="flex h-14 items-center justify-between border-b bg-slate-800 px-4">
      <section className="flex">
        <div className="font-genshin text-white">Genshin Lab</div>
        <MainNav className="mx-8" content={[t('DASHBOARD'), t('CHARACTERS'), t('ARTIFACTS')]} />
      </section>
      <section>
        <div className="ml-auto flex items-center space-x-4">
          <Language />
          <UserNav content={t('SIGN_IN')} />
        </div>
      </section>
    </header>
  );
}
