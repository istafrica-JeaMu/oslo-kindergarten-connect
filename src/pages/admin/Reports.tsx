
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Download, BarChart3, FileText, Calendar, TrendingUp, Users, Building } from 'lucide-react';

const Reports = () => {
  // Mock report data
  const availableReports = [
    {
      id: 'monthly-summary',
      name: 'Monthly Summary',
      description: 'Overview of applications, placements and capacity',
      category: 'summary',
      lastGenerated: '2024-03-15',
      format: ['PDF', 'Excel'],
      frequency: 'monthly'
    },
    {
      id: 'basil-report',
      name: 'BASIL Report',
      description: 'Mandatory report to the Directorate of Education',
      category: 'compliance',
      lastGenerated: '2024-03-01',
      format: ['XML', 'PDF'],
      frequency: 'quarterly',
      required: true
    },
    {
      id: 'capacity-analysis',
      name: 'Capacity Analysis',
      description: 'Detailed analysis of capacity utilization per district',
      category: 'analysis',
      lastGenerated: '2024-03-10',
      format: ['PDF', 'Excel'],
      frequency: 'weekly'
    },
    {
      id: 'financial-overview',
      name: 'Financial Overview',
      description: 'Fees, subsidies and financial status',
      category: 'financial',
      lastGenerated: '2024-03-12',
      format: ['Excel', 'PDF'],
      frequency: 'monthly'
    },
    {
      id: 'waiting-list-report',
      name: 'Waiting List Report',
      description: 'Status of waiting lists per kindergarten and district',
      category: 'operational',
      lastGenerated: '2024-03-18',
      format: ['PDF', 'Excel'],
      frequency: 'weekly'
    },
    {
      id: 'user-activity',
      name: 'User Activity',
      description: 'Log of user activity and system usage',
      category: 'system',
      lastGenerated: '2024-03-20',
      format: ['Excel', 'CSV'],
      frequency: 'daily'
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Monthly Summary - March 2024',
      generatedDate: '2024-03-20',
      size: '2.4 MB',
      format: 'PDF',
      downloads: 12
    },
    {
      id: 2,
      name: 'Capacity Analysis - Week 12',
      generatedDate: '2024-03-18',
      size: '1.8 MB',
      format: 'Excel',
      downloads: 8
    },
    {
      id: 3,
      name: 'BASIL Q1 2024',
      generatedDate: '2024-03-15',
      size: '845 KB',
      format: 'XML',
      downloads: 3
    }
  ];

  const reportStats = {
    totalReportsGenerated: 1247,
    thisMonth: 89,
    avgGenerationTime: '2.3',
    totalDownloads: 5643
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'compliance':
        return 'bg-red-100 text-red-800';
      case 'financial':
        return 'bg-green-100 text-green-800';
      case 'analysis':
        return 'bg-blue-100 text-blue-800';
      case 'operational':
        return 'bg-purple-100 text-purple-800';
      case 'system':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getFrequencyBadge = (frequency: string, required: boolean = false) => {
    if (required) {
      return <Badge variant="destructive">Required</Badge>;
    }
    
    switch (frequency) {
      case 'daily':
        return <Badge className="bg-blue-100 text-blue-800">Daily</Badge>;
      case 'weekly':
        return <Badge className="bg-green-100 text-green-800">Weekly</Badge>;
      case 'monthly':
        return <Badge className="bg-purple-100 text-purple-800">Monthly</Badge>;
      case 'quarterly':
        return <Badge className="bg-orange-100 text-orange-800">Quarterly</Badge>;
      default:
        return <Badge variant="outline">{frequency}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports and Analytics</h1>
        <p className="text-gray-600 mt-2">
          Generate reports and analyses of kindergarten data
        </p>
      </div>

      {/* Report Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <FileText className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <h3 className="font-semibold">Total Reports</h3>
              <p className="text-2xl font-bold text-blue-600">{reportStats.totalReportsGenerated}</p>
              <p className="text-xs text-gray-600">Generated this year</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Calendar className="h-8 w-8 text-purple-600 mr-4" />
            <div>
              <h3 className="font-semibold">This Month</h3>
              <p className="text-2xl font-bold text-purple-600">{reportStats.thisMonth}</p>
              <p className="text-xs text-gray-600">Reports generated</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <TrendingUp className="h-8 w-8 text-green-600 mr-4" />
            <div>
              <h3 className="font-semibold">Avg Generation Time</h3>
              <p className="text-2xl font-bold text-green-600">{reportStats.avgGenerationTime}s</p>
              <p className="text-xs text-gray-600">Generation time</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Download className="h-8 w-8 text-orange-600 mr-4" />
            <div>
              <h3 className="font-semibold">Downloads</h3>
              <p className="text-2xl font-bold text-orange-600">{reportStats.totalDownloads}</p>
              <p className="text-xs text-gray-600">Total downloads</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generate New Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Generate New Report
          </CardTitle>
          <CardDescription>
            Select report type and specify parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Report</label>
              <Select defaultValue="monthly-summary">
                <SelectTrigger>
                  <SelectValue placeholder="Select report" />
                </SelectTrigger>
                <SelectContent>
                  {availableReports.map((report) => (
                    <SelectItem key={report.id} value={report.id}>
                      {report.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Period</label>
              <Select defaultValue="this-month">
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-month">Current Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="this-quarter">Current Quarter</SelectItem>
                  <SelectItem value="last-quarter">Last Quarter</SelectItem>
                  <SelectItem value="year-to-date">Year to Date</SelectItem>
                  <SelectItem value="custom">Custom Period</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Format</label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="xml">XML (BASIL)</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">District</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  <SelectItem value="d1">Old Oslo</SelectItem>
                  <SelectItem value="d2">Grünerløkka</SelectItem>
                  <SelectItem value="d3">Sagene</SelectItem>
                  <SelectItem value="d4">St. Hanshaugen</SelectItem>
                  <SelectItem value="d5">Frogner</SelectItem>
                  <SelectItem value="d6">Ullern</SelectItem>
                  <SelectItem value="d7">Vestre Aker</SelectItem>
                  <SelectItem value="d8">Nordre Aker</SelectItem>
                  <SelectItem value="d9">Bjerke</SelectItem>
                  <SelectItem value="d10">Grorud</SelectItem>
                  <SelectItem value="d11">Stovner</SelectItem>
                  <SelectItem value="d12">Alna</SelectItem>
                  <SelectItem value="d13">Østensjø</SelectItem>
                  <SelectItem value="d14">Nordstrand</SelectItem>
                  <SelectItem value="d15">Søndre Nordstrand</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="bg-oslo-blue hover:bg-blue-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Available Reports
          </CardTitle>
          <CardDescription>
            Standard reports that can be generated
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableReports.map((report) => (
              <div key={report.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{report.name}</h4>
                    <Badge className={getCategoryColor(report.category)}>
                      {report.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{report.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Last generated: {report.lastGenerated} • 
                    Format: {report.format.join(', ')}
                  </p>
                </div>
                <div className="text-right mt-1 flex items-center gap-2">
                  {getFrequencyBadge(report.frequency, report.required)}
                  <Button size="sm" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recently Generated Reports
          </CardTitle>
          <CardDescription>
            Recent reports available for download
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{report.name}</h4>
                  <p className="text-sm text-gray-600">
                    Generated: {report.generatedDate} • {report.size} • {report.downloads} downloads
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download {report.format}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Advanced Analytics
          </CardTitle>
          <CardDescription>
            Advanced analyses for data-driven decision support
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold">Demographic Analysis</h4>
              </div>
              <p className="text-sm text-gray-600">
                Age and population analysis for long-term capacity planning
              </p>
              <Button className="mt-3 bg-blue-600 hover:bg-blue-700 w-full">
                Create Analysis
              </Button>
            </div>

            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Building className="h-5 w-5 text-purple-600" />
                <h4 className="font-semibold">Geographic Distribution</h4>
              </div>
              <p className="text-sm text-gray-600">
                Map analysis of kindergarten coverage and application patterns
              </p>
              <Button className="mt-3 bg-purple-600 hover:bg-purple-700 w-full">
                Create Analysis
              </Button>
            </div>

            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold">Predictions and Trends</h4>
              </div>
              <p className="text-sm text-gray-600">
                Predictive analysis of application patterns and capacity needs
              </p>
              <Button className="mt-3 bg-green-600 hover:bg-green-700 w-full">
                Create Analysis
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
