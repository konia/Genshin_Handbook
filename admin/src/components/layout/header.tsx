import React from 'react';

import Language from './language';
import MainNav from './main-nav';
import UserNav from './user-nav';

export default function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-slate-800 px-4">
      <section className="flex">
        <div className="font-genshin text-white">Genshin Lab</div>
        <MainNav />
      </section>
      <section>
        <div className="ml-auto flex items-center space-x-4">
          <Language />
          {/* <UserNav /> */}
        </div>
      </section>
    </header>
  );
}
