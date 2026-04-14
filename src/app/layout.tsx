import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../index.css';
import { SITE_NAME } from '../config/site';

export const metadata: Metadata = {
  title: SITE_NAME,
  description: 'ANSLIFE manufacturing and export ecosystem',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
