// app/universities/view/[id]/installment/page.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import UniversitiesTable from "@/app/universities/UniversitiesTable";
import { MoreHorizontal } from "lucide-react";

const plansData = [
  { id: 1, title: "Title Here", count: 4, downpayment: "KD 500" },
];

export default function InstallmentPlansPage() {
  const [filtered, setFiltered] = useState(plansData);
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

  const columns = ["Title", "Installment Count", "Downpayment", "Action"];

  const handleSearch = (query: string) => {
    setFiltered(
      plansData.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleDelete = (id: number) => {
    setFiltered((prev) => prev.filter((p) => p.id !== id));
    setOpenDropdown(null);
  };

  const renderRow = (p: typeof plansData[0], idx: number) => (
    <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-6 py-4">{p.title}</td>
      <td className="px-6 py-4">{p.count}</td>
      <td className="px-6 py-4">{p.downpayment}</td>
      <td className="px-6 py-4 text-center relative">
        <button
          onClick={() => setOpenDropdown(openDropdown === p.id ? null : p.id)}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </button>
        {openDropdown === p.id && (
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
                  handleDelete(p.id);
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
      searchPlaceholder="Search Installment Plan"
    />
  );
}