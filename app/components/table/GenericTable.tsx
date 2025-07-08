import { useState } from "react";
import TableTabs from "./TableTabs";
import TableSearch from "./TableSearch";
import DataTable from "./DataTable";
import PrimaryButton from '@/app/reused-Components /PrimaryButton';
import Modal from '@/app/reused-Components /Modal';
export interface TableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
export interface DataTableProps<T> {
  columns: string[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
}
export interface TableProps<T> {
  columns: string[];
  data: T[];
  tabs?: string[];
  searchPlaceholder?: string;
  renderRow: (item: T) => React.ReactNode;
  onAddNew?: () => void;
  onSearch?: (query: string) => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  addButtonLabel? : string, 

}

export default function GenericTable<T>({
  columns,
  data,
  tabs = [],
  searchPlaceholder = "Search...",
  renderRow,
  onAddNew,
  onSearch,
  activeTab: controlledActiveTab,
  onTabChange,
  addButtonLabel = "Add New", 


}: TableProps<T>) {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0] || "");
  const [search, setSearch] = useState("");
  // const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10;


  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  const handleTabChange = (tab: string) => {
    if (onTabChange) onTabChange(tab);
    else setInternalActiveTab(tab);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-2 sm:p-4">
      <div className="space-y-3 sm:space-y-4">
        <div className="flex justify-between items-center mb-4">
          <div />
          <PrimaryButton
            label={<><span className="mr-1">+</span> {addButtonLabel}</>}
            onClick={onAddNew}
            type="button"
          />
        </div>

        {tabs.length > 0 && (
          <TableTabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabChange} onAddNew={onAddNew} />
        )}
        <TableSearch value={search} onChange={handleSearchChange} placeholder={searchPlaceholder} />
        <div>
          <DataTable columns={columns} data={paginatedData} renderRow={renderRow} />
        </div>
        
        <div className="flex justify-between items-center mt-4 text-sm">
          <span>
            Page {currentPage} of {Math.ceil(data.length / rowsPerPage)}
          </span>

          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === Math.ceil(data.length / rowsPerPage)}
              className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

      </div>
      {/* <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New"
        description="You clicked Add New button"
        confirmLabel="OK"
        cancelLabel="Cancel"
        onConfirm={() => setModalOpen(false)}
      /> */}
    </div>
  );
} 