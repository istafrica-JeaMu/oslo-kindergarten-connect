
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

interface District {
  id: string;
  name: string;
  municipality: string;
  formCount: number;
}

interface DistrictSelectorProps {
  selectedDistrict: District | null;
  onDistrictSelect: (district: District) => void;
}

const DistrictSelector: React.FC<DistrictSelectorProps> = ({ 
  selectedDistrict, 
  onDistrictSelect 
}) => {
  const districts: District[] = [
    {
      id: '1',
      name: 'Central District',
      municipality: 'Oslo Municipality',
      formCount: 2
    },
    {
      id: '2',
      name: 'Eastern District',
      municipality: 'Oslo Municipality',
      formCount: 2
    },
    {
      id: '3',
      name: 'Western District',
      municipality: 'Bergen Municipality',
      formCount: 2
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Select District
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {districts.map((district) => (
            <div
              key={district.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                selectedDistrict?.id === district.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onDistrictSelect(district)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{district.name}</h3>
                {selectedDistrict?.id === district.id && (
                  <Badge variant="default" className="text-xs">Selected</Badge>
                )}
              </div>
              <p className="text-sm text-slate-600 mb-2">{district.municipality}</p>
              <div className="text-xs text-slate-500">
                {district.formCount} forms available
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DistrictSelector;
