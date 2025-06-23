import React from 'react';

export default function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex gap-2 mb-6">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab)}
          className={
            activeTab === tab.key
              ? 'bg-blue-900 text-white px-4 py-2 rounded-full font-medium'
              : 'bg-white text-black border border-gray-300 px-4 py-2 rounded-full font-medium'
          }
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
} 