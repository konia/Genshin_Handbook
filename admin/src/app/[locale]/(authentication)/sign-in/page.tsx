'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRequest } from 'alova';

import { Instance } from '@/api/http';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SignInFormSchema, SignInFormValues } from '@/types';

export default function SignInPage() {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getUser = useRequest((value: SignInFormValues) => Instance.Post('/api/users', value), {
    immediate: false
  });

  async function encryptMessage(key: CryptoKey, encoded: Uint8Array) {
    // The iv must never be reused with a given key.
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const ciphertext = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      encoded
    );

    return ciphertext;
  }

  const onSubmit = async (value: SignInFormValues) => {
    // event.preventDefault();
    setIsLoading(true);
    const data = new TextEncoder().encode(value.password);
    const privateKey = await publicKey();
    const signature = await window.crypto.subtle.sign(
      {
        name: 'AES-GCM',
        saltLength: 32
      },
      privateKey,
      data
    );

    console.log('signature', signature);

    getUser.send({
      email: value.email
      // password: data
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <section className="p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="font-genshin text-2xl font-semibold tracking-tight">Hi, Welcome to Genshin Lab!</h1>
          {/* <p className="text-sm text-muted-foreground">Enter your email below to create your account</p> */}
        </div>
        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="Email"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <Input
                        id="password"
                        placeholder="Password"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Sign In with Email
              </Button>
            </form>
          </Form>
          <div className="inset-0 flex justify-between align-middle text-muted-foreground">
            <div className="flex items-center space-x-2 ">
              <Checkbox id="rememberMe" />
              <Label htmlFor="rememberMe" className="font-normal">
                Remember Me
              </Label>
            </div>
            <Link href="/reset-password" className="text-sm">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" type="button" disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.gitHub className="mr-2 h-4 w-4" />
            )}{' '}
            GitHub
          </Button>
        </div>
        <div className="px-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="font-medium underline hover:text-primary">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}
