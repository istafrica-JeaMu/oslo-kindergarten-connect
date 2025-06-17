
import React from 'react';
import { Button } from '@/components/ui/button';

interface TimetableActionButtonsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TimetableActionButtons = ({ activeTab, onTabChange }: TimetableActionButtonsProps) => {
  const tabs = [
    { id: 'end-request', label: 'End request' },
    { id: 'request-replace', label: 'Request for replace' },
    { id: 'rate-category', label: 'Rate category/Average time' },
    { id: 'timetable', label: 'Timetable' },
    { id: 'reasontype', label: 'Reasontype' },
    { id: 'leave', label: 'Leave' }
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onTabChange(tab.id)}
          className={activeTab === tab.id ? 'bg-oslo-blue text-white' : ''}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

export default TimetableActionButtons;
