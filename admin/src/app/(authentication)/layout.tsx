import Image from 'next/image';

import { ReactNode } from 'react';
import { Rubik } from 'next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
});
export default function AuthenticationLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative grid h-full flex-col items-center justify-center bg-background lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col p-6 text-white lg:flex">
        <div className="absolute inset-0 bg-black">
          <Image
            src="/images/TonyStark.jpg"
            width={644}
            height={1200}
            alt="Authentication"
            className="block h-full w-full object-contain object-left-bottom dark:hidden"
            priority
          />
        </div>
        <div className="relative">
          <Image
            src="/images/Marvel_Logo.svg"
            width={100}
            height={40}
            alt="Authentication"
            className="block w-[100px]"
          />
        </div>
        <blockquote className="relative mb-4 ml-auto mr-4 mt-auto w-[300px]">
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
