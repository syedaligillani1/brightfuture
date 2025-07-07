"use client";
import { useState } from "react";

import { TableProps } from "./types";
import PaginationInfo from "./components/PaginationInfo";
import TableTabs from "./components/TableTabs";
import TableSearch from "./components/TableSearch";
import DataTable from "./components/DataTable";

export default function UniversitiesTable<T>({
  columns,
  data,
  tabs = [],
  searchPlaceholder = "Search...",
  renderRow,
  onAddNew,
  onSearch,
  activeTab: controlledActiveTab,
  onTabChange,
}: TableProps<T> & {
  onSearch: (query: string) => void,
  activeTab?: string,
  onTabChange?: (tab: string) => void
}) {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0] || "");
  const [search, setSearch] = useState("");

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
        {tabs.length > 0 && (
          <TableTabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabChange} onAddNew={onAddNew} />
        )}
        <TableSearch value={search} onChange={handleSearchChange} placeholder={searchPlaceholder} />
        <div>
          <DataTable columns={columns} data={data} renderRow={renderRow} />
        </div>
        <PaginationInfo total={data.length} />
      </div>
    </div>
  );
}

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
}

export interface University {
  name: string;
  logo: string;
  departments: number;
  instructors: number;
  courses: number;
  totalStudents: number;
  enrolledStudents: number;
  status: 'Active' | 'Inactive';
}
