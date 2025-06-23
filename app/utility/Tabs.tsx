import React from 'react';

type Tab = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type TabsProps = {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export default function Tabs({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  className = ''
}: TabsProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const variantClasses = {
    default: {
      container: 'border-b border-gray-200',
      tab: 'border-b-2 border-transparent px-4 py-2 font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300',
      active: 'border-blue-500 text-blue-600'
    },
    pills: {
      container: 'space-x-1',
      tab: 'px-3 py-2 rounded-md font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100',
      active: 'bg-blue-100 text-blue-700'
    },
    underline: {
      container: 'border-b border-gray-200',
      tab: 'border-b-2 border-transparent px-4 py-2 font-medium text-gray-500 hover:text-gray-700',
      active: 'border-gray-900 text-gray-900'
    }
  };

  const currentVariant = variantClasses[variant];

  return (
    <div className={`${currentVariant.container} ${className}`}>
      <nav className={`flex ${variant === 'pills' ? 'space-x-1' : '-mb-px'}`}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => !tab.disabled && onTabChange(tab.key)}
            disabled={tab.disabled}
            className={`
              ${currentVariant.tab}
              ${sizeClasses[size]}
              ${activeTab === tab.key ? currentVariant.active : ''}
              ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              flex items-center gap-2
            `}
          >
            {tab.icon && tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
} 