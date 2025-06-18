
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { adminClasses } from '@/styles/admin-tokens';
import AdminPageHeader from './AdminPageHeader';

interface AdminLayoutProps {
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
  children: React.ReactNode;
  className?: string;
}

const AdminLayout = ({
  icon,
  title,
  description,
  breadcrumb,
  showOnlyCurrentUnits,
  onShowOnlyCurrentUnitsChange,
  selectedMunicipality,
  onMunicipalityChange,
  selectedDistrict,
  onDistrictChange,
  districtPlaceholder,
  children,
  className = ''
}: AdminLayoutProps) => {
  return (
    <div className={`${adminClasses.page} ${className}`}>
      <div className={adminClasses.container}>
        <AdminPageHeader
          icon={icon}
          title={title}
          description={description}
          breadcrumb={breadcrumb}
          showOnlyCurrentUnits={showOnlyCurrentUnits}
          onShowOnlyCurrentUnitsChange={onShowOnlyCurrentUnitsChange}
          selectedMunicipality={selectedMunicipality}
          onMunicipalityChange={onMunicipalityChange}
          selectedDistrict={selectedDistrict}
          onDistrictChange={onDistrictChange}
          districtPlaceholder={districtPlaceholder}
        />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
