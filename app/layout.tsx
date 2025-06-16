import './globals.css';
import Sidebar from './components/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'University Dashboard',
  description: 'Admin portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <main className="flex-1 bg-gray-200 p-6">{children}</main>
      </body>
    </html>
  );
}
