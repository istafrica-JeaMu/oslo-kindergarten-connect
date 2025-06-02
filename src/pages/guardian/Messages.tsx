
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Paperclip, Archive, Star, Search } from 'lucide-react';

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  // Mock message data
  const messages = [
    {
      id: 1,
      from: 'Løvenskiold Kindergarten',
      fromEmail: 'contact@lovenskiold.kindergarten.oslo.no',
      subject: 'Welcome to Løvenskiold Kindergarten!',
      preview: 'We are excited to welcome Emma to our kindergarten community...',
      content: `Dear Anna Hansen,

We are excited to welcome Emma to our kindergarten community!

As part of the preparations for starting, we would like to inform you about the following:

• First day: Monday, August 15, 2024
• Settling-in period: The first few days will be shorter so Emma can feel secure
• Locker number: 24
• Contact person: Kari Andersen (department head)

We will also invite you to a parent meeting on Friday, August 9 at 6:00 PM where we will go through practical information and this year's educational focus.

We look forward to a good cooperation!

Best regards,
Løvenskiold Kindergarten`,
      date: '2024-03-18',
      time: '14:30',
      unread: true,
      starred: false,
      hasAttachment: true
    },
    {
      id: 2,
      from: 'Oslo Municipality',
      fromEmail: 'kindergarten@oslo.municipality.no',
      subject: 'Application status updated - Emma Hansen',
      preview: 'Your application for Emma Hansen has been updated. Status: Placement assigned...',
      content: `Dear Parents,

Your application for Emma Hansen (application #APP-001) has been updated.

STATUS: Placement assigned

Emma has been offered a place at Løvenskiold Kindergarten starting August 15, 2024.

You must accept the placement within 14 days to secure the spot. You can do this by logging in to kindergarten.oslo.no and following the instructions.

If you have questions, you can contact your case worker Erik Johansen at erik.johansen@oslo.municipality.no or phone 23 48 XX XX.

Best regards,
Oslo Municipality Kindergarten Administration`,
      date: '2024-03-16',
      time: '09:15',
      unread: false,
      starred: true,
      hasAttachment: false
    },
    {
      id: 3,
      from: 'Case Worker - Erik Johansen',
      fromEmail: 'erik.johansen@oslo.municipality.no',
      subject: 'Missing documentation',
      preview: 'We are missing income documentation for processing your reduced payment application...',
      content: `Hello Anna,

We have received your application for reduced payment for Oliver, but we are missing the following documentation:

- Last year's tax return
- Updated income certificate from employer

Can you upload these documents in the portal or send them by email?

The application cannot be processed until we have received all necessary documentation.

Please contact me if you have any questions.

Best regards,
Erik Johansen
Case Worker
Oslo Municipality`,
      date: '2024-03-14',
      time: '11:20',
      unread: false,
      starred: false,
      hasAttachment: false
    }
  ];

  const handleReply = () => {
    if (replyText.trim()) {
      console.log('Sending reply:', replyText);
      setReplyText('');
      // Here you would typically make an API call
    }
  };

  const toggleStar = (messageId: number) => {
    console.log('Toggle star for message:', messageId);
  };

  const selectedMessageData = messages.find(m => m.id === selectedMessage);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-2">
          Communication with kindergartens and Oslo Municipality
        </p>
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search messages..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Archive className="h-4 w-4 mr-2" />
              Archived
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Message List */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="font-semibold text-gray-900 mb-3">
            Inbox ({messages.filter(m => m.unread).length} unread)
          </h3>
          
          {messages.map((message) => (
            <Card 
              key={message.id} 
              className={`cursor-pointer transition-all ${
                selectedMessage === message.id 
                  ? 'ring-2 ring-oslo-blue bg-blue-50' 
                  : 'hover:shadow-md'
              } ${message.unread ? 'border-l-4 border-l-blue-500' : ''}`}
              onClick={() => setSelectedMessage(message.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-medium text-sm truncate ${message.unread ? 'font-semibold' : ''}`}>
                        {message.from}
                      </h4>
                      {message.unread && (
                        <Badge variant="secondary" className="text-xs px-1 py-0">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm truncate ${message.unread ? 'font-medium' : 'text-gray-600'}`}>
                      {message.subject}
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {message.preview}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1 ml-2">
                    <div className="flex items-center gap-1">
                      {message.hasAttachment && (
                        <Paperclip className="h-3 w-3 text-gray-400" />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(message.id);
                        }}
                      >
                        <Star className={`h-3 w-3 ${message.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                      </Button>
                    </div>
                    <span className="text-xs text-gray-500">{message.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Message Content */}
        <div className="lg:col-span-3">
          {selectedMessageData ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedMessageData.subject}</CardTitle>
                    <CardDescription className="mt-2">
                      From: {selectedMessageData.from} ({selectedMessageData.fromEmail})
                      <br />
                      {selectedMessageData.date} at {selectedMessageData.time}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStar(selectedMessageData.id)}
                    >
                      <Star className={`h-4 w-4 mr-2 ${selectedMessageData.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      {selectedMessageData.starred ? 'Remove star' : 'Add star'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Message Content */}
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {selectedMessageData.content}
                  </div>
                </div>

                {/* Attachments */}
                {selectedMessageData.hasAttachment && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Paperclip className="h-4 w-4" />
                      Attachments
                    </h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Button variant="outline" size="sm">
                        📄 Information-brochure.pdf (234 KB)
                      </Button>
                    </div>
                  </div>
                )}

                {/* Reply Section */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Reply to message</h4>
                  <div className="space-y-3">
                    <textarea
                      className="w-full min-h-24 px-3 py-2 border rounded-md resize-y"
                      placeholder="Write your reply here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        <Paperclip className="h-4 w-4 mr-2" />
                        Attach file
                      </Button>
                      <Button 
                        onClick={handleReply}
                        disabled={!replyText.trim()}
                        className="bg-oslo-blue hover:bg-blue-700"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-96 text-gray-500">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Select a message to read its content</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
