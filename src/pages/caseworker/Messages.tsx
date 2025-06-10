
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
        name: 'Emma Hansen - Guardian',
        role: 'Guardian',
        avatar: '/oslo-logo.svg',
        online: true
      },
      lastMessage: 'Thank you for the quick response regarding Emma\'s application.',
      timestamp: '2024-03-18T10:30:00',
      unread: true,
      starred: false,
      archived: false,
      messages: [
        {
          id: 1,
          sender: 'Emma Hansen - Guardian',
          content: 'Hello, I wanted to follow up on Emma\'s kindergarten application. Could you please provide an update on the status?',
          timestamp: '2024-03-18T10:30:00',
          type: 'received',
          attachments: []
        }
      ]
    },
    {
      id: 2,
      participant: {
        name: 'Løvenskiold Kindergarten',
        role: 'Kindergarten',
        avatar: null,
        online: false
      },
      lastMessage: 'New capacity update for age group 3-5 years.',
      timestamp: '2024-03-16T14:15:00',
      unread: false,
      starred: true,
      archived: false,
      messages: [
        {
          id: 1,
          sender: 'Løvenskiold Kindergarten',
          content: 'We have updated capacity information for the 3-5 years age group. Please review the new availability numbers.',
          timestamp: '2024-03-16T14:15:00',
          type: 'received',
          attachments: [
            { name: 'Capacity_Update_March.pdf', size: '1.2 MB' }
          ]
        }
      ]
    },
    {
      id: 3,
      participant: {
        name: 'Sarah Peterson - Guardian',
        role: 'Guardian',
        avatar: null,
        online: true
      },
      lastMessage: 'Documents uploaded successfully.',
      timestamp: '2024-03-10T09:45:00',
      unread: false,
      starred: false,
      archived: false,
      messages: [
        {
          id: 1,
          sender: 'Sarah Peterson - Guardian',
          content: 'I have uploaded the missing documents for Lucas\'s application. Please let me know if you need anything else.',
          timestamp: '2024-03-10T09:45:00',
          type: 'received',
          attachments: [
            { name: 'Birth_Certificate.pdf', size: '2.3 MB' },
            { name: 'Proof_of_Address.pdf', size: '456 KB' }
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
        return <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 text-xs font-medium">{t('caseworker.messages.badges.system')}</Badge>;
      case 'kindergarten':
        return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs font-medium">{t('caseworker.messages.badges.kindergarten')}</Badge>;
      case 'case worker':
        return <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50 text-xs font-medium">{t('caseworker.messages.badges.caseWorker')}</Badge>;
      default:
        return <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50 text-xs font-medium">{t('caseworker.messages.badges.staff')}</Badge>;
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('caseworker.messages.title')}</h1>
            <p className="text-gray-600">{t('caseworker.messages.description')}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Filter className="h-4 w-4 mr-2" />
              {t('caseworker.messages.filter')}
            </Button>
            <Button className="shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              {t('caseworker.messages.newMessage')}
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
              <h2 className="text-xl font-bold text-gray-900">{t('caseworker.messages.title')}</h2>
              {unreadCount > 0 && (
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs shadow-lg animate-pulse">
                  {unreadCount} {t('caseworker.messages.new')}
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
                {t('caseworker.messages.allChats')}
              </button>
              <button
                onClick={() => setActiveTab('staff')}
                className={`flex-1 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  activeTab === 'staff' 
                    ? 'bg-white text-oslo-blue shadow-md transform scale-[0.98]' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                {t('caseworker.messages.staffOnly')}
              </button>
            </div>

            {/* Enhanced Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={t('caseworker.messages.searchConversations')}
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
                            {t('caseworker.messages.onlineNow')}
                          </span>
                        ) : (
                          `${t('caseworker.messages.lastSeen')} ${formatTime(selectedMessage.timestamp)}`
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
                      placeholder={t('caseworker.messages.typeMessage')}
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
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t('caseworker.messages.startConversation')}</h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                  {t('caseworker.messages.selectConversation')}
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
