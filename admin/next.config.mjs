/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL
  }
};
export default withNextIntl(nextConfig);
