import { useState, useEffect } from 'react';
import { AnimatedCounter } from './AnimatedCounter';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  MapPin, 
  Users, 
  TrendingUp,
  Zap,
  Heart,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data - in real app, this would come from API
const liveMetrics = {
  averageProcessingTime: { current: 3.2, target: 5, unit: 'days' },
  availabilityRate: { current: 87, district: 'Oslo Sentrum', trend: '+5%' },
  satisfactionScore: { current: 4.8, reviews: 1247, unit: '/5' },
  applicationsToday: { current: 42, time: 'Last 24h' }
};

const regionalStats = [
  { district: 'Oslo Sentrum', available: 23, total: 45, trend: '+3' },
  { district: 'Grünerløkka', available: 15, total: 32, trend: '+7' },
  { district: 'Frogner', available: 8, total: 28, trend: '-2' },
  { district: 'Sagene', available: 31, total: 41, trend: '+12' }
];

export function CreativeStatsSection() {
  const [selectedDistrict, setSelectedDistrict] = useState('Oslo Sentrum');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-oslo-surface dark:bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Zap className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Real-Time Kindergarten Insights
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See live availability, processing times, and trends across Oslo districts
          </p>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-12">
          {/* Processing Time */}
          <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-500 group border-border/20 bg-oslo-glass/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  Below Target
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    <AnimatedCounter end={liveMetrics.averageProcessingTime.current} decimals={1} />
                  </span>
                  <span className="text-muted-foreground">{liveMetrics.averageProcessingTime.unit}</span>
                </div>
                <p className="text-sm text-muted-foreground">Average Processing Time</p>
                <div className="w-full bg-secondary/20 rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full transition-all duration-1000" 
                       style={{ width: `${(liveMetrics.averageProcessingTime.current / liveMetrics.averageProcessingTime.target) * 100}%` }} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* District Availability */}
          <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-500 group border-border/20 bg-oslo-glass/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <Badge className="bg-primary/10 text-primary">
                  {liveMetrics.availabilityRate.trend}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    <AnimatedCounter end={liveMetrics.availabilityRate.current} suffix="%" />
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Available in {liveMetrics.availabilityRate.district}</p>
                <div className="flex items-center gap-2 text-xs">
                  <TrendingUp className="h-3 w-3 text-primary" />
                  <span className="text-primary">Trending up this week</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parent Satisfaction */}
          <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-500 group border-border/20 bg-oslo-glass/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-6 w-6 text-secondary" />
                </div>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                  Excellent
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    <AnimatedCounter end={liveMetrics.satisfactionScore.current} decimals={1} />
                  </span>
                  <span className="text-muted-foreground">{liveMetrics.satisfactionScore.unit}</span>
                </div>
                <p className="text-sm text-muted-foreground">Parent Satisfaction</p>
                <p className="text-xs text-muted-foreground">
                  Based on <AnimatedCounter end={liveMetrics.satisfactionScore.reviews} /> reviews
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Today's Activity */}
          <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-500 group border-border/20 bg-oslo-glass/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-6 w-6 text-orange-500" />
                </div>
                <Badge className="bg-orange-500/10 text-orange-500">
                  Live
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    <AnimatedCounter end={liveMetrics.applicationsToday.current} />
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Applications Today</p>
                <p className="text-xs text-muted-foreground">
                  Updated {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* District Breakdown */}
        <Card className="bg-oslo-glass/30 backdrop-blur-sm border-border/20">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">District Availability</h3>
                <p className="text-muted-foreground">Real-time kindergarten spots by location</p>
              </div>
              <Badge className="bg-accent/10 text-accent">
                <CheckCircle className="w-3 h-3 mr-1" />
                Updated Live
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {regionalStats.map((district, index) => (
                <div
                  key={district.district}
                  className={cn(
                    "p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:shadow-lg",
                    selectedDistrict === district.district 
                      ? "bg-primary/10 border-primary/30" 
                      : "bg-card border-border/20 hover:bg-oslo-surface/50"
                  )}
                  onClick={() => setSelectedDistrict(district.district)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{district.district}</h4>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      district.trend.startsWith('+') 
                        ? "bg-accent/20 text-accent" 
                        : "bg-destructive/20 text-destructive"
                    )}>
                      {district.trend}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        <AnimatedCounter end={district.available} />
                      </span>
                      <span className="text-muted-foreground text-sm">
                        / {district.total}
                      </span>
                    </div>
                    <div className="w-full bg-secondary/20 rounded-full h-2">
                      <div 
                        className="bg-secondary h-2 rounded-full transition-all duration-1000" 
                        style={{ width: `${(district.available / district.total) * 100}%` }} 
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Available spots</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}