// app/universities/view/[id]/courses/page.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import GenericTable from '@/app/components/table/GenericTable';
import { MoreHorizontal } from "lucide-react";
import Modal from '@/app/reused-Components /Modal';

const coursesData = [
  { id: 1, name: "Transportation", category: "Math", code: "CVE 450", instructor: "Eng. Ahmed Mahdi", mode: "Online", dCount: 24, enrolled: 24, onlinePrice: "00 KD", inPersonPrice: "N/A" },
  { id: 2, name: "Multiplication", category: "Math", code: "CVE 450", instructor: "Eng. Ahmed Mahdi", mode: "Online", dCount: 24, enrolled: 24, onlinePrice: "00 KD", inPersonPrice: "N/A" },
  { id: 3, name: "Transformation", category: "Math", code: "CVE 450", instructor: "Eng. Ahmed Mahdi", mode: "Online", dCount: 24, enrolled: 24, onlinePrice: "00 KD", inPersonPrice: "N/A" },

];

export default function CoursesPage() {
  const [filtered, setFiltered] = useState(coursesData);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  const columns = ["Name", "Category", "Code", "Instructor", "Mode", "D. Count", "Enrolled Students", "Online Price", "In-Person Price", "Action"];

  const handleSearch = (query: string) => {
    setFiltered(
      coursesData.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.code.toLowerCase().includes(query.toLowerCase()) ||
        c.instructor.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleDelete = (id: number) => {
    setFiltered((prev) => prev.filter((c) => c.id !== id));
    setOpenDropdown(null);
  };

  const renderRow = (course: typeof coursesData[0]) => (
    <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-6 py-4"><span>↕️</span></td>
      <td className="px-6 py-4 flex items-center gap-2">{course.name}</td>
      <td className="px-6 py-4">{course.category}</td>
      <td className="px-6 py-4">{course.code}</td>
      <td className="px-6 py-4">{course.instructor}</td>
      <td className="px-6 py-4">{course.mode}</td>
      <td className="px-6 py-4">{course.dCount}</td>
      <td className="px-6 py-4">{course.enrolled}</td>
      <td className="px-6 py-4">{course.onlinePrice}</td>
      <td className="px-6 py-4">{course.inPersonPrice}</td>
      <td className="px-6 py-4 text-center relative">
        <button
          onClick={() => setOpenDropdown(openDropdown === course.id ? null : course.id)}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </button>
        {openDropdown === course.id && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 min-w-[120px] bg-white border border-gray-300 rounded-lg shadow-lg z-20 py-2 flex flex-col items-stretch"
            style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
          >
            <button
              className="px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition"
              onClick={() => {/* handle edit here */}}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 text-left text-red-600 hover:bg-red-50 transition"
              onClick={e => {
                e.preventDefault();
                if (window.confirm('Are you sure you want to delete this item?')) {
                  handleDelete(course.id);
                }
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

  return (
    <GenericTable
      columns={columns}
      data={filtered}
      renderRow={renderRow}
      onSearch={handleSearch}
      searchPlaceholder="Search Course, Code, Instructor"
      onAddNew={() => setModalOpen(true)}
    />
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      title="Add New"
      description="You clicked Add New button"
      confirmLabel="OK"
      cancelLabel=""
      onConfirm={() => setModalOpen(false)}
    />
  );
}