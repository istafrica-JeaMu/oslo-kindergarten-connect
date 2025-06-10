
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
  Reply
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
      child: 'Emma Larsen'
    },
    {
      id: '2',
      from: 'Erik Hansen',
      subject: 'Oliver\'s allergy medication',
      content: 'Please remember that Oliver needs his allergy medication after lunch. The dosage is written on the bottle.',
      timestamp: '1 day ago',
      status: 'read',
      child: 'Oliver Hansen'
    },
    {
      id: '3',
      from: 'Maria Berg',
      subject: 'Thank you note',
      content: 'Thank you for taking such good care of Lucas. He really enjoys the art activities!',
      timestamp: '2 days ago',
      status: 'read',
      child: 'Lucas Berg'
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
      // Handle reply logic here
      setReplyText('');
      setSelectedMessage(null);
    }
  };

  return (
    <div className="space-y-6">
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
          <Send className="w-4 h-4 mr-2" />
          New Message
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Messages List */}
      <div className="grid gap-4">
        {filteredMessages.map((message) => (
          <Card key={message.id} className={`hover:shadow-md transition-shadow cursor-pointer ${
            message.status === 'unread' ? 'border-oslo-blue border-2' : ''
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5 text-slate-500" />
                    <h3 className="font-semibold text-slate-900">{message.from}</h3>
                    <Badge variant="outline" className="text-xs">
                      {message.child}
                    </Badge>
                    {message.status === 'unread' && (
                      <Badge className="bg-oslo-blue text-white text-xs">New</Badge>
                    )}
                  </div>
                  
                  <h4 className="font-medium text-slate-800 mb-2">{message.subject}</h4>
                  <p className="text-slate-600 text-sm mb-3">{message.content}</p>
                  
                  <div className="flex items-center gap-4">
                    <span className="flex items-center text-xs text-slate-500">
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

                  {/* Reply Section */}
                  {selectedMessage === message.id && (
                    <div className="mt-4 p-4 bg-slate-50 rounded-lg border">
                      <h5 className="font-medium text-slate-900 mb-2">Reply to {message.from}</h5>
                      <Textarea
                        placeholder="Type your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="mb-3"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => handleReply(message.id)}
                          disabled={!replyText.trim()}
                        >
                          <Send className="w-3 h-3 mr-1" />
                          Send Reply
                        </Button>
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
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No messages found</h3>
            <p className="text-slate-600">Try adjusting your search terms</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EducatorMessages;
