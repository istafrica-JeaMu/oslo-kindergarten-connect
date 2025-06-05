
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'guardian' | 'caseworker' | 'admin' | 'staff' | 'partner' | 'district-admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  district?: string;
  kindergartenId?: string;
  organization?: string;
  authMethod?: 'id-porten' | 'entra-id';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<boolean>;
  loginWithIDPorten: () => Promise<boolean>;
  loginWithEntraID: (email?: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  checkDomainType: (email: string) => 'guardian' | 'public-staff' | 'private-staff' | 'admin' | 'unknown';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Domain whitelist configuration
const DOMAIN_CONFIG = {
  publicStaff: ['oslo.kommune.no'],
  privateStaff: ['ist.com', 'privbarnehage.no'],
  admin: ['admin.oslo.kommune.no', 'admin.ist.com'],
};

// Mock users for demonstration
const mockUsers: Record<string, User> = {
  'guardian@example.com': {
    id: '1',
    name: 'Anna Hansen',
    email: 'guardian@example.com',
    role: 'guardian',
    authMethod: 'id-porten'
  },
  'caseworker@oslo.kommune.no': {
    id: '2',
    name: 'Erik Johansen',
    email: 'caseworker@oslo.kommune.no',
    role: 'caseworker',
    district: 'Søndre Nordstrand',
    authMethod: 'entra-id'
  },
  'admin@admin.oslo.kommune.no': {
    id: '3',
    name: 'Ingrid Andersen',
    email: 'admin@admin.oslo.kommune.no',
    role: 'admin',
    authMethod: 'entra-id'
  },
  'staff@oslo.kommune.no': {
    id: '4',
    name: 'Kari Olsen',
    email: 'staff@oslo.kommune.no',
    role: 'staff',
    organization: 'Oslo Kommune',
    authMethod: 'entra-id'
  },
  'partner@ist.com': {
    id: '5',
    name: 'Lars Bjørn',
    email: 'partner@ist.com',
    role: 'partner',
    organization: 'IST Private Kindergarten',
    authMethod: 'entra-id'
  },
  'partner@privbarnehage.no': {
    id: '6',
    name: 'Silje Nordahl',
    email: 'partner@privbarnehage.no',
    role: 'partner',
    organization: 'Private Barnehage AS',
    authMethod: 'entra-id'
  },
  'district@oslo.kommune.no': {
    id: '7',
    name: 'Ola Nordmann',
    email: 'district@oslo.kommune.no',
    role: 'district-admin',
    district: 'Bydel Sentrum',
    authMethod: 'entra-id'
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

  const checkDomainType = (email: string): 'guardian' | 'public-staff' | 'private-staff' | 'admin' | 'unknown' => {
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (DOMAIN_CONFIG.admin.includes(domain)) {
      return 'admin';
    }
    
    if (DOMAIN_CONFIG.publicStaff.includes(domain)) {
      return 'public-staff';
    }
    
    if (DOMAIN_CONFIG.privateStaff.includes(domain)) {
      return 'private-staff';
    }
    
    // Check if it's a known guardian email or assume guardian for unknown domains initially
    if (email === 'guardian@example.com' || domain) {
      return 'guardian';
    }
    
    return 'unknown';
  };

  const loginWithIDPorten = async (): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock guardian user from ID-Porten
    const guardianUser: User = {
      id: 'id-porten-' + Date.now(),
      name: 'Anna Hansen',
      email: 'anna.hansen@example.com',
      role: 'guardian',
      authMethod: 'id-porten'
    };
    
    setUser(guardianUser);
    localStorage.setItem('user', JSON.stringify(guardianUser));
    setIsLoading(false);
    return true;
  };

  const loginWithEntraID = async (email?: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const defaultEmail = email || 'caseworker@oslo.kommune.no';
    const staffUser = mockUsers[defaultEmail] || {
      id: 'entra-id-' + Date.now(),
      name: 'Staff User',
      email: defaultEmail,
      role: 'caseworker',
      authMethod: 'entra-id'
    };
    
    setUser(staffUser);
    localStorage.setItem('user', JSON.stringify(staffUser));
    setIsLoading(false);
    return true;
  };

  const login = async (email: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = mockUsers[email];
    if (foundUser && (password === 'password' || foundUser.authMethod === 'entra-id')) {
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
    <AuthContext.Provider value={{ 
      user, 
      login, 
      loginWithIDPorten,
      loginWithEntraID,
      logout, 
      isLoading, 
      checkDomainType 
    }}>
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
