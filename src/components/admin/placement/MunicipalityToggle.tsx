
import React from 'react';
import { Button } from '@/components/ui/button';

interface MunicipalityToggleProps {
  selectedMunicipality: 'förskola' | 'fritidshem';
  onMunicipalityChange: (municipality: 'förskola' | 'fritidshem') => void;
}

const MunicipalityToggle = ({ selectedMunicipality, onMunicipalityChange }: MunicipalityToggleProps) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium">Municipality Type:</span>
      <div className="flex border rounded-lg overflow-hidden">
        <Button
          variant={selectedMunicipality === 'förskola' ? 'default' : 'ghost'}
          className={`rounded-none border-0 ${
            selectedMunicipality === 'förskola' 
              ? 'bg-oslo-blue text-white' 
              : 'bg-white text-slate-600 hover:bg-slate-50'
          }`}
          onClick={() => onMunicipalityChange('förskola')}
        >
          Förskola
        </Button>
        <Button
          variant={selectedMunicipality === 'fritidshem' ? 'default' : 'ghost'}
          className={`rounded-none border-0 ${
            selectedMunicipality === 'fritidshem' 
              ? 'bg-oslo-blue text-white' 
              : 'bg-white text-slate-600 hover:bg-slate-50'
          }`}
          onClick={() => onMunicipalityChange('fritidshem')}
        >
          Fritidshem
        </Button>
      </div>
    </div>
  );
};

export default MunicipalityToggle;
