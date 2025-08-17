import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FloatingNavigation } from '@/components/FloatingNavigation';
import { CreativeStatsSection } from '@/components/CreativeStatsSection';
import { InteractiveMap } from '@/components/InteractiveMap';
import { GoogleMapsKindergartens } from '@/components/GoogleMapsKindergartens';
import { AIAssistant } from '@/components/AIAssistant';
import { 
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Zap,
  Target,
  Globe,
  Phone,
  Mail,
  GraduationCap,
  Award,
  MapPin
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
      <AIAssistant />
      
      {/* Hero Section - Minimal */}
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
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300">
              <Award className="w-3 h-3 mr-1" />
              Next-Generation Platform
            </Badge>
            
            <h1 className="text-6xl lg:text-8xl font-bold mb-6 leading-none">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Smart
              </span>
              <br />
              <span className="text-foreground">Kindergarten</span>
              <br />
              <span className="text-muted-foreground text-4xl lg:text-6xl">Discovery</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              Experience the future of kindergarten applications with AI-powered matching, 
              interactive maps, and real-time availability across Oslo.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button 
                size="lg" 
                className="h-14 px-8 text-lg font-medium bg-primary hover:bg-primary/90 group"
                onClick={() => document.getElementById('interactive-map')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <MapPin className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Explore Interactive Map
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-lg border-border/20 bg-oslo-glass/30 hover:bg-oslo-glass/50 backdrop-blur-sm"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Try AI Assistant
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>AI-Powered Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>Real-Time Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>Instant Application</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Stats Section */}
      <CreativeStatsSection />

      {/* Google Maps Section */}
      <div id="interactive-map">
        <GoogleMapsKindergartens />
      </div>


      {/* FAQ */}
      <section className="py-20 bg-oslo-surface/50 dark:bg-oslo-surface">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                <Zap className="w-3 h-3 mr-1" />
                Smart Help
              </Badge>
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
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 h-16 px-10 text-lg font-semibold group"
                onClick={() => document.getElementById('interactive-map')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <MapPin className="h-6 w-6 mr-2 group-hover:scale-110 transition-transform" />
                Start Smart Search
                <ArrowRight className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
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
                <button 
                  onClick={() => document.getElementById('interactive-map')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-foreground block transition-colors text-left"
                >
                  Interactive Map
                </button>
                <a href="#" className="text-muted-foreground hover:text-foreground block transition-colors">AI Assistant</a>
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