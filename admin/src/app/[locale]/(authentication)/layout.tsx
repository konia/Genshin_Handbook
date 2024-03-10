import Image from 'next/image';
import { ReactNode } from 'react';

import '@/styles/globals.css';

export default function AuthenticationLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative grid h-full flex-col items-center justify-center bg-background lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col p-6 text-white lg:flex">
        <div className="absolute inset-0 bg-black ">
          <Image
            src="/images/genshin-impact-logo.png"
            alt="logo"
            width={256}
            height={256}
            className="absolute left-3 z-10 h-auto w-1/5 invert md:-top-5 lg:-top-10"
          />
          <Image
            src="/images/background.jpg"
            width={1920}
            height={1080}
            alt="Authentication"
            className="block h-full w-full object-cover opacity-65 dark:hidden"
            priority
          />
        </div>
        <blockquote className="font-genshin relative mb-4 ml-auto mr-4 mt-auto w-[300px]">
          <p className="text-right text-4xl font-semibold uppercase">
            When the enemy tells you you&apos;re going to fail at something, do it anyway. nothing is more frightening
            than never changing.
          </p>
        </blockquote>
      </div>
      {children}
    </main>
  );
}
