
import { useState } from 'react';
import { format, subDays, addWeeks, subWeeks } from 'date-fns';
import { nb, enUS } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';
import ChildSelector from '@/components/guardian/attendance/ChildSelector';
import ChildInfoCard from '@/components/guardian/attendance/ChildInfoCard';
import TodayStatusCard from '@/components/guardian/attendance/TodayStatusCard';
import WeeklyOverview from '@/components/guardian/attendance/WeeklyOverview';
import AttendanceStats from '@/components/guardian/attendance/AttendanceStats';

const AttendanceTracking = () => {
  const { t, language } = useLanguage();
  const [selectedChild, setSelectedChild] = useState('oliver');
  const [selectedWeek, setSelectedWeek] = useState(0);
  
  const locale = language === 'nb' ? nb : enUS;
  
  // Mock data for multiple children
  const children = [
    {
      id: 'oliver',
      name: 'Oliver Hansen',
      kindergarten: 'Sinsen Kindergarten'
    },
    {
      id: 'emma',
      name: 'Emma Hansen',
      kindergarten: 'Løvenskiold Kindergarten'
    },
    {
      id: 'lucas',
      name: 'Lucas Hansen',
      kindergarten: 'Frogner Kindergarten'
    }
  ];

  // Mock attendance data for each child
  const attendanceData = {
    oliver: {
      today: {
        checkIn: '08:15',
        expectedCheckOut: '15:30',
        status: 'present' as const,
        duration: '7h 15m'
      },
      weekly: [
        {
          date: new Date(),
          checkIn: '08:15',
          checkOut: null,
          status: 'present' as const,
          duration: '7h 15m (ongoing)'
        },
        {
          date: subDays(new Date(), 1),
          checkIn: '08:05',
          checkOut: '15:45',
          status: 'completed' as const,
          duration: '7h 40m'
        },
        {
          date: subDays(new Date(), 2),
          checkIn: '08:25',
          checkOut: '15:30',
          status: 'completed' as const,
          duration: '7h 5m'
        },
        {
          date: subDays(new Date(), 3),
          checkIn: null,
          checkOut: null,
          status: 'absent' as const,
          duration: '-'
        },
        {
          date: subDays(new Date(), 4),
          checkIn: '08:10',
          checkOut: '16:00',
          status: 'completed' as const,
          duration: '7h 50m'
        }
      ]
    },
    emma: {
      today: {
        checkIn: null,
        expectedCheckOut: '16:00',
        status: 'not-arrived' as const,
        duration: '-'
      },
      weekly: [
        {
          date: new Date(),
          checkIn: null,
          checkOut: null,
          status: 'absent' as const,
          duration: '-'
        },
        {
          date: subDays(new Date(), 1),
          checkIn: '08:30',
          checkOut: '16:00',
          status: 'completed' as const,
          duration: '7h 30m'
        },
        {
          date: subDays(new Date(), 2),
          checkIn: '08:20',
          checkOut: '15:45',
          status: 'completed' as const,
          duration: '7h 25m'
        },
        {
          date: subDays(new Date(), 3),
          checkIn: '08:15',
          checkOut: '16:00',
          status: 'completed' as const,
          duration: '7h 45m'
        },
        {
          date: subDays(new Date(), 4),
          checkIn: '08:35',
          checkOut: '15:30',
          status: 'completed' as const,
          duration: '6h 55m'
        }
      ]
    },
    lucas: {
      today: {
        checkIn: null,
        expectedCheckOut: '15:30',
        status: 'absent' as const,
        duration: '-'
      },
      weekly: [
        {
          date: new Date(),
          checkIn: null,
          checkOut: null,
          status: 'absent' as const,
          duration: '-'
        },
        {
          date: subDays(new Date(), 1),
          checkIn: null,
          checkOut: null,
          status: 'absent' as const,
          duration: '-'
        },
        {
          date: subDays(new Date(), 2),
          checkIn: '09:00',
          checkOut: '15:30',
          status: 'completed' as const,
          duration: '6h 30m'
        },
        {
          date: subDays(new Date(), 3),
          checkIn: '08:45',
          checkOut: '15:15',
          status: 'completed' as const,
          duration: '6h 30m'
        },
        {
          date: subDays(new Date(), 4),
          checkIn: '08:30',
          checkOut: '15:30',
          status: 'completed' as const,
          duration: '7h 00m'
        }
      ]
    }
  };

  const currentChild = children.find(child => child.id === selectedChild);
  const currentData = attendanceData[selectedChild as keyof typeof attendanceData];

  const handlePreviousWeek = () => {
    setSelectedWeek(prev => prev - 1);
  };

  const handleNextWeek = () => {
    setSelectedWeek(prev => prev + 1);
  };

  const getWeekDateRange = () => {
    const startDate = addWeeks(subDays(new Date(), 4), selectedWeek);
    const endDate = addWeeks(new Date(), selectedWeek);
    return {
      start: format(startDate, 'MMM d', { locale }),
      end: format(endDate, 'MMM d, yyyy', { locale })
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t('guardian.attendance.title', 'Attendance Tracking')}</h1>
          <p className="text-slate-600 mt-2">{t('guardian.attendance.description', 'Track your child\'s daily attendance and check-in times')}</p>
        </div>
        <div className="flex items-center gap-4">
          <ChildSelector 
            children={children}
            selectedChild={selectedChild}
            onChildChange={setSelectedChild}
          />
        </div>
      </div>

      {/* Current Child Info */}
      {currentChild && (
        <ChildInfoCard child={currentChild} />
      )}

      {/* Today's Status */}
      <TodayStatusCard todayData={currentData.today} />

      {/* Weekly Overview */}
      <WeeklyOverview 
        weeklyData={currentData.weekly}
        selectedWeek={selectedWeek}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        getWeekDateRange={getWeekDateRange}
      />

      {/* Statistics */}
      <AttendanceStats selectedChild={selectedChild} />
    </div>
  );
};

export default AttendanceTracking;
