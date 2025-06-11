
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'guardian' | 'caseworker' | 'staff' | 'partner' | 'district-admin' | 'educator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  district?: string;
  organization?: string;
  authMethod?: 'id-porten' | 'entra-id';
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithIDPorten: () => Promise<void>;
  loginWithEntraID: (email: string) => Promise<void>;
  checkDomainType: (email: string) => 'guardian' | 'public-staff' | 'private-staff' | 'admin' | 'unknown';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Admin User',
    email: 'admin@oslo.kommune.no',
    role: 'admin',
    district: 'Oslo Municipality',
    organization: 'Oslo Municipality',
    authMethod: 'entra-id'
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const loginWithIDPorten = async () => {
    setIsLoading(true);
    // Simulate ID-Porten login for guardian
    setTimeout(() => {
      setUser({
        id: '2',
        name: 'Guardian User',
        email: 'guardian@example.no',
        role: 'guardian',
        district: 'Oslo Municipality',
        organization: 'Guardian Portal',
        authMethod: 'id-porten'
      });
      setIsLoading(false);
    }, 1000);
  };

  const loginWithEntraID = async (email: string) => {
    setIsLoading(true);
    // Simulate Entra ID login based on email domain
    setTimeout(() => {
      const domainType = checkDomainType(email);
      let userData: User;
      
      switch (domainType) {
        case 'admin':
          userData = {
            id: '1',
            name: 'Admin User',
            email: email,
            role: 'admin',
            district: 'Oslo Municipality',
            organization: 'Oslo Municipality',
            authMethod: 'entra-id'
          };
          break;
        case 'public-staff':
          if (email.includes('caseworker')) {
            userData = {
              id: '3',
              name: 'Case Worker',
              email: email,
              role: 'caseworker',
              district: 'Oslo Municipality',
              organization: 'Oslo Municipality',
              authMethod: 'entra-id'
            };
          } else if (email.includes('educator')) {
            userData = {
              id: '4',
              name: 'Educator',
              email: email,
              role: 'educator',
              district: 'Oslo Municipality',
              organization: 'Solbakken Kindergarten',
              authMethod: 'entra-id'
            };
          } else if (email.includes('district')) {
            userData = {
              id: '5',
              name: 'District Admin',
              email: email,
              role: 'district-admin',
              district: 'Oslo Municipality',
              organization: 'Oslo Municipality',
              authMethod: 'entra-id'
            };
          } else {
            userData = {
              id: '6',
              name: 'Staff User',
              email: email,
              role: 'staff',
              district: 'Oslo Municipality',
              organization: 'Public Kindergarten',
              authMethod: 'entra-id'
            };
          }
          break;
        case 'private-staff':
          userData = {
            id: '7',
            name: 'Partner Staff',
            email: email,
            role: 'partner',
            district: 'Oslo Municipality',
            organization: 'IST Private Kindergarten',
            authMethod: 'entra-id'
          };
          break;
        default:
          userData = {
            id: '2',
            name: 'Guardian User',
            email: email,
            role: 'guardian',
            district: 'Oslo Municipality',
            organization: 'Guardian Portal',
            authMethod: 'id-porten'
          };
      }
      
      setUser(userData);
      setIsLoading(false);
    }, 1000);
  };

  const checkDomainType = (email: string): 'guardian' | 'public-staff' | 'private-staff' | 'admin' | 'unknown' => {
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (domain === 'admin.oslo.kommune.no') {
      return 'admin';
    } else if (domain === 'oslo.kommune.no') {
      return 'public-staff';
    } else if (domain === 'ist.com' || domain === 'privbarnehage.no') {
      return 'private-staff';
    } else if (domain && (domain.includes('gmail') || domain.includes('hotmail') || domain.includes('yahoo'))) {
      return 'guardian';
    }
    
    return 'unknown';
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated, 
      isLoading,
      loginWithIDPorten,
      loginWithEntraID,
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
