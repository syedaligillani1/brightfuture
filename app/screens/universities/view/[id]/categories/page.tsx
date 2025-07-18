"use client";
import { useState, useRef, useEffect } from "react";
import { MoreHorizontal} from "lucide-react";
import GenericTable from "@/app/components/table/GenericTable";
import Modal from '@/app/components/Modal';
import categoriesData from './categories.json';
import { useParams, useRouter } from "next/navigation";


export default function CategoriesPage() {
  const [filtered, setFiltered] = useState(categoriesData);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [catToDelete, setCatToDelete] = useState<number | null>(null);

  const router = useRouter();
  const params = useParams();
  const universityId = params.id as string;

  useEffect(() => {
    setCategories(categoriesData);
    setFiltered(categoriesData);
  }, []);

  const columns = ["Swap", "Category Name", "Total Courses", "Action"];

  const handleSearch = (query: string) => {
    setFiltered(
      categoriesData.filter((cat) =>
        cat.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/categories?id=${id}&universityId=${encodeURIComponent(universityId)}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete category');

      setFiltered(prev => prev.filter(cat => Number(cat.id) !== id));
      setCategories(prev => prev.filter(cat => Number(cat.id) !== id));
      setOpenDropdown(null);
    } catch (error) {
      console.error('Delete Error:', error);
      alert('Failed to delete category');
    }
  };


  const renderRow = (cat: typeof categoriesData[0]) => (
    <tr key={cat.id} className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-6 py-4"><span>↕️</span></td>
      <td className="px-6 py-4 flex items-center gap-2">{cat.name}</td>
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
              onClick={() => {
                router.push(`/universities/view/${encodeURIComponent(universityId)}/categories/edit/${encodeURIComponent(cat.id)}`);
                setOpenDropdown(null);
              }}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 text-left text-red-600 hover:bg-red-50 transition"
              onClick={e => {
                e.preventDefault();
                setCatToDelete(cat.id);
                setDeleteModalOpen(true);
              }}
            >
              Delete
            </button>
            <button
              className="px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition"
              onClick={() => {/* handle view here */ }}
            >
              View
            </button>
          </div>
        )}
      </td>
    </tr>
  );

  return (
    <div>
      <GenericTable
        columns={columns}
        data={filtered}
        renderRow={renderRow}
        onSearch={handleSearch}
        searchPlaceholder="Search Category"
        onAddNew={() => router.push(`/universities/view/${encodeURIComponent(universityId)}/categories/add?universityId=${encodeURIComponent(universityId)}`)}
      />

      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Category"
        description="Are you sure you want to delete this category?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => {
          if (catToDelete !== null) {
            handleDelete(catToDelete);
          }
          setDeleteModalOpen(false);
          setCatToDelete(null);
        }}
      />
    </div>
  );
}