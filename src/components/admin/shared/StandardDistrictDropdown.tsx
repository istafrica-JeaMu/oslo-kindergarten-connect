
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StandardDistrictDropdownProps {
  selectedDistrict?: string;
  onDistrictChange: (district: string) => void;
  placeholder?: string;
}

const StandardDistrictDropdown = ({
  selectedDistrict,
  onDistrictChange,
  placeholder = "Select district..."
}: StandardDistrictDropdownProps) => {
  return (
    <div className="min-w-[200px]">
      <Select value={selectedDistrict || ''} onValueChange={onDistrictChange}>
        <SelectTrigger className="bg-teal-600 text-white border-teal-700 hover:bg-teal-700">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="norra-distriktet">Norra Distriktet</SelectItem>
          <SelectItem value="arnoldpreschool2">ArnoldPreSchool2</SelectItem>
          <SelectItem value="sodra-distriktet">Södra Distriktet</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StandardDistrictDropdown;
