// app/universities/view/[id]/stories/page.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import UniversitiesTable from "@/app/universities/UniversitiesTable";
import { MoreHorizontal, Atom } from "lucide-react";
import GenericTable from "@/app/components/table/GenericTable";
import Modal from '@/app/reused-Components /Modal';

const storiesData = [
  { id: 1, title: "Story Title Here", created: "Jan 9, 2025", ending: "Feb 9, 2025", status: false },
  // ...more
];

export default function StoriesPage() {
  const [filtered, setFiltered] = useState(storiesData);
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

  const columns = ["Title", "Created Date", "Ending Date", "Status", "Action"];

  const handleSearch = (query: string) => {
    setFiltered(
      storiesData.filter((s) =>
        s.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleDelete = (id: number) => {
    setFiltered((prev) => prev.filter((s) => s.id !== id));
    setOpenDropdown(null);
  };

  const renderRow = (s: typeof storiesData[0], idx: number) => (
    <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-6 py-4 flex items-center gap-2"><Atom /> {s.title}</td>
      <td className="px-6 py-4">{s.created}</td>
      <td className="px-6 py-4">{s.ending}</td>
      <td className="px-6 py-4">
        <input type="checkbox" checked={s.status} readOnly className="accent-blue-900" />
      </td>
      <td className="px-6 py-4 text-center relative">
        <button
          onClick={() => setOpenDropdown(openDropdown === s.id ? null : s.id)}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </button>
        {openDropdown === s.id && (
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
                  handleDelete(s.id);
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
      searchPlaceholder="Search Story"
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