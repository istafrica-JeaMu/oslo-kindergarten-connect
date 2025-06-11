
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Shield, 
  Eye, 
  Edit, 
  RotateCcw, 
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

interface UserCardProps {
  user: any;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  onView: () => void;
  onEdit: () => void;
  onResetPassword: () => void;
  onToggleStatus: () => void;
}

const UserCard = ({ 
  user, 
  isSelected, 
  onSelect, 
  onView, 
  onEdit, 
  onResetPassword, 
  onToggleStatus 
}: UserCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Active':
        return { 
          icon: CheckCircle, 
          color: 'text-green-600', 
          bgColor: 'bg-green-100',
          label: 'Active'
        };
      case 'Inactive':
        return { 
          icon: XCircle, 
          color: 'text-gray-600', 
          bgColor: 'bg-gray-100',
          label: 'Inactive'
        };
      case 'Suspended':
        return { 
          icon: AlertCircle, 
          color: 'text-red-600', 
          bgColor: 'bg-red-100',
          label: 'Suspended'
        };
      default:
        return { 
          icon: AlertCircle, 
          color: 'text-gray-600', 
          bgColor: 'bg-gray-100',
          label: status
        };
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Kindergarten Director':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Educator':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Case Worker':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Private Kindergarten Staff':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Administrator':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const statusConfig = getStatusConfig(user.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card 
      className={`transition-all duration-200 cursor-pointer ${
        isHovered ? 'shadow-lg scale-[1.01]' : 'shadow-sm'
      } ${isSelected ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Selection Checkbox */}
          <div className="pt-1">
            <Checkbox
              checked={isSelected}
              onCheckedChange={onSelect}
              aria-label={`Select ${user.name}`}
            />
          </div>

          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-md">
              {user.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header Row */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{user.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getRoleColor(user.role)} variant="outline">
                    <Shield className="w-3 h-3 mr-1" />
                    {user.role}
                  </Badge>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusConfig.label}
                  </div>
                </div>
              </div>

              {/* Actions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={onView}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onEdit}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit User
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onResetPassword}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Password
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onToggleStatus}>
                    <User className="w-4 h-4 mr-2" />
                    {user.status === 'Active' ? 'Deactivate' : 'Activate'} User
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Contact Information */}
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="truncate">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{user.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="truncate">{user.kindergarten}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Last login: {user.lastLogin}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
