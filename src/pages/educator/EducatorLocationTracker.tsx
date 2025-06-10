
import ActivityLocationTracker from '@/components/educator/ActivityLocationTracker';

const EducatorLocationTracker = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Activity & Location Tracker</h1>
          <p className="text-slate-600 mt-1">Track children's locations and activities throughout the day</p>
        </div>
      </div>

      <ActivityLocationTracker />
    </div>
  );
};

export default EducatorLocationTracker;
