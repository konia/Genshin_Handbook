import React from 'react';

import CharacterCard from './character-card';
import { CharactersResponse } from '@/types';

export default function Characters({ data }: { data: CharactersResponse[] }) {
  console.log(data);

  return (
    <div className="m-auto mt-4 grid w-[1200px] grid-cols-6 gap-4">
      {data && data.map((item) => <CharacterCard data={item} key={item.id}></CharacterCard>)}
    </div>
  );
}
