import { CharactersResponse } from '@/types';
import Image from 'next/image';
import React from 'react';

export default function CharacterCard({ data }: { data: CharactersResponse }) {
  return (
    <article className="character-card h-[225px] w-full">
      <div className="character-card-image">
        <Image
          src={`/images/characters/avatar/${data.name[0].value}_icon.png`}
          width={120}
          height={120}
          alt="Authentication"
          className="object-cover"
          priority
        />
        <Image
          src={`/images/vision/${data.vision}.png`}
          width={120}
          height={120}
          alt="Authentication"
          className="object-cover"
          priority
        />
      </div>
      <div className="character-card-name"> {data.name[0].value} </div>
      <div className="character-card-name"> {data.characterVoice[0]} </div>
    </article>
  );
}
