
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  FileText, 
  Download, 
  Calendar, 
  Users, 
  TrendingUp,
  Activity,
  Clock,
  AlertTriangle
} from 'lucide-react';

const EducatorReports = () => {
  const [reportType, setReportType] = useState('attendance');
  const [timeRange, setTimeRange] = useState('week');

  // Mock data for charts
  const attendanceData = [
    { day: 'Mon', present: 22, absent: 2, total: 24 },
    { day: 'Tue', present: 20, absent: 4, total: 24 },
    { day: 'Wed', present: 23, absent: 1, total: 24 },
    { day: 'Thu', present: 21, absent: 3, total: 24 },
    { day: 'Fri', present: 19, absent: 5, total: 24 },
  ];

  const monthlyTrends = [
    { month: 'Jan', attendance: 89, incidents: 2 },
    { month: 'Feb', attendance: 92, incidents: 1 },
    { month: 'Mar', attendance: 87, incidents: 4 },
    { month: 'Apr', attendance: 91, incidents: 2 },
    { month: 'May', attendance: 88, incidents: 3 },
    { month: 'Jun', attendance: 94, incidents: 1 },
  ];

  const statusDistribution = [
    { name: 'Present', value: 18, color: '#10B981' },
    { name: 'Absent', value: 4, color: '#EF4444' },
    { name: 'On Leave', value: 2, color: '#F59E0B' },
  ];

  const childrenStats = [
    { name: 'Emma Larsen', attendance: 95, notes: 12, incidents: 0 },
    { name: 'Oliver Hansen', attendance: 87, notes: 8, incidents: 1 },
    { name: 'Lucas Berg', attendance: 92, notes: 15, incidents: 0 },
    { name: 'Maja Andersen', attendance: 89, notes: 10, incidents: 2 },
  ];

  const generateReport = (type: string) => {
    console.log('Generating report:', type);
    // Handle report generation
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-600 mt-1">Track attendance, activities, and generate comprehensive reports</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => generateReport(reportType)}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">92%</p>
                <p className="text-sm text-gray-600">Avg Attendance</p>
              </div>
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">24</p>
                <p className="text-sm text-gray-600">Total Children</p>
              </div>
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-600">45</p>
                <p className="text-sm text-gray-600">Notes This Week</p>
              </div>
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600">3</p>
                <p className="text-sm text-gray-600">Incidents</p>
              </div>
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Tabs */}
      <Tabs value={reportType} onValueChange={setReportType} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="individual">Individual</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Attendance This Week</CardTitle>
                <CardDescription>Present vs Absent children by day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="present" fill="#10B981" name="Present" />
                    <Bar dataKey="absent" fill="#EF4444" name="Absent" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Status Distribution</CardTitle>
                <CardDescription>Today's attendance breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Attendance Trends</CardTitle>
              <CardDescription>Attendance percentage over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="attendance" stroke="#10B981" strokeWidth={2} name="Attendance %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Participation</CardTitle>
              <CardDescription>Weekly activity engagement levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { activity: 'Outdoor Play', participation: 95, children: 23 },
                  { activity: 'Art & Crafts', participation: 87, children: 21 },
                  { activity: 'Story Time', participation: 100, children: 24 },
                  { activity: 'Music & Movement', participation: 79, children: 19 },
                  { activity: 'Free Play', participation: 92, children: 22 },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{activity.activity}</h4>
                      <p className="text-sm text-gray-600">{activity.children} children participated</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">{activity.participation}%</p>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${activity.participation}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="individual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Individual Child Statistics</CardTitle>
              <CardDescription>Performance metrics for each child</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {childrenStats.map((child, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{child.name}</h4>
                      <div className="flex gap-2">
                        <Badge variant="outline">{child.attendance}% attendance</Badge>
                        <Badge variant="outline">{child.notes} notes</Badge>
                        {child.incidents > 0 && (
                          <Badge variant="destructive">{child.incidents} incidents</Badge>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Attendance Rate</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${child.attendance}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600">Documentation</p>
                        <p className="font-medium">{child.notes} notes recorded</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Behavior</p>
                        <p className={`font-medium ${child.incidents === 0 ? 'text-green-600' : 'text-orange-600'}`}>
                          {child.incidents === 0 ? 'Excellent' : `${child.incidents} incidents`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Summary Report</CardTitle>
              <CardDescription>Comprehensive overview of the week's activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Attendance Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Average attendance:</span>
                      <span className="font-medium text-green-600">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Best day:</span>
                      <span className="font-medium">Wednesday (96%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Most absences:</span>
                      <span className="font-medium">Friday (5 children)</span>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-lg pt-4">Activities Highlights</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Most popular activity:</span>
                      <span className="font-medium">Story Time (100%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>New activities tried:</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average participation:</span>
                      <span className="font-medium">90%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Documentation & Notes</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total notes recorded:</span>
                      <span className="font-medium">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Behavior observations:</span>
                      <span className="font-medium">28</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Learning milestones:</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Incident reports:</span>
                      <span className="font-medium">3</span>
                    </div>
                  </div>

                  <h4 className="font-semibold text-lg pt-4">Communication</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Messages sent:</span>
                      <span className="font-medium">32</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Parent meetings:</span>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Response rate:</span>
                      <span className="font-medium text-green-600">95%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Action Items & Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                  <h5 className="font-medium">Follow up required:</h5>
                  <p className="text-sm text-gray-600 mt-1">Oliver Hansen has had 3 absences this week. Consider reaching out to guardian.</p>
                </div>
                <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                  <h5 className="font-medium">Positive trend:</h5>
                  <p className="text-sm text-gray-600 mt-1">Maja Andersen has shown significant improvement in social interactions.</p>
                </div>
                <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                  <h5 className="font-medium">Achievement:</h5>
                  <p className="text-sm text-gray-600 mt-1">Story Time had 100% participation this week - consider expanding reading activities.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducatorReports;
