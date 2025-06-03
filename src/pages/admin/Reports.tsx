
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  FileText,
  TrendingUp,
  Users,
  Building,
  AlertTriangle,
  Eye,
  Filter
} from 'lucide-react';

const Reports = () => {
  const { t } = useTranslation();
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState('month');
  const [district, setDistrict] = useState('all');

  // Mock report data
  const reportTypes = [
    {
      id: 'applications-status',
      name: 'Applications by Status',
      description: 'Overview of application statuses over time',
      category: 'Applications',
      lastGenerated: '2024-03-18',
      icon: FileText
    },
    {
      id: 'placement-rates',
      name: 'Placement Response Rates',
      description: 'Success rates for placement offers',
      category: 'Placements',
      lastGenerated: '2024-03-17',
      icon: TrendingUp
    },
    {
      id: 'capacity-utilization',
      name: 'Kindergarten Capacity',
      description: 'Capacity utilization by kindergarten and district',
      category: 'Capacity',
      lastGenerated: '2024-03-16',
      icon: Building
    },
    {
      id: 'financial-overview',
      name: 'Financial Overview',
      description: 'Invoice and payment reporting',
      category: 'Finance',
      lastGenerated: '2024-03-15',
      icon: BarChart3
    },
    {
      id: 'compliance-audit',
      name: 'GDPR Compliance',
      description: 'Data processing and retention compliance',
      category: 'Compliance',
      lastGenerated: '2024-03-14',
      icon: AlertTriangle
    },
    {
      id: 'user-activity',
      name: 'User Activity Log',
      description: 'System usage and security audit',
      category: 'Security',
      lastGenerated: '2024-03-13',
      icon: Users
    }
  ];

  // Mock summary data
  const summaryStats = {
    totalReports: 156,
    reportsThisMonth: 23,
    avgGenerationTime: '2.3s',
    dataPoints: '1.2M'
  };

  const recentReports = [
    {
      name: 'Monthly Application Summary - March 2024',
      type: 'Applications',
      generatedBy: 'Admin User',
      date: '2024-03-18',
      size: '2.3 MB',
      format: 'PDF'
    },
    {
      name: 'Capacity Utilization - Q1 2024',
      type: 'Capacity',
      generatedBy: 'System',
      date: '2024-03-17',
      size: '1.8 MB',
      format: 'Excel'
    },
    {
      name: 'Financial Report - February 2024',
      type: 'Finance',
      generatedBy: 'Finance Team',
      date: '2024-03-15',
      size: '945 KB',
      format: 'PDF'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Applications':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Placements':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Capacity':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Finance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Compliance':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Security':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const generateReport = () => {
    if (!selectedReport) return;
    
    console.log('Generating report:', {
      reportId: selectedReport,
      dateRange,
      district
    });
    
    // Simulate report generation
    alert('Report generation started. You will receive an email when the report is ready.');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('admin.reports.title')}</h1>
        <p className="text-gray-600 mt-2">{t('admin.reports.description')}</p>
      </div>

      {/* Summary Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.totalReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-green-600">{summaryStats.reportsThisMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Generation</p>
                <p className="text-2xl font-bold text-purple-600">{summaryStats.avgGenerationTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Data Points</p>
                <p className="text-2xl font-bold text-orange-600">{summaryStats.dataPoints}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Generator */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-oslo-blue/10 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-oslo-blue" />
            </div>
            Generate New Report
          </CardTitle>
          <CardDescription>
            Create custom reports with specific parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((report) => (
                    <SelectItem key={report.id} value={report.id}>
                      {report.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Select value={district} onValueChange={setDistrict}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  <SelectItem value="frogner">Frogner</SelectItem>
                  <SelectItem value="grunerløkka">Grünerløkka</SelectItem>
                  <SelectItem value="sagene">Sagene</SelectItem>
                  <SelectItem value="sondre-nordstrand">Søndre Nordstrand</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={generateReport}
                disabled={!selectedReport}
                className="w-full bg-oslo-blue hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Report Types */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
            Available Report Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTypes.map((report) => (
              <div
                key={report.id}
                className="p-4 border border-gray-200 rounded-xl hover:border-oslo-blue/30 hover:bg-gray-50/50 transition-all cursor-pointer"
                onClick={() => setSelectedReport(report.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-oslo-blue/10 rounded-xl flex items-center justify-center">
                    <report.icon className="h-5 w-5 text-oslo-blue" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{report.name}</h4>
                      <Badge variant="outline" className={getCategoryColor(report.category)}>
                        {report.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Last generated: {report.lastGenerated}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            Recent Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{report.name}</h4>
                    <p className="text-sm text-gray-600">
                      Generated by {report.generatedBy} • {report.date}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <Badge variant="outline" className={getCategoryColor(report.type)}>
                        {report.type}
                      </Badge>
                      <span className="text-xs text-gray-500">{report.size} • {report.format}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
