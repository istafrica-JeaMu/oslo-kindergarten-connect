
import TeamCollaborationHub from '@/components/educator/TeamCollaborationHub';

const EducatorTeamCollab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Team Collaboration</h1>
          <p className="text-slate-600 mt-1">Communicate and coordinate with your team members</p>
        </div>
      </div>

      <TeamCollaborationHub />
    </div>
  );
};

export default EducatorTeamCollab;
