
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  School, 
  Search, 
  Plus, 
  MapPin, 
  Users, 
  Clock, 
  Edit, 
  Eye,
  Settings,
  AlertTriangle,
  CheckCircle,
  Filter,
  MoreHorizontal
} from 'lucide-react';

const KindergartenManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const kindergartens = [
    {
      id: 'kg-001',
      name: 'Sentrum Barnehage',
      address: 'Storgata 123, Oslo',
      type: 'Municipal',
      capacity: { total: 125, occupied: 120, ageGroup1to2: 45, ageGroup3to5: 75 },
      status: 'Active',
      acceptingApplications: true,
      services: ['Extended Hours', 'Meals', 'Special Needs'],
      director: 'Kari Andersen'
    },
    {
      id: 'kg-002',
      name: 'Nordre Barnehage',
      address: 'Nordreveien 45, Oslo',
      type: 'Municipal',
      capacity: { total: 110, occupied: 98, ageGroup1to2: 40, ageGroup3to5: 58 },
      status: 'Active',
      acceptingApplications: true,
      services: ['Extended Hours', 'Meals'],
      director: 'Lars Olsen'
    },
    {
      id: 'kg-003',
      name: 'Private Kids AS',
      address: 'Privveien 12, Oslo',
      type: 'Private',
      capacity: { total: 90, occupied: 85, ageGroup1to2: 35, ageGroup3to5: 50 },
      status: 'Active',
      acceptingApplications: false,
      services: ['Extended Hours', 'Meals', 'Language Programs'],
      director: 'Silje Nordahl'
    },
    {
      id: 'kg-004',
      name: 'Søndre Barnehage',
      address: 'Sørveien 78, Oslo',
      type: 'Municipal',
      capacity: { total: 100, occupied: 102, ageGroup1to2: 42, ageGroup3to5: 60 },
      status: 'Active',
      acceptingApplications: false,
      services: ['Extended Hours', 'Meals'],
      director: 'Maria Hansen'
    }
  ];

  const filteredKindergartens = kindergartens.filter(kg => {
    const matchesSearch = kg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kg.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || kg.type.toLowerCase() === selectedType;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'accepting' && kg.acceptingApplications) ||
                         (selectedStatus === 'not-accepting' && !kg.acceptingApplications) ||
                         (selectedStatus === 'over-capacity' && kg.capacity.occupied > kg.capacity.total);
    return matchesSearch && matchesType && matchesStatus;
  });

  const getCapacityStatus = (capacity: any) => {
    const percentage = (capacity.occupied / capacity.total) * 100;
    if (percentage >= 100) return { status: 'over', color: 'text-red-600', bgColor: 'bg-red-100' };
    if (percentage >= 90) return { status: 'high', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    if (percentage >= 75) return { status: 'medium', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { status: 'good', color: 'text-green-600', bgColor: 'bg-green-100' };
  };

  const getCapacityPercentage = (capacity: any) => {
    return Math.min((capacity.occupied / capacity.total) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Kindergarten Management</h1>
          <p className="text-slate-600 mt-2">Configure and manage all kindergartens in your district</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Bulk Actions
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Kindergarten
          </Button>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Kindergartens</p>
                <p className="text-2xl font-bold text-slate-900">{kindergartens.length}</p>
              </div>
              <School className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Accepting Applications</p>
                <p className="text-2xl font-bold text-green-600">{kindergartens.filter(k => k.acceptingApplications).length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Over Capacity</p>
                <p className="text-2xl font-bold text-red-600">{kindergartens.filter(k => k.capacity.occupied > k.capacity.total).length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Children</p>
                <p className="text-2xl font-bold text-slate-900">{kindergartens.reduce((sum, k) => sum + k.capacity.occupied, 0)}</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search kindergartens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant={selectedType === 'all' ? 'default' : 'outline'} 
                onClick={() => setSelectedType('all')}
                size="sm"
              >
                All Types
              </Button>
              <Button 
                variant={selectedType === 'municipal' ? 'default' : 'outline'} 
                onClick={() => setSelectedType('municipal')}
                size="sm"
              >
                Municipal
              </Button>
              <Button 
                variant={selectedType === 'private' ? 'default' : 'outline'} 
                onClick={() => setSelectedType('private')}
                size="sm"
              >
                Private
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant={selectedStatus === 'all' ? 'default' : 'outline'} 
                onClick={() => setSelectedStatus('all')}
                size="sm"
              >
                All Status
              </Button>
              <Button 
                variant={selectedStatus === 'accepting' ? 'default' : 'outline'} 
                onClick={() => setSelectedStatus('accepting')}
                size="sm"
              >
                Accepting
              </Button>
              <Button 
                variant={selectedStatus === 'over-capacity' ? 'default' : 'outline'} 
                onClick={() => setSelectedStatus('over-capacity')}
                size="sm"
              >
                Over Capacity
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Improved Kindergartens Grid */}
      <div className="grid gap-4">
        {filteredKindergartens.map((kg) => {
          const capacityStatus = getCapacityStatus(kg.capacity);
          const capacityPercentage = getCapacityPercentage(kg.capacity);
          
          return (
            <Card key={kg.id} className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                {/* Header Section */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold ${
                      kg.type === 'Municipal' ? 'bg-blue-500' : 'bg-purple-500'
                    }`}>
                      {kg.name.split(' ')[0][0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-slate-900">{kg.name}</h3>
                        <Badge variant="outline">{kg.type}</Badge>
                        <Badge variant={kg.status === 'Active' ? 'default' : 'secondary'}>
                          {kg.status}
                        </Badge>
                      </div>
                      <p className="text-slate-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {kg.address}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">Director: {kg.director}</p>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-600">Applications</span>
                      <Switch checked={kg.acceptingApplications} />
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Capacity Section with Visual Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Capacity Overview</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${capacityStatus.color} ${capacityStatus.bgColor}`}>
                      {kg.capacity.occupied}/{kg.capacity.total} ({Math.round(capacityPercentage)}%)
                    </div>
                  </div>
                  <Progress 
                    value={capacityPercentage} 
                    className={`h-2 ${capacityPercentage >= 100 ? '[&>div]:bg-red-500' : capacityPercentage >= 90 ? '[&>div]:bg-orange-500' : '[&>div]:bg-green-500'}`}
                  />
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="text-center p-2 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600 font-medium">Age 1-2</p>
                      <p className="text-lg font-bold text-blue-900">{kg.capacity.ageGroup1to2}</p>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600 font-medium">Age 3-5</p>
                      <p className="text-lg font-bold text-green-900">{kg.capacity.ageGroup3to5}</p>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-slate-600 mb-2">Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {kg.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredKindergartens.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <School className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No kindergartens found</h3>
            <p className="text-slate-600">Try adjusting your search criteria or add a new kindergarten.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KindergartenManagement;
