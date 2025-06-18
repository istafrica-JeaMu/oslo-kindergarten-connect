
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LucideIcon } from 'lucide-react';
import UniversalMunicipalityToggle from './UniversalMunicipalityToggle';
import { adminClasses } from '@/styles/admin-tokens';

interface AdminPageHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  breadcrumb?: string[];
  showOnlyCurrentUnits?: boolean;
  onShowOnlyCurrentUnitsChange?: (checked: boolean) => void;
  selectedMunicipality?: 'förskola' | 'fritidshem';
  onMunicipalityChange?: (municipality: 'förskola' | 'fritidshem') => void;
  selectedDistrict?: string;
  onDistrictChange?: (district: string) => void;
  districtPlaceholder?: string;
}

const AdminPageHeader = ({
  icon: Icon,
  title,
  description,
  breadcrumb,
  showOnlyCurrentUnits,
  onShowOnlyCurrentUnitsChange,
  selectedMunicipality,
  onMunicipalityChange,
  selectedDistrict,
  onDistrictChange,
  districtPlaceholder = "Select district..."
}: AdminPageHeaderProps) => {
  return (
    <div className={adminClasses.spacingY}>
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Icon className="w-8 h-8 text-teal-600" />
        <div>
          <h1 className={adminClasses.pageTitle}>{title}</h1>
          <p className={adminClasses.pageDescription}>{description}</p>
        </div>
      </div>

      {/* Controls Section */}
      <Card className={adminClasses.card}>
        <CardContent className="pt-6">
          <div className={adminClasses.flexBetween}>
            {/* Left side - Bullet point, text, and checkbox in a row */}
            <div className="flex items-center gap-6">
              {/* Bullet point and text */}
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span className="font-medium text-base">
                  {breadcrumb ? breadcrumb[breadcrumb.length - 1] : 'Manage admissions'}
                </span>
              </div>
              
              {/* Checkbox */}
              {onShowOnlyCurrentUnitsChange && (
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="current-units"
                    checked={showOnlyCurrentUnits}
                    onCheckedChange={(checked) => onShowOnlyCurrentUnitsChange(checked === true)}
                  />
                  <label htmlFor="current-units" className="text-sm font-medium">
                    Show only current units
                  </label>
                </div>
              )}
            </div>

            {/* Right side - Municipality buttons and district dropdown */}
            <div className="flex items-center gap-4">
              {/* Municipality Toggle */}
              {onMunicipalityChange && selectedMunicipality && (
                <UniversalMunicipalityToggle
                  selectedMunicipality={selectedMunicipality}
                  onMunicipalityChange={onMunicipalityChange}
                  size="sm"
                />
              )}

              {/* District Selection Dropdown */}
              {onDistrictChange && (
                <div className="min-w-[200px]">
                  <Select value={selectedDistrict || ''} onValueChange={onDistrictChange}>
                    <SelectTrigger className="bg-teal-600 text-white border-teal-700 hover:bg-teal-700">
                      <SelectValue placeholder={districtPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="norra-distriktet">Norra Distriktet</SelectItem>
                      <SelectItem value="arnoldpreschool2">ArnoldPreSchool2</SelectItem>
                      <SelectItem value="sodra-distriktet">Södra Distriktet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPageHeader;
