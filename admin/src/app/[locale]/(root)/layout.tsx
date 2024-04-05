import React from 'react';

import Header from '@/components/layout/header';

export default function SetUpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <section>{children}</section>
    </>
  );
}
