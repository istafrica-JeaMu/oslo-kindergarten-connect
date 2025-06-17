
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Baby } from 'lucide-react';
import { Municipality } from '@/types/childcare';

interface ChildcareHeaderProps {
  selectedMunicipality: Municipality;
  onMunicipalityChange: (municipality: Municipality) => void;
  selectedSchool: string;
  onSchoolChange: (school: string) => void;
  showOnlyCurrentUnits: boolean;
  onShowOnlyCurrentUnitsChange: (checked: boolean) => void;
}

const ChildcareHeader = ({
  selectedMunicipality,
  onMunicipalityChange,
  selectedSchool,
  onSchoolChange,
  showOnlyCurrentUnits,
  onShowOnlyCurrentUnitsChange
}: ChildcareHeaderProps) => {
  const schools = [
    'ArnoldPreSchool2',
    'Sunshine Daycare',
    'Rainbow Learning Center',
    'Little Explorers',
    'Happy Kids Academy'
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Baby className="w-8 h-8 text-pink-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Childcare Member Management</h1>
          <p className="text-slate-600">Comprehensive management of childcare admissions and placements</p>
        </div>
      </div>

      {/* Compact Controls */}
      <Card>
        <CardContent className="pt-6">
          {/* Single row layout for better space utilization */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left side - Manage admissions with controls */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span className="font-medium">Manage admissions</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="current-units"
                  checked={showOnlyCurrentUnits}
                  onCheckedChange={onShowOnlyCurrentUnitsChange}
                />
                <label htmlFor="current-units" className="text-sm font-medium">
                  Show only current units
                </label>
              </div>
            </div>

            {/* Right side - Municipality and School selection */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Municipality Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={selectedMunicipality === 'förskola' ? 'default' : 'outline'}
                  onClick={() => onMunicipalityChange('förskola')}
                  className={selectedMunicipality === 'förskola' ? 'bg-teal-600 hover:bg-teal-700' : ''}
                  size="sm"
                >
                  Förskola
                </Button>
                <Button
                  variant={selectedMunicipality === 'fritidshem' ? 'default' : 'outline'}
                  onClick={() => onMunicipalityChange('fritidshem')}
                  className={selectedMunicipality === 'fritidshem' ? 'bg-teal-600 hover:bg-teal-700' : ''}
                  size="sm"
                >
                  Fritidshem
                </Button>
              </div>

              {/* School Selection */}
              <div className="min-w-[200px]">
                <Select value={selectedSchool} onValueChange={onSchoolChange}>
                  <SelectTrigger className="bg-teal-600 text-white border-teal-700">
                    <SelectValue placeholder="Select school..." />
                  </SelectTrigger>
                  <SelectContent>
                    {schools.map((school) => (
                      <SelectItem key={school} value={school}>
                        {school}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildcareHeader;
