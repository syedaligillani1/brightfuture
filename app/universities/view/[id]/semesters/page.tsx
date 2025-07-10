'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import GenericTable from '@/app/components/table/GenericTable';
import { MoreHorizontal } from 'lucide-react';
import Modal from '@/app/reused-Components /Modal';

interface Semester {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: boolean;
}

export default function SemestersPage() {
  const router = useRouter();
  const params = useParams();
  const universityId = params.id as string;
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [filteredSemesters, setFilteredSemesters] = useState<Semester[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [semesterToDelete, setSemesterToDelete] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchSemesters() {
      const response = await fetch('/api/semesters');
      const data = await response.json();
      setSemesters(data);
      setFilteredSemesters(data);
    }
    fetchSemesters();
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
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const columns = ['Name', 'Start Date', 'End Date', 'Status', 'Action'];

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredSemesters(semesters);
    } else {
      setFilteredSemesters(
        semesters.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
      );
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/semesters?id=${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete semester');
      }
      setSemesters((prev) => prev.filter((s) => s.id !== id));
      setFilteredSemesters((prev) => prev.filter((s) => s.id !== id));
      setOpenDropdown(null);
    } catch (error) {
      alert('Failed to delete semester. Please try again.');
    }
  };

  return (
    <div>
      <GenericTable<Semester>
        columns={columns}
        data={filteredSemesters}
        renderRow={(semester) => {
          const isDropdownOpen = openDropdown === semester.id;
          return (
            <tr key={semester.id} className="border-t hover:bg-gray-50">
              <td className="px-2 py-2 sm:px-4 sm:py-3">
                <span className="text-xs sm:text-sm font-medium">{semester.name}</span>
              </td>
              <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{semester.startDate}</td>
              <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{semester.endDate}</td>
              <td className="px-2 py-2 sm:px-4 sm:py-3">
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  semester.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {semester.status ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-2 py-2 sm:px-4 sm:py-3 relative text-right">
                <button
                  onClick={() => setOpenDropdown(isDropdownOpen ? null : semester.id)}
                  className="inline-flex items-center justify-center p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Actions"
                >
                  <MoreHorizontal size={14} className="sm:w-4 sm:h-4 text-gray-500" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-10 border border-gray-200 py-1">
                    <button
                      className="w-full px-4 py-2 text-xs sm:text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                      onClick={() => {
                        router.push(`/universities/view/${encodeURIComponent(universityId)}/semesters/edit/${encodeURIComponent(semester.id)}`);
                        setOpenDropdown(null);
                      }}
                    >
                      <span>Edit</span>
                    </button>
                    <button
                      className="text-red-500 w-full px-4 py-2 text-xs sm:text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                      onClick={() => {
                        setSemesterToDelete(semester.id);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </td>
            </tr>
          );
        }}
        onSearch={handleSearch}
        searchPlaceholder="Search Semester"
        onAddNew={() => router.push(`/universities/view/${encodeURIComponent(universityId)}/semesters/add?universityId=${encodeURIComponent(universityId)}`)}
      />
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Semester"
        description="Are you sure you want to delete this semester?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => {
          if (semesterToDelete !== null) {
            handleDelete(semesterToDelete);
          }
          setDeleteModalOpen(false);
          setSemesterToDelete(null);
        }}
      />
    </div>
  );
}