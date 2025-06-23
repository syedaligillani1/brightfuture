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
}: TableProps<T> & { onSearch: (query: string) => void }) {
  const [activeTab, setActiveTab] = useState(tabs[0] || "");
  const [search, setSearch] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-4">
      {tabs.length > 0 && (
        <TableTabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} onAddNew={onAddNew} />
      )}
      <TableSearch value={search} onChange={handleSearchChange} placeholder={searchPlaceholder} />
      <div className="mt-4">
        <DataTable columns={columns} data={data} renderRow={renderRow} />
      </div>
      <PaginationInfo total={data.length} />
    </div>
  );
}
