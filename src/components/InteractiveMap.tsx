import { useState, useRef, useEffect } from 'react';
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
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock kindergarten data
const kindergartens = [
  {
    id: 1,
    name: 'Sunshine Kindergarten',
    address: 'Grünerløkka 15, Oslo',
    available: true,
    spots: 3,
    rating: 4.8,
    age: '1-6 years',
    price: '2,850 NOK',
    position: { lat: 59.9219, lng: 10.7543 },
    facilities: ['Playground', 'Library', 'Art Studio'],
    waitingTime: '2 weeks'
  },
  {
    id: 2,
    name: 'Forest Friends Kindergarten',
    address: 'Frogner Park 8, Oslo',
    available: true,
    spots: 1,
    rating: 4.9,
    age: '2-6 years',
    price: '3,200 NOK',
    position: { lat: 59.9171, lng: 10.7032 },
    facilities: ['Nature Area', 'Sports Hall', 'Music Room'],
    waitingTime: '1 week'
  },
  {
    id: 3,
    name: 'Little Explorers',
    address: 'Sagene 22, Oslo',
    available: false,
    spots: 0,
    rating: 4.7,
    age: '1-5 years',
    price: '2,650 NOK',
    position: { lat: 59.9467, lng: 10.7676 },
    facilities: ['Science Lab', 'Garden', 'Workshop'],
    waitingTime: '6 weeks'
  }
];

export function InteractiveMap() {
  const [selectedKindergarten, setSelectedKindergarten] = useState<typeof kindergartens[0] | null>(null);
  const [cart, setCart] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(12);
  const mapRef = useRef<HTMLDivElement>(null);

  const addToCart = (id: number) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item !== id));
  };

  const filteredKindergartens = kindergartens.filter(k => 
    k.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-20 bg-oslo-surface/30 dark:bg-oslo-surface relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <MapPin className="w-3 h-3 mr-1" />
            Interactive Discovery
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Explore Kindergartens on Map</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Click on locations to explore kindergartens, view details, and add to your application cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] border-border/20 bg-oslo-glass/30 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0 h-full relative">
                {/* Mock Map Background */}
                <div 
                  ref={mapRef}
                  className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 relative overflow-hidden cursor-pointer"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 40% 60%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
                    `,
                    backgroundSize: '100% 100%'
                  }}
                >
                  {/* Oslo Street Pattern Overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%" className="absolute inset-0">
                      <defs>
                        <pattern id="streets" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                          <path d="M0,50 L100,50 M50,0 L50,100" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                          <path d="M0,25 L100,25 M0,75 L100,75" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
                          <path d="M25,0 L25,100 M75,0 L75,100" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#streets)"/>
                    </svg>
                  </div>

                  {/* Kindergarten Markers */}
                  {filteredKindergartens.map((kindergarten, index) => (
                    <div
                      key={kindergarten.id}
                      className={cn(
                        "absolute w-8 h-8 rounded-full cursor-pointer transition-all duration-300 hover:scale-125 z-10",
                        kindergarten.available 
                          ? "bg-accent shadow-lg shadow-accent/50" 
                          : "bg-destructive shadow-lg shadow-destructive/50",
                        selectedKindergarten?.id === kindergarten.id && "scale-150 ring-4 ring-primary/50"
                      )}
                      style={{
                        left: `${20 + (index * 25)}%`,
                        top: `${30 + (index * 15)}%`,
                      }}
                      onClick={() => setSelectedKindergarten(kindergarten)}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-current rounded-full" />
                        </div>
                      </div>
                      
                      {/* Pulse animation for available spots */}
                      {kindergarten.available && (
                        <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />
                      )}
                    </div>
                  ))}

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-10 h-10 p-0 bg-oslo-glass/80 backdrop-blur-sm border-border/20"
                      onClick={() => setZoomLevel(Math.min(18, zoomLevel + 1))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-10 h-10 p-0 bg-oslo-glass/80 backdrop-blur-sm border-border/20"
                      onClick={() => setZoomLevel(Math.max(8, zoomLevel - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-10 h-10 p-0 bg-oslo-glass/80 backdrop-blur-sm border-border/20"
                    >
                      <Navigation className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Search Overlay */}
                  <div className="absolute top-4 left-4 right-20">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search kindergartens or areas..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-oslo-glass/80 backdrop-blur-sm border-border/20 h-10"
                      />
                    </div>
                  </div>
                </div>
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
                      const kindergarten = kindergartens.find(k => k.id === id);
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
                      <p className="font-medium mb-2">Facilities</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedKindergarten.facilities.map((facility, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
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

            {/* Quick Filters */}
            <Card className="border-border/20 bg-oslo-glass/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Quick Filters
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Available Now
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Age 1-3 Years
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Under 3000 NOK
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Near Metro
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}