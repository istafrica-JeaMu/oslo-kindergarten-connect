
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'guardian' | 'caseworker' | 'admin' | 'staff' | 'partner';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  district?: string;
  kindergartenId?: string;
  organization?: string;
  authMethod?: 'id-porten' | 'staff-login';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<boolean>;
  loginWithIDPorten: () => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  checkDomainType: (email: string) => 'guardian' | 'public-staff' | 'private-staff' | 'unknown';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Domain whitelist configuration
const DOMAIN_CONFIG = {
  publicStaff: ['oslo.kommune.no'],
  privateStaff: ['ist.com', 'privbarnehage.no'],
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
    authMethod: 'staff-login'
  },
  'admin@oslo.kommune.no': {
    id: '3',
    name: 'Ingrid Andersen',
    email: 'admin@oslo.kommune.no',
    role: 'admin',
    authMethod: 'staff-login'
  },
  'staff@oslo.kommune.no': {
    id: '4',
    name: 'Kari Olsen',
    email: 'staff@oslo.kommune.no',
    role: 'staff',
    organization: 'Oslo Kommune',
    authMethod: 'staff-login'
  },
  'partner@ist.com': {
    id: '5',
    name: 'Lars Bjørn',
    email: 'partner@ist.com',
    role: 'partner',
    organization: 'IST Private Kindergarten',
    authMethod: 'staff-login'
  },
  'partner@privbarnehage.no': {
    id: '6',
    name: 'Silje Nordahl',
    email: 'partner@privbarnehage.no',
    role: 'partner',
    organization: 'Private Barnehage AS',
    authMethod: 'staff-login'
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

    // Check for ID-Porten return
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('id-porten-auth') === 'success') {
      handleIDPortenReturn();
    }

    setIsLoading(false);
  }, []);

  const checkDomainType = (email: string): 'guardian' | 'public-staff' | 'private-staff' | 'unknown' => {
    const domain = email.split('@')[1]?.toLowerCase();
    
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

  const handleIDPortenReturn = async () => {
    setIsLoading(true);
    
    // Simulate ID-Porten processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
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
    
    // Clean up URL
    window.history.replaceState({}, document.title, window.location.pathname);
    setIsLoading(false);
  };

  const loginWithIDPorten = async (): Promise<boolean> => {
    // Redirect to mock ID-Porten
    window.location.href = 'https://login.idporten.no/authorize/selector';
    return true;
  };

  const login = async (email: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers[email];
    if (foundUser && (password === 'password' || foundUser.authMethod === 'id-porten')) {
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
