
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Plus,
  Trash2,
  Edit,
  GripVertical,
  Type,
  CheckSquare,
  Circle,
  Calendar,
  Upload,
  Hash,
  Mail,
  Phone,
  MapPin,
  X
} from 'lucide-react';

interface QuestionTemplate {
  id: string;
  question: string;
  titleInList: string;
  type: 'open' | 'single' | 'multiple' | 'date' | 'file' | 'number' | 'email' | 'phone' | 'address';
  mandatory: boolean;
  active: boolean;
  order: number;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

interface FormTemplateBuilderProps {
  form?: any;
  onClose?: () => void;
}

const FormTemplateBuilder: React.FC<FormTemplateBuilderProps> = ({ form, onClose }) => {
  const [selectedTemplates, setSelectedTemplates] = useState<QuestionTemplate[]>([
    {
      id: '1',
      question: 'Child\'s full name',
      titleInList: 'Full Name',
      type: 'open',
      mandatory: true,
      active: true,
      order: 1
    },
    {
      id: '2',
      question: 'Date of birth',
      titleInList: 'Birth Date',
      type: 'date',
      mandatory: true,
      active: true,
      order: 2
    }
  ]);

  const [availableTemplates] = useState<QuestionTemplate[]>([
    {
      id: '3',
      question: 'Preferred kindergarten',
      titleInList: 'Kindergarten Choice',
      type: 'single',
      mandatory: true,
      active: true,
      order: 3,
      options: ['Kindergarten A', 'Kindergarten B', 'Kindergarten C']
    },
    {
      id: '4',
      question: 'Special dietary requirements',
      titleInList: 'Dietary Requirements',
      type: 'multiple',
      mandatory: false,
      active: true,
      order: 4,
      options: ['Vegetarian', 'Vegan', 'Gluten-free', 'Lactose-free', 'Nut allergy']
    }
  ]);

  const [isNewQuestionOpen, setIsNewQuestionOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState<Partial<QuestionTemplate>>({
    type: 'open',
    mandatory: false,
    active: true
  });

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

  const moveToSelected = (template: QuestionTemplate) => {
    setSelectedTemplates([...selectedTemplates, template]);
  };

  const removeFromSelected = (templateId: string) => {
    setSelectedTemplates(selectedTemplates.filter(t => t.id !== templateId));
  };

  const handleCreateQuestion = () => {
    if (newQuestion.question && newQuestion.titleInList) {
      const question: QuestionTemplate = {
        ...newQuestion,
        id: Date.now().toString(),
        order: selectedTemplates.length + 1
      } as QuestionTemplate;
      
      setSelectedTemplates([...selectedTemplates, question]);
      setNewQuestion({ type: 'open', mandatory: false, active: true });
      setIsNewQuestionOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Handle Templates</h3>
          <p className="text-sm text-slate-600">Build and customize your application form</p>
        </div>
        <Button onClick={onClose} variant="outline" size="sm">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Available Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Not selected templates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {availableTemplates.map((template) => {
              const IconComponent = questionTypeIcons[template.type];
              return (
                <div
                  key={template.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-4 h-4 text-slate-500" />
                    <div>
                      <div className="font-medium text-sm">{template.titleInList}</div>
                      <div className="text-xs text-slate-500">{template.type}</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveToSelected(template)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
            
            <Dialog open={isNewQuestionOpen} onOpenChange={setIsNewQuestionOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Add new template
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Question</DialogTitle>
                  <DialogDescription>
                    Create a new question template for your form
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="question">Question</Label>
                    <Textarea
                      id="question"
                      placeholder="Enter your question here..."
                      value={newQuestion.question || ''}
                      onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="titleInList">Title in lists</Label>
                    <Input
                      id="titleInList"
                      placeholder="Short title for lists"
                      value={newQuestion.titleInList || ''}
                      onChange={(e) => setNewQuestion({...newQuestion, titleInList: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label>Settings</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="mandatory"
                          checked={newQuestion.mandatory}
                          onCheckedChange={(checked) => setNewQuestion({...newQuestion, mandatory: !!checked})}
                        />
                        <Label htmlFor="mandatory">Mandatory</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="active"
                          checked={newQuestion.active}
                          onCheckedChange={(checked) => setNewQuestion({...newQuestion, active: !!checked})}
                        />
                        <Label htmlFor="active">Active</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Type of question</Label>
                    <RadioGroup
                      value={newQuestion.type}
                      onValueChange={(value) => setNewQuestion({...newQuestion, type: value as any})}
                      className="flex flex-wrap gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="open" id="open" />
                        <Label htmlFor="open">Open</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="single" id="single" />
                        <Label htmlFor="single">Single</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="multiple" id="multiple" />
                        <Label htmlFor="multiple">Multiple</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="date" id="date" />
                        <Label htmlFor="date">Date</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setIsNewQuestionOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateQuestion}>
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Selected Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Selected templates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {selectedTemplates.map((template) => {
              const IconComponent = questionTypeIcons[template.type];
              return (
                <div
                  key={template.id}
                  className="flex items-center justify-between p-3 border rounded-lg bg-blue-50 border-blue-200"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-4 h-4 text-slate-400 cursor-move" />
                    <IconComponent className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-medium text-sm">{template.titleInList}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant={template.mandatory ? "default" : "secondary"} className="text-xs">
                          {template.mandatory ? "Mandatory" : "Optional"}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {template.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromSelected(template.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <Button variant="outline">Display template</Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default FormTemplateBuilder;
