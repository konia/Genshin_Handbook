'use client';

import { useTranslations } from 'next-intl';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Artifacts } from './components/artifacts';
import Characters from './components/characters';

export default function ConfigurationPage() {
  const t = useTranslations('NAVIGATION');

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.14))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <Tabs defaultValue="characters" className="mx-auto w-2/5">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="characters">{t('CHARACTERS')}</TabsTrigger>
          <TabsTrigger value="artifacts">{t('ARTIFACTS')}</TabsTrigger>
        </TabsList>
        <TabsContent value="characters">
          <Characters />
        </TabsContent>
        <TabsContent value="artifacts">
          <Artifacts />
        </TabsContent>
      </Tabs>
    </main>
  );
}
