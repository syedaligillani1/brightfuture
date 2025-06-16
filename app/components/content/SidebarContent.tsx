import React from 'react';
import { Home, School , UserPen , Building, Users, SwatchBook, BookText, Receipt, Clapperboard, Clipboard, Banknote, User, Settings } from 'lucide-react';



export const menuItems = [
  { name: 'Dashboard', href: '/', icon: <Home size={18} /> },
  { name: 'Universities', href: '/universities', icon: <School size={18} /> },
  { name: 'Departments', href: '/departments', icon: <Building size={18} /> },
  { name: 'Instructor', href: '/instructors', icon: <UserPen size={18} /> },
  { name: 'Students', href: '/students', icon: <Users size={18} /> },
  { name: 'Courses', href: '/courses', icon: <BookText size={18} /> },
  { name: 'Coupons', href: '/coupons', icon: <SwatchBook size={18} /> },
  { name: 'Invoices', href: '/invoices', icon: <Receipt size={18} /> },
  { name: 'Expense Management', href: '/expense', icon: <Clipboard size={18} /> },
  { name: 'Transaction History', href: '/transaction', icon: <Banknote size={18} /> },
  { name: 'Reports and Analytics', href: '/reports', icon: <BookText size={18} /> },
  { name: 'Payroll', href: '/payroll', icon: <Banknote size={18} /> },
  { name: 'Profile', href: '/profile', icon: <User size={18} /> },
  { name: 'Settings', href: '/settings', icon: <Settings size={18} /> },

];