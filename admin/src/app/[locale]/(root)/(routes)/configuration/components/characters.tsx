import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { useRequest } from 'alova';

import { http } from '@/api/http';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDate } from '@/lib/useDate';
import { cn } from '@/lib/utils';
import { CharactersFormSchema, CharactersFormValues, REGION, VISION, WEAPONS } from '@/types';

export default function Characters() {
  const form = useForm<CharactersFormValues>({
    resolver: zodResolver(CharactersFormSchema),
    defaultValues: {
      name: '',
      characterVoice: '',
      region: '',
      constellation: '',
      affiliation: '',
      title: ''
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { formatDate } = useDate();

  // const [isValidLoading, setIsValidLoading] = useState<boolean>(false);
  // const [isValid, setIsValid] = useState<boolean>(false);

  const { locale } = useParams();
  // const router = useRouter();
  const t = useTranslations('CONFIGURATION');
  const r = useTranslations('REGION');
  const w = useTranslations('WEAPONS');
  const v = useTranslations('VISION');

  // const getUser = useRequest(({ email }) => http.Get(`${locale}/api/users`, { email }), {
  //   immediate: false
  // });

  const createCharacters = useRequest((value: CharactersFormValues) => http.Post(`${locale}/api/characters`, value), {
    immediate: false
  });

  // getUser.onComplete(({ data }) => {
  //   setIsValidLoading(false);
  //   if (JSON.stringify(data) !== '{}') {
  //     setIsValid(false);
  //     form.setError('email', { message: 'Email is duplicated' });
  //   } else {
  //     setIsValid(true);
  //     form.clearErrors('email');
  //   }
  // });

  createCharacters.onComplete(({ data }) => {
    setIsLoading(false);
    console.log(data);
    // const user = data;
    // if (user && JSON.stringify(user) !== '{}') {
    //   router.replace(`/${locale}/sign-in`);
    // }
  });

  const onSubmit = (value: CharactersFormValues) => {
    setIsLoading(true);
    createCharacters.send(value);
    console.log(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>{t('TITLE.CHARACTERS')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('CHARACTERS.NAME')}</FormLabel>
                  <FormControl>
                    <Input id="name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('CHARACTERS.TITLE')}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t('CHARACTERS.BIRTHDAY')}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                        >
                          {field.value && formatDate(field.value)}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="characterVoice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('CHARACTERS.CHARACTER_VOICE')}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="affiliation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('CHARACTERS.AFFILIATION')}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="constellation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('CHARACTERS.CONSTELLATION')}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('CHARACTERS.VISION')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {Object.entries(VISION).map((item) => (
                          <SelectItem value={item[1]} key={item[0]}>
                            {v(item[0])}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weapon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('CHARACTERS.WEAPON')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {Object.entries(WEAPONS).map((item) => (
                          <SelectItem value={item[1]} key={item[0]}>
                            {w(item[0])}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="star"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{t('CHARACTERS.STAR')}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center space-x-3"
                    >
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="4-star" />
                        </FormControl>
                        <FormLabel className="font-normal">4★</FormLabel>
                      </FormItem>
                      <FormItem className="!mt-0 flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="5-star" />
                        </FormControl>
                        <FormLabel className="font-normal">5★</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('CHARACTERS.REGION')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {Object.entries(REGION).map((item) => (
                          <SelectItem value={item[1]} key={item[0]}>
                            {r(item[0])}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" className="w-full">
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              {t('SAVE')}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
