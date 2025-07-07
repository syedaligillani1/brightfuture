import React, { useState, useEffect, useRef } from "react";
import { MoreHorizontal } from 'lucide-react';
import UniversitiesTable from "./UniversitiesTable";
import { universityColumns, universityData, University } from "./data";
import PrimaryButton from '@/app/reused-Components /PrimaryButton';
import Modal from '@/app/reused-Components /Modal';

export default function Universities() {
  const [tableRows, setTableRows] = useState<University[]>(universityData);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Close dropdown on outside click
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

  // Example: Add new university (replace with your actual add logic)
  const handleAddNew = () => {
    const newUni = {
      name: "New University",
      departments: 1,
      instructors: 1,
      courses: 1,
      totalStudents: 10,
      enrolledStudents: 5,
      status: "Active"
    };
    setTableRows(prev => [...prev, newUni]);
  };

  const columns = [
    "Name", "Departments", "Instructors", "Courses", "Total Students", "Enrolled Student", "Status", "Action"
  ];

  const handleDelete = (name: string) => {
    setTableRows(prev => prev.filter(u => u.name !== name));
    setOpenDropdown(null);
  };

  const renderRow = (u: University, i: number) => (
    <tr key={u.name} className="border-t">
      <td className="p-2">{u.name}</td>
      <td>{u.departments}</td>
      <td>{u.instructors}</td>
      <td>{u.courses}</td>
      <td>{u.totalStudents}</td>
      <td>{u.enrolledStudents}</td>
      <td>
        <span className={`px-2 py-1 rounded text-xs ${u.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {u.status}
        </span>
      </td>
      <td className="relative text-center">
        <button
          onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </button>
        {openDropdown === i && (
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
                  handleDelete(u.name);
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
    <div className="p-6 space-y-6">
      <PrimaryButton label="Add New" onClick={() => setModalOpen(true)} type="button" className="bg-blue-900 text-white px-4 py-2 rounded float-right mb-2" />
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New"
        description="You clicked Add New button"
        confirmLabel="OK"
        cancelLabel=""
        onConfirm={() => setModalOpen(false)}
      />
      <UniversitiesTable
        columns={columns}
        data={tableRows}
        renderRow={renderRow}
        onSearch={query => {
          setTableRows(
            universityData.filter(u =>
              u.name.toLowerCase().includes(query.toLowerCase())
            )
          );
        }}
        searchPlaceholder="Search University by name, category"
      />
    </div>
  );
}
