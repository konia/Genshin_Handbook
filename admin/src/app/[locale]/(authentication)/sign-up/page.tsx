'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRequest } from 'alova';

import { http } from '@/api/http';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SignUpFormSchema, SignUpFormValues } from '@/types';

export default function SignUnPage() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      passwordForm: {
        password: '',
        confirm: ''
      }
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValidLoading, setIsValidLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const { locale } = useParams();

  const getUser = useRequest(({ email }) => http.Get(`${locale}/api/users`, { email }), {
    immediate: false
  });

  const createUser = useRequest((value: SignUpFormValues) => http.Post(`${locale}/api/users`, value), {
    immediate: false
  });

  getUser.onComplete(({ data }) => {
    console.log('status', data);
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
    console.log('status', data);
    setIsValidLoading(false);
  });

  const onValidateEmail = (value: string) => {
    setIsValidLoading(true);
    getUser.send({ email: value });
  };

  const onSubmit = (value: SignUpFormValues) => {
    console.log(value);

    // setIsLoading(true);
    createUser.send(value);
  };
  return (
    <div>
      <section className="p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="font-genshin text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Enter your email below to create your account</p>
          </div>
          <div className="grid gap-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem className="relative">
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          disabled={isLoading}
                          {...field}
                          onChange={(event) => {
                            form.trigger('email');
                            field.onChange(event.target.value);
                          }}
                          onBlur={() => {
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
                          <Icons.check className="h-4 w-4  text-green-500" />
                        ) : (
                          form.getValues('email') !== '' && <Icons.cross className="h-4 w-4  text-red-500" />
                        )}
                      </section>
                      <FormDescription>We recommend using your work email</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          id="firstName"
                          type="text"
                          autoCapitalize="none"
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          id="lastName"
                          type="text"
                          autoCapitalize="none"
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
                  name="passwordForm.password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          autoCapitalize="none"
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
                  name="passwordForm.confirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm your Password</FormLabel>
                      <FormControl>
                        <Input
                          id="confirm"
                          type="password"
                          autoCapitalize="none"
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
                  name="isAgree"
                  render={({ field }) => (
                    <FormItem className="!mb-5 !mt-4">
                      <FormControl>
                        <div className="flex items-center space-x-2 text-sm">
                          <Checkbox id="rememberMe" checked={field.value} onCheckedChange={field.onChange} />
                          <Label htmlFor="rememberMe">
                            I accept the{' '}
                            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                              Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                              Privacy Policy
                            </Link>
                            .
                          </Label>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading || !form.formState.isValid} className="w-full">
                  {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                  Create account
                </Button>
              </form>
            </Form>

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
            Have an account?{' '}
            <Link href="/sign-in" className="font-medium underline hover:text-primary">
              Sign In Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
