// app/universities/view/[id]/courses/page.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import UniversitiesTable from "@/app/universities/UniversitiesTable";
import { MoreHorizontal } from "lucide-react";

const coursesData = [
  { id: 1, name: "Transportation", category: "Math", code: "CVE 450", instructor: "Eng. Ahmed Mahdi", mode: "Online", dCount: 24, enrolled: 24, onlinePrice: "00 KD", inPersonPrice: "N/A" },
  // ...more
];

export default function CoursesPage() {
  const [filtered, setFiltered] = useState(coursesData);
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

  const renderRow = (c: typeof coursesData[0], idx: number) => (
    <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-6 py-4">{c.name}</td>
      <td className="px-6 py-4">{c.category}</td>
      <td className="px-6 py-4">{c.code}</td>
      <td className="px-6 py-4">{c.instructor}</td>
      <td className="px-6 py-4">{c.mode}</td>
      <td className="px-6 py-4">{c.dCount}</td>
      <td className="px-6 py-4">{c.enrolled}</td>
      <td className="px-6 py-4">{c.onlinePrice}</td>
      <td className="px-6 py-4">{c.inPersonPrice}</td>
      <td className="px-6 py-4 text-center relative">
        <button
          onClick={() => setOpenDropdown(openDropdown === c.id ? null : c.id)}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </button>
        {openDropdown === c.id && (
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
                  handleDelete(c.id);
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
    <UniversitiesTable
      columns={columns}
      data={filtered}
      renderRow={renderRow}
      onSearch={handleSearch}
      searchPlaceholder="Search Course, Code, Instructor"
    />
  );
}