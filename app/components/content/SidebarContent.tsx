import React from 'react';
import { Home, School , UserPen , Building, Users, SwatchBook, BookText, Receipt, Clapperboard, Clipboard, Banknote, User, Settings } from 'lucide-react';



export const menuItems = [
  
  { name: 'Dashboard', href: '/', icon: <Home size={18} className="stroke-current" /> },
  { name: 'Universities', href: '/screens/universities', icon: <School size={18} className="stroke-current" /> },
  { name: 'Departments', href: '/screens/departments', icon: <Building size={18} className="stroke-current" /> },
  { name: 'Instructor', href: '/screens/instructors', icon: <UserPen size={18} className="stroke-current" /> },
  { name: 'Students', href: '/screens/students', icon: <Users size={18} className="stroke-current" /> },
  { name: 'Courses', href: '/screens/courses', icon: <BookText size={18} className="stroke-current" /> },
  { name: 'UI', href: '/screens/coupons', icon: <SwatchBook size={18} className="stroke-current" /> },
  { name: 'Invoices', href: '/screens/invoices', icon: <Receipt size={18} className="stroke-current" /> },
  { name: 'Expense Management', href: '/screens/expense', icon: <Clipboard size={18} className="stroke-current" /> },
  { name: 'Transaction History', href: '/screens/transaction', icon: <Banknote size={18} className="stroke-current" /> },
  { name: 'Reports and Analytics', href: '/screens/reports', icon: <BookText size={18} className="stroke-current" /> },
  { name: 'Payroll', href: '/screens/payroll', icon: <Banknote size={18} className="stroke-current" /> },
  { name: 'Profile', href: '/screens/profile', icon: <User size={18} className="stroke-current" /> },
  { name: 'Settings', href: '/screens/settings', icon: <Settings size={18} className="stroke-current" /> },
  { name: 'SignUp', href: '/screens/signup', icon: <Settings size={18} className="stroke-current" /> },
  { name: 'Login', href: '/screens/login', icon: <Settings size={18} className="stroke-current" /> },


];