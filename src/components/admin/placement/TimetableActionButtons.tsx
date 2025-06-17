
import React from 'react';
import { Button } from '@/components/ui/button';

const TimetableActionButtons = () => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button variant="outline" size="sm">
        End request
      </Button>
      <Button variant="outline" size="sm">
        Request for replace
      </Button>
      <Button variant="outline" size="sm">
        Rate category/Average time
      </Button>
      <Button variant="outline" size="sm">
        Timetable
      </Button>
      <Button variant="outline" size="sm">
        Reasontype
      </Button>
      <Button variant="outline" size="sm">
        Leave
      </Button>
    </div>
  );
};

export default TimetableActionButtons;
