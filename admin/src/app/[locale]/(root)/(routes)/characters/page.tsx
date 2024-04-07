import React, { useState } from 'react';
import { getLocale } from 'next-intl/server';
import Filter from '@/components/layout/filter';

import prismaDB from '@/lib/prisma';
import Characters from './components/characters';

export default async function CharactersPage() {
  const locale = await getLocale();
  const characters = await prismaDB.character.findMany({
    where: {
      name: {
        every: {
          locale: locale
        }
      }
    }
  });

  console.log(characters);

  // const formattedCharacters = characters.map((character) => ({
  //   id: character.id,
  //   image: character.post,
  //   label: character.name
  // }));

  return (
    <>
      <section className="mb-4">
        <Filter></Filter>
      </section>
      <Characters data={characters} />
    </>
  );
}
