import React from 'react';
import { Home, School , UserPen , Building, Users, SwatchBook, BookText, Receipt, Clapperboard, Clipboard, Banknote, User, Settings } from 'lucide-react';



export const menuItems = [
  { name: 'Dashboard', href: '/', icon: <Home size={18} className="stroke-current" /> },
  { name: 'Universities', href: '/universities', icon: <School size={18} className="stroke-current" /> },
  { name: 'Departments', href: '/departments', icon: <Building size={18} className="stroke-current" /> },
  { name: 'Instructor', href: '/instructors', icon: <UserPen size={18} className="stroke-current" /> },
  { name: 'Students', href: '/students', icon: <Users size={18} className="stroke-current" /> },
  { name: 'Courses', href: '/courses', icon: <BookText size={18} className="stroke-current" /> },
  { name: 'UI', href: '/coupons', icon: <SwatchBook size={18} className="stroke-current" /> },
  { name: 'Invoices', href: '/invoices', icon: <Receipt size={18} className="stroke-current" /> },
  { name: 'Expense Management', href: '/expense', icon: <Clipboard size={18} className="stroke-current" /> },
  { name: 'Transaction History', href: '/transaction', icon: <Banknote size={18} className="stroke-current" /> },
  { name: 'Reports and Analytics', href: '/reports', icon: <BookText size={18} className="stroke-current" /> },
  { name: 'Payroll', href: '/payroll', icon: <Banknote size={18} className="stroke-current" /> },
  { name: 'Profile', href: '/profile', icon: <User size={18} className="stroke-current" /> },
  { name: 'Settings', href: '/settings', icon: <Settings size={18} className="stroke-current" /> },

];