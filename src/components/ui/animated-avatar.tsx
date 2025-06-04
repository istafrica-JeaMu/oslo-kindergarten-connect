
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

const getGhibliCharacter = (role: string, name: string) => {
  const characters = {
    'System': {
      static: 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg',
      animated: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGp5cHJoYnJkdGV6OXJxY2RyYWk4aXNmYzJlNGZvcjUxaGE3cXp1ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlUJZE8Uo1cSlUI/giphy.gif',
      fallback: '🏛️'
    },
    'Kindergarten': {
      static: 'https://i.pinimg.com/736x/0f/25/c4/0f25c4d62c8ac5bb39e04e2b65e50c12.jpg',
      animated: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXN2YjJ2OXE3bzR5dGJkdnN3NGUxZXA2YnhsaGp6cWl5bGp3cWNrZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VbnUQpnihPSIgIXuZv/giphy.gif',
      fallback: '🌸'
    },
    'Case Worker': {
      static: 'https://i.pinimg.com/736x/52/23/83/5223832ce89b54cd4f8092e5c2a21be0.jpg',
      animated: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGVkczJpNGV3eWs4Zmg4NzJxN3Q1NWE2N3JrZDE5YzVpd3I0NGR3ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oriO0OEd9QIDdllqo/giphy.gif',
      fallback: '📋'
    },
    'Guardian': {
      static: 'https://i.pinimg.com/736x/fa/fe/34/fafe347f46e50e5d9e924f9ecffd61e9.jpg',
      animated: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm05dGNkbThzZWZqNG05cnBnZ2J4Y3R1NmpjdHd0M3RsaWJhZ2dwdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JIX9t2j0ZTN9S/giphy.gif',
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
  const character = getGhibliCharacter(role, name);
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

  // Use static images for messages, animated for sidebar/header interactions
  const shouldUseAnimation = enableAnimation && 
                            !hasMotionPreference && 
                            (context === 'sidebar' || (context === 'header' && isHovered));

  const imageSource = shouldUseAnimation ? character.animated : character.static;

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
          className="object-cover transition-opacity duration-300"
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
