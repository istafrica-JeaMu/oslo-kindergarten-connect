
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarContent, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  MessageSquare,
  Bell,
  FileText,
  UserCheck,
  Calendar,
  Send,
  Paperclip,
  AlertTriangle,
  Clock,
  CheckCircle
} from 'lucide-react';

interface TeamMessage {
  id: string;
  sender: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  channel: string;
  urgent: boolean;
  attachments?: string[];
}

interface HandoverNote {
  id: string;
  author: string;
  shift: string;
  date: string;
  content: string;
  important: boolean;
  children: string[];
}

interface CoverageRequest {
  id: string;
  requestedBy: string;
  date: string;
  timeSlot: string;
  reason: string;
  status: 'pending' | 'covered' | 'declined';
  coveredBy?: string;
}

const TeamCollaborationHub = () => {
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [newMessage, setNewMessage] = useState('');
  const [newHandoverNote, setNewHandoverNote] = useState('');

  const [teamMessages] = useState<TeamMessage[]>([
    {
      id: '1',
      sender: 'Maria Hansen',
      senderAvatar: 'MH',
      content: 'Reminder: We have a fire drill scheduled for tomorrow at 2 PM. Please prepare the children.',
      timestamp: '2024-01-15T09:30:00',
      channel: 'general',
      urgent: true
    },
    {
      id: '2',
      sender: 'Erik Larsen',
      senderAvatar: 'EL',
      content: 'The playground equipment inspection is complete. All equipment is safe to use.',
      timestamp: '2024-01-15T08:15:00',
      channel: 'safety',
      urgent: false
    }
  ]);

  const [handoverNotes] = useState<HandoverNote[]>([
    {
      id: '1',
      author: 'Sarah Peterson',
      shift: 'Morning Shift',
      date: '2024-01-15',
      content: 'Emma had a minor scrape on her knee during outdoor play. Cleaned and bandaged. Parents informed via message.',
      important: true,
      children: ['Emma Larsen']
    },
    {
      id: '2',
      author: 'Lars Andersen',
      shift: 'Afternoon Shift',
      date: '2024-01-14',
      content: 'Oliver completed his reading assessment. Shows good progress in letter recognition.',
      important: false,
      children: ['Oliver Hansen']
    }
  ]);

  const [coverageRequests] = useState<CoverageRequest[]>([
    {
      id: '1',
      requestedBy: 'Anna Nilsen',
      date: '2024-01-18',
      timeSlot: '08:00 - 12:00',
      reason: 'Medical appointment',
      status: 'pending'
    },
    {
      id: '2',
      requestedBy: 'Per Olsen',
      date: '2024-01-20',
      timeSlot: '13:00 - 16:00',
      reason: 'Family emergency',
      status: 'covered',
      coveredBy: 'Maria Hansen'
    }
  ]);

  const channels = [
    { id: 'general', name: 'General', icon: Users },
    { id: 'safety', name: 'Safety & Incidents', icon: AlertTriangle },
    { id: 'activities', name: 'Activities', icon: Calendar },
    { id: 'announcements', name: 'Announcements', icon: Bell }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add new message logic here
    console.log('Sending message:', newMessage, 'to channel:', selectedChannel);
    setNewMessage('');
  };

  const handleAddHandoverNote = () => {
    if (!newHandoverNote.trim()) return;
    
    // Add handover note logic here
    console.log('Adding handover note:', newHandoverNote);
    setNewHandoverNote('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'covered':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Covered</Badge>;
      case 'declined':
        return <Badge className="bg-red-100 text-red-800">Declined</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Collaboration Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="messages" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="messages">Team Messages</TabsTrigger>
              <TabsTrigger value="handover">Handover Notes</TabsTrigger>
              <TabsTrigger value="coverage">Coverage Requests</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="messages" className="space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Channels</h4>
                  {channels.map((channel) => {
                    const Icon = channel.icon;
                    return (
                      <Button
                        key={channel.id}
                        variant={selectedChannel === channel.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedChannel(channel.id)}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {channel.name}
                      </Button>
                    );
                  })}
                </div>

                <div className="md:col-span-3 space-y-4">
                  <div className="h-96 overflow-y-auto space-y-3 border rounded p-3">
                    {teamMessages
                      .filter(msg => msg.channel === selectedChannel)
                      .map((message) => (
                        <div key={message.id} className="flex gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{message.senderAvatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{message.sender}</span>
                              <span className="text-xs text-gray-500">
                                {new Date(message.timestamp).toLocaleTimeString()}
                              </span>
                              {message.urgent && (
                                <Badge variant="destructive" className="text-xs">Urgent</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-700">{message.content}</p>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                    <Button variant="outline">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="handover" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add Handover Note</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Add important information for the next shift..."
                    value={newHandoverNote}
                    onChange={(e) => setNewHandoverNote(e.target.value)}
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleAddHandoverNote}>
                      <FileText className="w-4 h-4 mr-2" />
                      Add Note
                    </Button>
                    <Button variant="outline">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Mark as Important
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <h4 className="font-medium">Recent Handover Notes</h4>
                {handoverNotes.map((note) => (
                  <Card key={note.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{note.shift}</span>
                          {note.important && (
                            <Badge variant="destructive">Important</Badge>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{note.date}</span>
                      </div>
                      <p className="text-gray-700 mb-2">{note.content}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>By: {note.author}</span>
                        {note.children.length > 0 && (
                          <span>Children: {note.children.join(', ')}</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="coverage" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Request Coverage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input type="date" />
                    <Input placeholder="Time slot (e.g., 08:00 - 12:00)" />
                  </div>
                  <Textarea placeholder="Reason for coverage request..." rows={2} />
                  <Button>
                    <UserCheck className="w-4 h-4 mr-2" />
                    Request Coverage
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <h4 className="font-medium">Coverage Requests</h4>
                {coverageRequests.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="font-medium">{request.requestedBy}</span>
                          <p className="text-sm text-gray-600">{request.date} • {request.timeSlot}</p>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>
                      <p className="text-gray-700 mb-2">{request.reason}</p>
                      {request.coveredBy && (
                        <p className="text-sm text-green-600">Covered by: {request.coveredBy}</p>
                      )}
                      {request.status === 'pending' && (
                        <div className="flex gap-2 mt-3">
                          <Button size="sm">Accept Coverage</Button>
                          <Button size="sm" variant="outline">Decline</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Shared Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        Activity Templates
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        Safety Protocols
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        Emergency Procedures
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Upload Resource</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Resource name" />
                    <Button variant="outline" className="w-full">
                      <Paperclip className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                    <Button className="w-full">Upload Resource</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamCollaborationHub;
