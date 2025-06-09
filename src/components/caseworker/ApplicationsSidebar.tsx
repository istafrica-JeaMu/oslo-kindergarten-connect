
import { useState } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Plus
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const ApplicationsSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const applicationMenuItems = [
    {
      title: 'New Application',
      subtitle: '(Manual Entry)',
      url: '/caseworker/manual-application',
      icon: Plus,
      count: null,
      color: 'text-orange-600'
    },
    {
      title: 'In Progress',
      url: '/caseworker/applications/in-progress',
      icon: Clock,
      count: 8,
      color: 'text-blue-600'
    },
    {
      title: 'Submitted',
      url: '/caseworker/applications/submitted',
      icon: CheckCircle,
      count: 45,
      color: 'text-green-600'
    },
    {
      title: 'Needs Follow-up',
      url: '/caseworker/applications/follow-up',
      icon: AlertTriangle,
      count: 3,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="space-y-2">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between hover:bg-oslo-blue/10 data-[state=open]:bg-oslo-blue/10 transition-colors duration-200 min-h-[44px]"
          >
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-oslo-blue" />
              <span className="font-semibold text-slate-900">Applications</span>
            </div>
            {isOpen ? (
              <ChevronDown className="h-4 w-4 text-slate-600" />
            ) : (
              <ChevronRight className="h-4 w-4 text-slate-600" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="space-y-1 ml-4">
          {applicationMenuItems.map((item) => (
            <Link 
              key={item.title} 
              to={item.url} 
              className={`block rounded-lg transition-colors duration-200 ${
                location.pathname === item.url 
                  ? 'bg-oslo-blue text-white' 
                  : 'hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between p-3 min-h-[48px]">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <item.icon className={`h-4 w-4 flex-shrink-0 ${
                    location.pathname === item.url ? 'text-white' : item.color
                  }`} />
                  <div className="flex-1 min-w-0">
                    <span className={`font-medium text-sm block ${
                      location.pathname === item.url ? 'text-white' : 'text-slate-900'
                    }`}>
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span className={`text-xs ${
                        location.pathname === item.url ? 'text-white/80' : 'text-slate-500'
                      }`}>
                        {item.subtitle}
                      </span>
                    )}
                  </div>
                </div>
                {item.count && (
                  <Badge 
                    variant={location.pathname === item.url ? "secondary" : "outline"}
                    className="ml-2 font-semibold flex-shrink-0"
                  >
                    {item.count}
                  </Badge>
                )}
              </div>
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ApplicationsSidebar;
