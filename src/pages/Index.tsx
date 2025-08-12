import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Building, 
  Users, 
  User,
  FileText,
  ArrowRight,
  CheckCircle,
  Shield,
  Globe,
  Clock,
  BookOpen,
  GraduationCap,
  Heart,
  Star,
  MapPin,
  Phone,
  Mail,
  Search,
  Award,
  Smile,
  Home,
  Calendar,
  UserCheck,
  MessageSquare,
  ChevronDown
} from 'lucide-react';

const Index = () => {
  const { t } = useTranslation();

  const processSteps = [
    {
      step: '1',
      title: 'Browse Kindergartens',
      description: 'Explore available public kindergartens in your area with detailed information about facilities and programs.',
      icon: Search,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      step: '2', 
      title: 'Select Preferences',
      description: 'Choose your preferred kindergartens and add them to your application. You can select multiple options.',
      icon: Heart,
      color: 'bg-green-50 text-green-600'
    },
    {
      step: '3',
      title: 'Complete Application',
      description: 'Fill out the online application form with your child and family information. No account required.',
      icon: FileText,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      step: '4',
      title: 'Track Progress',
      description: 'Receive updates via email and track your application status using your reference number.',
      icon: CheckCircle,
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  const benefits = [
    {
      title: 'Simple Online Process',
      description: 'Apply from home at any time. No need to visit multiple locations or handle paper forms.',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'Multiple Kindergarten Options',
      description: 'Browse and compare all available public kindergartens in one place with detailed information.',
      icon: Building,
      color: 'text-green-600'
    },
    {
      title: 'Real-time Updates',
      description: 'Get instant notifications about your application status and important deadlines.',
      icon: MessageSquare,
      color: 'text-purple-600'
    },
    {
      title: 'Secure & Official',
      description: 'Government-approved platform ensuring data security and compliance with privacy regulations.',
      icon: Shield,
      color: 'text-orange-600'
    }
  ];

  const stats = [
    { label: 'Active Kindergartens', value: '350+', icon: Building },
    { label: 'Families Served', value: '25,000+', icon: Users },
    { label: 'Applications This Year', value: '8,500+', icon: FileText },
    { label: 'Average Processing Time', value: '5 days', icon: Clock }
  ];

  const testimonials = [
    {
      name: 'Maria Hansen',
      location: 'Oslo',
      text: 'So much easier than the old paper system! I could compare all the kindergartens and apply to three different ones in just 30 minutes.',
      rating: 5
    },
    {
      name: 'Erik Johansen', 
      location: 'Bergen',
      text: 'The email updates kept me informed throughout the process. My daughter got a spot at our first choice kindergarten!',
      rating: 5
    },
    {
      name: 'Aisha Al-Rahman',
      location: 'Trondheim', 
      text: 'Great support for families who don\'t speak Norwegian fluently. The process was clear and straightforward.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'When can I apply for kindergarten?',
      answer: 'Applications are open year-round, but priority deadlines are March 1st for August start and October 1st for January start.'
    },
    {
      question: 'What documents do I need?',
      answer: 'You\'ll need your child\'s birth certificate, proof of residence, and income documentation. Medical certificates may be required for special needs.'
    },
    {
      question: 'How are placements decided?',
      answer: 'Placements are based on availability, your preferences, special needs, and municipality-specific criteria. Siblings of current students often receive priority.'
    },
    {
      question: 'Can I apply to multiple kindergartens?',
      answer: 'Yes! You can select up to 5 kindergartens in your application and rank them by preference.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Kindergarten Portal</h1>
                <p className="text-xs text-slate-600">Official Application Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                English
              </Button>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Staff Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
              <Award className="w-3 h-3 mr-1" />
              Official Government Platform
            </Badge>
            
            <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Find the Perfect
              <span className="text-blue-600"> Kindergarten</span>
              <br />for Your Child
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Apply to public kindergartens across Norway with our simple online platform. 
              Browse 350+ kindergartens, compare programs, and submit your application in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link to="/kindergartens">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8 text-lg font-medium w-full sm:w-auto">
                  <Search className="h-5 w-5 mr-2" />
                  Browse Kindergartens
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto">
                <Calendar className="h-5 w-5 mr-2" />
                Check Application Status
              </Button>
            </div>

            <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              No account required • Free to use • Instant confirmation
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Simple steps to find and apply to kindergartens for your child
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="relative hover:shadow-lg transition-shadow duration-200">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${step.color}`}>
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-slate-600 text-lg">Modern, efficient, and designed for busy families</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0`}>
                      <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                      <p className="text-slate-600">{benefit.description}</p>
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
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What Families Say</h2>
            <p className="text-slate-600 text-lg">Real experiences from parents across Norway</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-500 flex items-center gap-1">
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
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-600 text-lg">Find answers to common questions about the application process</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer list-none">
                        <h3 className="font-medium text-slate-900">{faq.question}</h3>
                        <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
                      </summary>
                      <p className="text-slate-600 mt-3 leading-relaxed">{faq.answer}</p>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Find Your Child's Kindergarten?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Join thousands of families who've found their perfect kindergarten match through our platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/kindergartens">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 h-14 px-8 text-lg font-medium w-full sm:w-auto">
                  <Search className="h-5 w-5 mr-2" />
                  Start Your Application
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 h-14 px-8 text-lg w-full sm:w-auto">
                <Phone className="h-5 w-5 mr-2" />
                Get Help
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold">Kindergarten Portal</span>
              </div>
              <p className="text-slate-400 text-sm">
                Official platform for kindergarten applications across Norway.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link to="/kindergartens" className="text-slate-400 hover:text-white block">Browse Kindergartens</Link>
                <Link to="/apply" className="text-slate-400 hover:text-white block">Apply Now</Link>
                <Link to="/login" className="text-slate-400 hover:text-white block">Staff Login</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-slate-400 hover:text-white block">Help Center</a>
                <a href="#" className="text-slate-400 hover:text-white block">Contact Us</a>
                <a href="#" className="text-slate-400 hover:text-white block">Privacy Policy</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+47 23 45 67 89</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>help@kindergarten.no</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 flex items-center justify-between">
            <p className="text-slate-400 text-sm">
              © 2024 Norwegian Government. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-slate-400 border-slate-700">
                <Shield className="w-3 h-3 mr-1" />
                Secure Platform
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
