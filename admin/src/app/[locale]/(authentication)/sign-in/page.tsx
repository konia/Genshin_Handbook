'use client';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRequest } from 'alova/client';

import { Instance } from '@/api/http';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SessionStorage } from '@/lib/utils';
import { SignInFormSchema, SignInFormValues, UserResponse } from '@/types';

export default function SignInPage() {
  const t = useTranslations('SIGN');

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { locale } = useParams();

  const getUser = useRequest((value: SignInFormValues) => Instance.Post('/api/users/login', value), {
    immediate: false
  });

  getUser.onComplete(({ data }) => {
    const user = data as UserResponse;
    setIsLoading(false);
    if (JSON.stringify(user) == '{}') {
      form.setError('email', { message: 'Username or password is incorrect' });
    } else {
      SessionStorage.set('user', { email: user.email, name: user.name, role: user.role });
      router.replace(`/${locale}/dashboard`);
    }
  });

  const onSubmit = async (value: SignInFormValues) => {
    setIsLoading(true);
    getUser.send({
      email: value.email,
      password: value.password
    });
  };

  return (
    <section className="p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="font-genshin text-2xl font-semibold tracking-tight">{t('SIGN_IN_TITLE')}!</h1>
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
                        placeholder={t('EMAIL_ADDRESS')}
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
                        placeholder={t('PASSWORD')}
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
                {t('SIGN_IN')}
              </Button>
            </form>
          </Form>
          <div className="inset-0 flex justify-between align-middle text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Checkbox id="rememberMe" />
              <Label htmlFor="rememberMe" className="font-normal">
                {t('REMEMBER_ME')}
              </Label>
            </div>
            <Link href="/reset-password" className="text-sm">
              {t('FORGOT_PASSWORD')}?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">{t('CONTINUE_WITH')}</span>
            </div>
          </div>
          <Button variant="outline" type="button" disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.gitHub className="mr-2 h-4 w-4" />
            )}
            GitHub
          </Button>
        </div>
        <div className="px-4 text-center text-sm text-muted-foreground">
          {t.rich('GOTO_SIGN_UP', {
            Link: (text) => (
              <Link href={`/${locale}/sign-up`} className="font-medium underline hover:text-primary">
                {text}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}
