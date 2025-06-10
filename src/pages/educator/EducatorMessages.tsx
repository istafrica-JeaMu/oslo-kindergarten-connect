
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { 
  MessageSquare, 
  Search,
  Send,
  Clock,
  User,
  Reply,
  Plus
} from 'lucide-react';
import { useState } from 'react';

const EducatorMessages = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const messages = [
    {
      id: '1',
      from: 'Anna Larsen',
      subject: 'Emma\'s pickup time change',
      content: 'Hi, I need to pick up Emma earlier today at 3:30 PM due to a doctor appointment. Is this possible?',
      timestamp: '2 hours ago',
      status: 'unread',
      child: 'Emma Larsen',
      avatar: 'AL'
    },
    {
      id: '2',
      from: 'Erik Hansen',
      subject: 'Oliver\'s allergy medication',
      content: 'Please remember that Oliver needs his allergy medication after lunch. The dosage is written on the bottle.',
      timestamp: '1 day ago',
      status: 'read',
      child: 'Oliver Hansen',
      avatar: 'EH'
    },
    {
      id: '3',
      from: 'Maria Berg',
      subject: 'Thank you note',
      content: 'Thank you for taking such good care of Lucas. He really enjoys the art activities!',
      timestamp: '2 days ago',
      status: 'read',
      child: 'Lucas Berg',
      avatar: 'MB'
    }
  ];

  const filteredMessages = messages.filter(message =>
    message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.child.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  const handleReply = (messageId: string) => {
    if (replyText.trim()) {
      console.log('Sending reply to message:', messageId, 'Content:', replyText);
      setReplyText('');
      setSelectedMessage(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Messages</h1>
          <p className="text-slate-600 mt-1">
            Communicate with guardians
            {unreadCount > 0 && (
              <span className="ml-2">
                <Badge className="bg-red-100 text-red-800">{unreadCount} unread</Badge>
              </span>
            )}
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Message
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search messages, guardians, or children..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="space-y-3">
        {filteredMessages.map((message) => (
          <Card key={message.id} className={`transition-all hover:shadow-md ${
            message.status === 'unread' ? 'border-l-4 border-l-oslo-blue bg-blue-50' : ''
          }`}>
            <CardContent className="p-6">
              {/* Message Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {message.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-slate-900">{message.from}</h3>
                    <Badge variant="outline" className="text-xs bg-slate-50">
                      {message.child}
                    </Badge>
                    {message.status === 'unread' && (
                      <Badge className="bg-oslo-blue text-white text-xs">New</Badge>
                    )}
                  </div>
                  
                  <h4 className="font-medium text-slate-800 mb-2">{message.subject}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{message.content}</p>
                </div>
                
                <div className="text-right">
                  <span className="flex items-center text-xs text-slate-500 mb-2">
                    <Clock className="w-3 h-3 mr-1" />
                    {message.timestamp}
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedMessage(selectedMessage === message.id ? null : message.id)}
                  >
                    <Reply className="w-3 h-3 mr-1" />
                    Reply
                  </Button>
                </div>
              </div>

              {/* Reply Section */}
              {selectedMessage === message.id && (
                <div className="mt-6 p-4 bg-white rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-oslo-blue rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user?.name?.split(' ').map(n => n[0]).join('') || 'T'}
                    </div>
                    <div>
                      <h5 className="font-medium text-slate-900 text-sm">Reply to {message.from}</h5>
                      <p className="text-xs text-slate-500">Regarding {message.child}</p>
                    </div>
                  </div>
                  
                  <Textarea
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="mb-3 min-h-[100px]"
                    rows={4}
                  />
                  
                  <div className="flex gap-2 justify-end">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedMessage(null);
                        setReplyText('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleReply(message.id)}
                      disabled={!replyText.trim()}
                    >
                      <Send className="w-3 h-3 mr-1" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredMessages.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-900 mb-2">No messages found</h3>
            <p className="text-slate-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'You have no messages yet'}
            </p>
            {!searchTerm && (
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Send your first message
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EducatorMessages;
