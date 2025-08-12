import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useKindergartenCart, Kindergarten } from '@/contexts/KindergartenCartContext';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Users, 
  Star, 
  Plus, 
  Check, 
  Search,
  Filter,
  ShoppingCart,
  School,
  Clock,
  Heart
} from 'lucide-react';

const KindergartenBrowser = () => {
  const { selectedKindergartens, addKindergarten, removeKindergarten, isSelected } = useKindergartenCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMunicipality, setFilterMunicipality] = useState('all');

  // Mock data - in real app, this would come from an API
  const kindergartens: Kindergarten[] = [
    {
      id: '1',
      name: 'Solsikken Kindergarten',
      address: 'Hovedveien 123, Oslo',
      municipality: 'Oslo',
      type: 'public',
      capacity: 120,
      availableSpots: 15,
      features: ['Outdoor playground', 'Music room', 'Library', 'Garden'],
      ageGroups: ['1-3 years', '3-6 years'],
      description: 'A vibrant kindergarten focused on nature-based learning and creative development.'
    },
    {
      id: '2',
      name: 'Bjørkerud Kindergarten',
      address: 'Skogveien 45, Oslo',
      municipality: 'Oslo',
      type: 'public',
      capacity: 90,
      availableSpots: 8,
      features: ['Forest area', 'Art studio', 'Kitchen garden', 'Sports hall'],
      ageGroups: ['1-3 years', '3-6 years'],
      description: 'Environmental kindergarten with focus on sustainability and outdoor activities.'
    },
    {
      id: '3',
      name: 'Regnbuen Kindergarten',
      address: 'Parkgata 67, Bergen',
      municipality: 'Bergen',
      type: 'public',
      capacity: 100,
      availableSpots: 12,
      features: ['Multilingual program', 'Science lab', 'Dance studio', 'Therapy room'],
      ageGroups: ['1-3 years', '3-6 years'],
      description: 'Inclusive kindergarten offering multilingual education and special needs support.'
    },
    {
      id: '4',
      name: 'Eventyr Kindergarten',
      address: 'Lykkevegen 89, Bergen',
      municipality: 'Bergen',
      type: 'public',
      capacity: 80,
      availableSpots: 5,
      features: ['Storytelling corner', 'Music instruments', 'Sensory room', 'Climbing wall'],
      ageGroups: ['2-6 years'],
      description: 'Creative kindergarten emphasizing storytelling, imagination, and artistic expression.'
    }
  ];

  const filteredKindergartens = kindergartens.filter(k => {
    const matchesSearch = k.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         k.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMunicipality = filterMunicipality === 'all' || k.municipality === filterMunicipality;
    return matchesSearch && matchesMunicipality;
  });

  const municipalities = [...new Set(kindergartens.map(k => k.municipality))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <School className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Find Your Kindergarten</h1>
                <p className="text-sm text-slate-600">Browse public kindergartens and apply online</p>
              </div>
            </div>
            
            {/* Cart Summary */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
                <ShoppingCart className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  {selectedKindergartens.length} selected
                </span>
              </div>
              {selectedKindergartens.length > 0 && (
                <Link to="/apply">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Apply Now
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search kindergartens by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterMunicipality}
                onChange={(e) => setFilterMunicipality(e.target.value)}
                className="px-3 py-2 border rounded-md bg-white"
              >
                <option value="all">All Municipalities</option>
                {municipalities.map(municipality => (
                  <option key={municipality} value={municipality}>{municipality}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Selected Kindergartens Preview */}
          {selectedKindergartens.length > 0 && (
            <Card className="mb-6 bg-blue-50 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="h-5 w-5 text-blue-600" />
                  Your Selected Kindergartens ({selectedKindergartens.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {selectedKindergartens.map(k => (
                    <Badge key={k.id} variant="secondary" className="bg-blue-100 text-blue-800">
                      {k.name}
                      <button
                        onClick={() => removeKindergarten(k.id)}
                        className="ml-2 hover:text-red-600"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <Link to="/apply" className="inline-block mt-3">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Proceed to Application
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Kindergarten Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredKindergartens.map((kindergarten) => (
            <Card key={kindergarten.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{kindergarten.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {kindergarten.address}
                    </CardDescription>
                  </div>
                  <Badge variant={kindergarten.availableSpots > 10 ? 'default' : 'secondary'}>
                    {kindergarten.availableSpots} spots
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">{kindergarten.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{kindergarten.capacity} capacity</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{kindergarten.ageGroups.join(', ')}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {kindergarten.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {kindergarten.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{kindergarten.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  {isSelected(kindergarten.id) ? (
                    <Button
                      variant="outline"
                      className="w-full border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                      onClick={() => removeKindergarten(kindergarten.id)}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Selected
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => addKindergarten(kindergarten)}
                      disabled={kindergarten.availableSpots === 0}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {kindergarten.availableSpots === 0 ? 'No spots available' : 'Select'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredKindergartens.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">No kindergartens found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KindergartenBrowser;