
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  MapPin,
  Users,
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock,
  Sunrise,
  Sun,
  Sunset
} from 'lucide-react';

interface ChildLocation {
  childId: string;
  childName: string;
  currentLocation: string;
  activity: string;
  timestamp: string;
  educator: string;
}

interface Location {
  id: string;
  name: string;
  capacity: number;
  currentCount: number;
  children: string[];
  supervisor: string;
  status: 'open' | 'full' | 'closed';
}

const ActivityLocationTracker = () => {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: 'classroom',
      name: 'Classroom',
      capacity: 15,
      currentCount: 8,
      children: ['Emma Larsen', 'Oliver Hansen', 'Lucas Berg', 'Maja Andersen', 'Anna Smith', 'Erik Jones', 'Maria Brown', 'Lars Wilson'],
      supervisor: 'Sarah Peterson',
      status: 'open'
    },
    {
      id: 'playground',
      name: 'Outdoor Playground',
      capacity: 20,
      currentCount: 12,
      children: ['John Doe', 'Jane Smith', 'Peter Parker', 'Mary Jane', 'Tony Stark', 'Steve Rogers', 'Natasha Romanoff', 'Bruce Banner', 'Thor Odinson', 'Clint Barton', 'Wanda Maximoff', 'Vision'],
      supervisor: 'Erik Larsen',
      status: 'open'
    },
    {
      id: 'artroom',
      name: 'Art Room',
      capacity: 10,
      currentCount: 5,
      children: ['Alice Wonder', 'Bob Builder', 'Charlie Brown', 'Diana Prince', 'Edward Elric'],
      supervisor: 'Maria Hansen',
      status: 'open'
    },
    {
      id: 'naproom',
      name: 'Nap Room',
      capacity: 8,
      currentCount: 8,
      children: ['Sleep1', 'Sleep2', 'Sleep3', 'Sleep4', 'Sleep5', 'Sleep6', 'Sleep7', 'Sleep8'],
      supervisor: 'Anna Nilsen',
      status: 'full'
    },
    {
      id: 'waterroom',
      name: 'Water Room',
      capacity: 6,
      currentCount: 0,
      children: [],
      supervisor: 'Per Olsen',
      status: 'closed'
    }
  ]);

  const [selectedChild, setSelectedChild] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');

  const activities = [
    'Free Play',
    'Structured Learning',
    'Outdoor Play',
    'Art & Crafts',
    'Music Time',
    'Story Time',
    'Meal Time',
    'Rest Time',
    'Water Play',
    'Physical Exercise'
  ];

  const allChildren = [
    'Emma Larsen', 'Oliver Hansen', 'Lucas Berg', 'Maja Andersen',
    'Anna Smith', 'Erik Jones', 'Maria Brown', 'Lars Wilson',
    'John Doe', 'Jane Smith', 'Peter Parker', 'Mary Jane'
  ];

  const handleMoveChild = () => {
    if (!selectedChild || !selectedLocation) return;

    setLocations(prev => prev.map(location => {
      // Remove child from current location
      const updatedChildren = location.children.filter(child => child !== selectedChild);
      
      if (location.id === selectedLocation) {
        // Add child to new location
        return {
          ...location,
          children: [...updatedChildren, selectedChild],
          currentCount: updatedChildren.length + 1
        };
      } else {
        // Remove from other locations
        return {
          ...location,
          children: updatedChildren,
          currentCount: updatedChildren.length
        };
      }
    }));

    setSelectedChild('');
    setSelectedLocation('');
    setSelectedActivity('');
  };

  const getStatusBadge = (location: Location) => {
    switch (location.status) {
      case 'open':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Open</Badge>;
      case 'full':
        return <Badge className="bg-yellow-100 text-yellow-800"><AlertTriangle className="w-3 h-3 mr-1" />Full</Badge>;
      case 'closed':
        return <Badge className="bg-red-100 text-red-800">Closed</Badge>;
      default:
        return <Badge variant="outline">{location.status}</Badge>;
    }
  };

  const getLocationIcon = (locationId: string) => {
    switch (locationId) {
      case 'playground':
        return <Sun className="w-5 h-5" />;
      case 'naproom':
        return <Sunset className="w-5 h-5" />;
      case 'waterroom':
        return <Activity className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const totalChildren = locations.reduce((sum, location) => sum + location.currentCount, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Activity & Location Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Quick Move Interface */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Move Child</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Select Child</label>
                  <Select value={selectedChild} onValueChange={setSelectedChild}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose child..." />
                    </SelectTrigger>
                    <SelectContent>
                      {allChildren.map((child) => (
                        <SelectItem key={child} value={child}>
                          {child}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">New Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose location..." />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem 
                          key={location.id} 
                          value={location.id}
                          disabled={location.status === 'full' || location.status === 'closed'}
                        >
                          {location.name} ({location.currentCount}/{location.capacity})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Activity</label>
                  <Select value={selectedActivity} onValueChange={setSelectedActivity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity..." />
                    </SelectTrigger>
                    <SelectContent>
                      {activities.map((activity) => (
                        <SelectItem key={activity} value={activity}>
                          {activity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleMoveChild} 
                  disabled={!selectedChild || !selectedLocation}
                  className="w-full"
                >
                  Move Child
                </Button>
              </CardContent>
            </Card>

            {/* Overview Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{totalChildren}</div>
                    <div className="text-sm text-gray-600">Total Children Present</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Active Locations:</span>
                      <span className="text-sm font-medium">
                        {locations.filter(l => l.status === 'open').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Full Locations:</span>
                      <span className="text-sm font-medium">
                        {locations.filter(l => l.status === 'full').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Available Capacity:</span>
                      <span className="text-sm font-medium">
                        {locations.reduce((sum, l) => sum + (l.capacity - l.currentCount), 0)}
                      </span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Emergency Roll Call
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Sunrise className="w-4 h-4 mr-2" />
                  Morning Assembly
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Sun className="w-4 h-4 mr-2" />
                  Outdoor Time
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  Meal Time Setup
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Sunset className="w-4 h-4 mr-2" />
                  Rest Time
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="w-4 h-4 mr-2" />
                  Activity Rotation
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Location Grid */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Location Status</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {locations.map((location) => (
                <Card key={location.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getLocationIcon(location.id)}
                        <CardTitle className="text-base">{location.name}</CardTitle>
                      </div>
                      {getStatusBadge(location)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">Capacity:</span>
                        </div>
                        <span className="font-medium">
                          {location.currentCount}/{location.capacity}
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            location.currentCount / location.capacity > 0.8 
                              ? 'bg-red-500' 
                              : location.currentCount / location.capacity > 0.6 
                              ? 'bg-yellow-500' 
                              : 'bg-green-500'
                          }`}
                          style={{ 
                            width: `${(location.currentCount / location.capacity) * 100}%` 
                          }}
                        />
                      </div>

                      <div className="text-xs text-gray-600">
                        Supervisor: {location.supervisor}
                      </div>

                      {location.children.length > 0 && (
                        <div className="space-y-1">
                          <div className="text-xs font-medium">Children:</div>
                          <div className="flex flex-wrap gap-1">
                            {location.children.slice(0, 3).map((child) => (
                              <Badge key={child} variant="outline" className="text-xs">
                                {child.split(' ')[0]}
                              </Badge>
                            ))}
                            {location.children.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{location.children.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLocationTracker;
