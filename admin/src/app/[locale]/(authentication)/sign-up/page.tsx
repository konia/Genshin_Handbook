'use client';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRequest } from 'alova/client';

import { http } from '@/api/http';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SignUpFormSchema, SignUpFormValues, UserResponse } from '@/types';

export default function SignUnPage() {
  const t = useTranslations('SIGN');
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: '',
      userName: '',
      passwordForm: {
        password: '',
        confirm: ''
      },
      isAgree: false
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValidLoading, setIsValidLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const { locale } = useParams();
  const router = useRouter();

  const getUser = useRequest(({ email }) => http.Get(`${locale}/api/users`, { email }), {
    immediate: false
  });

  const createUser = useRequest((value: SignUpFormValues) => http.Post(`${locale}/api/users`, value), {
    immediate: false
  });

  getUser.onComplete(({ data }) => {
    setIsValidLoading(false);
    if (JSON.stringify(data) !== '{}') {
      setIsValid(false);
      form.setError('email', { message: 'Email is duplicated' });
    } else {
      setIsValid(true);
      form.clearErrors('email');
    }
  });

  createUser.onComplete(({ data }) => {
    setIsLoading(false);
    const user = data as UserResponse;
    if (user && JSON.stringify(user) !== '{}') {
      router.replace(`/${locale}/sign-in`);
    }
  });

  const onValidateEmail = (value: string) => {
    setIsValidLoading(true);
    getUser.send({ email: value });
  };

  const onSubmit = (value: SignUpFormValues) => {
    setIsLoading(true);
    createUser.send(value);
  };
  return (
    <section className="p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="font-genshin text-2xl font-semibold tracking-tight">{t('SIGN_UP_TITLE')}</h1>
          <p className="text-sm text-muted-foreground">{t('SIGN_UP_TIP')}</p>
        </div>
        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem className="relative">
                    <FormLabel>{t('EMAIL_ADDRESS')}</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        disabled={isLoading || isValidLoading}
                        {...field}
                        onChange={(event) => {
                          form.trigger('email');
                          field.onChange(event.target.value);
                        }}
                        onBlur={() => {
                          console.log(fieldState.invalid);
                          if (!fieldState.invalid && field.value) {
                            onValidateEmail(field.value);
                          }
                        }}
                      />
                    </FormControl>
                    <section className="absolute right-[8px] top-[35px] h-4 w-4">
                      {isValidLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      ) : isValid ? (
                        <Icons.check className="h-4 w-4 text-green-500" />
                      ) : (
                        form.getValues('email') !== '' && <Icons.cross className="h-4 w-4 text-red-500" />
                      )}
                    </section>
                    <FormDescription>{t('EMAIL_ADDRESS_TIP')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('USER_NAME')}</FormLabel>
                    <FormControl>
                      <Input id="userName" type="text" disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordForm.password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('PASSWORD')}</FormLabel>
                    <FormControl>
                      <Input
                        id="passwordForm.password"
                        type="password"
                        disabled={isLoading}
                        {...field}
                        onChange={(event) => {
                          console.log(event.target.value);

                          form.trigger('passwordForm.password');
                          field.onChange(event.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordForm.confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('CONFIRM_PASSWORD')}</FormLabel>
                    <FormControl>
                      <Input
                        id="passwordForm.confirm"
                        type="password"
                        disabled={isLoading}
                        {...field}
                        onChange={(event) => {
                          console.log(event.target.value);
                          form.trigger('passwordForm.confirm');
                          field.onChange(event.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isAgree"
                render={({ field }) => (
                  <FormItem className="!mb-5 !mt-4">
                    <FormControl>
                      <div className="flex items-center space-x-2 text-sm">
                        <Checkbox id="rememberMe" checked={field.value} onCheckedChange={field.onChange} />
                        <Label htmlFor="rememberMe">
                          {t.rich('SIGN_UP_POLICY', {
                            Terms: (text) => (
                              <Link href="/terms" className="font-medium underline hover:text-primary">
                                {text}
                              </Link>
                            ),
                            Policy: (text) => (
                              <Link href="/privacy" className="font-medium underline hover:text-primary">
                                {text}
                              </Link>
                            )
                          })}
                        </Label>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading || !form.formState.isValid} className="w-full">
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                {t('SIGN_UP')}
              </Button>
            </form>
          </Form>

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
            )}{' '}
            GitHub
          </Button>
        </div>
        <div className="px-4 text-center text-sm text-muted-foreground">
          {t.rich('GOTO_SIGN_UP', {
            Link: (text) => (
              <Link href={`/${locale}/sign-in`} className="font-medium underline hover:text-primary">
                {text}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}
