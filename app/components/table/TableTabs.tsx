import PrimaryButton from "@/app/reused-Components /PrimaryButton";
import { Plus } from "lucide-react";

interface TableTabsProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
  onAddNew?: () => void;
}

export default function TableTabs({
  tabs,
  activeTab,
  onTabClick,
  onAddNew,
}: TableTabsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabClick(tab)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab
                ? "bg-blue-50 text-blue-600"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* {onAddNew && ( */}
   <PrimaryButton
   label={<><span style={{marginRight: 4}}>+</span> Add New</>}
   onClick={onAddNew}
   type="button"
 />
      
    </div>
  );
} 