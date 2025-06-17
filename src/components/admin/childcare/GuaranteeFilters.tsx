
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';

interface GuaranteeFiltersProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const GuaranteeFilters = ({ isExpanded, onToggle }: GuaranteeFiltersProps) => {
  return (
    <Card className="mb-6">
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-4 h-auto">
            <div className="flex items-center gap-2">
              <span className="font-medium">Filters</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
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
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default GuaranteeFilters;
