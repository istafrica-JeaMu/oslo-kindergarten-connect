
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  Search,
  Phone,
  Calendar,
  AlertTriangle,
  FileText,
  Clock
} from 'lucide-react';
import { useState } from 'react';

const EducatorChildren = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const children = [
    {
      id: '1',
      name: 'Emma Larsen',
      age: '3 years',
      guardian: 'Anna Larsen',
      phone: '+47 123 45 678',
      room: 'Sunshine Room',
      allergies: ['Nuts'],
      status: 'active',
      enrollmentDate: '2024-08-15'
    },
    {
      id: '2',
      name: 'Oliver Hansen',
      age: '4 years',
      guardian: 'Erik Hansen',
      phone: '+47 987 65 432',
      room: 'Rainbow Group',
      allergies: [],
      status: 'active',
      enrollmentDate: '2024-09-01'
    },
    {
      id: '3',
      name: 'Lucas Berg',
      age: '5 years',
      guardian: 'Maria Berg',
      phone: '+47 777 88 999',
      room: 'Adventure Group',
      allergies: ['Dairy'],
      status: 'active',
      enrollmentDate: '2024-07-20'
    }
  ];

  const filteredChildren = children.filter(child =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.guardian.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Children Overview</h1>
          <p className="text-slate-600 mt-1">Manage and view all children in your care</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Export List
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search children or guardians..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-oslo-blue">{children.length}</p>
                <p className="text-sm text-slate-600">Total Children</p>
              </div>
              <Users className="w-8 h-8 text-oslo-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">3</p>
                <p className="text-sm text-slate-600">Active Today</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-600">2</p>
                <p className="text-sm text-slate-600">With Allergies</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">3</p>
                <p className="text-sm text-slate-600">Different Rooms</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Children List */}
      <div className="grid gap-4">
        {filteredChildren.map((child) => (
          <Card key={child.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{child.name}</h3>
                    <Badge variant="outline">{child.age}</Badge>
                    {child.allergies.length > 0 && (
                      <Badge variant="destructive" className="bg-red-100 text-red-800">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Allergies
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600">
                    <div>
                      <p className="font-medium">Guardian</p>
                      <p>{child.guardian}</p>
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {child.phone}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Room</p>
                      <p>{child.room}</p>
                    </div>
                    <div>
                      <p className="font-medium">Enrolled</p>
                      <p className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(child.enrollmentDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {child.allergies.length > 0 && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm font-medium text-red-800">Allergies:</p>
                      <p className="text-sm text-red-700">{child.allergies.join(', ')}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  <Button size="sm">View Details</Button>
                  <Button size="sm" variant="outline">Edit Info</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EducatorChildren;
