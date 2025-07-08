"use client";
import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Calculator, Atom, BookOpen, Monitor, Link } from "lucide-react";
import GenericTable from "@/app/components/table/GenericTable";
import Modal from '@/app/reused-Components /Modal';


const categoriesData = [
  { id: 1, icon: <Calculator />, name: "Math", totalCourses: 23 },
  { id: 2, icon: <Atom />, name: "Physics", totalCourses: 23 },
  { id: 3, icon: <BookOpen />, name: "English", totalCourses: 23 },
  { id: 4, icon: <Monitor />, name: "Computer", totalCourses: 23 },
];

export default function CategoriesPage() {
  const [filtered, setFiltered] = useState(categoriesData);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);



  const columns = ["Swap", "Category Name", "Total Courses", "Action"];

  const handleSearch = (query: string) => {
    setFiltered(
      categoriesData.filter((cat) =>
        cat.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleDelete = (id: number) => {
    setFiltered((prev) => prev.filter((cat) => cat.id !== id));
    setOpenDropdown(null);
  };

  const renderRow = (cat: typeof categoriesData[0]) => (
    <tr key={cat.id} className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-6 py-4"><span>↕️</span></td>
      <td className="px-6 py-4 flex items-center gap-2">{cat.icon} {cat.name}</td>
      <td className="px-6 py-4">{cat.totalCourses}</td>
      <td className="px-6 py-4 text-center relative">
        <button
          onClick={() => setOpenDropdown(openDropdown === cat.id ? null : cat.id)}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </button>
        {openDropdown === cat.id && (
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
                  handleDelete(cat.id);
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
      searchPlaceholder="Search Category"
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