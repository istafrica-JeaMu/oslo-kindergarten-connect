import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimatedAvatar } from '@/components/ui/animated-avatar';
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
  ArrowLeft,
  Plus,
  Filter
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

  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case 'system':
        return <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 text-xs font-medium">System</Badge>;
      case 'kindergarten':
        return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs font-medium">Kindergarten</Badge>;
      case 'case worker':
        return <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50 text-xs font-medium">Case Worker</Badge>;
      default:
        return <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50 text-xs font-medium">Staff</Badge>;
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
      {/* Enhanced Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('guardian.messages.title')}</h1>
            <p className="text-gray-600">{t('guardian.messages.description')}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Main Chat Interface */}
      <div className="flex-1 grid lg:grid-cols-5 gap-0 bg-white rounded-2xl border border-slate-200/60 shadow-xl overflow-hidden backdrop-blur-sm">
        
        {/* Enhanced Sidebar - Conversations List */}
        <div className={`lg:col-span-2 border-r border-slate-200/60 flex flex-col bg-gradient-to-b from-slate-50/50 to-white ${selectedMessage ? 'hidden lg:flex' : 'flex'}`}>
          
          {/* Enhanced Chat Header */}
          <div className="p-6 border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Messages</h2>
              {unreadCount > 0 && (
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs shadow-lg animate-pulse">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            
            {/* Enhanced Tab Navigation */}
            <div className="flex space-x-1 bg-slate-100/80 rounded-xl p-1 mb-4 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  activeTab === 'all' 
                    ? 'bg-white text-oslo-blue shadow-md transform scale-[0.98]' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                All Chats
              </button>
              <button
                onClick={() => setActiveTab('staff')}
                className={`flex-1 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  activeTab === 'staff' 
                    ? 'bg-white text-oslo-blue shadow-md transform scale-[0.98]' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                Staff Only
              </button>
            </div>

            {/* Enhanced Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-white/80 border-slate-300/60 focus:border-oslo-blue/60 focus:ring-oslo-blue/20 rounded-xl h-12 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Enhanced Conversations List */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredConversations.map((conversation, index) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedMessage(conversation)}
                  className={`p-4 m-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[0.99] group ${
                    selectedMessage?.id === conversation.id 
                      ? 'bg-gradient-to-r from-oslo-blue/10 to-blue-50 border-l-4 border-l-oslo-blue shadow-md' 
                      : 'hover:bg-slate-50/80 hover:shadow-sm'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <AnimatedAvatar
                      name={conversation.participant.name}
                      role={conversation.participant.role}
                      online={conversation.participant.online}
                      size="md"
                      context="sidebar"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className={`text-sm font-semibold text-gray-900 truncate transition-colors ${
                            conversation.unread ? 'text-oslo-blue' : ''
                          }`}>
                            {conversation.participant.name}
                          </h4>
                          {getRoleBadge(conversation.participant.role)}
                        </div>
                        <div className="flex items-center space-x-2">
                          {conversation.starred && (
                            <Star className="h-3 w-3 text-yellow-500 fill-current animate-pulse" />
                          )}
                          <span className="text-xs text-gray-500 font-medium">
                            {formatTime(conversation.timestamp)}
                          </span>
                        </div>
                      </div>
                      
                      <p className={`text-sm text-gray-600 truncate leading-relaxed ${
                        conversation.unread ? 'font-semibold text-gray-800' : ''
                      }`}>
                        {conversation.lastMessage}
                      </p>
                      
                      {conversation.unread && (
                        <div className="flex justify-end mt-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-oslo-blue to-blue-600 rounded-full animate-pulse shadow-sm"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Enhanced Chat Area */}
        <div className={`lg:col-span-3 flex flex-col bg-gradient-to-b from-white to-slate-50/30 ${selectedMessage ? 'flex' : 'hidden lg:flex'}`}>
          {selectedMessage ? (
            <>
              {/* Enhanced Chat Header */}
              <div className="p-6 border-b border-slate-200/60 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedMessage(null)}
                      className="lg:hidden rounded-full"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    
                    <AnimatedAvatar
                      name={selectedMessage.participant.name}
                      role={selectedMessage.participant.role}
                      online={selectedMessage.participant.online}
                      size="md"
                      context="header"
                    />
                    
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{selectedMessage.participant.name}</h3>
                      <p className="text-sm text-gray-500 font-medium">
                        {selectedMessage.participant.online ? (
                          <span className="text-green-600 flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                            Online now
                          </span>
                        ) : (
                          `Last seen ${formatTime(selectedMessage.timestamp)}`
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="rounded-full hover:bg-oslo-blue/10">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="rounded-full hover:bg-oslo-blue/10">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="rounded-full hover:bg-oslo-blue/10">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Enhanced Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {selectedMessage.messages.map((message: any, index: number) => (
                    <div
                      key={message.id}
                      className={`flex items-end space-x-3 animate-fade-in ${
                        message.type === 'sent' ? 'justify-end' : 'justify-start'
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      {message.type === 'received' && (
                        <AnimatedAvatar
                          name={message.sender}
                          role={selectedMessage.participant.role}
                          size="sm"
                          context="message"
                          enableAnimation={false}
                        />
                      )}
                      
                      <div className={`max-w-[75%] ${message.type === 'sent' ? 'order-2' : 'order-1'}`}>
                        <div className={`rounded-2xl px-4 py-3 shadow-md transition-transform hover:scale-[1.02] ${
                          message.type === 'sent' 
                            ? 'bg-gradient-to-r from-oslo-blue to-blue-600 text-white ml-auto' 
                            : 'bg-white text-gray-900 border border-slate-200/60'
                        }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          
                          {message.attachments?.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {message.attachments.map((attachment: any, index: number) => (
                                <div key={index} className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                                  message.type === 'sent' ? 'bg-white/15 hover:bg-white/20' : 'bg-slate-50 hover:bg-slate-100'
                                }`}>
                                  <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg ${
                                      message.type === 'sent' ? 'bg-white/20' : 'bg-oslo-blue/10'
                                    }`}>
                                      <Paperclip className="h-4 w-4" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-semibold">{attachment.name}</p>
                                      <p className="text-xs opacity-70">{attachment.size}</p>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                                    <Download className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className={`flex items-center mt-2 space-x-2 ${
                          message.type === 'sent' ? 'justify-end' : 'justify-start'
                        }`}>
                          <span className="text-xs text-gray-500 font-medium">
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

              {/* Enhanced Message Input */}
              <div className="p-6 border-t border-slate-200/60 bg-white/90 backdrop-blur-sm">
                <div className="flex items-end space-x-4">
                  <Button variant="ghost" size="sm" className="mb-3 rounded-full hover:bg-oslo-blue/10">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex-1">
                    <Textarea
                      placeholder="Type your message..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="min-h-[50px] max-h-32 resize-none border-slate-300/60 focus:border-oslo-blue/60 focus:ring-oslo-blue/20 rounded-xl bg-white/80 backdrop-blur-sm"
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
                    className="bg-gradient-to-r from-oslo-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 mb-3 rounded-full shadow-lg transform transition-transform hover:scale-105 disabled:opacity-50"
                    size="sm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-slate-50/50 to-white">
              <div className="text-center text-gray-500 animate-fade-in">
                <div className="relative mb-6">
                  <MessageSquare className="h-20 w-20 mx-auto text-gray-300" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-oslo-blue rounded-full flex items-center justify-center">
                    <Plus className="h-3 w-3 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Start a conversation</h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Select a conversation from the sidebar to view messages or start a new conversation with staff members.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
