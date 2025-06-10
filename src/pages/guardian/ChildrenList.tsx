
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Home, User, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChildrenList = () => {
  // Mock data for children
  const children = [
    {
      id: 'emma',
      name: 'Emma Hansen',
      age: 4,
      group: 'Blue Group',
      status: 'Active',
      avatar: '',
      kindergarten: 'Rainbow Kindergarten',
      startDate: 'August 2023'
    },
    {
      id: 'lucas',
      name: 'Lucas Hansen',
      age: 3,
      group: 'Red Group', 
      status: 'Active',
      avatar: '',
      kindergarten: 'Rainbow Kindergarten',
      startDate: 'January 2024'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2">
        <Home className="h-4 w-4" />
        <Link to="/guardian" className="text-sm font-medium text-gray-700 hover:text-gray-900">
          Dashboard
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-sm font-medium text-gray-900">Children</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">My Children</h1>
        <p className="text-muted-foreground">Select a child to view their profile and information</p>
      </div>

      {/* Children List */}
      <div className="grid gap-4 md:grid-cols-2">
        {children.map((child) => (
          <Link key={child.id} to={`/guardian/child-profile/${child.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-oslo-blue/20">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={child.avatar} alt={child.name} />
                    <AvatarFallback className="bg-oslo-blue text-white text-lg">
                      {child.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{child.name}</CardTitle>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <CardDescription className="text-base">
                      Age {child.age} • {child.group}
                    </CardDescription>
                    <Badge variant="secondary" className="mt-1">
                      {child.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{child.kindergarten}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Started {child.startDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChildrenList;
