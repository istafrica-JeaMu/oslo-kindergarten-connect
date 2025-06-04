
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface AnimatedAvatarProps {
  name: string;
  role: string;
  online?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  context?: 'sidebar' | 'message' | 'header';
  enableAnimation?: boolean;
}

const getEducationalCharacter = (role: string, name: string) => {
  const characters = {
    'System': {
      static: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop&crop=center',
      fallback: '🏛️'
    },
    'Kindergarten': {
      static: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop&crop=center',
      fallback: '🌸'
    },
    'Case Worker': {
      static: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop&crop=center',
      fallback: '📋'
    },
    'Guardian': {
      static: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop&crop=center',
      fallback: '👤'
    }
  };

  return characters[role as keyof typeof characters] || characters.Guardian;
};

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const getRoleBorderColor = (role: string) => {
  switch (role.toLowerCase()) {
    case 'system':
      return 'ring-blue-200 ring-2';
    case 'kindergarten':
      return 'ring-green-200 ring-2';
    case 'case worker':
      return 'ring-purple-200 ring-2';
    default:
      return 'ring-gray-200 ring-2';
  }
};

export const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({
  name,
  role,
  online = false,
  size = 'md',
  className,
  context = 'sidebar',
  enableAnimation = true
}) => {
  const character = getEducationalCharacter(role, name);
  const [isHovered, setIsHovered] = React.useState(false);
  const [hasMotionPreference, setHasMotionPreference] = React.useState(false);

  React.useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setHasMotionPreference(mediaQuery.matches);
  }, []);

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const onlineIndicatorSize = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  // Always use static images for educational context
  const imageSource = character.static;

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar 
        className={cn(
          sizeClasses[size], 
          getRoleBorderColor(role),
          'transition-all duration-300 ease-out',
          context === 'sidebar' && 'group-hover:scale-110 group-hover:shadow-lg',
          context === 'message' && 'group-hover:scale-105',
          className
        )}
      >
        <AvatarImage 
          src={imageSource} 
          alt={`${name} avatar`}
          className="object-cover transition-opacity duration-300 filter brightness-110 contrast-105"
          loading="lazy"
        />
        <AvatarFallback className={cn(
          "font-medium text-white transition-colors duration-200",
          role.toLowerCase() === 'system' && "bg-gradient-to-br from-blue-500 to-blue-600",
          role.toLowerCase() === 'kindergarten' && "bg-gradient-to-br from-green-500 to-green-600",
          role.toLowerCase() === 'case worker' && "bg-gradient-to-br from-purple-500 to-purple-600",
          role.toLowerCase() === 'guardian' && "bg-gradient-to-br from-gray-500 to-gray-600"
        )}>
          {character.fallback || getInitials(name)}
        </AvatarFallback>
      </Avatar>
      
      {online && (
        <div className={cn(
          'absolute -bottom-0 -right-0 border-2 border-white rounded-full transition-all duration-200',
          onlineIndicatorSize[size],
          'bg-green-500 shadow-sm',
          context === 'sidebar' && 'animate-pulse group-hover:scale-110'
        )}>
        </div>
      )}
    </div>
  );
};
