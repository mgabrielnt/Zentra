import type { Metadata } from 'next';
import ClientBackground from '@/components/ClientBackground';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zentra — IT Consultant',
  description: 'Your description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientBackground />
        {children}
      </body>
    </html>
  );
}