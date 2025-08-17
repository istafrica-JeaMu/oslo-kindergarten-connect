import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Sparkles,
  Calendar,
  MapPin,
  FileText,
  Clock,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: string;
    icon?: React.ReactNode;
  }>;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI kindergarten assistant. I can help you find the perfect kindergarten, fill out applications, check availability, and answer any questions you have. What would you like to know?",
      sender: 'ai',
      timestamp: new Date(),
      actions: [
        { label: 'Find Kindergartens', action: 'search', icon: <MapPin className="h-3 w-3" /> },
        { label: 'Check Application Status', action: 'status', icon: <FileText className="h-3 w-3" /> },
        { label: 'Available Spots', action: 'availability', icon: <Calendar className="h-3 w-3" /> },
        { label: 'Help Me Apply', action: 'apply', icon: <CheckCircle className="h-3 w-3" /> }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('find') || input.includes('search') || input.includes('kindergarten')) {
      return "I can help you find kindergartens! Based on your location, I found several great options. Would you like me to show them on the map? I can filter by age groups, availability, price range, or special programs.";
    }
    
    if (input.includes('apply') || input.includes('application')) {
      return "I'll help you with the application process! First, I need to know: 1) Your child's age, 2) Your preferred area in Oslo, 3) Any special requirements. I can pre-fill most of the form with available information and guide you through each step.";
    }
    
    if (input.includes('available') || input.includes('spots') || input.includes('vacancy')) {
      return "Let me check real-time availability for you! I'm seeing 47 kindergartens with immediate openings in Oslo. Most have 1-3 spots available. Grünerløkka and Sagene have the most options right now. Would you like me to show specific areas?";
    }
    
    if (input.includes('price') || input.includes('cost') || input.includes('fee')) {
      return "Kindergarten fees in Oslo range from 2,500-3,500 NOK per month. The exact amount depends on your income and the specific kindergarten. I can calculate your expected fee based on your family situation. Would you like me to do that?";
    }
    
    return "I understand you're asking about kindergartens. I can help you with finding options, checking availability, completing applications, understanding the process, or answering specific questions. What would be most helpful right now?";
  };

  const handleQuickAction = (action: string) => {
    const responses = {
      search: "Great! Let me help you find kindergartens. I'll open the interactive map where you can see all available options in your area. You can click on any location to see details and add them to your application cart.",
      status: "I can help you check your application status. Do you have your reference number? If not, I can look it up using your email address or phone number.",
      availability: "Here are the current availability statistics: 47 kindergartens have immediate openings, average wait time is 3.2 days, and 87% availability rate in central Oslo. Would you like to see specific areas?",
      apply: "Perfect! I'll guide you through the application step by step. First, let me gather some basic information to make this super quick for you. What's your child's birth date?"
    };

    const aiMessage: Message = {
      id: Date.now().toString(),
      content: responses[action as keyof typeof responses] || "I can help you with that!",
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl transition-all duration-300 group",
          "bg-gradient-to-r from-primary to-secondary hover:scale-110",
          isOpen && "scale-0"
        )}
      >
        <div className="relative">
          <MessageCircle className="h-6 w-6 text-white" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-foreground text-background text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          AI Assistant
        </div>
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 h-[600px] shadow-2xl border-border/20 bg-oslo-glass/95 backdrop-blur-xl">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="hover:bg-destructive/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.sender === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[80%] p-3 rounded-2xl",
                      message.sender === 'user'
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-oslo-surface border border-border/20"
                    )}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {/* Quick Actions */}
                    {message.actions && (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {message.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickAction(action.action)}
                            className="h-8 text-xs bg-oslo-glass/50 hover:bg-oslo-glass/80"
                          >
                            {action.icon}
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>

                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-oslo-surface border border-border/20 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/20">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about kindergartens..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 bg-oslo-glass/50 border-border/20"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputValue.trim()}
                  className="px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                AI can make mistakes. Verify important information.
              </p>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}