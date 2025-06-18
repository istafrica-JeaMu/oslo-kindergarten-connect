
import React from 'react';
import { Button } from '@/components/ui/button';
import { adminTokens } from '@/styles/admin-tokens';

interface UniversalMunicipalityToggleProps {
  selectedMunicipality: 'förskola' | 'fritidshem';
  onMunicipalityChange: (municipality: 'förskola' | 'fritidshem') => void;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

const UniversalMunicipalityToggle = ({
  selectedMunicipality,
  onMunicipalityChange,
  size = 'sm',
  className = ''
}: UniversalMunicipalityToggleProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Button
        variant={selectedMunicipality === 'förskola' ? 'default' : 'outline'}
        onClick={() => onMunicipalityChange('förskola')}
        className={`rounded-r-none ${
          selectedMunicipality === 'förskola' 
            ? 'bg-teal-600 hover:bg-teal-700 text-white border-teal-600' 
            : 'border-gray-300 hover:bg-gray-50'
        }`}
        size={size}
      >
        Förskola
      </Button>
      <Button
        variant={selectedMunicipality === 'fritidshem' ? 'default' : 'outline'}
        onClick={() => onMunicipalityChange('fritidshem')}
        className={`rounded-l-none border-l-0 ${
          selectedMunicipality === 'fritidshem' 
            ? 'bg-teal-600 hover:bg-teal-700 text-white border-teal-600' 
            : 'border-gray-300 hover:bg-gray-50'
        }`}
        size={size}
      >
        Fritidshem
      </Button>
    </div>
  );
};

export default UniversalMunicipalityToggle;
