'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';

export default function ResponsiveLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Hamburger menu for mobile */}
      <button
        className="md:hidden p-4 fixed top-0 left-0 z-30"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        {/* Hamburger icon */}
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Main content */}
      <main className="flex-1 bg-gray-200 p-2 sm:p-4 md:p-6">{children}</main>
    </div>
  );
}