import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Plus,
  Minus,
  Eye,
  Heart,
  Navigation,
  Search,
  Filter,
  X
} from 'lucide-react';
import { useKindergartenCart } from '@/contexts/KindergartenCartContext';

interface Kindergarten {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number]; // [lat, lng]
  rating: number;
  spots: number;
  ageRange: string;
  type: string;
  description: string;
  features: string[];
  imageUrl: string;
  distance?: string;
  waitingList?: number;
}

// Norwegian kindergarten data with real Oslo locations
const kindergartens: Kindergarten[] = [
  {
    id: '1',
    name: 'Bygdøy Barnehage',
    address: 'Bygdøyveien 45, 0286 Oslo',
    coordinates: [59.9065, 10.6996],
    rating: 4.8,
    spots: 3,
    ageRange: '1-6 år',
    type: 'Municipal',
    description: 'En koselig barnehage i naturskjønne omgivelser på Bygdøy med fokus på utebarnehage.',
    features: ['Utebarnehage', 'Naturpedagogikk', 'Egen hage', 'Kunstverksted'],
    imageUrl: '/placeholder.svg',
    distance: '0.8 km',
    waitingList: 12
  },
  {
    id: '2',
    name: 'Frogner Park Barnehage',
    address: 'Kirkeveien 60, 0368 Oslo',
    coordinates: [59.9219, 10.7053],
    rating: 4.7,
    spots: 5,
    ageRange: '1-6 år',
    type: 'Private',
    description: 'Moderne barnehage med lang tradisjon, ligger nært Frognerparken.',
    features: ['Musikk og bevegelse', 'Språkstimulering', 'Kunst og håndverk', 'Drama'],
    imageUrl: '/placeholder.svg',
    distance: '1.2 km',
    waitingList: 8
  },
  {
    id: '3',
    name: 'Grünerløkka Naturskole',
    address: 'Thorvald Meyers gate 25, 0555 Oslo',
    coordinates: [59.9239, 10.7527],
    rating: 4.9,
    spots: 2,
    ageRange: '3-6 år',
    type: 'Municipal',
    description: 'Innovativ naturskole som kombinerer tradisjonell barnehage med naturbasert læring.',
    features: ['Naturoppdagelse', 'Økologisk mat', 'Dyrehold', 'Gartnervirksomhet'],
    imageUrl: '/placeholder.svg',
    distance: '2.1 km',
    waitingList: 15
  },
  {
    id: '4',
    name: 'Majorstuen Familiesenter',
    address: 'Bogstadveien 30, 0355 Oslo',
    coordinates: [59.9271, 10.7175],
    rating: 4.6,
    spots: 7,
    ageRange: '0.5-6 år',
    type: 'Private',
    description: 'Flerspråklig barnehage med fokus på internasjonal forståelse og kultur.',
    features: ['Flerspråklig', 'Internasjonalt miljø', 'Kulturutveksling', 'Yoga for barn'],
    imageUrl: '/placeholder.svg',
    distance: '1.5 km',
    waitingList: 5
  },
  {
    id: '5',
    name: 'Kampen Miljøbarnehage',
    address: 'Kampenbakken 10, 0187 Oslo',
    coordinates: [59.9075, 10.7661],
    rating: 4.5,
    spots: 4,
    ageRange: '1-6 år',
    type: 'Municipal',
    description: 'Miljøfokusert barnehage som lærer barna om bærekraft og naturvern.',
    features: ['Miljøfokus', 'Resirkulering', 'Kompostering', 'Solceller'],
    imageUrl: '/placeholder.svg',
    distance: '2.8 km',
    waitingList: 10
  },
  {
    id: '6',
    name: 'Sentrum Språkbarnehage',
    address: 'Karl Johans gate 15, 0154 Oslo',
    coordinates: [59.9127, 10.7461],
    rating: 4.4,
    spots: 6,
    ageRange: '2-6 år',
    type: 'Private',
    description: 'Sentralt beliggende barnehage med sterkt fokus på språkutvikling og kommunikasjon.',
    features: ['Språkstimulering', 'Leseaktiviteter', 'Digitale verktøy', 'Sentralt beliggende'],
    imageUrl: '/placeholder.svg',
    distance: '0.5 km',
    waitingList: 20
  }
];

const MapMarker = ({ kindergarten, isSelected, onClick }: { 
  kindergarten: Kindergarten; 
  isSelected: boolean; 
  onClick: () => void;
}) => {
  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-300 ${
        isSelected ? 'scale-125 z-20' : 'scale-100 z-10 hover:scale-110'
      }`}
      style={{
        left: `${((kindergarten.coordinates[1] - 10.6) / 0.3) * 100}%`,
        top: `${((59.95 - kindergarten.coordinates[0]) / 0.08) * 100}%`
      }}
      onClick={onClick}
    >
      <div className={`w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center ${
        isSelected 
          ? 'bg-accent' 
          : kindergarten.spots > 0 
            ? 'bg-primary' 
            : 'bg-muted'
      }`}>
        <MapPin className="h-4 w-4 text-white" />
      </div>
      {isSelected && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-card border border-border/20 rounded-lg shadow-xl p-3 min-w-[200px] z-30">
          <h4 className="font-semibold text-sm mb-1">{kindergarten.name}</h4>
          <p className="text-xs text-muted-foreground mb-2">{kindergarten.address}</p>
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500" />
              <span>{kindergarten.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-primary" />
              <span className={kindergarten.spots > 0 ? 'text-green-600' : 'text-red-600'}>
                {kindergarten.spots} plasser
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export function GoogleMapsKindergartens() {
  const [selectedKindergarten, setSelectedKindergarten] = useState<Kindergarten | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [mapView, setMapView] = useState<'satellite' | 'roadmap'>('roadmap');
  const { selectedKindergartens, addKindergarten, isSelected } = useKindergartenCart();
  
  const addToCart = (kindergarten: Kindergarten) => {
    // Convert our Kindergarten to the context's expected format
    const contextKindergarten = {
      id: kindergarten.id,
      name: kindergarten.name,
      address: kindergarten.address,
      municipality: 'Oslo',
      type: kindergarten.type.toLowerCase() as 'public' | 'private',
      capacity: 50, // Default capacity
      availableSpots: kindergarten.spots,
      features: kindergarten.features,
      ageGroups: [kindergarten.ageRange],
      description: kindergarten.description,
    };
    addKindergarten(contextKindergarten);
  };
  
  const isInCart = (id: string) => {
    return isSelected(id);
  };

  const filteredKindergartens = kindergartens.filter(k => {
    const matchesSearch = k.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         k.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'available' && k.spots > 0) ||
                         (filterType === 'municipal' && k.type === 'Municipal') ||
                         (filterType === 'private' && k.type === 'Private');
    return matchesSearch && matchesFilter;
  });

  return (
    <section className="py-20 bg-oslo-surface/30 dark:bg-oslo-surface relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <MapPin className="w-3 h-3 mr-1" />
            Interactive Discovery
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Explore Kindergartens on Map</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Click on locations to explore kindergartens, view details, and add to your application cart
          </p>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search kindergartens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-background border border-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-background border border-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Types</option>
              <option value="available">Available Spots</option>
              <option value="municipal">Municipal</option>
              <option value="private">Private</option>
            </select>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMapView(mapView === 'roadmap' ? 'satellite' : 'roadmap')}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              {mapView === 'roadmap' ? 'Satellite' : 'Road'} View
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-border/20 bg-oslo-glass/30 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="relative h-[500px] bg-gradient-to-br from-oslo-hero-bg to-oslo-surface overflow-hidden">
                  {/* Simulated Oslo Map Background */}
                  <div className={`absolute inset-0 ${
                    mapView === 'satellite' 
                      ? 'bg-gradient-to-br from-green-800 via-green-700 to-blue-800' 
                      : 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600'
                  }`} />
                  
                  {/* Oslo Streets Overlay */}
                  {mapView === 'roadmap' && (
                    <svg className="absolute inset-0 w-full h-full opacity-30">
                      <path d="M0 250 Q200 200 400 250 T800 250" stroke="currentColor" strokeWidth="3" fill="none" className="text-primary" />
                      <path d="M200 0 Q250 200 200 500" stroke="currentColor" strokeWidth="2" fill="none" className="text-secondary" />
                      <path d="M0 150 L800 200" stroke="currentColor" strokeWidth="2" fill="none" className="text-accent" />
                      <path d="M100 0 L150 500" stroke="currentColor" strokeWidth="1" fill="none" className="text-muted-foreground" />
                      <path d="M600 0 L650 500" stroke="currentColor" strokeWidth="1" fill="none" className="text-muted-foreground" />
                    </svg>
                  )}
                  
                  {/* Map Markers */}
                  {filteredKindergartens.map((kindergarten) => (
                    <MapMarker
                      key={kindergarten.id}
                      kindergarten={kindergarten}
                      isSelected={selectedKindergarten?.id === kindergarten.id}
                      onClick={() => setSelectedKindergarten(
                        selectedKindergarten?.id === kindergarten.id ? null : kindergarten
                      )}
                    />
                  ))}
                  
                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
                      <Navigation className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-lg p-3 text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span>Available spots</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 bg-muted rounded-full"></div>
                      <span>Full / Waiting list</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <span>Selected</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Kindergarten Details */}
          <div className="space-y-6">
            {selectedKindergarten ? (
              <Card className="border-border/20 bg-oslo-glass/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{selectedKindergarten.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedKindergarten.address}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => setSelectedKindergarten(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{selectedKindergarten.rating}</span>
                    </div>
                    <Badge variant={selectedKindergarten.spots > 0 ? "default" : "secondary"}>
                      {selectedKindergarten.spots > 0 ? `${selectedKindergarten.spots} spots` : 'Full'}
                    </Badge>
                    <Badge variant="outline">{selectedKindergarten.type}</Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedKindergarten.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedKindergarten.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4" />
                    <span>Ages: {selectedKindergarten.ageRange}</span>
                  </div>
                  
                  {selectedKindergarten.waitingList && (
                    <div className="text-xs text-muted-foreground mb-4">
                      Waiting list: {selectedKindergarten.waitingList} children
                    </div>
                  )}
                  
                  <Button 
                    className="w-full" 
                    disabled={isInCart(selectedKindergarten.id)}
                    onClick={() => addToCart(selectedKindergarten)}
                  >
                    {isInCart(selectedKindergarten.id) ? (
                      <>
                        <Heart className="h-4 w-4 mr-2 fill-current" />
                        In Application Cart
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Application
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border/20 bg-oslo-glass/30 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Select a Kindergarten</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on any marker on the map to view details and add to your application.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="border-border/20 bg-oslo-glass/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Oslo Kindergartens</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Total kindergartens:</span>
                    <span className="font-medium">{kindergartens.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Available spots:</span>
                    <span className="font-medium text-green-600">
                      {kindergartens.reduce((sum, k) => sum + k.spots, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Municipal:</span>
                    <span className="font-medium">
                      {kindergartens.filter(k => k.type === 'Municipal').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Private:</span>
                    <span className="font-medium">
                      {kindergartens.filter(k => k.type === 'Private').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}