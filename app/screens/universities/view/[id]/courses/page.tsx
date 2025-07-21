'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import GenericTable from '@/app/components/table/GenericTable';
import { MoreHorizontal } from 'lucide-react';
import Modal from '@/app/components/Modal';

interface Course {
  id: number;
  name: string;
  department: string;
  credits: number;
  status: boolean;
}

export default function CoursesPage() {
  const router = useRouter();
  const params = useParams();
  const universityId = params.id as string;
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data);
      setFilteredCourses(data);
    }
    fetchCourses();
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

  const columns = ['Name', 'Department', 'Credits', 'Status', 'Action'];

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
      );
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/courses?id=${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete course');
      }
      setCourses((prev) => prev.filter((c) => c.id !== id));
      setFilteredCourses((prev) => prev.filter((c) => c.id !== id));
      setOpenDropdown(null);
    } catch (error) {
      alert('Failed to delete course. Please try again.');
    }
  };

  return (
    <div>
      <GenericTable<Course>
        columns={columns}
        data={filteredCourses}
        renderRow={(course) => {
          const isDropdownOpen = openDropdown === course.id;
          return (
            <tr key={course.id} className="border-t hover:bg-gray-50">
              <td className="px-2 py-2 sm:px-4 sm:py-3">
                <span className="text-xs sm:text-sm font-medium">{course.name}</span>
              </td>
              <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{course.department}</td>
              <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{course.credits}</td>
              <td className="px-2 py-2 sm:px-4 sm:py-3">
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  course.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {course.status ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-2 py-2 sm:px-4 sm:py-3 relative text-right">
                <button
                  onClick={() => setOpenDropdown(isDropdownOpen ? null : course.id)}
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
                        router.push(`/universities/view/${encodeURIComponent(universityId)}/courses/edit/${encodeURIComponent(course.id)}`);
                        setOpenDropdown(null);
                      }}
                    >
                      <span>Edit</span>
                    </button>
                    <button
                      className="text-red-500 w-full px-4 py-2 text-xs sm:text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                      onClick={() => {
                        setCourseToDelete(course.id);
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
        searchPlaceholder="Search Course"
        onAddNew={() => router.push(`/universities/view/${encodeURIComponent(universityId)}/courses/add?universityId=${encodeURIComponent(universityId)}`)}
        addButtonLabel="Add New Course"
      />
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Course"
        description="Are you sure you want to delete this course?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => {
          if (courseToDelete !== null) {
            handleDelete(courseToDelete);
          }
          setDeleteModalOpen(false);
          setCourseToDelete(null);
        }}
      />
    </div>
  );
}