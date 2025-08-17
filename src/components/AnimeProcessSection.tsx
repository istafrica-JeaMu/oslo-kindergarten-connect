import { useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Sparkles, 
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';

export function AnimeProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.anime-item');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-primary/10 rounded-full animate-float opacity-50" />
      <div className="absolute top-40 right-20 w-12 h-12 bg-accent/10 rounded-full animate-float opacity-50" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-1/4 w-8 h-8 bg-secondary/10 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-accent/10 rounded-full animate-float opacity-50" style={{ animationDelay: '0.5s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 anime-item">
          <Badge className="mb-4 bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20">
            <Zap className="w-3 h-3 mr-1" />
            Magic Process
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Two Simple Steps to Success
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the magic of AI-powered kindergarten discovery
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Step 1 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 anime-item">
            <div className="order-2 lg:order-1">
              <Card className="relative overflow-hidden border-border/20 bg-oslo-glass/30 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 group">
                <CardContent className="p-8">
                  {/* Anime-style decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full" />
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/30 rounded-full animate-ping" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4">Interactive Map Discovery</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Explore Oslo's kindergartens on our magical interactive map. Click on locations 
                      to see real-time availability, virtual tours, and instantly add your favorites to cart.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Star className="h-4 w-4 text-accent" />
                        <span className="text-sm">Real-time availability updates</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Star className="h-4 w-4 text-accent" />
                        <span className="text-sm">360° virtual kindergarten tours</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Star className="h-4 w-4 text-accent" />
                        <span className="text-sm">One-click cart management</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="order-1 lg:order-2 anime-item" style={{ animationDelay: '0.2s' }}>
              {/* Anime-style illustration placeholder */}
              <div className="relative h-80 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-oslo-hero-bg to-oslo-surface" />
                
                {/* Animated map markers */}
                <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-accent rounded-full animate-bounce shadow-lg">
                  <div className="absolute inset-1 bg-white rounded-full" />
                </div>
                <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-primary rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.5s' }}>
                  <div className="absolute inset-1 bg-white rounded-full" />
                </div>
                <div className="absolute bottom-1/3 left-1/2 w-6 h-6 bg-secondary rounded-full animate-bounce shadow-lg" style={{ animationDelay: '1s' }}>
                  <div className="absolute inset-1 bg-white rounded-full" />
                </div>
                
                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full opacity-30">
                  <path d="M80 80 Q200 150 260 120 T320 200" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary animate-pulse" />
                </svg>
                
                {/* Step number */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  1
                </div>
              </div>
            </div>
          </div>

          {/* Arrow Connector */}
          <div className="flex justify-center mb-20 anime-item">
            <div className="flex items-center gap-4 px-6 py-3 bg-oslo-glass/30 backdrop-blur-sm rounded-full border border-border/20">
              <ArrowRight className="h-6 w-6 text-primary animate-pulse" />
              <span className="text-sm font-medium">Then</span>
              <ArrowRight className="h-6 w-6 text-primary animate-pulse" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center anime-item">
            <div>
              {/* Anime-style illustration placeholder */}
              <div className="relative h-80 bg-gradient-to-br from-accent/10 via-primary/10 to-secondary/10 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-oslo-hero-bg to-oslo-surface" />
                
                {/* AI sparkles animation */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent rounded-full animate-ping" />
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
                <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-secondary rounded-full animate-ping" style={{ animationDelay: '0.6s' }} />
                
                {/* Form elements */}
                <div className="absolute inset-8 bg-oslo-glass/50 backdrop-blur-sm rounded-2xl border border-border/20 p-6">
                  <div className="space-y-3">
                    <div className="h-3 bg-muted/50 rounded animate-pulse" />
                    <div className="h-3 bg-muted/50 rounded w-3/4 animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="h-3 bg-muted/50 rounded w-1/2 animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                  
                  <Sparkles className="absolute top-2 right-2 h-6 w-6 text-accent animate-spin" style={{ animationDuration: '3s' }} />
                </div>
                
                {/* Step number */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  2
                </div>
              </div>
            </div>
            
            <div className="anime-item" style={{ animationDelay: '0.2s' }}>
              <Card className="relative overflow-hidden border-border/20 bg-oslo-glass/30 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 group">
                <CardContent className="p-8">
                  {/* Anime-style decoration */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-br-full" />
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent/30 rounded-full animate-ping" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4">AI-Powered Application</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Our intelligent assistant pre-fills your application, suggests the best matches, 
                      and guides you through the process in under 2 minutes.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Star className="h-4 w-4 text-accent" />
                        <span className="text-sm">Smart form auto-completion</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Star className="h-4 w-4 text-accent" />
                        <span className="text-sm">Personalized kindergarten matching</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Star className="h-4 w-4 text-accent" />
                        <span className="text-sm">Instant application submission</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}