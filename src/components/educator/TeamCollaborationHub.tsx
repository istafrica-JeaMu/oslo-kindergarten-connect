
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  MessageSquare, 
  Bell, 
  FileText, 
  UserCheck,
  Clock,
  Send,
  AlertTriangle
} from 'lucide-react';

interface TeamMessage {
  id: string;
  from: string;
  message: string;
  timestamp: string;
  type: 'message' | 'handover' | 'alert';
  read: boolean;
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  status: 'available' | 'busy' | 'offline';
  avatar?: string;
}

const TeamCollaborationHub = () => {
  const [newMessage, setNewMessage] = useState('');
  const [handoverNote, setHandoverNote] = useState('');

  const [teamMessages] = useState<TeamMessage[]>([
    {
      id: '1',
      from: 'Sarah Peterson',
      message: 'Emma Larsen had a small incident during playground time. Documented in her notes.',
      timestamp: '14:30',
      type: 'alert',
      read: false
    },
    {
      id: '2',
      from: 'Maria Hansen',
      message: 'All children are back from outdoor activities. Everyone accounted for.',
      timestamp: '14:15',
      type: 'handover',
      read: true
    },
    {
      id: '3',
      from: 'Erik Larsen',
      message: 'New art supplies arrived and stored in Art Room cabinet.',
      timestamp: '13:45',
      type: 'message',
      read: true
    }
  ]);

  const [staffMembers] = useState<StaffMember[]>([
    { id: '1', name: 'Sarah Peterson', role: 'Lead Educator', status: 'available' },
    { id: '2', name: 'Maria Hansen', role: 'Assistant', status: 'busy' },
    { id: '3', name: 'Erik Larsen', role: 'Educator', status: 'available' },
    { id: '4', name: 'Anna Nilsen', role: 'Substitute', status: 'offline' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'handover': return <UserCheck className="w-4 h-4 text-blue-500" />;
      default: return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="handover">Handover</TabsTrigger>
          <TabsTrigger value="staff">Team Status</TabsTrigger>
          <TabsTrigger value="coverage">Coverage</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Team Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {teamMessages.map((message) => (
                  <div key={message.id} className={`p-3 rounded-lg border ${!message.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {getMessageTypeIcon(message.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{message.from}</span>
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700">{message.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Type a message to your team..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="handover" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Shift Handover Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium text-sm">Morning Shift Notes</span>
                  </div>
                  <p className="text-sm text-gray-700">All children present. Emma needs extra attention during water play activities. New child Lucas starts tomorrow.</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Add Handover Note</label>
                <Textarea
                  placeholder="Important information for the next shift..."
                  value={handoverNote}
                  onChange={(e) => setHandoverNote(e.target.value)}
                  rows={3}
                />
                <Button disabled={!handoverNote.trim()}>
                  Add Handover Note
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {staffMembers.map((staff) => (
                  <div key={staff.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={staff.avatar} />
                        <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{staff.name}</p>
                        <p className="text-sm text-gray-600">{staff.role}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(staff.status)}>
                      {staff.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coverage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                Coverage & Substitutes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-16 flex-col">
                  <Bell className="w-5 h-5 mb-1" />
                  Request Coverage
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <Users className="w-5 h-5 mb-1" />
                  Assign Substitute
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Today's Coverage</h4>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm">Anna Nilsen covering for lunch break (12:00-13:00)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamCollaborationHub;
