
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image, ArrowRight, Calendar, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NoticeBoardPreviewCard = () => {
  // Mock data for demonstration
  const recentPosts = [
    {
      id: 1,
      title: "Easter Holiday Preparations",
      preview: "We're getting ready for Easter with fun activities...",
      date: "2024-03-20",
      hasImages: true,
      type: "activity",
      urgent: false
    },
    {
      id: 2,
      title: "Important: Pick-up Changes Tomorrow",
      preview: "Due to staff training, pick-up times will be...",
      date: "2024-03-19",
      hasImages: false,
      type: "notice",
      urgent: true
    },
    {
      id: 3,
      title: "Weekly Menu Update",
      preview: "This week's healthy and delicious menu includes...",
      date: "2024-03-18",
      hasImages: true,
      type: "menu",
      urgent: false
    }
  ];

  const getPostTypeColor = (type: string, urgent: boolean) => {
    if (urgent) return 'bg-red-100 text-red-700 border-red-300';
    switch (type) {
      case 'activity': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'notice': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'menu': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20" />
      <CardHeader className="relative pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
              <Image className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Notice Board</h3>
              <p className="text-sm text-slate-600 font-normal mt-0.5">Latest updates from kindergarten</p>
            </div>
          </div>
          <Link to="/guardian/notice-board">
            <Button variant="outline" size="sm" className="text-purple-600 border-purple-300 hover:bg-purple-50">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative flex-1 flex flex-col pt-0">
        <div className="space-y-4 flex-1">
          {recentPosts.slice(0, 3).map((post) => (
            <Link key={post.id} to={`/guardian/notice-board/post/${post.id}`}>
              <div className="group cursor-pointer">
                <div className="p-4 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-transparent transition-all duration-300">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-2.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-1 text-sm leading-tight">
                          {post.title}
                        </h4>
                        <Badge className={`text-xs ${getPostTypeColor(post.type, post.urgent)}`}>
                          {post.urgent ? 'Urgent' : post.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{post.preview}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        {post.hasImages && (
                          <span className="flex items-center gap-1">
                            <Image className="w-3 h-3" />
                            Photos
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NoticeBoardPreviewCard;
