import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FloatingNavigation } from '@/components/FloatingNavigation';
import { CreativeStatsSection } from '@/components/CreativeStatsSection';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { 
  Search,
  Calendar,
  CheckCircle,
  FileText,
  Heart,
  Clock,
  Building,
  Users,
  MessageSquare,
  Shield,
  Star,
  User,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Award,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Map,
  Zap,
  Target,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const processSteps = [
    {
      step: '1',
      title: 'Interactive Map Search',
      description: 'Explore kindergartens on our interactive map. Click locations to see availability, photos, and add to cart instantly.',
      icon: Map,
      color: 'bg-primary/10 text-primary'
    },
    {
      step: '2', 
      title: 'Smart Application',
      description: 'AI-powered form that pre-fills your information and suggests the best matches based on your preferences.',
      icon: Sparkles,
      color: 'bg-accent/10 text-accent'
    }
  ];

  const benefits = [
    {
      title: 'AI-Powered Matching',
      description: 'Our intelligent system suggests the best kindergartens based on your location, preferences, and child\'s needs.',
      icon: Sparkles,
      color: 'text-primary'
    },
    {
      title: 'Real-Time Availability',
      description: 'See live availability updates, processing times, and get instant notifications when spots open.',
      icon: Zap,
      color: 'text-accent'
    },
    {
      title: 'Virtual Tours',
      description: 'Explore kindergartens with 360° virtual tours, street view integration, and detailed facility photos.',
      icon: Target,
      color: 'text-secondary'
    },
    {
      title: 'Multilingual Support',
      description: 'Full support for Norwegian, English, and 8+ other languages with cultural integration guidance.',
      icon: Globe,
      color: 'text-orange-500'
    }
  ];

  const testimonials = [
    {
      name: 'Maria Hansen',
      location: 'Grünerløkka, Oslo',
      text: 'The AI chatbot helped me complete the entire application in 10 minutes. Found the perfect kindergarten on the first try!',
      rating: 5,
      avatar: '👩🏼‍💼'
    },
    {
      name: 'Ahmed Al-Rashid', 
      location: 'Frogner, Oslo',
      text: 'The virtual tours saved us so much time. We could see everything before visiting, and the multilingual support was excellent.',
      rating: 5,
      avatar: '👨🏽‍💻'
    },
    {
      name: 'Lin Zhang',
      location: 'Sagene, Oslo', 
      text: 'Real-time notifications kept us updated instantly. Our daughter started kindergarten within 2 weeks of applying!',
      rating: 5,
      avatar: '👩🏻‍🔬'
    }
  ];

  const faqs = [
    {
      question: 'How does the AI matching system work?',
      answer: 'Our AI analyzes your preferences, location, commute patterns, and child\'s needs to suggest the most suitable kindergartens. It learns from successful placements to improve recommendations.'
    },
    {
      question: 'Can I use the interactive map on mobile?',
      answer: 'Yes! Our map is fully optimized for mobile with touch gestures, GPS location, and offline caching for areas you\'ve viewed.'
    },
    {
      question: 'What languages are supported?',
      answer: 'We support Norwegian, English, Polish, Urdu, Somali, Arabic, Vietnamese, and more. The AI chatbot can communicate in your preferred language.'
    },
    {
      question: 'How accurate are the real-time updates?',
      answer: 'Availability updates are synchronized every 15 minutes with all kindergarten systems. Processing times are updated based on current workload.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <FloatingNavigation />
      
      {/* Hero Section with Asymmetrical Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-oslo-hero-bg via-background to-oslo-surface" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(66, 153, 225, 0.1), transparent 40%)`
          }}
        />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-secondary/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - 60% */}
            <div className="lg:pr-8 animate-slide-up">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300">
                <Award className="w-3 h-3 mr-1" />
                Next-Generation Platform
              </Badge>
              
              <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-none">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Smart
                </span>
                <br />
                <span className="text-foreground">Kindergarten</span>
                <br />
                <span className="text-muted-foreground text-4xl lg:text-5xl">Discovery</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Experience the future of kindergarten applications with AI-powered matching, 
                interactive maps, and real-time availability. Find your perfect match in minutes, not weeks.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/kindergartens">
                  <Button 
                    size="lg" 
                    className="h-14 px-8 text-lg font-medium bg-primary hover:bg-primary/90 group"
                  >
                    <Map className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    Explore Interactive Map
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-8 text-lg border-border/20 bg-oslo-glass/30 hover:bg-oslo-glass/50 backdrop-blur-sm"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Try AI Assistant
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Real-Time Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Instant Matching</span>
                </div>
              </div>
            </div>

            {/* Right Content - 40% */}
            <div className="relative animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative z-10 bg-oslo-glass/30 backdrop-blur-xl border border-border/20 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Perfect Match Guarantee</h3>
                  <p className="text-sm text-muted-foreground">AI finds your ideal kindergarten in under 2 minutes</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Success Rate</span>
                    <span className="font-semibold">98.5%</span>
                  </div>
                  <div className="w-full bg-secondary/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-secondary to-accent h-2 rounded-full w-[98.5%] animate-pulse" />
                  </div>
                </div>

                <Input 
                  placeholder="Enter your district or postal code..." 
                  className="mb-4 h-12 bg-oslo-glass/50 border-border/20"
                />
                
                <Button className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                  <Search className="h-4 w-4 mr-2" />
                  Start Smart Search
                </Button>
              </div>
              
              {/* Background decoration */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Creative Stats Section */}
      <CreativeStatsSection />

      {/* How It Works - Simplified */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
        
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              <Zap className="w-3 h-3 mr-1" />
              Simplified Process
            </Badge>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              From Search to Enrollment in 2 Simple Steps
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We've revolutionized kindergarten applications using AI and modern technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <Card 
                key={index} 
                className="relative hover:shadow-2xl transition-all duration-500 group border-border/20 bg-oslo-glass/30 backdrop-blur-sm overflow-hidden"
              >
                <CardContent className="pt-8 pb-6 text-center relative z-10">
                  <div className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110",
                    step.color
                  )}>
                    <step.icon className="h-10 w-10" />
                  </div>
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
                
                {/* Hover effect gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-oslo-surface/50 dark:bg-oslo-surface relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5" />
        
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-muted-foreground text-lg">Experience the future of kindergarten applications</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card 
                key={index} 
                className="hover:shadow-2xl transition-all duration-500 group border-border/20 bg-oslo-glass/30 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-oslo-surface/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className={cn("h-7 w-7", benefit.color)} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Families Say</h2>
            <p className="text-muted-foreground text-lg">Real experiences from parents across Oslo</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="hover:shadow-2xl transition-all duration-500 group border-border/20 bg-oslo-glass/30 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-oslo-surface/50 dark:bg-oslo-surface">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-lg">Everything you need to know about our smart platform</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-border/20 bg-oslo-glass/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer list-none">
                        <h3 className="font-semibold text-lg">{faq.question}</h3>
                        <ChevronDown className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform duration-300" />
                      </summary>
                      <p className="text-muted-foreground mt-4 leading-relaxed">{faq.answer}</p>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Experience the Future?
            </h2>
            <p className="text-white/90 text-xl mb-8 leading-relaxed">
              Join thousands of families who've discovered their perfect kindergarten match 
              through our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/kindergartens">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 h-16 px-10 text-lg font-semibold group"
                >
                  <Map className="h-6 w-6 mr-2 group-hover:scale-110 transition-transform" />
                  Start Smart Search
                  <ArrowRight className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 h-16 px-10 text-lg backdrop-blur-sm"
              >
                <Phone className="h-6 w-6 mr-2" />
                Get Expert Help
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border/20 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">Kindergarten Portal</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Next-generation kindergarten application platform for Oslo Municipality.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-sm">
                <Link to="/kindergartens" className="text-muted-foreground hover:text-foreground block transition-colors">Interactive Map</Link>
                <Link to="/apply" className="text-muted-foreground hover:text-foreground block transition-colors">AI Assistant</Link>
                <Link to="/login" className="text-muted-foreground hover:text-foreground block transition-colors">Staff Portal</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-muted-foreground hover:text-foreground block transition-colors">Help Center</a>
                <a href="#" className="text-muted-foreground hover:text-foreground block transition-colors">Live Chat</a>
                <a href="#" className="text-muted-foreground hover:text-foreground block transition-colors">Privacy Policy</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+47 23 45 67 89</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>help@kindergarten.oslo.no</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/20 mt-8 pt-8 flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              © 2024 Oslo Municipality. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Powered by AI</span>
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;