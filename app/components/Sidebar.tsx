'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuItems } from './content/SidebarContent';
import { Dispatch, SetStateAction } from 'react';

interface SidebarProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
}

const MenuItems = ({ pathname, onItemClick }: { pathname: string; onItemClick?: () => void }) => (
  <ul className="space-y-2">
    {menuItems.map((item) => {
      const isActive = pathname === item.href;
      return (
        <li key={item.name}>
          <Link
            href={item.href}
            className={`flex items-center px-4 py-2 rounded-md transition text-base sm:text-lg truncate group ${
              isActive 
                ? 'bg-white text-blue-900' 
                : 'text-white hover:bg-white hover:text-blue-900'
            }`}
            onClick={onItemClick}
          >
            <div className={`mr-3 ${
              isActive 
                ? '[&_svg]:stroke-blue-900' 
                : '[&_svg]:stroke-white group-hover:[&_svg]:stroke-blue-900'
            }`}>
              {item.icon}
            </div>
            {item.name}
          </Link>
        </li>
      );
    })}
  </ul>
);

export default function Sidebar({ sidebarOpen = false, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen && setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-screen w-64 bg-[#094e85] text-white z-50 transition-transform duration-200 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {setSidebarOpen && (
            <button
              className="p-4 self-end focus:outline-none text-white"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
          <div className="p-6">
            <img
              src="/logo.png"
              alt="Bright Future"
              className="h-15 object-contain"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav>
              <MenuItems 
                pathname={pathname} 
                onItemClick={() => setSidebarOpen && setSidebarOpen(false)} 
              />
            </nav>
          </div>
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-[#094e85] flex-col z-40">
        <div className="p-6">
          <img
            src="/logo.png"
            alt="Bright Future"
            className="h-15 object-contain"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav>
            <MenuItems pathname={pathname} />
          </nav>
        </div>
      </aside>

      {/* Sidebar spacer for desktop layout */}
      <div className="hidden md:block w-64 flex-shrink-0" />
    </>
  );
}
