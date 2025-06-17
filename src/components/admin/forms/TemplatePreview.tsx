
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Type,
  CheckSquare,
  Circle,
  Calendar,
  Upload,
  Hash,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface QuestionInput {
  id: string;
  question: string;
  titleInList: string;
  type: 'open' | 'single' | 'multiple' | 'date' | 'file' | 'number' | 'email' | 'phone' | 'address';
  mandatory: boolean;
  active: boolean;
  order: number;
  options?: string[];
}

interface FormTemplate {
  id: string;
  title: string;
  description?: string;
  inputs: QuestionInput[];
  order: number;
}

interface TemplatePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  template: FormTemplate | null;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ 
  isOpen, 
  onClose, 
  template 
}) => {
  const questionTypeIcons = {
    open: Type,
    single: Circle,
    multiple: CheckSquare,
    date: Calendar,
    file: Upload,
    number: Hash,
    email: Mail,
    phone: Phone,
    address: MapPin
  };

  const getInputTypeLabel = (type: string) => {
    const labels = {
      open: 'Open Text',
      single: 'Single Choice',
      multiple: 'Multiple Choice',
      date: 'Date Picker',
      file: 'File Upload',
      number: 'Number Input',
      email: 'Email Field',
      phone: 'Phone Number',
      address: 'Address Field'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const requiredInputTypes = ['open', 'date', 'email', 'phone'];
  const presentInputTypes = template?.inputs.map(input => input.type) || [];
  const missingInputTypes = requiredInputTypes.filter(type => !presentInputTypes.includes(type));

  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Template Preview: {template.title}
          </DialogTitle>
          <DialogDescription>
            Review all inputs and check for missing required fields
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Info */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Template Information</h3>
            <p className="text-sm text-slate-600 mb-2">{template.description}</p>
            <div className="flex items-center gap-4">
              <Badge variant="outline">{template.inputs.length} inputs</Badge>
              <Badge variant={missingInputTypes.length === 0 ? "default" : "secondary"}>
                {missingInputTypes.length === 0 ? "Complete" : `${missingInputTypes.length} missing`}
              </Badge>
            </div>
          </div>

          {/* Missing Inputs Alert */}
          {missingInputTypes.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <span className="font-medium text-orange-800">Missing Required Input Types</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {missingInputTypes.map(type => (
                  <Badge key={type} variant="outline" className="text-orange-700 border-orange-300">
                    {getInputTypeLabel(type)}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Complete Inputs */}
          {template.inputs.length > 0 && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">Configured Inputs</span>
              </div>
              <div className="space-y-3">
                {template.inputs.map((input) => {
                  const IconComponent = questionTypeIcons[input.type];
                  return (
                    <div key={input.id} className="flex items-center gap-3 p-3 bg-white rounded border">
                      <IconComponent className="w-4 h-4 text-blue-600" />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{input.titleInList}</div>
                        <div className="text-xs text-slate-500">{input.question}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={input.mandatory ? "default" : "secondary"} className="text-xs">
                          {input.mandatory ? "Required" : "Optional"}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getInputTypeLabel(input.type)}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {template.inputs.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <Type className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p>No inputs configured for this template</p>
              <p className="text-sm">Add inputs to make this template functional</p>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close Preview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreview;
