'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import GenericTable from '@/app/components/table/GenericTable';
import { MoreHorizontal } from 'lucide-react';
import Modal from '@/app/components/Modal';

interface Banner {
  id: number;
  title: string;
  imageUrl: string;
  status: boolean;
}

export default function BannersPage() {
  const router = useRouter();
  const params = useParams();
  const universityId = params.id as string;
  const [banners, setBanners] = useState<Banner[]>([]);
  const [filteredBanners, setFilteredBanners] = useState<Banner[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchBanners() {
      const response = await fetch('/api/banners');
      const data = await response.json();
      setBanners(data);
      setFilteredBanners(data);
    }
    fetchBanners();
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

  const columns = ['Title', 'Image', 'Status', 'Action'];

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredBanners(banners);
    } else {
      setFilteredBanners(
        banners.filter((b) => b.title.toLowerCase().includes(query.toLowerCase()))
      );
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/banners?id=${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete banner');
      }
      setBanners((prev) => prev.filter((b) => b.id !== id));
      setFilteredBanners((prev) => prev.filter((b) => b.id !== id));
      setOpenDropdown(null);
    } catch (error) {
      alert('Failed to delete banner. Please try again.');
    }
  };

  return (
    <div>
      <GenericTable<Banner>
        columns={columns}
        data={filteredBanners}
        renderRow={(banner) => {
          const isDropdownOpen = openDropdown === banner.id;
          return (
            <tr key={banner.id} className="border-t hover:bg-gray-50">
              <td className="px-2 py-2 sm:px-4 sm:py-3">
                <span className="text-xs sm:text-sm font-medium">{banner.title}</span>
              </td>
              <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">
                <img src={banner.imageUrl} alt={banner.title} className="h-8 w-auto rounded" />
              </td>
              <td className="px-2 py-2 sm:px-4 sm:py-3">
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  banner.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {banner.status ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-2 py-2 sm:px-4 sm:py-3 relative text-right">
                <button
                  onClick={() => setOpenDropdown(isDropdownOpen ? null : banner.id)}
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
                        router.push(`/universities/view/${encodeURIComponent(universityId)}/banners/edit/${encodeURIComponent(banner.id)}`);
                        setOpenDropdown(null);
                      }}
                    >
                      <span>Edit</span>
                    </button>
                    <button
                      className="text-red-500 w-full px-4 py-2 text-xs sm:text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                      onClick={() => {
                        setBannerToDelete(banner.id);
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
        searchPlaceholder="Search Banner"
        onAddNew={() => router.push(`/universities/view/${encodeURIComponent(universityId)}/banners/add?universityId=${encodeURIComponent(universityId)}`)}
        addButtonLabel="Add New Banner"
      />
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Banner"
        description="Are you sure you want to delete this banner?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => {
          if (bannerToDelete !== null) {
            handleDelete(bannerToDelete);
          }
          setDeleteModalOpen(false);
          setBannerToDelete(null);
        }}
      />
    </div>
  );
} 