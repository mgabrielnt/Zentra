import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { LanguageProvider } from '@/components/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zentra',
  description: 'Welcome to ThreemuskIteers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <LanguageProvider>
          <Header />
          <main>
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}