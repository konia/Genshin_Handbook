import React, { useState } from 'react';

import Filter from '@/components/layout/filter';

// import prismaDB from '@/lib/prisma';
// import Characters from './components/characters';

export default async function CharactersPage() {
  // const characters = await prismaDB.character.findMany({
  //   orderBy: {
  //     name: 'desc'
  //   }
  // });

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
      {/* <Characters data={['111', '222', '333', '444', '111', '222', '333', '444']} /> */}
    </>
  );
}
