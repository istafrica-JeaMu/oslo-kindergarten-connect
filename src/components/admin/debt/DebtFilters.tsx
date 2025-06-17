
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Filter, X, Save } from 'lucide-react';
import { DebtFilters as DebtFiltersType } from '@/types/debt';

interface DebtFiltersProps {
  filters: DebtFiltersType;
  onFiltersChange: (filters: DebtFiltersType) => void;
}

const DebtFilters = ({ filters, onFiltersChange }: DebtFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof DebtFiltersType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      municipality: '',
      district: '',
      unit: '',
      status: 'all',
      escalationLevel: 'all',
      managementType: 'all',
      amountRange: {},
      daysOverdueRange: {},
      dateRange: {},
      showOnlyCurrentUnits: false,
      hasPaymentPlan: 'all'
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (typeof value === 'string') return value !== '' && value !== 'all';
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return Object.keys(value).length > 0;
    }
    if (typeof value === 'boolean') return value === true;
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
              <span className="text-sm font-medium">Advanced Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
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
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Save filter set');
                }}
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-4">
            <div className="space-y-4">
              {/* Search and Basic Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <Input
                    placeholder="Name, civic number..."
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Debt Status</label>
                  <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="in_collection">In Collection</SelectItem>
                      <SelectItem value="legal_action">Legal Action</SelectItem>
                      <SelectItem value="settled">Settled</SelectItem>
                      <SelectItem value="written_off">Written Off</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Escalation Level</label>
                  <Select value={filters.escalationLevel} onValueChange={(value) => updateFilter('escalationLevel', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All levels</SelectItem>
                      <SelectItem value="early_warning">Early Warning</SelectItem>
                      <SelectItem value="first_notice">First Notice</SelectItem>
                      <SelectItem value="final_notice">Final Notice</SelectItem>
                      <SelectItem value="collection_agency">Collection Agency</SelectItem>
                      <SelectItem value="legal_action">Legal Action</SelectItem>
                      <SelectItem value="write_off">Write Off</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Management Type</label>
                  <Select value={filters.managementType} onValueChange={(value) => updateFilter('managementType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="priority">Priority</SelectItem>
                      <SelectItem value="hardship">Hardship</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="agency">Agency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Amount and Time Ranges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Outstanding Amount (SEK)</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.amountRange.min || ''}
                      onChange={(e) => updateFilter('amountRange', { 
                        ...filters.amountRange, 
                        min: e.target.value ? Number(e.target.value) : undefined 
                      })}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.amountRange.max || ''}
                      onChange={(e) => updateFilter('amountRange', { 
                        ...filters.amountRange, 
                        max: e.target.value ? Number(e.target.value) : undefined 
                      })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Days Overdue</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.daysOverdueRange.min || ''}
                      onChange={(e) => updateFilter('daysOverdueRange', { 
                        ...filters.daysOverdueRange, 
                        min: e.target.value ? Number(e.target.value) : undefined 
                      })}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.daysOverdueRange.max || ''}
                      onChange={(e) => updateFilter('daysOverdueRange', { 
                        ...filters.daysOverdueRange, 
                        max: e.target.value ? Number(e.target.value) : undefined 
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* Date Range */}
              <div>
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
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default DebtFilters;
