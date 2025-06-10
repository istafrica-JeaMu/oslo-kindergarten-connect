
import BulletinBoardManager from '@/components/educator/BulletinBoardManager';

const EducatorBulletinBoard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Bulletin Board Manager</h1>
          <p className="text-slate-600 mt-1">Create and manage announcements and posts for guardians</p>
        </div>
      </div>

      <BulletinBoardManager />
    </div>
  );
};

export default EducatorBulletinBoard;
