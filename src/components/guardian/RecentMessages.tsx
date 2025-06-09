
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Calendar, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Message {
  id: number;
  from: string;
  subject: string;
  date: string;
  unread: boolean;
  type: string;
}

interface RecentMessagesProps {
  messages: Message[];
}

const RecentMessages = ({ messages }: RecentMessagesProps) => {
  const { t } = useTranslation();

  return (
    <Card className="relative overflow-hidden border-0 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20" />
      <CardHeader className="relative border-b border-slate-200/50">
        <CardTitle className="flex items-center gap-6 text-2xl">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
            <MessageSquare className="h-7 w-7 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{t('guardian.dashboard.recentMessages')}</h3>
            <p className="text-sm text-slate-600 font-normal mt-1">Latest updates and notifications</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative p-6">
        <div className="space-y-4">
          {messages.slice(0, 3).map((message) => (
            <div key={message.id} className="group cursor-pointer">
              <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-300 border border-transparent hover:border-blue-200 hover:shadow-md">
                <div className={`w-5 h-5 rounded-full mt-2 shadow-sm ${message.unread ? 'bg-gradient-to-br from-blue-500 to-blue-600 animate-pulse' : 'bg-slate-300'}`} />
                <div className="flex-1 space-y-2">
                  <h5 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-lg">{message.subject}</h5>
                  <p className="text-slate-600 font-medium">{message.from}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {message.date}
                    </p>
                    {message.unread && (
                      <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-300 font-semibold">
                        <Bell className="w-3 h-3 mr-1" />
                        New
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentMessages;
