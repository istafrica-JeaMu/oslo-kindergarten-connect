
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Camera, Users, ArrowRight, Heart, MessageCircle } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { nb } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const MinimalNoticeBoard = () => {
  const { t } = useLanguage();

  // Featured posts for the dashboard
  const featuredPosts = [
    {
      id: 1,
      title: t('guardian.noticeBoard.posts.springFlowers.title'),
      content: t('guardian.noticeBoard.posts.springFlowers.content'),
      author: 'Kari Andersen',
      date: '2024-03-18T14:30:00',
      image: '/placeholder.svg',
      category: 'activities',
      likes: 12,
      comments: 3
    },
    {
      id: 2,
      title: t('guardian.noticeBoard.posts.fleaMarket.title'),
      content: t('guardian.noticeBoard.posts.fleaMarket.content'),
      author: t('guardian.noticeBoard.posts.fleaMarket.author'),
      date: '2024-03-15T12:20:00',
      image: '/placeholder.svg',
      category: 'events',
      likes: 23,
      comments: 8
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'activities': return 'bg-green-100 text-green-700 border-green-200';
      case 'events': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    return t(`guardian.noticeBoard.categories.${category}`);
  };

  return (
    <Card className="overflow-hidden border-0 shadow-lg bg-white">
      <CardContent className="p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-oslo-blue/5 via-transparent to-oslo-green/5 p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-oslo-blue/10 to-oslo-blue/20 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-oslo-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{t('guardian.noticeBoard.title')}</h3>
                <p className="text-sm text-slate-600">{t('guardian.noticeBoard.description')}</p>
              </div>
            </div>
            <Link to="/guardian/notice-board">
              <Button variant="outline" size="sm" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Featured Posts */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <div key={post.id} className="group cursor-pointer">
                <div className="space-y-4 p-4 rounded-xl border-2 border-slate-100 hover:border-oslo-blue/30 hover:bg-gradient-to-r hover:from-oslo-blue/5 hover:to-transparent transition-all duration-300 hover:shadow-md">
                  {/* Post Image */}
                  <div className="relative aspect-video bg-slate-200 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-oslo-blue/20 to-oslo-green/20 flex items-center justify-center">
                      <Camera className="w-12 h-12 text-white/80" />
                    </div>
                    <Badge className={`absolute top-3 left-3 ${getCategoryColor(post.category)} font-medium`}>
                      {getCategoryLabel(post.category)}
                    </Badge>
                  </div>

                  {/* Post Content */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900 group-hover:text-oslo-blue transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {post.content}
                    </p>
                    
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-3">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{format(new Date(post.date), 'd. MMM', { locale: nb })}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">Stay updated with kindergarten news and activities</p>
              <Link to="/guardian/notice-board">
                <Button variant="ghost" size="sm" className="text-oslo-blue hover:text-oslo-blue/80 gap-1">
                  View All Posts
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MinimalNoticeBoard;
