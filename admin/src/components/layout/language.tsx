import { useLocale } from 'next-intl';
import React from 'react';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Language() {
  const locale = useLocale();
  console.log('locale', locale);

  return (
    <Select>
      <SelectTrigger className="w-[100px] bg-white">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="jp">日本語</SelectItem>
          <SelectItem value="zh">简体中文</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
