
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from 'lucide-react';

interface Child {
  id: string;
  name: string;
  kindergarten: string;
}

interface ChildSelectorProps {
  children: Child[];
  selectedChild: string;
  onChildChange: (childId: string) => void;
}

const ChildSelector = ({ children, selectedChild, onChildChange }: ChildSelectorProps) => {
  return (
    <Select value={selectedChild} onValueChange={onChildChange}>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Select child" />
      </SelectTrigger>
      <SelectContent>
        {children.map((child) => (
          <SelectItem key={child.id} value={child.id}>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <div>
                <p className="font-medium">{child.name}</p>
                <p className="text-sm text-slate-500">{child.kindergarten}</p>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ChildSelector;
