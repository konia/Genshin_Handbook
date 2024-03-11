'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { SessionStorage } from '@/lib/utils';

export default function UserNav({ content }: { content: string }) {
  const { locale } = useParams();
  const user = SessionStorage.get('user') || null;
  const nickName = useMemo(() => {
    if (user) {
      return user.name
        .split(' ')
        .map((str: string) => str.charAt(0))
        .join('');
    }
  }, [user]);
  const onLogOut = () => {
    SessionStorage.remove('user');
  };
  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{nickName}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="px-0 py-0">
                <Link href={`/${locale}/profile`} className="block w-full px-2 py-1.5">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-0 py-0">
                <Link href={`/${locale}/settings`} className="block w-full px-2 py-1.5">
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="px-0 py-0">
              <Link href="" className="block w-full px-2 py-1.5" onClick={onLogOut}>
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={`/${locale}/sign-in`} className="text-sm text-white">
          {content}
        </Link>
      )}
    </>
  );
}
