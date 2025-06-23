'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuItems } from './content/SidebarContent';
import { useState } from 'react';
export default function Sidebar() {
    
    const pathname = usePathname();

    // const [isSidebar, setSidebar] = useState(true)

    return (
        <>
                <div className="h-screen w-64 bg-blue-900 text-white flex flex-col">
                    <div className="p-6">
                        <img
                            src="/logo.png"
                            alt="Bright Future"
                            className="h-15 object-contain"
                        />
                    </div>
                    <nav className="flex-1">
                        <ul className="space-y-2">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center px-4 py-2 rounded-md transition ${isActive ? 'bg-white text-blue-900' : 'hover:bg-blue-700'
                                                }`}
                                        >
                                            <span className="mr-3">{item.icon}</span>
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
        </>
    );
}
