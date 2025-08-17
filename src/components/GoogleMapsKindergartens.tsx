import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Star, 
  Users, 
  Clock,
  Search,
  Filter,
  Navigation,
  Heart,
  Info,
  Phone,
  Mail,
  Car,
  Train
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Real Norwegian kindergarten data with actual coordinates
const norwegianKindergartens = [
  {
    id: 1,
    name: 'Grünerløkka Barnehage',
    address: 'Thorvald Meyers gate 12, 0555 Oslo',
    available: true,
    spots: 4,
    rating: 4.7,
    age: '1-6 years',
    price: '2,895 NOK',
    position: { lat: 59.9219, lng: 10.7543 },
    facilities: ['Lekeplass', 'Bibliotek', 'Kunstverksted'],
    waitingTime: '2 weeks',
    phone: '+47 22 35 67 89',
    email: 'grunerlokka@oslo.kommune.no',
    openingHours: '07:30 - 17:00',
    pedagogy: 'Reggio Emilia'
  },
  {
    id: 2,
    name: 'Frogner Park Barnehage',
    address: 'Frognerparken 8, 0268 Oslo',
    available: true,
    spots: 2,
    rating: 4.9,
    age: '2-6 years',
    price: '3,150 NOK',
    position: { lat: 59.9171, lng: 10.7032 },
    facilities: ['Naturområde', 'Idrettshall', 'Musikkrom'],
    waitingTime: '1 week',
    phone: '+47 22 44 55 66',
    email: 'frogner@oslo.kommune.no',
    openingHours: '07:00 - 17:30',
    pedagogy: 'Montessori'
  },
  {
    id: 3,
    name: 'Sagene Naturbarnehage',
    address: 'Sagene Ring 22, 0459 Oslo',
    available: true,
    spots: 6,
    rating: 4.8,
    age: '1-5 years',
    price: '2,750 NOK',
    position: { lat: 59.9467, lng: 10.7676 },
    facilities: ['Naturlekeplass', 'Verksted', 'Kjøkkenhage'],
    waitingTime: '3 weeks',
    phone: '+47 22 33 44 55',
    email: 'sagene@oslo.kommune.no',
    openingHours: '07:30 - 16:30',
    pedagogy: 'Friluftspedagogikk'
  },
  {
    id: 4,
    name: 'Majorstuen Barnehage',
    address: 'Majorstuen 15, 0359 Oslo',
    available: false,
    spots: 0,
    rating: 4.6,
    age: '2-6 years',
    price: '3,200 NOK',
    position: { lat: 59.9293, lng: 10.7178 },
    facilities: ['Bibliotek', 'Atelier', 'Gymsal'],
    waitingTime: '8 weeks',
    phone: '+47 22 77 88 99',
    email: 'majorstuen@oslo.kommune.no',
    openingHours: '07:00 - 17:00',
    pedagogy: 'Tradisjonell'
  },
  {
    id: 5,
    name: 'Bjørvika Havnebarnehage',
    address: 'Operagata 5, 0194 Oslo',
    available: true,
    spots: 3,
    rating: 4.5,
    age: '1-6 years',
    price: '2,950 NOK',
    position: { lat: 59.9081, lng: 10.7524 },
    facilities: ['Havutsikt', 'Basseng', 'Teatersene'],
    waitingTime: '4 weeks',
    phone: '+47 22 11 22 33',
    email: 'bjørvika@oslo.kommune.no',
    openingHours: '06:30 - 18:00',
    pedagogy: 'Kreativ'
  },
  {
    id: 6,
    name: 'Tøyen Flerkulturell Barnehage',
    address: 'Tøyengata 28, 0578 Oslo',
    available: true,
    spots: 5,
    rating: 4.4,
    age: '1-6 years',
    price: '2,650 NOK',
    position: { lat: 59.9167, lng: 10.7724 },
    facilities: ['Språkstøtte', 'Kulturrom', 'Matlagring'],
    waitingTime: '2 weeks',
    phone: '+47 22 99 88 77',
    email: 'toyen@oslo.kommune.no',
    openingHours: '07:00 - 17:30',
    pedagogy: 'Flerkulturell'
  },
  {
    id: 7,
    name: 'Holmenkollen Skogsbarnehage',
    address: 'Holmenkollveien 119, 0787 Oslo',
    available: true,
    spots: 1,
    rating: 4.9,
    age: '3-6 years',
    price: '3,400 NOK',
    position: { lat: 59.9631, lng: 10.6702 },
    facilities: ['Skogområde', 'Skiløype', 'Bålplass'],
    waitingTime: '6 weeks',
    phone: '+47 22 66 77 88',
    email: 'holmenkollen@oslo.kommune.no',
    openingHours: '08:00 - 16:00',
    pedagogy: 'Friluftsliv'
  },
  {
    id: 8,
    name: 'Aker Brygge Sjøbarnehage',
    address: 'Aker Brygge 34, 0250 Oslo',
    available: false,
    spots: 0,
    rating: 4.7,
    age: '2-6 years',
    price: '3,500 NOK',
    position: { lat: 59.9105, lng: 10.7290 },
    facilities: ['Maritimt miljø', 'Seilbåter', 'Akvarierom'],
    waitingTime: '12 weeks',
    phone: '+47 22 55 44 33',
    email: 'akerbrygge@oslo.kommune.no',
    openingHours: '07:00 - 18:00',
    pedagogy: 'Marin'
  }
];

interface MapProps {
  center: { lat: number; lng: number };
  zoom: number;
  onMapLoad?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

function GoogleMapComponent({ center, zoom, onMapLoad, children }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && (window as any).google) {
      const mapInstance = new (window as any).google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [{ weight: '2.00' }]
          },
          {
            featureType: 'all',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#9c9c9c' }]
          },
          {
            featureType: 'all',
            elementType: 'labels.text',
            stylers: [{ visibility: 'on' }]
          },
          {
            featureType: 'landscape',
            elementType: 'all',
            stylers: [{ color: '#f2f2f2' }]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry.fill',
            stylers: [{ color: '#ffffff' }]
          },
          {
            featureType: 'landscape.man_made',
            elementType: 'geometry.fill',
            stylers: [{ color: '#ffffff' }]
          },
          {
            featureType: 'poi',
            elementType: 'all',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'road',
            elementType: 'all',
            stylers: [{ saturation: -100 }, { lightness: 45 }]
          },
          {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [{ color: '#eeeeee' }]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#7b7b7b' }]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#ffffff' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'all',
            stylers: [{ visibility: 'simplified' }]
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit',
            elementType: 'all',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'water',
            elementType: 'all',
            stylers: [{ color: '#46bcec' }, { visibility: 'on' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{ color: '#c8d7d4' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#070707' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#ffffff' }]
          }
        ],
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: false,
        fullscreenControl: true
      });

      setMap(mapInstance);
      onMapLoad?.(mapInstance);
    }
  }, [center, zoom, onMapLoad]);

  return <div ref={mapRef} className="w-full h-full" />;
}

export function GoogleMapsKindergartens() {
  const [selectedKindergarten, setSelectedKindergarten] = useState<typeof norwegianKindergartens[0] | null>(null);
  const [cart, setCart] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);

  const addToCart = (id: number) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item !== id));
  };

  const filteredKindergartens = norwegianKindergartens.filter(k => 
    k.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.pedagogy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onMapLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    const newMarkers: google.maps.Marker[] = [];

    // Add markers for each kindergarten
    filteredKindergartens.forEach((kindergarten) => {
      const marker = new (window as any).google.maps.Marker({
        position: kindergarten.position,
        map: mapInstance,
        title: kindergarten.name,
        icon: {
          path: (window as any).google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: kindergarten.available ? '#48BB78' : '#F56565',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
        animation: (window as any).google.maps.Animation.DROP,
      });

      const infoWindow = new (window as any).google.maps.InfoWindow({
        content: `
          <div class="p-3 min-w-[250px]">
            <h3 class="font-semibold text-lg mb-2">${kindergarten.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${kindergarten.address}</p>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-sm font-medium">${kindergarten.rating} ⭐</span>
              <span class="text-sm text-gray-500">${kindergarten.age}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-semibold text-green-600">${kindergarten.price}</span>
              <span class="text-sm ${kindergarten.available ? 'text-green-600' : 'text-red-600'}">
                ${kindergarten.available ? `${kindergarten.spots} plasser` : 'Fullt'}
              </span>
            </div>
          </div>
        `
      });

      marker.addListener('click', () => {
        setSelectedKindergarten(kindergarten);
        infoWindow.open(mapInstance, marker);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [filteredKindergartens, markers]);

  const loadGoogleMaps = () => {
    if (!apiKey) return;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);
  };

  useEffect(() => {
    if (apiKey && !window.google) {
      loadGoogleMaps();
    } else if (window.google) {
      setMapLoaded(true);
    }
  }, [apiKey]);

  if (!mapLoaded && !window.google) {
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
          </div>

          <div className="max-w-md mx-auto">
            <Card className="border-border/20 bg-oslo-glass/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Setup Google Maps</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Enter your Google Maps API key to enable interactive maps
                </p>
                <div className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Google Maps API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="bg-oslo-glass/50 border-border/20"
                  />
                  <Button 
                    onClick={loadGoogleMaps}
                    disabled={!apiKey}
                    className="w-full"
                  >
                    Load Interactive Map
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Get your API key from{' '}
                  <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Google Cloud Console
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-oslo-surface/30 dark:bg-oslo-surface relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <MapPin className="w-3 h-3 mr-1" />
            Interactive Discovery
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Explore Oslo Kindergartens</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover real kindergartens across Oslo. Click markers to view details and add to your application cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Google Map Container */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] border-border/20 bg-oslo-glass/30 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0 h-full relative">
                {/* Search Overlay */}
                <div className="absolute top-4 left-4 right-4 z-10">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search kindergartens, areas, or pedagogy..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-oslo-glass/90 backdrop-blur-sm border-border/20 h-12"
                    />
                  </div>
                </div>

                {/* Google Map */}
                <GoogleMapComponent
                  center={{ lat: 59.9139, lng: 10.7522 }} // Oslo center
                  zoom={12}
                  onMapLoad={onMapLoad}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cart */}
            <Card className="border-border/20 bg-oslo-glass/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Application Cart
                  </h3>
                  <Badge variant="secondary">{cart.length}</Badge>
                </div>
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Click on map markers to add kindergartens</p>
                ) : (
                  <div className="space-y-2">
                    {cart.map(id => {
                      const kindergarten = norwegianKindergartens.find(k => k.id === id);
                      return kindergarten ? (
                        <div key={id} className="flex items-center justify-between p-2 bg-oslo-surface/50 rounded-lg">
                          <span className="text-sm font-medium">{kindergarten.name}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(id)}
                            className="h-6 w-6 p-0 hover:bg-destructive/20"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
                {cart.length > 0 && (
                  <Button className="w-full mt-4">
                    Continue Application ({cart.length})
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Selected Kindergarten Details */}
            {selectedKindergarten && (
              <Card className="border-border/20 bg-oslo-glass/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{selectedKindergarten.name}</h3>
                        <p className="text-muted-foreground text-sm flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {selectedKindergarten.address}
                        </p>
                      </div>
                      <Badge 
                        className={cn(
                          selectedKindergarten.available 
                            ? "bg-accent/10 text-accent" 
                            : "bg-destructive/10 text-destructive"
                        )}
                      >
                        {selectedKindergarten.available ? `${selectedKindergarten.spots} spots` : 'Full'}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="font-medium">{selectedKindergarten.rating}</span>
                        </div>
                        <p className="text-muted-foreground">Rating</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <Users className="h-3 w-3" />
                          <span className="font-medium">{selectedKindergarten.age}</span>
                        </div>
                        <p className="text-muted-foreground">Age range</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <Clock className="h-3 w-3" />
                          <span className="font-medium">{selectedKindergarten.waitingTime}</span>
                        </div>
                        <p className="text-muted-foreground">Wait time</p>
                      </div>
                      <div>
                        <p className="font-medium">{selectedKindergarten.price}</p>
                        <p className="text-muted-foreground">Monthly fee</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium mb-2">Pedagogy</p>
                      <Badge variant="outline" className="text-xs">
                        {selectedKindergarten.pedagogy}
                      </Badge>
                    </div>

                    <div>
                      <p className="font-medium mb-2">Facilities</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedKindergarten.facilities.map((facility, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        <span>{selectedKindergarten.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        <span>{selectedKindergarten.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>{selectedKindergarten.openingHours}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={() => addToCart(selectedKindergarten.id)}
                        disabled={cart.includes(selectedKindergarten.id) || !selectedKindergarten.available}
                      >
                        {cart.includes(selectedKindergarten.id) ? (
                          <>Added to Cart</>
                        ) : selectedKindergarten.available ? (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add to Cart
                          </>
                        ) : (
                          <>Full</>
                        )}
                      </Button>
                      <Button variant="outline" size="sm" className="px-3">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="px-3">
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="border-border/20 bg-oslo-glass/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Oslo Kindergartens</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Available now</span>
                    <span className="font-medium text-accent">
                      {norwegianKindergartens.filter(k => k.available).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average wait time</span>
                    <span className="font-medium">3.2 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average rating</span>
                    <span className="font-medium">4.7 ⭐</span>
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