'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';

export default function ResponsiveLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Get the current page title from the pathname
  const getPageTitle = () => {
    const path = pathname.split('/').filter(Boolean);
    if (path.length === 0) return 'Dashboard';
    return path[0].charAt(0).toUpperCase() + path[0].slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main content area */}
      <div className="flex flex-col min-h-screen md:pl-64">
        {/* Top bar for mobile */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
          </div>
          <div className="flex items-center">
            {/* Add mobile-specific actions here if needed */}
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1">
          <div className="max-w-[1920px] mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 