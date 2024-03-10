import Image from 'next/image';
import { ReactNode } from 'react';

export default function AuthenticationLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative grid h-full flex-col items-center justify-center bg-background lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col p-6 text-white lg:flex">
        <div className="absolute inset-0 bg-black">
          <Image
            src="/images/Genshin_Japan_Logo.svg"
            alt="logo"
            width={80}
            height={60}
            className="absolute left-4 top-3 z-10 invert"
          />
          <video className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" autoPlay loop muted>
            <source src="/images/GENSHIN IMPACT ELEMENTS 1.0.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      {children}
    </main>
  );
}
