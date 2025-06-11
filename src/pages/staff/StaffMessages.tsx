
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Send, Users, Bell, Search } from 'lucide-react';

const StaffMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: '1',
      name: 'Anna Hansen',
      type: 'Guardian',
      lastMessage: 'Thank you for the update about Emma\'s progress today.',
      time: '10:30 AM',
      unread: 2,
      avatar: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Kindergarten Team',
      type: 'Staff Group',
      lastMessage: 'Meeting scheduled for tomorrow at 2 PM',
      time: '09:15 AM',
      unread: 0,
      avatar: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Lars Olsen',
      type: 'Guardian',
      lastMessage: 'Can we schedule a meeting to discuss Oliver\'s development?',
      time: 'Yesterday',
      unread: 1,
      avatar: '/placeholder.svg'
    }
  ];

  const messages = [
    {
      id: '1',
      sender: 'Anna Hansen',
      content: 'Hi! How was Emma today? Did she participate well in the activities?',
      time: '09:30 AM',
      isStaff: false
    },
    {
      id: '2',
      sender: 'You',
      content: 'Hi Anna! Emma had a wonderful day. She was very engaged during story time and made a beautiful drawing in art class. She also played well with her friends during outdoor time.',
      time: '10:15 AM',
      isStaff: true
    },
    {
      id: '3',
      sender: 'Anna Hansen',
      content: 'Thank you for the update about Emma\'s progress today.',
      time: '10:30 AM',
      isStaff: false
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-oslo-blue">Messages</h1>
          <p className="text-slate-600">Communicate with guardians and colleagues</p>
        </div>
        <Button className="bg-oslo-blue hover:bg-oslo-blue/90">
          <MessageSquare className="w-4 h-4 mr-2" />
          New Message
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Conversations</CardTitle>
              <Badge variant="secondary" className="bg-oslo-blue/10 text-oslo-blue">
                {conversations.filter(c => c.unread > 0).length} unread
              </Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                placeholder="Search conversations..." 
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-2 overflow-y-auto max-h-96">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedConversation === conversation.id 
                    ? 'bg-oslo-blue/10 border border-oslo-blue/20' 
                    : 'hover:bg-slate-50'
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback className="bg-oslo-blue/10 text-oslo-blue">
                      {conversation.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                      <span className="text-xs text-slate-500">{conversation.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mb-1">{conversation.type}</p>
                    <p className="text-sm text-slate-600 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <Badge className="bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-oslo-blue/10 text-oslo-blue">AH</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Anna Hansen</CardTitle>
                    <CardDescription>Guardian - Emma's parent</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex flex-col h-96">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 py-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isStaff ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.isStaff
                            ? 'bg-oslo-blue text-white'
                            : 'bg-slate-100 text-slate-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.isStaff ? 'text-blue-100' : 'text-slate-500'
                        }`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="border-t pt-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 min-h-[60px] resize-none"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-oslo-blue hover:bg-oslo-blue/90 self-end"
                      disabled={!newMessage.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-96">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">No conversation selected</h3>
                <p className="text-slate-500">Choose a conversation from the list to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default StaffMessages;
