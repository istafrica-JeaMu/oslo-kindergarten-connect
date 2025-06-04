
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface AnimatedAvatarProps {
  name: string;
  role: string;
  online?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const getGhibliCharacter = (role: string, name: string) => {
  const characters = {
    'System': {
      gif: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGp5cHJoYnJkdGV6OXJxY2RyYWk4aXNmYzJlNGZvcjUxaGE3cXp1ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlUJZE8Uo1cSlUI/giphy.gif',
      fallback: '🏛️'
    },
    'Kindergarten': {
      gif: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXN2YjJ2OXE3bzR5dGJkdnN3NGUxZXA2YnhsaGp6cWl5bGp3cWNrZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VbnUQpnihPSIgIXuZv/giphy.gif',
      fallback: '🌸'
    },
    'Case Worker': {
      gif: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGVkczJpNGV3eWs4Zmg4NzJxN3Q1NWE2N3JrZDE5YzVpd3I0NGR3ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oriO0OEd9QIDdllqo/giphy.gif',
      fallback: '📋'
    },
    'Guardian': {
      gif: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm05dGNkbThzZWZqNG05cnBnZ2J4Y3R1NmpjdHd0M3RsaWJhZ2dwdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JIX9t2j0ZTN9S/giphy.gif',
      fallback: '👤'
    }
  };

  return characters[role as keyof typeof characters] || characters.Guardian;
};

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({
  name,
  role,
  online = false,
  size = 'md',
  className
}) => {
  const character = getGhibliCharacter(role, name);
  
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

  return (
    <div className="relative group">
      <Avatar className={cn(sizeClasses[size], 'transition-transform duration-200 group-hover:scale-105', className)}>
        <AvatarImage 
          src={character.gif} 
          alt={`${name} avatar`}
          className="object-cover"
        />
        <AvatarFallback className="bg-gradient-to-br from-oslo-blue to-blue-600 text-white text-sm font-medium">
          {character.fallback || getInitials(name)}
        </AvatarFallback>
      </Avatar>
      {online && (
        <div className={cn(
          'absolute -bottom-0 -right-0 bg-green-500 border-2 border-white rounded-full animate-pulse',
          onlineIndicatorSize[size]
        )}></div>
      )}
    </div>
  );
};
