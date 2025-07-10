'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import GenericTable from '@/app/components/table/GenericTable';
import { MoreHorizontal } from 'lucide-react';
import Modal from '@/app/reused-Components /Modal';

interface InstallmentPlan {
  id: number;
  planName: string;
  totalAmount: number;
  installments: number;
  status: boolean;
}

export default function InstallmentPlansPage() {
  const router = useRouter();
  const params = useParams();
  const universityId = params.id as string;
  const [plans, setPlans] = useState<InstallmentPlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<InstallmentPlan[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchPlans() {
      const response = await fetch('/api/installments');
      const data = await response.json();
      setPlans(data);
      setFilteredPlans(data);
    }
    fetchPlans();
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

  const columns = ['Plan Name', 'Total Amount', 'Installments', 'Status', 'Action'];

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredPlans(plans);
    } else {
      setFilteredPlans(
        plans.filter((p) => p.planName.toLowerCase().includes(query.toLowerCase()))
      );
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/installments?id=${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete plan');
      }
      setPlans((prev) => prev.filter((p) => p.id !== id));
      setFilteredPlans((prev) => prev.filter((p) => p.id !== id));
      setOpenDropdown(null);
    } catch (error) {
      alert('Failed to delete plan. Please try again.');
    }
  };

  return (
    <div>
      <GenericTable<InstallmentPlan>
        columns={columns}
        data={filteredPlans}
        renderRow={(plan) => {
          const isDropdownOpen = openDropdown === plan.id;
          return (
            <tr key={plan.id} className="border-t hover:bg-gray-50">
              <td className="px-2 py-2 sm:px-4 sm:py-3">
                <span className="text-xs sm:text-sm font-medium">{plan.planName}</span>
              </td>
              <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{plan.totalAmount}</td>
              <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{plan.installments}</td>
              <td className="px-2 py-2 sm:px-4 sm:py-3">
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  plan.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {plan.status ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-2 py-2 sm:px-4 sm:py-3 relative text-right">
                <button
                  onClick={() => setOpenDropdown(isDropdownOpen ? null : plan.id)}
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
                        router.push(`/universities/view/${encodeURIComponent(universityId)}/installment/edit/${encodeURIComponent(plan.id)}`);
                        setOpenDropdown(null);
                      }}
                    >
                      <span>Edit</span>
                    </button>
                    <button
                      className="text-red-500 w-full px-4 py-2 text-xs sm:text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                      onClick={() => {
                        setPlanToDelete(plan.id);
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
        searchPlaceholder="Search Plan"
        onAddNew={() => router.push(`/universities/view/${encodeURIComponent(universityId)}/installment/add?universityId=${encodeURIComponent(universityId)}`)}
        addButtonLabel="Add New Plan"
      />
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Plan"
        description="Are you sure you want to delete this plan?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => {
          if (planToDelete !== null) {
            handleDelete(planToDelete);
          }
          setDeleteModalOpen(false);
          setPlanToDelete(null);
        }}
      />
    </div>
  );
}
