
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

    // Check for ID-Porten return
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('id-porten-auth') === 'success') {
      handleIDPortenReturn();
    }

    // Check for Entra ID return
    if (urlParams.get('entra-id-auth') === 'success') {
      handleEntraIDReturn();
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

  const handleIDPortenReturn = async () => {
    setIsLoading(true);
    
    // Simulate ID-Porten processing
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
    
    // Clean up URL and redirect directly to guardian dashboard
    window.history.replaceState({}, document.title, '/guardian');
    setIsLoading(false);
  };

  const handleEntraIDReturn = async () => {
    setIsLoading(true);
    
    // Simulate Entra ID processing
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get the email from URL params to determine which user
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email') || 'caseworker@oslo.kommune.no';
    
    const staffUser = mockUsers[email] || {
      id: 'entra-id-' + Date.now(),
      name: 'Staff User',
      email: email,
      role: 'caseworker',
      authMethod: 'entra-id'
    };
    
    setUser(staffUser);
    localStorage.setItem('user', JSON.stringify(staffUser));
    
    // Clean up URL and redirect based on role directly
    let redirectPath = '/caseworker';
    if (staffUser.role === 'admin') {
      redirectPath = '/admin';
    } else if (staffUser.role === 'staff' || staffUser.role === 'partner') {
      redirectPath = '/kindergarten';
    } else if (staffUser.role === 'district-admin') {
      redirectPath = '/district-admin';
    }
    
    window.history.replaceState({}, document.title, redirectPath);
    setIsLoading(false);
  };

  const loginWithIDPorten = async (): Promise<boolean> => {
    // Simulate opening ID-Porten in new tab
    const idPortenWindow = window.open('https://login.idporten.no/authorize/selector', '_blank');
    
    // Simulate successful authentication after a delay
    setTimeout(() => {
      if (idPortenWindow) {
        idPortenWindow.close();
      }
      // Redirect current tab directly to guardian portal
      window.location.href = window.location.origin + '/guardian?id-porten-auth=success';
    }, 500);
    
    return true;
  };

  const loginWithEntraID = async (email?: string): Promise<boolean> => {
    // Simulate opening Entra ID in new tab
    const entraIdWindow = window.open('https://login.microsoftonline.com/common/oauth2/authorize', '_blank');
    
    // Simulate successful authentication after a delay
    setTimeout(() => {
      if (entraIdWindow) {
        entraIdWindow.close();
      }
      // Determine the correct redirect path based on email and redirect directly
      let redirectPath = '/caseworker';
      if (email) {
        const domain = email.split('@')[1]?.toLowerCase();
        if (DOMAIN_CONFIG.admin.includes(domain)) {
          redirectPath = '/admin';
        } else if (DOMAIN_CONFIG.publicStaff.includes(domain) || DOMAIN_CONFIG.privateStaff.includes(domain)) {
          if (email.includes('staff') || email.includes('partner')) {
            redirectPath = '/kindergarten';
          }
        } else if (email.includes('district')) {
          redirectPath = '/district-admin';
        }
      }
      
      const emailParam = email ? `&email=${encodeURIComponent(email)}` : '';
      window.location.href = window.location.origin + `${redirectPath}?entra-id-auth=success${emailParam}`;
    }, 500);
    
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
