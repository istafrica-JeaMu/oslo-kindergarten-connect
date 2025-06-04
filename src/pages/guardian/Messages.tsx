
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  Eye,
  Phone,
  Video,
  MoreHorizontal,
  ArrowLeft
} from 'lucide-react';

const Messages = () => {
  const { t } = useTranslation();
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [replyText, setReplyText] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Mock messages data with chat-like structure
  const conversations = [
    {
      id: 1,
      participant: {
        name: 'Oslo Municipality',
        role: 'System',
        avatar: '/oslo-logo.svg',
        online: true
      },
      lastMessage: 'Your application for Emma Hansen has been reviewed and we need additional documentation.',
      timestamp: '2024-03-18T10:30:00',
      unread: true,
      starred: false,
      archived: false,
      messages: [
        {
          id: 1,
          sender: 'Oslo Municipality',
          content: 'Your application for Emma Hansen has been reviewed and we need additional documentation. Please upload the following documents: Birth certificate, Proof of address from the last 3 months.',
          timestamp: '2024-03-18T10:30:00',
          type: 'received',
          attachments: []
        }
      ]
    },
    {
      id: 2,
      participant: {
        name: 'Cornelia Svensson',
        role: 'Case Worker',
        avatar: null,
        online: false
      },
      lastMessage: 'Thank you! We appreciate it.',
      timestamp: '2024-03-16T14:15:00',
      unread: false,
      starred: true,
      archived: false,
      messages: [
        {
          id: 1,
          sender: 'Cornelia Svensson',
          content: 'Good morning, Ms. Johansen! I just wanted to let you know that our family will be going on vacation from Sep 10th to Sep 17th, so Emma will be missing school during that time.',
          timestamp: '2024-03-16T14:15:00',
          type: 'received',
          attachments: []
        },
        {
          id: 2,
          sender: 'You',
          content: 'Good morning! Thanks for letting me know. I hope you all have a wonderful trip! I\'ll prepare some work for Emma so she doesn\'t fall behind.',
          timestamp: '2024-03-16T14:20:00',
          type: 'sent',
          attachments: []
        },
        {
          id: 3,
          sender: 'Cornelia Svensson',
          content: 'That would be great! We\'ll make sure she stays on top of her assignments. Let me know if there\'s anything specific she should focus on.',
          timestamp: '2024-03-16T15:01:00',
          type: 'received',
          attachments: []
        },
        {
          id: 4,
          sender: 'You',
          content: 'I\'ll send a list home with her this week. Safe travels!',
          timestamp: '2024-03-16T15:15:00',
          type: 'sent',
          attachments: []
        },
        {
          id: 5,
          sender: 'Cornelia Svensson',
          content: 'Thank you! We appreciate it.',
          timestamp: '2024-03-16T15:13:00',
          type: 'received',
          attachments: []
        }
      ]
    },
    {
      id: 3,
      participant: {
        name: 'Løvenskiold Kindergarten',
        role: 'Kindergarten',
        avatar: null,
        online: true
      },
      lastMessage: 'Welcome to Løvenskiold Kindergarten! Please find attached the welcome package.',
      timestamp: '2024-03-10T09:45:00',
      unread: false,
      starred: false,
      archived: false,
      messages: [
        {
          id: 1,
          sender: 'Løvenskiold Kindergarten',
          content: 'Dear Hansen family, We are delighted to welcome Emma to our kindergarten! Please find attached the welcome package with important information about our daily routines, what to bring on the first day, and contact information for Emma\'s group teacher.',
          timestamp: '2024-03-10T09:45:00',
          type: 'received',
          attachments: [
            { name: 'Welcome_Package.pdf', size: '2.3 MB' },
            { name: 'Daily_Schedule.pdf', size: '456 KB' }
          ]
        }
      ]
    }
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArchived = showArchived ? conv.archived : !conv.archived;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'guardians' && conv.participant.role === 'Guardian') ||
                      (activeTab === 'staff' && conv.participant.role !== 'Guardian');
    return matchesSearch && matchesArchived && matchesTab;
  });

  const unreadCount = conversations.filter(conv => conv.unread && !conv.archived).length;

  const handleSendMessage = () => {
    if (replyText.trim() && selectedMessage) {
      console.log('Sending message:', replyText);
      setReplyText('');
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case 'system':
        return <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50 text-xs">System</Badge>;
      case 'kindergarten':
        return <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50 text-xs">Kindergarten</Badge>;
      case 'case worker':
        return <Badge variant="outline" className="text-purple-600 border-purple-300 bg-purple-50 text-xs">Case Worker</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Staff</Badge>;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{t('guardian.messages.title')}</h1>
        <p className="text-gray-600 mt-2">{t('guardian.messages.description')}</p>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 grid lg:grid-cols-5 gap-0 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
        
        {/* Sidebar - Conversations List */}
        <div className={`lg:col-span-2 border-r border-slate-200 flex flex-col ${selectedMessage ? 'hidden lg:flex' : 'flex'}`}>
          
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Chat</h2>
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
            
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-4">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'all' 
                    ? 'bg-white text-oslo-blue shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('staff')}
                className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'staff' 
                    ? 'bg-white text-oslo-blue shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Staff
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-slate-300"
              />
            </div>
          </div>

          {/* Conversations List */}
          <ScrollArea className="flex-1">
            <div className="divide-y divide-slate-100">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedMessage(conversation)}
                  className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                    selectedMessage?.id === conversation.id ? 'bg-blue-50 border-r-2 border-r-oslo-blue' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.participant.avatar} />
                        <AvatarFallback className="bg-oslo-blue text-white text-sm">
                          {getInitials(conversation.participant.name)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.participant.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <h4 className={`text-sm font-medium text-gray-900 truncate ${conversation.unread ? 'font-semibold' : ''}`}>
                            {conversation.participant.name}
                          </h4>
                          {getRoleBadge(conversation.participant.role)}
                        </div>
                        <div className="flex items-center space-x-2">
                          {conversation.starred && (
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          )}
                          <span className="text-xs text-gray-500">
                            {formatTime(conversation.timestamp)}
                          </span>
                        </div>
                      </div>
                      
                      <p className={`text-sm text-gray-600 truncate ${conversation.unread ? 'font-medium' : ''}`}>
                        {conversation.lastMessage}
                      </p>
                      
                      {conversation.unread && (
                        <div className="flex justify-end mt-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className={`lg:col-span-3 flex flex-col ${selectedMessage ? 'flex' : 'hidden lg:flex'}`}>
          {selectedMessage ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedMessage(null)}
                      className="lg:hidden"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedMessage.participant.avatar} />
                        <AvatarFallback className="bg-oslo-blue text-white text-sm">
                          {getInitials(selectedMessage.participant.name)}
                        </AvatarFallback>
                      </Avatar>
                      {selectedMessage.participant.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedMessage.participant.name}</h3>
                      <p className="text-xs text-gray-500">
                        {selectedMessage.participant.online ? 'Online' : `Last seen ${formatTime(selectedMessage.timestamp)}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedMessage.messages.map((message: any) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${message.type === 'sent' ? 'order-2' : 'order-1'}`}>
                        <div className={`rounded-2xl p-3 ${
                          message.type === 'sent' 
                            ? 'bg-oslo-blue text-white' 
                            : 'bg-slate-100 text-gray-900'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          
                          {message.attachments?.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map((attachment: any, index: number) => (
                                <div key={index} className={`flex items-center justify-between p-2 rounded-lg ${
                                  message.type === 'sent' ? 'bg-white/10' : 'bg-white'
                                }`}>
                                  <div className="flex items-center space-x-2">
                                    <Paperclip className="h-4 w-4" />
                                    <div>
                                      <p className="text-xs font-medium">{attachment.name}</p>
                                      <p className="text-xs opacity-70">{attachment.size}</p>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <Download className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className={`flex items-center mt-1 space-x-2 ${
                          message.type === 'sent' ? 'justify-end' : 'justify-start'
                        }`}>
                          <span className="text-xs text-gray-500">
                            {new Date(message.timestamp).toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-slate-200 bg-white">
                <div className="flex items-end space-x-3">
                  <Button variant="ghost" size="sm" className="mb-2">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex-1">
                    <Textarea
                      placeholder="Write a message..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="min-h-[44px] max-h-32 resize-none border-slate-300 focus:border-oslo-blue"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!replyText.trim()}
                    className="bg-oslo-blue hover:bg-blue-700 mb-2"
                    size="sm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-slate-50">
              <div className="text-center text-gray-500">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
                <p className="text-sm">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
