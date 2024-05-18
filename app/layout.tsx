import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ComponentsList } from '@/components/ComponenetsList';
import { componentNames } from '@/actions/feching-data';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const files = await componentNames();

  return (
    <html lang="en">
      <body className={`bg-slate-950  ${inter.className}`}>
        <ComponentsList files={files} />
        {children}
      </body>
    </html>
  );
}
