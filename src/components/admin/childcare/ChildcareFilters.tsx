
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Filter, X } from 'lucide-react';
import { FilterState } from '@/types/childcare';

interface ChildcareFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const ChildcareFilters = ({ filters, onFiltersChange }: ChildcareFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      department: '',
      rateCategory: '',
      reasonType: '',
      dateRange: {},
      showOnlyCurrentUnits: false
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (typeof value === 'string') return value !== '' && value !== 'all';
    if (typeof value === 'object' && value !== null) {
      return Object.keys(value).length > 0;
    }
    return false;
  }).length;

  return (
    <Card>
      <CardContent className="pt-6">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              {isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  clearAllFilters();
                }}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
                Clear all
              </Button>
            )}
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <Input
                  placeholder="Child name or civic number..."
                  value={filters.search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                />
              </div>

              {/* Department */}
              <div>
                <label className="text-sm font-medium mb-2 block">Department</label>
                <Select value={filters.department || 'all'} onValueChange={(value) => updateFilter('department', value === 'all' ? '' : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All departments</SelectItem>
                    <SelectItem value="Sunflower Group">Sunflower Group</SelectItem>
                    <SelectItem value="Rainbow Group">Rainbow Group</SelectItem>
                    <SelectItem value="Star Group">Star Group</SelectItem>
                    <SelectItem value="Moon Group">Moon Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rate Category */}
              <div>
                <label className="text-sm font-medium mb-2 block">Rate Category</label>
                <Select value={filters.rateCategory || 'all'} onValueChange={(value) => updateFilter('rateCategory', value === 'all' ? '' : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    <SelectItem value="Full Time">Full Time</SelectItem>
                    <SelectItem value="Part Time">Part Time</SelectItem>
                    <SelectItem value="Flexible">Flexible</SelectItem>
                    <SelectItem value="Special Needs">Special Needs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reason Type */}
              <div>
                <label className="text-sm font-medium mb-2 block">Reason Type</label>
                <Select value={filters.reasonType || 'all'} onValueChange={(value) => updateFilter('reasonType', value === 'all' ? '' : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All reasons" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All reasons</SelectItem>
                    <SelectItem value="Regular admission">Regular admission</SelectItem>
                    <SelectItem value="Special needs">Special needs</SelectItem>
                    <SelectItem value="Transfer">Transfer</SelectItem>
                    <SelectItem value="Emergency placement">Emergency placement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date Range */}
            <div className="mt-4">
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="date"
                  placeholder="Start date"
                  value={filters.dateRange.start || ''}
                  onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, start: e.target.value })}
                />
                <Input
                  type="date"
                  placeholder="End date"
                  value={filters.dateRange.end || ''}
                  onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, end: e.target.value })}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default ChildcareFilters;
