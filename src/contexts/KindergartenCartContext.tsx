import React, { createContext, useContext, useState, useEffect } from 'react';

interface Kindergarten {
  id: string;
  name: string;
  address: string;
  municipality: string;
  type: 'public' | 'private';
  capacity: number;
  availableSpots: number;
  features: string[];
  ageGroups: string[];
  description: string;
}

interface KindergartenCartContextType {
  selectedKindergartens: Kindergarten[];
  addKindergarten: (kindergarten: Kindergarten) => void;
  removeKindergarten: (kindergartenId: string) => void;
  clearCart: () => void;
  isSelected: (kindergartenId: string) => boolean;
}

const KindergartenCartContext = createContext<KindergartenCartContextType | undefined>(undefined);

export const useKindergartenCart = () => {
  const context = useContext(KindergartenCartContext);
  if (!context) {
    throw new Error('useKindergartenCart must be used within a KindergartenCartProvider');
  }
  return context;
};

export const KindergartenCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedKindergartens, setSelectedKindergartens] = useState<Kindergarten[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('kindergarten-cart');
    if (saved) {
      try {
        setSelectedKindergartens(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load kindergarten cart from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('kindergarten-cart', JSON.stringify(selectedKindergartens));
  }, [selectedKindergartens]);

  const addKindergarten = (kindergarten: Kindergarten) => {
    setSelectedKindergartens(prev => {
      if (prev.find(k => k.id === kindergarten.id)) {
        return prev; // Already selected
      }
      return [...prev, kindergarten];
    });
  };

  const removeKindergarten = (kindergartenId: string) => {
    setSelectedKindergartens(prev => prev.filter(k => k.id !== kindergartenId));
  };

  const clearCart = () => {
    setSelectedKindergartens([]);
  };

  const isSelected = (kindergartenId: string) => {
    return selectedKindergartens.some(k => k.id === kindergartenId);
  };

  return (
    <KindergartenCartContext.Provider
      value={{
        selectedKindergartens,
        addKindergarten,
        removeKindergarten,
        clearCart,
        isSelected,
      }}
    >
      {children}
    </KindergartenCartContext.Provider>
  );
};

export type { Kindergarten };