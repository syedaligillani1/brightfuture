'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import GenericTable from '@/app/components/table/GenericTable';
import { MoreHorizontal } from 'lucide-react';
import Modal from '@/app/components/Modal';

interface Story {
  id: number;
  title: string;
  author: string;
  content: string;
  status: boolean;
}

export default function StoriesPage() {
  const router = useRouter();
  const params = useParams();
  const universityId = params.id as string;
  const [stories, setStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchStories() {
      const response = await fetch('/api/stories');
      const data = await response.json();
      setStories(data);
      setFilteredStories(data);
    }
    fetchStories();
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

  const columns = ['Title', 'Author', 'Status', 'Action'];

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredStories(stories);
    } else {
      setFilteredStories(
        stories.filter((s) => s.title.toLowerCase().includes(query.toLowerCase()))
      );
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/stories?id=${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete story');
      }
      setStories((prev) => prev.filter((s) => s.id !== id));
      setFilteredStories((prev) => prev.filter((s) => s.id !== id));
      setOpenDropdown(null);
    } catch (error) {
      alert('Failed to delete story. Please try again.');
    }
  };

  return (
    <div>
      <GenericTable<Story>
        columns={columns}
        data={filteredStories}
        renderRow={(story) => {
          const isDropdownOpen = openDropdown === story.id;
          return (
            <tr key={story.id} className="border-t hover:bg-gray-50">
              <td className="px-2 py-2 sm:px-4 sm:py-3">
                <span className="text-xs sm:text-sm font-medium">{story.title}</span>
              </td>
              <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{story.author}</td>
              <td className="px-2 py-2 sm:px-4 sm:py-3">
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  story.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {story.status ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-2 py-2 sm:px-4 sm:py-3 relative text-right">
                <button
                  onClick={() => setOpenDropdown(isDropdownOpen ? null : story.id)}
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
                        router.push(`/universities/view/${encodeURIComponent(universityId)}/stories/edit/${encodeURIComponent(story.id)}`);
                        setOpenDropdown(null);
                      }}
                    >
                      <span>Edit</span>
                    </button>
                    <button
                      className="text-red-500 w-full px-4 py-2 text-xs sm:text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                      onClick={() => {
                        setStoryToDelete(story.id);
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
        searchPlaceholder="Search Story"
        onAddNew={() => router.push(`/universities/view/${encodeURIComponent(universityId)}/stories/add?universityId=${encodeURIComponent(universityId)}`)}
        addButtonLabel="Add New Story"
      />
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Story"
        description="Are you sure you want to delete this story?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => {
          if (storyToDelete !== null) {
            handleDelete(storyToDelete);
          }
          setDeleteModalOpen(false);
          setStoryToDelete(null);
        }}
      />
    </div>
  );
}