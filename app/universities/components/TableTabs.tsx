import { TableTabsProps } from "../types";

export default function TableTabs({
  tabs,
  activeTab,
  onTabClick,
  onAddNew,
}: TableTabsProps) {
  return (
    <div className="flex gap-2 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded ${activeTab === tab ? "bg-blue-900 text-white" : "bg-gray-100"}`}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </button>
      ))}
      {onAddNew && (
        <button
          className="ml-auto bg-blue-900 text-white px-4 py-2 rounded"
          onClick={onAddNew}
        >
          Add New
        </button>
      )}
    </div>
  );
}