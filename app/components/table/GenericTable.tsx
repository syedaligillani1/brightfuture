import { useState } from "react";
import { useRouter } from 'next/navigation';
import PaginationInfo from "./PaginationInfo";
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
  addUrl?: string;
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
  addUrl,
}: TableProps<T>) {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0] || "");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

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

  const handleAddClick = () => {
    if (addUrl) {
      router.push(addUrl);
    } else if (onAddNew) {
      onAddNew();
    } else {
      setModalOpen(true);
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-2 sm:p-4">
      <div className="space-y-3 sm:space-y-4">
      <div className="flex justify-between items-center mb-4">
  <div />
  <PrimaryButton
    label={<><span style={{marginRight: 4}}>+</span> Add New</>}
    onClick={handleAddClick}
    type="button"
  />
</div>

        {tabs.length > 0 && (
          <TableTabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabChange} onAddNew={onAddNew} />
        )}
        <TableSearch value={search} onChange={handleSearchChange} placeholder={searchPlaceholder} />
        <div>
          <DataTable columns={columns} data={data} renderRow={renderRow} />
        </div>
      </div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New"
        description="You clicked Add New button"
        confirmLabel="OK"
        cancelLabel=""
        onConfirm={() => setModalOpen(false)}
      />
    </div>
  );
} 