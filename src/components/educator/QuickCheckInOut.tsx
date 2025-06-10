
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  LogIn, 
  LogOut, 
  Clock,
  CheckCircle,
  User,
  Users,
  Zap
} from 'lucide-react';
import { Child } from '@/pages/staff/EducatorAttendance';

interface QuickCheckInOutProps {
  children: Child[];
  onQuickAction: (action: string, childId: string) => void;
}

const QuickCheckInOut = ({ children, onQuickAction }: QuickCheckInOutProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastAction, setLastAction] = useState<{action: string, child: string} | null>(null);

  const filteredChildren = children.filter(child => 
    child.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuickAction = (action: string, child: Child) => {
    onQuickAction(action, child.id);
    setLastAction({ action, child: child.name });
    setSearchTerm(''); // Clear search after action
    
    // Clear the last action notification after 3 seconds
    setTimeout(() => setLastAction(null), 3000);
  };

  const expectedChildren = children.filter(child => child.status === 'absent');
  const presentChildren = children.filter(child => child.status === 'present');

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto text-blue-600 mb-2" />
            <div className="text-2xl font-bold text-blue-700">{expectedChildren.length}</div>
            <div className="text-sm text-blue-600">Expected</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
            <div className="text-2xl font-bold text-green-700">{presentChildren.length}</div>
            <div className="text-sm text-green-600">Present</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto text-orange-600 mb-2" />
            <div className="text-2xl font-bold text-orange-700">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-sm text-orange-600">Current Time</div>
          </CardContent>
        </Card>
      </div>

      {/* Last Action Feedback */}
      {lastAction && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">
                {lastAction.child} has been {lastAction.action === 'check-in' ? 'checked in' : 'checked out'} successfully
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Quick Check-In/Out
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Type child's name for quick action..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg"
              autoFocus
            />
          </div>

          {/* Quick Action Results */}
          {searchTerm && filteredChildren.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredChildren.slice(0, 5).map((child) => (
                <div key={child.id} className="flex items-center justify-between p-4 border rounded-lg bg-white hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {child.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-lg">{child.name}</p>
                      <p className="text-sm text-gray-600">{child.age} • {child.guardian}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {child.status === 'absent' && (
                      <Button 
                        onClick={() => handleQuickAction('check-in', child)}
                        className="bg-green-600 hover:bg-green-700 h-12 px-6"
                        size="lg"
                      >
                        <LogIn className="w-5 h-5 mr-2" />
                        Check In
                      </Button>
                    )}
                    {child.status === 'present' && (
                      <Button 
                        onClick={() => handleQuickAction('check-out', child)}
                        className="bg-blue-600 hover:bg-blue-700 h-12 px-6"
                        size="lg"
                      >
                        <LogOut className="w-5 h-5 mr-2" />
                        Check Out
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {searchTerm && filteredChildren.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <User className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No children found matching "{searchTerm}"</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Access Lists */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Expected Arrivals */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-blue-700">Expected Arrivals ({expectedChildren.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {expectedChildren.map((child) => (
                <div key={child.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-blue-50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {child.name.split(' ')[0][0]}
                    </div>
                    <div>
                      <p className="font-medium">{child.name}</p>
                      <p className="text-xs text-gray-600">{child.expectedPickupTime && `Expected: ${child.expectedPickupTime}`}</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleQuickAction('check-in', child)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <LogIn className="w-4 h-4 mr-1" />
                    In
                  </Button>
                </div>
              ))}
              {expectedChildren.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">All expected children are checked in!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Present Children */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-green-700">Present Children ({presentChildren.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {presentChildren.map((child) => (
                <div key={child.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-green-50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {child.name.split(' ')[0][0]}
                    </div>
                    <div>
                      <p className="font-medium">{child.name}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-600">In: {child.checkInTime}</p>
                        <Badge variant="outline" className="text-xs">{child.currentLocation}</Badge>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleQuickAction('check-out', child)}
                    size="sm"
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Out
                  </Button>
                </div>
              ))}
              {presentChildren.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No children are currently checked in</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickCheckInOut;
