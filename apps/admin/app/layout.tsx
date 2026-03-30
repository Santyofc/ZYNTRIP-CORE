import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zyntrip Admin',
  description: 'Dispatch, finance, and admin console for Zyntrip Core.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
