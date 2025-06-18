
import React from 'react';
import { Button } from '@/components/ui/button';
import { adminClasses } from '@/styles/admin-tokens';

interface TabItem {
  key: string;
  title: string;
  fullTitle?: string;
}

interface AdminTabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
  className?: string;
}

const AdminTabNavigation = ({
  tabs,
  activeTab,
  onTabChange,
  className = ''
}: AdminTabNavigationProps) => {
  return (
    <div className={`border-b border-gray-200 mb-6 ${className}`}>
      <nav className="flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            title={tab.fullTitle || tab.title}
          >
            {tab.title}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminTabNavigation;
