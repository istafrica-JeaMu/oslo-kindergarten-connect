
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  School, 
  Search, 
  Plus, 
  MapPin, 
  Users, 
  Clock, 
  Edit, 
  Eye,
  Settings
} from 'lucide-react';

const KindergartenManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

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
    }
  ];

  const filteredKindergartens = kindergartens.filter(kg => {
    const matchesSearch = kg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kg.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || kg.type.toLowerCase() === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Kindergarten Management</h1>
          <p className="text-slate-600 mt-2">Configure and manage all kindergartens in your district</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Kindergarten
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
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
            <div className="flex gap-2">
              <Button 
                variant={selectedType === 'all' ? 'default' : 'outline'} 
                onClick={() => setSelectedType('all')}
              >
                All Types
              </Button>
              <Button 
                variant={selectedType === 'municipal' ? 'default' : 'outline'} 
                onClick={() => setSelectedType('municipal')}
              >
                Municipal
              </Button>
              <Button 
                variant={selectedType === 'private' ? 'default' : 'outline'} 
                onClick={() => setSelectedType('private')}
              >
                Private
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kindergartens List */}
      <div className="grid gap-6">
        {filteredKindergartens.map((kg) => (
          <Card key={kg.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold ${
                    kg.type === 'Municipal' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}>
                    {kg.name.split(' ')[0][0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{kg.name}</h3>
                    <p className="text-slate-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {kg.address}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">Director: {kg.director}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={kg.status === 'Active' ? 'default' : 'secondary'}>
                    {kg.status}
                  </Badge>
                  <Badge variant="outline">{kg.type}</Badge>
                </div>
              </div>

              {/* Capacity Overview */}
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-600">Total Capacity</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{kg.capacity.occupied}/{kg.capacity.total}</p>
                  <p className="text-sm text-slate-500">
                    {Math.round((kg.capacity.occupied / kg.capacity.total) * 100)}% occupied
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-blue-600">Age 1-2 Years</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">{kg.capacity.ageGroup1to2}</p>
                  <p className="text-sm text-blue-600">children</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-green-600">Age 3-5 Years</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">{kg.capacity.ageGroup3to5}</p>
                  <p className="text-sm text-green-600">children</p>
                </div>
              </div>

              {/* Services */}
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-600 mb-2">Available Services:</p>
                <div className="flex flex-wrap gap-2">
                  {kg.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Application Status Toggle */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium text-slate-900">Accepting Applications</p>
                  <p className="text-sm text-slate-600">Enable/disable new application acceptance</p>
                </div>
                <Switch checked={kg.acceptingApplications} />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Configuration
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Manage Services
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
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
