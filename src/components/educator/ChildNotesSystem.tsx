
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText,
  Plus,
  Mic,
  Camera,
  Search,
  Filter,
  Calendar,
  User,
  Tag,
  Share,
  Download
} from 'lucide-react';

interface Note {
  id: string;
  childId: string;
  childName: string;
  content: string;
  category: 'behavioral' | 'learning' | 'social' | 'health' | 'general';
  educator: string;
  timestamp: string;
  attachments?: string[];
  shared: boolean;
  approved: boolean;
}

interface ChildNotesSystemProps {
  childId?: string;
  children: any[];
}

const ChildNotesSystem = ({ childId, children }: ChildNotesSystemProps) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      childId: '1',
      childName: 'Emma Larsen',
      content: 'Emma showed excellent sharing skills during block play today. She helped younger children build towers and demonstrated patience when others needed assistance.',
      category: 'behavioral',
      educator: 'Sarah Peterson',
      timestamp: '2024-01-15T10:30:00',
      attachments: [],
      shared: false,
      approved: true
    },
    {
      id: '2',
      childId: '1',
      childName: 'Emma Larsen',
      content: 'Completed puzzle independently. Shows strong problem-solving skills and persistence.',
      category: 'learning',
      educator: 'Sarah Peterson',
      timestamp: '2024-01-15T14:15:00',
      attachments: [],
      shared: true,
      approved: true
    }
  ]);

  const [selectedChild, setSelectedChild] = useState(childId || '');
  const [newNote, setNewNote] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState<string>('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isRecording, setIsRecording] = useState(false);

  const categories = [
    { value: 'behavioral', label: 'Behavioral', color: 'bg-blue-100 text-blue-800' },
    { value: 'learning', label: 'Learning', color: 'bg-green-100 text-green-800' },
    { value: 'social', label: 'Social', color: 'bg-purple-100 text-purple-800' },
    { value: 'health', label: 'Health', color: 'bg-red-100 text-red-800' },
    { value: 'general', label: 'General', color: 'bg-gray-100 text-gray-800' }
  ];

  const handleAddNote = () => {
    if (!newNote.trim() || !selectedChild) return;

    const note: Note = {
      id: Date.now().toString(),
      childId: selectedChild,
      childName: children.find(c => c.id === selectedChild)?.name || '',
      content: newNote,
      category: newNoteCategory as Note['category'],
      educator: 'Current Educator',
      timestamp: new Date().toISOString(),
      attachments: [],
      shared: false,
      approved: false
    };

    setNotes(prev => [note, ...prev]);
    setNewNote('');
    setNewNoteCategory('general');
  };

  const handleVoiceNote = () => {
    setIsRecording(!isRecording);
    // Voice recording implementation would go here
    console.log('Voice recording toggled:', !isRecording);
  };

  const filteredNotes = notes.filter(note => {
    const matchesChild = !childId || note.childId === childId;
    const matchesSearch = note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.childName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || note.category === categoryFilter;
    return matchesChild && matchesSearch && matchesCategory;
  });

  const getCategoryStyle = (category: string) => {
    return categories.find(c => c.value === category)?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Individual Child Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="add-note" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="add-note">Add Note</TabsTrigger>
              <TabsTrigger value="view-notes">View Notes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="add-note" className="space-y-4">
              {!childId && (
                <div>
                  <label className="text-sm font-medium">Select Child</label>
                  <Select value={selectedChild} onValueChange={setSelectedChild}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a child..." />
                    </SelectTrigger>
                    <SelectContent>
                      {children.map((child) => (
                        <SelectItem key={child.id} value={child.id}>
                          {child.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={newNoteCategory} onValueChange={setNewNoteCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Note Content</label>
                <Textarea
                  placeholder="Add your observation or note about the child..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddNote} disabled={!newNote.trim() || !selectedChild}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Note
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleVoiceNote}
                  className={isRecording ? 'bg-red-100 text-red-700' : ''}
                >
                  <Mic className="w-4 h-4 mr-2" />
                  {isRecording ? 'Recording...' : 'Voice Note'}
                </Button>
                <Button variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Add Photo
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="view-notes" className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search notes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                {filteredNotes.map((note) => (
                  <Card key={note.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {!childId && (
                            <span className="font-medium">{note.childName}</span>
                          )}
                          <Badge className={getCategoryStyle(note.category)}>
                            <Tag className="w-3 h-3 mr-1" />
                            {categories.find(c => c.value === note.category)?.label}
                          </Badge>
                          {note.shared && (
                            <Badge variant="outline" className="text-blue-600">
                              <Share className="w-3 h-3 mr-1" />
                              Shared
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(note.timestamp).toLocaleDateString()} {new Date(note.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{note.content}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {note.educator}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Share with Guardian
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-3 h-3 mr-1" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildNotesSystem;
