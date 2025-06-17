
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Filter, X, Plus, Minus } from 'lucide-react';

interface FilterField {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface AdminFiltersProps {
  isExpanded?: boolean;
  onToggle?: () => void;
  fields?: FilterField[];
  values?: Record<string, any>;
  onValuesChange?: (values: Record<string, any>) => void;
  showAdvancedFilters?: boolean;
}

const AdminFilters = ({
  isExpanded = false,
  onToggle,
  fields = [],
  values = {},
  onValuesChange,
  showAdvancedFilters = false
}: AdminFiltersProps) => {
  const [localExpanded, setLocalExpanded] = useState(isExpanded);
  
  const expanded = onToggle ? isExpanded : localExpanded;
  const handleToggle = onToggle || (() => setLocalExpanded(!localExpanded));

  const updateValue = (key: string, value: any) => {
    if (onValuesChange) {
      onValuesChange({ ...values, [key]: value });
    }
  };

  const clearAllFilters = () => {
    if (onValuesChange) {
      const clearedValues = Object.keys(values).reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {} as Record<string, any>);
      onValuesChange(clearedValues);
    }
  };

  const activeFiltersCount = Object.values(values).filter(value => {
    if (typeof value === 'string') return value !== '' && value !== 'all';
    if (typeof value === 'object' && value !== null) {
      return Object.keys(value).length > 0;
    }
    return false;
  }).length;

  const renderField = (field: FilterField) => {
    const value = values[field.key] || '';

    switch (field.type) {
      case 'select':
        return (
          <Select 
            value={value} 
            onValueChange={(newValue) => updateValue(field.key, newValue === 'all' ? '' : newValue)}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {field.label}</SelectItem>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'date':
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => updateValue(field.key, e.target.value)}
            placeholder={field.placeholder}
          />
        );
      
      default:
        return (
          <Input
            value={value}
            onChange={(e) => updateValue(field.key, e.target.value)}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Collapsible open={expanded} onOpenChange={handleToggle}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              {expanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
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
            {showAdvancedFilters ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Fields</label>
                  <div className="flex items-center gap-2 mb-2">
                    <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                      <Minus className="w-3 h-3" />
                    </Button>
                    <select className="border rounded px-2 py-1 text-sm flex-1">
                      <option value="">Select field</option>
                      <option value="firstName">First name</option>
                      <option value="lastName">Last name</option>
                      <option value="civicNumber">Civic number</option>
                      <option value="queueDate">Queue date</option>
                    </select>
                    <select className="border rounded px-2 py-1 text-sm">
                      <option value="equals">Equals</option>
                      <option value="contains">Contains</option>
                      <option value="startsWith">Starts with</option>
                    </select>
                    <select className="border rounded px-2 py-1 text-sm">
                      <option value="">Select value</option>
                    </select>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="w-3 h-3" />
                    Add Filter
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 pt-4">
                  <Button>Apply</Button>
                  <Button variant="outline">Clear</Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {fields.map((field) => (
                  <div key={field.key}>
                    <label className="text-sm font-medium mb-2 block">{field.label}</label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default AdminFilters;
