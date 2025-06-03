
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { 
  Building, 
  Users, 
  MapPin, 
  Search,
  Plus,
  Eye,
  Edit,
  Calendar,
  UserCheck,
  AlertTriangle
} from 'lucide-react';

const PlacementManagement = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock kindergarten data
  const kindergartens = [
    {
      id: 'kg-001',
      name: 'Løvenskiold Kindergarten',
      district: 'Frogner',
      type: 'Municipal',
      capacity: 80,
      currentOccupancy: 72,
      availableSpots: 8,
      waitingList: 15,
      ageGroups: {
        '1-2': { capacity: 24, occupied: 22, available: 2 },
        '3-5': { capacity: 56, occupied: 50, available: 6 }
      },
      address: 'Løvenskiolds gate 15, 0257 Oslo',
      contact: 'post@lovenskiold-bhg.oslo.kommune.no',
      phone: '+47 23 48 12 00'
    },
    {
      id: 'kg-002',
      name: 'Sinsen Kindergarten',
      district: 'Grünerløkka',
      type: 'Municipal',
      capacity: 65,
      currentOccupancy: 63,
      availableSpots: 2,
      waitingList: 22,
      ageGroups: {
        '1-2': { capacity: 20, occupied: 20, available: 0 },
        '3-5': { capacity: 45, occupied: 43, available: 2 }
      },
      address: 'Sinsenvegen 5, 0572 Oslo',
      contact: 'post@sinsen-bhg.oslo.kommune.no',
      phone: '+47 23 48 13 00'
    },
    {
      id: 'kg-003',
      name: 'Bjølsen Kindergarten',
      district: 'Sagene',
      type: 'Municipal',
      capacity: 90,
      currentOccupancy: 85,
      availableSpots: 5,
      waitingList: 8,
      ageGroups: {
        '1-2': { capacity: 30, occupied: 28, available: 2 },
        '3-5': { capacity: 60, occupied: 57, available: 3 }
      },
      address: 'Bjølsenveien 12, 0468 Oslo',
      contact: 'post@bjolsen-bhg.oslo.kommune.no',
      phone: '+47 23 48 14 00'
    },
    {
      id: 'kg-004',
      name: 'Vårtun Kindergarten',
      district: 'Søndre Nordstrand',
      type: 'Private',
      capacity: 45,
      currentOccupancy: 40,
      availableSpots: 5,
      waitingList: 3,
      ageGroups: {
        '1-2': { capacity: 15, occupied: 12, available: 3 },
        '3-5': { capacity: 30, occupied: 28, available: 2 }
      },
      address: 'Vårtunveien 8, 1235 Oslo',
      contact: 'post@vartun-barnehage.no',
      phone: '+47 22 75 89 00'
    }
  ];

  const filteredKindergartens = kindergartens.filter(kg => {
    const matchesSearch = kg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kg.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = districtFilter === 'all' || kg.district === districtFilter;
    const matchesType = typeFilter === 'all' || kg.type === typeFilter;
    
    return matchesSearch && matchesDistrict && matchesType;
  });

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 95) return 'text-red-600 bg-red-50 border-red-300';
    if (percentage >= 80) return 'text-yellow-600 bg-yellow-50 border-yellow-300';
    return 'text-green-600 bg-green-50 border-green-300';
  };

  const getOccupancyPercentage = (occupied: number, capacity: number) => {
    return Math.round((occupied / capacity) * 100);
  };

  // Calculate totals
  const totals = kindergartens.reduce((acc, kg) => {
    acc.capacity += kg.capacity;
    acc.occupied += kg.currentOccupancy;
    acc.available += kg.availableSpots;
    acc.waitingList += kg.waitingList;
    return acc;
  }, { capacity: 0, occupied: 0, available: 0, waitingList: 0 });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('caseworker.placementManagement.title')}</h1>
        <p className="text-gray-600 mt-2">{t('caseworker.placementManagement.description')}</p>
      </div>

      {/* Summary Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Capacity</p>
                <p className="text-2xl font-bold text-gray-900">{totals.capacity}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Occupied</p>
                <p className="text-2xl font-bold text-green-600">{totals.occupied}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Plus className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-yellow-600">{totals.available}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Waiting List</p>
                <p className="text-2xl font-bold text-red-600">{totals.waitingList}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-lg border-0">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search kindergartens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={districtFilter} onValueChange={setDistrictFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Districts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                <SelectItem value="Frogner">Frogner</SelectItem>
                <SelectItem value="Grünerløkka">Grünerløkka</SelectItem>
                <SelectItem value="Sagene">Sagene</SelectItem>
                <SelectItem value="Søndre Nordstrand">Søndre Nordstrand</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Municipal">Municipal</SelectItem>
                <SelectItem value="Private">Private</SelectItem>
              </SelectContent>
            </Select>

            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Kindergarten
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Kindergarten List */}
      <div className="space-y-6">
        {filteredKindergartens.map((kg) => {
          const occupancyPercentage = getOccupancyPercentage(kg.currentOccupancy, kg.capacity);
          
          return (
            <Card key={kg.id} className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      <Building className="h-6 w-6 text-oslo-blue" />
                      {kg.name}
                      <Badge variant="outline" className={kg.type === 'Municipal' ? 'text-blue-600 border-blue-300 bg-blue-50' : 'text-purple-600 border-purple-300 bg-purple-50'}>
                        {kg.type}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {kg.district}
                      </span>
                      <span>{kg.address}</span>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Overall Capacity */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Overall Capacity</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Occupied</span>
                        <span className="font-medium">{kg.currentOccupancy}/{kg.capacity}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${occupancyPercentage >= 95 ? 'bg-red-500' : occupancyPercentage >= 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${occupancyPercentage}%` }}
                        ></div>
                      </div>
                      <Badge variant="outline" className={getOccupancyColor(occupancyPercentage)}>
                        {occupancyPercentage}% Full
                      </Badge>
                    </div>
                  </div>

                  {/* Age Group 1-2 */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Age 1-2 Years</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Capacity:</span>
                        <span className="font-medium">{kg.ageGroups['1-2'].capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Occupied:</span>
                        <span className="font-medium">{kg.ageGroups['1-2'].occupied}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Available:</span>
                        <span className={`font-medium ${kg.ageGroups['1-2'].available === 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {kg.ageGroups['1-2'].available}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Age Group 3-5 */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Age 3-5 Years</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Capacity:</span>
                        <span className="font-medium">{kg.ageGroups['3-5'].capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Occupied:</span>
                        <span className="font-medium">{kg.ageGroups['3-5'].occupied}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Available:</span>
                        <span className={`font-medium ${kg.ageGroups['3-5'].available === 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {kg.ageGroups['3-5'].available}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Contact Information</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>{kg.phone}</p>
                      <p className="break-all">{kg.contact}</p>
                      {kg.waitingList > 0 && (
                        <div className="flex items-center gap-1 mt-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span className="text-yellow-600 font-medium">
                            {kg.waitingList} on waiting list
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PlacementManagement;
