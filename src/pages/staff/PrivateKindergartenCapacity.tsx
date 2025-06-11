
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Settings, 
  TrendingUp,
  Building,
  Calendar,
  PlusCircle,
  MinusCircle,
  AlertTriangle,
  CheckCircle,
  Edit,
  Save,
  X
} from 'lucide-react';

const PrivateKindergartenCapacity = () => {
  const [editingAgeGroup, setEditingAgeGroup] = useState<string | null>(null);
  const [tempCapacity, setTempCapacity] = useState<number>(0);

  const ageGroups = [
    {
      id: 'toddlers',
      name: 'Toddlers (0-2 years)',
      currentCapacity: 15,
      maxCapacity: 20,
      enrolled: 12,
      waitingList: 8,
      avgRatio: '1:3',
      room: 'Sunshine Room'
    },
    {
      id: 'preschool',
      name: 'Preschool (3-4 years)',
      currentCapacity: 25,
      maxCapacity: 30,
      enrolled: 23,
      waitingList: 15,
      avgRatio: '1:5',
      room: 'Rainbow Group'
    },
    {
      id: 'kindergarten',
      name: 'Kindergarten (5+ years)',
      currentCapacity: 20,
      maxCapacity: 25,
      enrolled: 18,
      waitingList: 5,
      avgRatio: '1:6',
      room: 'Adventure Group'
    }
  ];

  const monthlyEnrollment = [
    { month: 'January', enrolled: 45, capacity: 60, applications: 12 },
    { month: 'February', enrolled: 48, capacity: 60, applications: 8 },
    { month: 'March', enrolled: 52, capacity: 60, applications: 15 },
    { month: 'April', enrolled: 55, capacity: 60, applications: 18 },
    { month: 'May', enrolled: 53, capacity: 60, applications: 10 },
    { month: 'June', enrolled: 53, capacity: 60, applications: 28 }
  ];

  const totalStats = {
    totalCapacity: ageGroups.reduce((sum, group) => sum + group.currentCapacity, 0),
    totalEnrolled: ageGroups.reduce((sum, group) => sum + group.enrolled, 0),
    totalWaitingList: ageGroups.reduce((sum, group) => sum + group.waitingList, 0),
    occupancyRate: Math.round((ageGroups.reduce((sum, group) => sum + group.enrolled, 0) / ageGroups.reduce((sum, group) => sum + group.currentCapacity, 0)) * 100)
  };

  const handleEditCapacity = (ageGroupId: string, currentCapacity: number) => {
    setEditingAgeGroup(ageGroupId);
    setTempCapacity(currentCapacity);
  };

  const handleSaveCapacity = (ageGroupId: string) => {
    console.log('Saving capacity for', ageGroupId, ':', tempCapacity);
    setEditingAgeGroup(null);
    // Implementation for saving capacity changes
  };

  const handleCancelEdit = () => {
    setEditingAgeGroup(null);
    setTempCapacity(0);
  };

  const getCapacityStatus = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 90) return { color: 'text-red-600', status: 'Critical' };
    if (percentage >= 75) return { color: 'text-orange-600', status: 'High' };
    if (percentage >= 50) return { color: 'text-yellow-600', status: 'Medium' };
    return { color: 'text-green-600', status: 'Low' };
  };

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-orange-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Capacity Management</h1>
          <p className="text-slate-600 mt-1">Monitor and manage kindergarten capacity and enrollment</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-sm">
            {totalStats.occupancyRate}% Occupancy Rate
          </Badge>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-800">{totalStats.totalCapacity}</p>
                <p className="text-sm text-blue-600">Total Capacity</p>
              </div>
              <Building className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-800">{totalStats.totalEnrolled}</p>
                <p className="text-sm text-green-600">Current Enrolled</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-800">{totalStats.totalWaitingList}</p>
                <p className="text-sm text-purple-600">Waiting List</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-800">{totalStats.occupancyRate}%</p>
                <p className="text-sm text-orange-600">Occupancy Rate</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="age-groups" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="age-groups">Age Groups</TabsTrigger>
          <TabsTrigger value="trends">Enrollment Trends</TabsTrigger>
          <TabsTrigger value="settings">Capacity Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="age-groups" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Age Group Capacity Overview
              </CardTitle>
              <CardDescription>
                Monitor capacity and enrollment by age group
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {ageGroups.map((group) => {
                  const occupancyPercentage = Math.round((group.enrolled / group.currentCapacity) * 100);
                  const status = getCapacityStatus(group.enrolled, group.currentCapacity);
                  
                  return (
                    <div key={group.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{group.name}</h3>
                          <p className="text-sm text-slate-600">{group.room}</p>
                          <p className="text-sm text-slate-500">Staff Ratio: {group.avgRatio}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${status.color} bg-transparent border-current`}>
                            {status.status} Utilization
                          </Badge>
                          {editingAgeGroup === group.id ? (
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleSaveCapacity(group.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Save className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelEdit}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditCapacity(group.id, group.currentCapacity)}
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 border rounded-lg bg-blue-50">
                          {editingAgeGroup === group.id ? (
                            <Input
                              type="number"
                              value={tempCapacity}
                              onChange={(e) => setTempCapacity(parseInt(e.target.value) || 0)}
                              className="text-center font-bold text-blue-800 bg-transparent border-none"
                            />
                          ) : (
                            <p className="text-2xl font-bold text-blue-800">{group.currentCapacity}</p>
                          )}
                          <p className="text-sm text-blue-600">Current Capacity</p>
                        </div>
                        <div className="text-center p-3 border rounded-lg bg-green-50">
                          <p className="text-2xl font-bold text-green-800">{group.enrolled}</p>
                          <p className="text-sm text-green-600">Enrolled</p>
                        </div>
                        <div className="text-center p-3 border rounded-lg bg-orange-50">
                          <p className="text-2xl font-bold text-orange-800">{group.waitingList}</p>
                          <p className="text-sm text-orange-600">Waiting List</p>
                        </div>
                        <div className="text-center p-3 border rounded-lg bg-purple-50">
                          <p className="text-2xl font-bold text-purple-800">{occupancyPercentage}%</p>
                          <p className="text-sm text-purple-600">Occupancy</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Capacity Utilization</span>
                          <span className="font-medium">{occupancyPercentage}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-300 ${getOccupancyColor(occupancyPercentage)}`}
                            style={{ width: `${Math.min(occupancyPercentage, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>0</span>
                          <span>{group.currentCapacity} max</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Enrollment Trends
              </CardTitle>
              <CardDescription>
                Monthly enrollment and application patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyEnrollment.map((month, index) => {
                  const occupancyRate = Math.round((month.enrolled / month.capacity) * 100);
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-20">
                          <p className="font-medium text-slate-900">{month.month}</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div>
                            <p className="text-sm text-slate-600">Enrolled</p>
                            <p className="font-semibold text-slate-900">{month.enrolled}/{month.capacity}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Applications</p>
                            <p className="font-semibold text-slate-900">{month.applications}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32">
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getOccupancyColor(occupancyRate)}`}
                              style={{ width: `${occupancyRate}%` }}
                            ></div>
                          </div>
                        </div>
                        <Badge variant="outline">{occupancyRate}%</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Capacity Settings
              </CardTitle>
              <CardDescription>
                Configure capacity limits and enrollment settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Global Settings</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-slate-700">Maximum Total Capacity</label>
                        <Input type="number" defaultValue="75" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Waiting List Limit</label>
                        <Input type="number" defaultValue="50" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Auto-Accept Threshold</label>
                        <Select defaultValue="80">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="70">70% Capacity</SelectItem>
                            <SelectItem value="80">80% Capacity</SelectItem>
                            <SelectItem value="90">90% Capacity</SelectItem>
                            <SelectItem value="manual">Manual Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Notification Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">Capacity warning at 85%</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">Daily enrollment reports</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">Weekly capacity analysis</span>
                        <input type="checkbox" className="w-4 h-4 text-purple-600 rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">Auto-notify on waitlist changes</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">Save Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PrivateKindergartenCapacity;
