// app/universities/view/[id]/students/page.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import GenericTable from "@/app/components/table/GenericTable";
import { MoreHorizontal } from "lucide-react";

interface Student {
  id: number;
  name: string;
  department: string;
  purchaseCourses: number;
  mobile: string;
  status: boolean;
}

const studentsData: Student[] = [
  { id: 1, name: "Sara Alsannat", department: "Biomedical", purchaseCourses: 6, mobile: "99820270", status: false },
  { id: 2, name: "Fay Alqabandi", department: "Civil", purchaseCourses: 6, mobile: "50274784", status: true },
  { id: 3, name: "Latifa Meshal", department: "Biomedical", purchaseCourses: 6, mobile: "50941465", status: false },
  { id: 4, name: "musaid alwadi", department: "Computer Science", purchaseCourses: 6, mobile: "50884058", status: true },
];

export default function StudentsPage() {
  const [filtered, setFiltered] = useState(studentsData);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  const columns = ["Name", "Department", "Purchase Courses", "Mobile", "Status", "Action"];

  const handleSearch = (query: string) => {
    setFiltered(
      studentsData.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleDelete = (id: number) => {
    setFiltered((prev) => prev.filter((s) => s.id !== id));
    setOpenDropdown(null);
  };

  return (
    <GenericTable<Student>
      columns={columns}
      data={filtered}
      renderRow={(student) => {
        const isDropdownOpen = openDropdown === student.id;
        return (
          <tr key={student.id} className="border-t hover:bg-gray-50">
            <td className="px-2 py-2 sm:px-4 sm:py-3">
              <span className="text-xs sm:text-sm font-medium">{student.name}</span>
            </td>
            <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{student.department}</td>
            <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{student.purchaseCourses}</td>
            <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{student.mobile}</td>
            <td className="px-2 py-2 sm:px-4 sm:py-3">
              <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                student.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {student.status ? "Active" : "Inactive"}
              </span>
            </td>
            <td className="px-2 py-2 sm:px-4 sm:py-3 relative text-right">
              <button
                onClick={() => setOpenDropdown(isDropdownOpen ? null : student.id)}
                className="inline-flex items-center justify-center p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Actions"
              >
                <MoreHorizontal size={14} className="sm:w-4 sm:h-4 text-gray-500" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-10 border border-gray-200 py-1">
                  <button
                    className="w-full px-4 py-2 text-xs sm:text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    onClick={() => {/* Handle edit */}}
                  >
                    <span>Edit</span>
                  </button>
                  <button
                    className="text-red-500 w-full px-4 py-2 text-xs sm:text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                    onClick={() => handleDelete(student.id)}
                  >
                    <span>Delete</span>
                  </button>
                  <button
                    className="w-full px-4 py-2 text-xs sm:text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    onClick={() => {/* Handle view */}}
                  >
                    <span>View</span>
                  </button>
                </div>
              )}
            </td>
          </tr>
        );
      }}
      onSearch={handleSearch}
      searchPlaceholder="Search Student"
      onAddNew={() => alert('You clicked Add New button')}
    />
  );
}