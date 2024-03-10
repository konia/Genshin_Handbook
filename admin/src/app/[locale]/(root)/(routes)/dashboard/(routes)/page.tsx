import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

export default function SetupPage() {
  const t = useTranslations('PROFILE');
  return (
    <main className="mt-14 flex h-full">
      <Button variant="outline">{t('NAME')}</Button>111
    </main>
  );
}
