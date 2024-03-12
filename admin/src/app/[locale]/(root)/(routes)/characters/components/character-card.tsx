import Image from 'next/image';
import React from 'react';

export default function CharacterCard({ data }: { data: string }) {
  return (
    <article className="character-card h-[225px] w-full">
      <div className="character-card-image">
        <Image
          src="/images/characters/qianzhi.webp"
          width={120}
          height={120}
          alt="Authentication"
          className="object-cover"
          priority
        />
      </div>
      <div className="character-card-name"> {data} </div>
    </article>
  );
}
