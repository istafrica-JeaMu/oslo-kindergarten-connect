import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SimpleThemeToggle } from '@/components/ui/simple-theme-toggle';
import { 
  GraduationCap, 
  Globe, 
  UserCheck,
  Search,
  Menu,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function FloatingNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 w-full max-w-6xl mx-auto px-4",
        scrolled ? "top-2" : ""
      )}
    >
      <nav 
        className={cn(
          "relative rounded-2xl transition-all duration-500 backdrop-blur-md border",
          scrolled 
            ? "bg-oslo-glass border-border/20 shadow-lg shadow-oslo-shadow" 
            : "bg-transparent border-transparent"
        )}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">Kindergarten Portal</h1>
              <p className="text-xs text-muted-foreground">Oslo Municipality</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="hover:bg-oslo-glass/20 transition-all duration-300"
            >
              <Globe className="h-4 w-4 mr-2" />
              English
            </Button>
            <SimpleThemeToggle />
            <Link to="/login">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-oslo-glass/30 border-border/20 hover:bg-oslo-glass/50 transition-all duration-300"
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Staff Login
              </Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <SimpleThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:bg-oslo-glass/20 transition-all duration-300"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

          <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-oslo-glass backdrop-blur-md border border-border/20 rounded-2xl shadow-lg">
            <div className="p-4 space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Globe className="h-4 w-4 mr-2" />
                English
              </Button>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Staff Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}