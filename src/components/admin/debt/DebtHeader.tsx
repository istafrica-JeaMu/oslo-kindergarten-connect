
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Building, GraduationCap } from 'lucide-react';

interface DebtHeaderProps {
  selectedMunicipality: 'förskola' | 'fritidshem';
  onMunicipalityChange: (municipality: 'förskola' | 'fritidshem') => void;
  selectedDistrict: string;
  onDistrictChange: (district: string) => void;
  showOnlyCurrentUnits: boolean;
  onShowOnlyCurrentUnitsChange: (show: boolean) => void;
}

const DebtHeader = ({
  selectedMunicipality,
  onMunicipalityChange,
  selectedDistrict,
  onDistrictChange,
  showOnlyCurrentUnits,
  onShowOnlyCurrentUnitsChange
}: DebtHeaderProps) => {
  const districts = [
    'Norra Distriktet',
    'Södra Distriktet',
    'Västra Distriktet',
    'Östra Distriktet',
    'Centrala Distriktet'
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Municipality Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700">Municipality:</span>
            <div className="flex bg-slate-100 rounded-lg p-1">
              <Button
                variant={selectedMunicipality === 'förskola' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onMunicipalityChange('förskola')}
                className="flex items-center gap-2"
              >
                <Building className="w-4 h-4" />
                Förskola
              </Button>
              <Button
                variant={selectedMunicipality === 'fritidshem' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onMunicipalityChange('fritidshem')}
                className="flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                Fritidshem
              </Button>
            </div>
          </div>

          {/* District Selection and Options */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700">District:</span>
              <Select value={selectedDistrict} onValueChange={onDistrictChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="current-units"
                checked={showOnlyCurrentUnits}
                onCheckedChange={onShowOnlyCurrentUnitsChange}
              />
              <label
                htmlFor="current-units"
                className="text-sm font-medium text-slate-700"
              >
                Show only current units
              </label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DebtHeader;
