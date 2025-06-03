
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  MessageSquare, 
  Star, 
  StarOff, 
  Archive, 
  Paperclip, 
  Send,
  Download,
  Eye
} from 'lucide-react';

const Messages = () => {
  const { t } = useTranslation();
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [replyText, setReplyText] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  // Mock messages data
  const messages = [
    {
      id: 1,
      from: 'Oslo Municipality',
      fromType: 'system',
      subject: 'Application Status Update - Emma Hansen',
      content: 'Your application for Emma Hansen has been reviewed and we need additional documentation. Please upload the following documents: Birth certificate, Proof of address from the last 3 months.',
      date: '2024-03-18T10:30:00',
      unread: true,
      starred: false,
      archived: false,
      attachments: []
    },
    {
      id: 2,
      from: 'Løvenskiold Kindergarten',
      fromType: 'kindergarten',
      subject: 'Welcome to Løvenskiold Kindergarten',
      content: 'Dear Hansen family, We are delighted to welcome Emma to our kindergarten! Please find attached the welcome package with important information about our daily routines, what to bring on the first day, and contact information for Emma\'s group teacher.',
      date: '2024-03-16T14:15:00',
      unread: false,
      starred: true,
      archived: false,
      attachments: [
        { name: 'Welcome_Package.pdf', size: '2.3 MB' },
        { name: 'Daily_Schedule.pdf', size: '456 KB' }
      ]
    },
    {
      id: 3,
      from: 'Erik Johansen',
      fromType: 'caseworker',
      subject: 'Placement Offer - Response Required',
      content: 'Hello, We are pleased to offer your child Emma Hansen a place at Løvenskiold Kindergarten starting August 15, 2024. Please respond within 14 days to accept or decline this offer.',
      date: '2024-03-10T09:45:00',
      unread: false,
      starred: false,
      archived: false,
      attachments: [
        { name: 'Placement_Offer.pdf', size: '1.2 MB' }
      ]
    },
    {
      id: 4,
      from: 'Oslo Municipality',
      fromType: 'system',
      subject: 'Payment Information - March 2024',
      content: 'Your monthly kindergarten fee invoice is now available. The amount for March 2024 is 3,330 NOK. Payment is due by April 1st, 2024.',
      date: '2024-03-01T08:00:00',
      unread: false,
      starred: false,
      archived: true,
      attachments: [
        { name: 'Invoice_March_2024.pdf', size: '890 KB' }
      ]
    }
  ];

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArchived = showArchived ? msg.archived : !msg.archived;
    return matchesSearch && matchesArchived;
  });

  const unreadCount = messages.filter(msg => msg.unread && !msg.archived).length;

  const handleReply = () => {
    if (replyText.trim() && selectedMessage) {
      console.log('Sending reply:', replyText);
      setReplyText('');
      // Here you would typically send the reply to your API
    }
  };

  const toggleStar = (messageId: number) => {
    console.log('Toggle star for message:', messageId);
    // Update message starred status
  };

  const archiveMessage = (messageId: number) => {
    console.log('Archive message:', messageId);
    // Update message archived status
  };

  const getFromTypeBadge = (type: string) => {
    switch (type) {
      case 'system':
        return <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50">System</Badge>;
      case 'kindergarten':
        return <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50">Kindergarten</Badge>;
      case 'caseworker':
        return <Badge variant="outline" className="text-purple-600 border-purple-300 bg-purple-50">Case Worker</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('guardian.messages.title')}</h1>
        <p className="text-gray-600 mt-2">{t('guardian.messages.description')}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Message List */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {t('guardian.messages.inbox')}
                  {unreadCount > 0 && (
                    <Badge className="bg-red-500 text-white">
                      {unreadCount} {t('guardian.messages.unread')}
                    </Badge>
                  )}
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowArchived(!showArchived)}
                  className={showArchived ? 'bg-gray-100' : ''}
                >
                  <Archive className="h-4 w-4 mr-2" />
                  {showArchived ? 'Show Inbox' : t('guardian.messages.archived')}
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={t('guardian.messages.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-blue-50 border-l-4 border-l-oslo-blue' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getFromTypeBadge(message.fromType)}
                        {message.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(message.id);
                          }}
                          className="h-6 w-6 p-0"
                        >
                          {message.starred ? (
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          ) : (
                            <StarOff className="h-3 w-3 text-gray-400" />
                          )}
                        </Button>
                        <span className="text-xs text-gray-500">
                          {new Date(message.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <h4 className={`text-sm mb-1 ${message.unread ? 'font-semibold' : 'font-medium'}`}>
                      {message.subject}
                    </h4>
                    <p className="text-xs text-gray-600 mb-1">{message.from}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {message.content.substring(0, 100)}...
                    </p>
                    {message.attachments.length > 0 && (
                      <div className="flex items-center gap-1 mt-2">
                        <Paperclip className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {message.attachments.length} attachment{message.attachments.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Content */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card className="shadow-lg border-0 h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      {selectedMessage.subject}
                      {getFromTypeBadge(selectedMessage.fromType)}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      From: {selectedMessage.from} • {new Date(selectedMessage.date).toLocaleString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStar(selectedMessage.id)}
                    >
                      {selectedMessage.starred ? (
                        <>
                          <Star className="h-4 w-4 mr-2 text-yellow-500 fill-current" />
                          {t('guardian.messages.removeStar')}
                        </>
                      ) : (
                        <>
                          <StarOff className="h-4 w-4 mr-2" />
                          {t('guardian.messages.addStar')}
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => archiveMessage(selectedMessage.id)}
                    >
                      <Archive className="h-4 w-4 mr-2" />
                      {t('guardian.messages.archive')}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <div className="bg-gray-50 p-4 rounded-lg mb-4 flex-1">
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {selectedMessage.content}
                  </p>
                </div>

                {selectedMessage.attachments.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Paperclip className="h-4 w-4" />
                      {t('guardian.messages.attachments')}
                    </h4>
                    <div className="space-y-2">
                      {selectedMessage.attachments.map((attachment: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                              <Paperclip className="h-4 w-4 text-red-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                              <p className="text-xs text-gray-500">{attachment.size}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              {t('guardian.payments.view')}
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reply Section */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">{t('guardian.messages.reply')}</h4>
                  <div className="space-y-3">
                    <Textarea
                      placeholder={t('guardian.messages.replyPlaceholder')}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="min-h-24"
                    />
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm">
                        <Paperclip className="h-4 w-4 mr-2" />
                        {t('guardian.messages.attachFile')}
                      </Button>
                      <Button 
                        onClick={handleReply}
                        disabled={!replyText.trim()}
                        className="bg-oslo-blue hover:bg-blue-700"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        {t('guardian.messages.sendReply')}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg border-0 h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>{t('guardian.messages.selectMessage')}</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
