import type { Metadata } from 'next';
import React from 'react';
import Background from '../components/Background'; // gunakan shim TSX di atas

export const metadata: Metadata = {
  title: 'Zentra',
  description: 'IT Consulting',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          background: 'transparent',
          overflowX: 'hidden',
        }}
      >
        <Background />
        <main style={{ position: 'relative', minHeight: '100vh' }}>{children}</main>
      </body>
    </html>
  );
}
