import { TableTabsProps } from "../types";

export default function TableTabs({
  tabs,
  activeTab,
  onTabClick,
  onAddNew,
}: TableTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabClick(tab)}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border-2 border-gray-300 text-xs whitespace-nowrap flex-shrink-0 ${
              activeTab === tab
                ? 'text-white'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
            style={activeTab === tab ? { backgroundColor: '#094e85' } : {}}
          >
            {tab}
          </button>
        ))}
      </div>
      {onAddNew && (
        <button
          style={{ backgroundColor: '#094e85' }}
          className="ml-auto text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm whitespace-nowrap"
          onClick={onAddNew}
        >
          Add New
        </button>
      )}
    </div>
  );
}