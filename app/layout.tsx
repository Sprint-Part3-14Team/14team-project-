import ThemeProvider from '@/components/theme-provide';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import PrelineScript from './components/PrelineScript';
import './globals.css';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Todo Todo',
  description: 'Generated by create next app',
  icons: {
    icon: '/images/checkbox_logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
      <Toaster />
      <PrelineScript />
    </html>
  );
}
