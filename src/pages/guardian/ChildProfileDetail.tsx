
import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, FileText, Calendar, CheckCircle, Home as HomeIcon, FileCheck, Users } from 'lucide-react';

const ChildProfileDetail = () => {
  const { childId } = useParams();
  const location = useLocation();
  
  // Get current tab from URL
  const currentPath = location.pathname;
  const getCurrentTab = () => {
    if (currentPath.includes('/application-details')) return 'application-details';
    if (currentPath.includes('/attendance')) return 'attendance';
    if (currentPath.includes('/consents')) return 'consents';
    if (currentPath.includes('/living-arrangements')) return 'living-arrangements';
    if (currentPath.includes('/documents')) return 'documents';
    if (currentPath.includes('/contacts')) return 'contacts';
    return 'overview';
  };

  // Mock child data
  const child = {
    id: childId,
    name: childId === 'emma' ? 'Emma Hansen' : 'Lucas Hansen',
    age: childId === 'emma' ? 4 : 3,
    group: childId === 'emma' ? 'Blue Group' : 'Red Group',
    status: 'Active',
    avatar: '',
    kindergarten: 'Rainbow Kindergarten'
  };

  const navigationItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: User,
      path: `/guardian/child-profile/${childId}`
    },
    {
      id: 'application-details', 
      label: 'Application Details',
      icon: FileText,
      path: `/guardian/child-profile/${childId}/application-details`
    },
    {
      id: 'attendance',
      label: 'Attendance', 
      icon: Calendar,
      path: `/guardian/child-profile/${childId}/attendance`
    },
    {
      id: 'consents',
      label: 'Consents',
      icon: CheckCircle,
      path: `/guardian/child-profile/${childId}/consents`
    },
    {
      id: 'living-arrangements',
      label: 'Living Arrangements', 
      icon: HomeIcon,
      path: `/guardian/child-profile/${childId}/living-arrangements`
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileCheck,
      path: `/guardian/child-profile/${childId}/documents`
    },
    {
      id: 'contacts',
      label: 'Contacts',
      icon: Users,
      path: `/guardian/child-profile/${childId}/contacts`
    }
  ];

  const renderOverviewContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Child's basic details and kindergarten information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <p className="text-sm text-gray-900">{child.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Age</label>
              <p className="text-sm text-gray-900">{child.age} years old</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Group</label>
              <p className="text-sm text-gray-900">{child.group}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <Badge variant="secondary">{child.status}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Living Arrangements</CardTitle>
          <CardDescription>Primary address and custody information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Primary Address</label>
              <p className="text-sm text-gray-900">Pilestredet 42, 0167 Oslo</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Guardians</label>
              <div className="space-y-2 mt-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-900">Anna Hansen (Mother)</span>
                  <Badge variant="outline">Primary</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-900">Erik Hansen (Father)</span>
                  <Badge variant="outline">Secondary</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPlaceholderContent = (title: string) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>This section is coming soon</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Content for {title} will be available here.</p>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    const currentTab = getCurrentTab();
    
    switch (currentTab) {
      case 'overview':
        return renderOverviewContent();
      case 'application-details':
        return renderPlaceholderContent('Application Details');
      case 'attendance':
        return renderPlaceholderContent('Attendance');
      case 'consents':
        return renderPlaceholderContent('Consents');
      case 'living-arrangements':
        return renderPlaceholderContent('Living Arrangements');
      case 'documents':
        return renderPlaceholderContent('Documents');
      case 'contacts':
        return renderPlaceholderContent('Contacts');
      default:
        return renderOverviewContent();
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center space-x-2">
        <Link to="/guardian/children" className="flex items-center space-x-2 text-oslo-blue hover:text-oslo-blue/80">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Children</span>
        </Link>
      </div>

      {/* Child Header */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={child.avatar} alt={child.name} />
            <AvatarFallback className="bg-oslo-blue text-white text-xl">
              {child.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold">{child.name}</h1>
            <p className="text-gray-600">{child.group} • Age {child.age}</p>
            <Badge className="mt-1">{child.status}</Badge>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Child Profile</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = getCurrentTab() === item.id;
                  
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-oslo-blue text-white'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ChildProfileDetail;
