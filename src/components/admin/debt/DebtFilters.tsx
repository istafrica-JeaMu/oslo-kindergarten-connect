
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Search, Filter, ChevronDown, ChevronUp, X, Save, Star } from 'lucide-react';
import { DebtFilters as DebtFiltersType } from '@/types/debt';

interface DebtFiltersProps {
  filters: DebtFiltersType;
  onFiltersChange: (filters: DebtFiltersType) => void;
}

const DebtFilters = ({ filters, onFiltersChange }: DebtFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [savedFilters, setSavedFilters] = useState<{ name: string; filters: DebtFiltersType }[]>([
    { name: 'High Risk Debts', filters: { ...filters, riskScore: { min: 70 }, daysOverdueRange: { min: 30 } } },
    { name: 'Legal Action Ready', filters: { ...filters, escalationLevel: 'final_notice', amountRange: { min: 5000 } } },
    { name: 'Payment Plans', filters: { ...filters, hasPaymentPlan: true } }
  ]);

  const units = [
    'Sunflower Preschool',
    'Rainbow After-School',
    'Moonbeam Kindergarten',
    'Starlight Center',
    'Forest Friends Preschool'
  ];

  const collectors = [
    'Anna Lindberg',
    'Erik Johansson',
    'Maria Svensson',
    'Lars Andersson'
  ];

  const updateFilter = (key: keyof DebtFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const updateRangeFilter = (key: 'amountRange' | 'daysOverdueRange' | 'riskScore', subKey: 'min' | 'max', value: string) => {
    const numValue = value ? parseFloat(value) : undefined;
    onFiltersChange({
      ...filters,
      [key]: {
        ...filters[key],
        [subKey]: numValue
      }
    });
  };

  const clearFilters = () => {
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
      hasPaymentPlan: 'all',
      riskScore: {},
      assignedCollector: '',
      fraudRisk: 'all',
      communicationStatus: 'all'
    });
  };

  const applySavedFilter = (savedFilter: { name: string; filters: DebtFiltersType }) => {
    onFiltersChange(savedFilter.filters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.municipality) count++;
    if (filters.unit) count++;
    if (filters.status !== 'all') count++;
    if (filters.escalationLevel !== 'all') count++;
    if (filters.managementType !== 'all') count++;
    if (filters.amountRange.min || filters.amountRange.max) count++;
    if (filters.daysOverdueRange.min || filters.daysOverdueRange.max) count++;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    if (filters.hasPaymentPlan !== 'all') count++;
    if (filters.riskScore.min || filters.riskScore.max) count++;
    if (filters.assignedCollector) count++;
    if (filters.fraudRisk !== 'all') count++;
    if (filters.communicationStatus !== 'all') count++;
    return count;
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Primary Search and Quick Filters */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search by guardian name, child name, or civic number..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="in_collection">In Collection</SelectItem>
                <SelectItem value="legal_action">Legal Action</SelectItem>
                <SelectItem value="settled">Settled</SelectItem>
                <SelectItem value="written_off">Written Off</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.escalationLevel} onValueChange={(value) => updateFilter('escalationLevel', value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Escalation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="early_warning">Early Warning</SelectItem>
                <SelectItem value="first_notice">First Notice</SelectItem>
                <SelectItem value="final_notice">Final Notice</SelectItem>
                <SelectItem value="collection_agency">Collection Agency</SelectItem>
                <SelectItem value="legal_action">Legal Action</SelectItem>
                <SelectItem value="write_off">Write Off</SelectItem>
              </SelectContent>
            </Select>

            <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Advanced Filters
                  {getActiveFilterCount() > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {getActiveFilterCount()}
                    </Badge>
                  )}
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
          </div>

          {/* Saved Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-slate-600">Quick Filters:</span>
            {savedFilters.map((savedFilter) => (
              <Button
                key={savedFilter.name}
                variant="outline"
                size="sm"
                onClick={() => applySavedFilter(savedFilter)}
                className="gap-1"
              >
                <Star className="w-3 h-3" />
                {savedFilter.name}
              </Button>
            ))}
          </div>

          {/* Advanced Filters */}
          <CollapsibleContent>
            <div className="space-y-6 border-t pt-6">
              {/* Basic Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Unit</label>
                  <Select value={filters.unit} onValueChange={(value) => updateFilter('unit', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All units" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All units</SelectItem>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
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
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="priority">Priority</SelectItem>
                      <SelectItem value="hardship">Hardship</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="agency">Agency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Assigned Collector</label>
                  <Select value={filters.assignedCollector} onValueChange={(value) => updateFilter('assignedCollector', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All collectors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All collectors</SelectItem>
                      {collectors.map((collector) => (
                        <SelectItem key={collector} value={collector}>
                          {collector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Range Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Amount Range (SEK)</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.amountRange.min || ''}
                      onChange={(e) => updateRangeFilter('amountRange', 'min', e.target.value)}
                    />
                    <span className="text-slate-400">to</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.amountRange.max || ''}
                      onChange={(e) => updateRangeFilter('amountRange', 'max', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Days Overdue</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.daysOverdueRange.min || ''}
                      onChange={(e) => updateRangeFilter('daysOverdueRange', 'min', e.target.value)}
                    />
                    <span className="text-slate-400">to</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.daysOverdueRange.max || ''}
                      onChange={(e) => updateRangeFilter('daysOverdueRange', 'max', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Risk Score</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      min="0"
                      max="100"
                      value={filters.riskScore.min || ''}
                      onChange={(e) => updateRangeFilter('riskScore', 'min', e.target.value)}
                    />
                    <span className="text-slate-400">to</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      min="0"
                      max="100"
                      value={filters.riskScore.max || ''}
                      onChange={(e) => updateRangeFilter('riskScore', 'max', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* AI and Communication Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Fraud Risk</label>
                  <Select value={filters.fraudRisk} onValueChange={(value) => updateFilter('fraudRisk', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All risk levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Risk Levels</SelectItem>
                      <SelectItem value="low">Low Risk (0-30)</SelectItem>
                      <SelectItem value="medium">Medium Risk (31-70)</SelectItem>
                      <SelectItem value="high">High Risk (71-100)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Communication Status</label>
                  <Select value={filters.communicationStatus} onValueChange={(value) => updateFilter('communicationStatus', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="responded">Responded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Payment Plan</label>
                  <Select value={filters.hasPaymentPlan.toString()} onValueChange={(value) => updateFilter('hasPaymentPlan', value === 'true' ? true : value === 'false' ? false : 'all')}>
                    <SelectTrigger>
                      <SelectValue placeholder="All debts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Debts</SelectItem>
                      <SelectItem value="true">With Payment Plan</SelectItem>
                      <SelectItem value="false">Without Payment Plan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">From Date</label>
                  <Input
                    type="date"
                    value={filters.dateRange.start || ''}
                    onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, start: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">To Date</label>
                  <Input
                    type="date"
                    value={filters.dateRange.end || ''}
                    onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, end: e.target.value })}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t">
                <Button onClick={clearFilters} variant="outline" className="gap-2">
                  <X className="w-4 h-4" />
                  Clear All Filters
                </Button>
                <Button variant="outline" className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Filter Set
                </Button>
                <div className="text-sm text-slate-600">
                  {getActiveFilterCount()} active filter{getActiveFilterCount() !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </CardContent>
    </Card>
  );
};

export default DebtFilters;
