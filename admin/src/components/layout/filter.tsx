'use client';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LANGUAGE } from '@/constants';
import { FilterFormSchema, FilterFormValues } from '@/types';

export default function Filter() {
  const router = useRouter();
  const { locale } = useParams();
  const pathname = usePathname();

  const form = useForm<FilterFormValues>({
    resolver: zodResolver(FilterFormSchema),
    defaultValues: { vision: '', weapon: '', region: '', quality: '' }
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="vision"
        render={({ field }) => (
          <FormItem>
            <Select
              onValueChange={(lang) => {
                router.replace(`${pathname.replace(locale as string, lang)}`);
                field.onChange(lang);
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-[120px] bg-white">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  {LANGUAGE.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      ></FormField>
    </Form>
  );
}
