
import React from 'react';
import { Button } from '@/components/ui/button';

interface StandardMunicipalityToggleProps {
  selectedMunicipality: 'förskola' | 'fritidshem';
  onMunicipalityChange: (municipality: 'förskola' | 'fritidshem') => void;
}

const StandardMunicipalityToggle = ({ 
  selectedMunicipality, 
  onMunicipalityChange 
}: StandardMunicipalityToggleProps) => {
  return (
    <div className="flex items-center">
      <Button
        variant={selectedMunicipality === 'förskola' ? 'default' : 'outline'}
        onClick={() => onMunicipalityChange('förskola')}
        className={`rounded-r-none ${
          selectedMunicipality === 'förskola' 
            ? 'bg-teal-600 hover:bg-teal-700' 
            : ''
        }`}
        size="sm"
      >
        Förskola
      </Button>
      <Button
        variant={selectedMunicipality === 'fritidshem' ? 'default' : 'outline'}
        onClick={() => onMunicipalityChange('fritidshem')}
        className={`rounded-l-none border-l-0 ${
          selectedMunicipality === 'fritidshem' 
            ? 'bg-teal-600 hover:bg-teal-700' 
            : ''
        }`}
        size="sm"
      >
        Fritidshem
      </Button>
    </div>
  );
};

export default StandardMunicipalityToggle;
