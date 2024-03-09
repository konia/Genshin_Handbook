import Header from '@/components/layout/header';

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
    </>
  );
}
