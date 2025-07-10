'use client';
import React, { useState, useEffect } from "react";
import { DollarSign, Users, BookOpen, GraduationCap, MoreVertical } from 'lucide-react';
import Card from '../components/Card';
import data from '../components/data.json';
import RevenueChart from '../components/RevenueChart';
import OverviewChart from '../components/Overview';
import GenericTable from "../components/table/GenericTable";
import { useRouter } from "next/navigation";
import { universityColumns, University } from "./data";
import { ENDPOINTS } from "../api/url/endpoints";
import Modal from "../reused-Components /Modal";
import PrimaryButton from '@/app/reused-Components /PrimaryButton';
import CancelButton from '@/app/reused-Components /CancelButton';

const iconMap: Record<string, React.ComponentType<any>> = {
  DollarSign,
  Users,
  BookOpen,
  GraduationCap,
};

export default function Universities() {
  const [tableRows, setTableRows] = useState<University[]>([]);
  const [originalData, setOriginalData] = useState<University[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("All Universities");
  const [isLoading, setIsLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '' });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

  const router = useRouter();

  const fetchUniversities = async () => {
    try {
      const response = await fetch(ENDPOINTS.UNIVERSITIES);
      if (!response.ok) throw new Error('Failed to fetch universities');
      const data = await response.json();
      setTableRows(data);
      setOriginalData(data);
    } catch (error) {
      console.error('Error fetching universities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  const showModal = (title: string, description: string) => {
    setModalContent({ title, description });
    setModalOpen(true);
  };

  const handleDelete = (universityToDelete: University) => {
    setSelectedUniversity(universityToDelete);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedUniversity) return;
    try {
      const response = await fetch(`${ENDPOINTS.UNIVERSITIES}?name=${encodeURIComponent(selectedUniversity.name)}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete university');
      }
      setTableRows(prev => prev.filter(u => u.name !== selectedUniversity.name));
      setOriginalData(prev => prev.filter(u => u.name !== selectedUniversity.name));
      setOpenDropdown(null);
      showModal('Deleted', `${selectedUniversity.name} has been successfully removed.`);
    } catch (error) {
      showModal('Delete Failed', error instanceof Error ? error.message : 'Failed to delete university. Please try again.');
    } finally {
      setConfirmOpen(false);
      setSelectedUniversity(null);
    }
  };

  const handleEdit = (university: University) => {
    router.push(`/universities/edit/${encodeURIComponent(university.name)}`);
  };

  const handleView = (university: University) => {
    router.push(`/universities/view/${encodeURIComponent(university.name)}`);
  };

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    if (!query) {
      setTableRows(originalData);
    } else {
      const filtered = originalData.filter((u) =>
        typeof u.name === 'string' && u.name.toLowerCase().includes(lowercasedQuery)
      );
      setTableRows(filtered);
    }
  };

  const filteredRows = tableRows.filter((u) => {
    if (activeTab === "Active Universities") return u.status === "Active";
    if (activeTab === "Inactive Universities") return u.status === "Inactive";
    return true;
  });

  if (isLoading) return <div className="p-8 text-center">Loading universities...</div>;

  return (
    <div className="p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      <h1 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 pr-16 md:pr-0">Universities</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {data.map((item, index) => {
          const IconComponent = iconMap[item.icon] || DollarSign;
          return (
            <Card
              key={index}
              icon={<div className={`p-3 rounded-full ${item.color}`}><IconComponent size={20} className="text-white" /></div>}
              label={item.label}
              amount={item.amount}
              sales={item.sales}
            />
          );
        })}
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 sm:gap-6">
        <div className="w-full bg-white rounded-xl shadow p-2 sm:p-6 mb-4 overflow-x-auto">
          <RevenueChart />
        </div>
        <div className="w-full bg-white rounded-xl shadow p-2 sm:p-6 mb-4 overflow-x-auto">
          <OverviewChart />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <GenericTable<University>
          columns={universityColumns}
          data={filteredRows}
          tabs={["All Universities", "Active Universities", "Inactive Universities"]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchPlaceholder="Search University by name, category"
          onSearch={handleSearch}
          onAddNew={() => router.push('/universities/add')}
          renderRow={(u) => {
            const isDropdownOpen = openDropdown === filteredRows.indexOf(u);
            return (
              <tr key={u.name} className="border-t hover:bg-gray-50">
                <td className="px-2 py-2 sm:px-4 sm:py-3">
                  <div className="flex items-center gap-2">
                    <img src={u.logo || "/logo.png"} alt="Logo" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
                    <span className="text-xs sm:text-sm font-medium truncate max-w-[80px] sm:max-w-[120px]">{u.name}</span>
                  </div>
                </td>
                <td className="text-xs sm:text-sm px-2 py-2 sm:px-4 sm:py-3">{u.departments}</td>
                <td className="text-xs sm:text-sm px-2 py-2 sm:px-4 sm:py-3">{u.instructors}</td>
                <td className="text-xs sm:text-sm px-2 py-2 sm:px-4 sm:py-3">{u.courses}</td>
                <td className="text-xs sm:text-sm px-2 py-2 sm:px-4 sm:py-3">{u.totalStudents}</td>
                <td className="text-xs sm:text-sm px-2 py-2 sm:px-4 sm:py-3">{u.enrolledStudents}</td>
                <td className="px-2 py-2 sm:px-4 sm:py-3">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${u.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{u.status}</span>
                </td>
                <td className="px-2 py-2 sm:px-4 sm:py-3 relative text-right">
                  <button
                    onClick={() => setOpenDropdown(isDropdownOpen ? null : filteredRows.indexOf(u))}
                    className="inline-flex items-center justify-center p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Actions"
                  >
                    <MoreVertical size={14} className="sm:w-4 sm:h-4 text-gray-500" />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-10 border border-gray-200 py-1">
                      <button
                        onClick={() => handleEdit(u)}
                        type="button"
                        className="w-full px-4 py-2 text-xs sm:text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(u)}
                        type="button"
                        className="text-red-500 w-full px-4 py-2 text-xs sm:text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => handleView(u)}
                        type="button"
                        className="w-full px-4 py-2 text-xs sm:text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        View
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          }}
        />
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        description={modalContent.description}
        confirmLabel="OK"
      />

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Are you sure?"
        description={`This will delete ${selectedUniversity?.name}`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
      />
    </div>
  );
}