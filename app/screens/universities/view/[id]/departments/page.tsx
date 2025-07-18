"use client";
import { useState, useRef, useEffect } from "react";
import UniversitiesTable from '@/app/screens/universities/UniversitiesTable';
import { MoreHorizontal, Building2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import GenericTable from '@/app/components/table/GenericTable';
import departmentsData from './departments.json';
import Modal from '@/app/components/Modal';

interface Department {
  id: number | string;
  name: string;
  logo: string;
  totalCourses: number;
  totalInstructors: number;
  totalStudents: number;
  enrolledStudents: number;
  conversion: number;
  universityId?: string;
}

export default function DepartmentsPage() {
  const params = useParams();
  const universityId = params.id as string;
  const [departments, setDepartments] = useState<Department[]>([]);
  const [filtered, setFiltered] = useState<Department[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deptToDelete, setDeptToDelete] = useState<number | null>(null);

  useEffect(() => {
    // Load departments from JSON file
    setDepartments(departmentsData);
    setFiltered(departmentsData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    if (openDropdown !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const columns = [
    "Swap",
    "Department Name",
    "Total Courses",
    "Total Instructors",
    "Total Students",
    "Enrolled Students",
    "Conversion",
    "Action"
  ];

  const handleSearch = (query: string) => {
    setFiltered(
      departments.filter((dept) =>
        dept.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `/api/departments?id=${id}&universityId=${encodeURIComponent(universityId)}`,
        { method: 'DELETE' }
      );
      if (!response.ok) {
        throw new Error('Failed to delete department');
      }
      setFiltered(prev => prev.filter(dept => Number(dept.id) !== id));
      setDepartments(prev => prev.filter(dept => Number(dept.id) !== id));
      setOpenDropdown(null);
    } catch (error) {
      console.error('Error deleting department:', error);
      alert('Failed to delete department. Please try again.');
    }
  };

  const renderRow = (dept: Department) => (
    <tr key={dept.id} className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-6 py-4"><span>↕️</span></td>
      <td className="px-6 py-4 flex items-center gap-2">
        {dept.logo && <img src={dept.logo} alt="logo" className="h-6 w-6 rounded-full" />} {dept.name}
      </td>
      <td className="px-6 py-4">{dept.totalCourses}</td>
      <td className="px-6 py-4">{dept.totalInstructors}</td>
      <td className="px-6 py-4">{dept.totalStudents}</td>
      <td className="px-6 py-4">{dept.enrolledStudents}</td>
      <td className="px-6 py-4">{dept.conversion}%</td>
      <td className="px-6 py-4 text-center relative">
        <button
          onClick={() => setOpenDropdown(openDropdown === Number(dept.id) ? null : Number(dept.id))}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </button>
        {openDropdown === Number(dept.id) && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 min-w-[120px] bg-white border border-gray-300 rounded-lg shadow-lg z-20 py-2 flex flex-col items-stretch"
            style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
          >
            <button
              className="px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition"
              onClick={() => {
                router.push(`/universities/view/${encodeURIComponent(universityId)}/departments/edit/${encodeURIComponent(dept.id)}`);
                setOpenDropdown(null);
              }}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 text-left text-red-600 hover:bg-red-50 transition"
              onClick={e => {
                e.preventDefault();
                setDeptToDelete(Number(dept.id));
                setDeleteModalOpen(true);
                setOpenDropdown(null);
              }}
            >
              Delete
            </button>
            <button
              className="px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition"
              onClick={() => {/* handle view here */}}
            >
              View
            </button>
          </div>
        )}
      </td>
    </tr>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">

      </div>
      <GenericTable
        columns={columns}
        data={filtered}
        renderRow={renderRow}
        onSearch={handleSearch}
        searchPlaceholder="Search Department"
        onAddNew={() => router.push(`/universities/departments-management/add?universityId=${encodeURIComponent(universityId)}`)}
      />

<Modal
  open={deleteModalOpen}
  onClose={() => setDeleteModalOpen(false)}
  title="Delete Department"
  description="Are you sure you want to delete this department?"
  confirmLabel="Delete"
  cancelLabel="Cancel"
  onConfirm={() => {
    if (deptToDelete !== null) {
      handleDelete(deptToDelete);
    }
    setDeleteModalOpen(false);
    setDeptToDelete(null);
  }}
      />
    </div>
  );
} 