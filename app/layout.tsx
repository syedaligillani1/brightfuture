'use client';
import './globals.css';
import ResponsiveLayout from './components/ResponsiveLayout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Bright Future</title>
      </head>
      <body className="h-full">
        <ResponsiveLayout>{children}</ResponsiveLayout>
      </body>
    </html>
  );
}
