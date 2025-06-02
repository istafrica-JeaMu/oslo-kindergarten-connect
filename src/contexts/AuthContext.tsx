
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'guardian' | 'caseworker' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  district?: string;
  kindergartenId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Record<string, User> = {
  'guardian@example.com': {
    id: '1',
    name: 'Anna Hansen',
    email: 'guardian@example.com',
    role: 'guardian'
  },
  'caseworker@oslo.kommune.no': {
    id: '2',
    name: 'Erik Johansen',
    email: 'caseworker@oslo.kommune.no',
    role: 'caseworker',
    district: 'Søndre Nordstrand'
  },
  'admin@oslo.kommune.no': {
    id: '3',
    name: 'Ingrid Andersen',
    email: 'admin@oslo.kommune.no',
    role: 'admin'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers[email];
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
