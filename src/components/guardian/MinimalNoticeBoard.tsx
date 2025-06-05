
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, ArrowRight, Heart, MessageCircle, Clock, MapPin } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { nb } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const MinimalNoticeBoard = () => {
  const { t } = useLanguage();

  // Featured posts for the dashboard with sample kid pictures
  const featuredPosts = [
    {
      id: 1,
      title: t('guardian.noticeBoard.posts.springFlowers.title'),
      content: t('guardian.noticeBoard.posts.springFlowers.content'),
      author: 'Kari Andersen',
      date: '2024-03-18T14:30:00',
      image: 'https://images.unsplash.com/photo-1544776527-0ad373b91315?w=400&h=300&fit=crop&crop=faces',
      category: 'activities',
      likes: 12,
      comments: 3,
      location: 'Garden Area'
    },
    {
      id: 2,
      title: t('guardian.noticeBoard.posts.fleaMarket.title'),
      content: t('guardian.noticeBoard.posts.fleaMarket.content'),
      author: t('guardian.noticeBoard.posts.fleaMarket.author'),
      date: '2024-03-15T12:20:00',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop&crop=faces',
      category: 'events',
      likes: 23,
      comments: 8,
      location: 'Main Hall'
    },
    {
      id: 3,
      title: 'Art Workshop Results',
      content: 'Amazing creativity from our young artists! Check out the beautiful paintings they created during yesterday\'s art session.',
      author: 'Lisa Nordahl',
      date: '2024-03-16T16:45:00',
      image: 'https://images.unsplash.com/photo-1587691592099-24045742c181?w=400&h=300&fit=crop&crop=faces',
      category: 'activities',
      likes: 18,
      comments: 5,
      location: 'Art Room'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'activities': return 'bg-green-50 text-green-700 border-green-200';
      case 'events': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'announcements': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    return t(`guardian.noticeBoard.categories.${category}`);
  };

  return (
    <Card className="overflow-hidden border-0 shadow-xl bg-white">
      <CardContent className="p-0">
        {/* Modern Header */}
        <div className="bg-gradient-to-r from-oslo-blue/10 via-oslo-blue/5 to-oslo-green/10 p-8 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-oslo-blue to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-oslo-green rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{t('guardian.noticeBoard.title')}</h2>
                <p className="text-slate-600 text-lg">{t('guardian.noticeBoard.description')}</p>
                <div className="flex items-center gap-4 mt-3">
                  <Badge className="bg-white/80 text-slate-700 border border-slate-300 font-medium px-3 py-1">
                    <Users className="w-3 h-3 mr-1" />
                    3 new posts
                  </Badge>
                  <Badge className="bg-oslo-green/10 text-oslo-green border border-oslo-green/30 font-medium px-3 py-1">
                    <Clock className="w-3 h-3 mr-1" />
                    Updated today
                  </Badge>
                </div>
              </div>
            </div>
            <Link to="/guardian/notice-board">
              <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl">
                View All Posts
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Enhanced Featured Posts Grid */}
        <div className="p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <div key={post.id} className="group cursor-pointer">
                <div className="bg-white rounded-2xl border-2 border-slate-100 hover:border-oslo-blue/30 hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-[1.02]">
                  {/* Enhanced Post Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    <Badge className={`absolute top-4 left-4 ${getCategoryColor(post.category)} font-semibold shadow-lg`}>
                      {getCategoryLabel(post.category)}
                    </Badge>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                        <Heart className="w-3 h-3 text-red-500" />
                        <span className="text-xs font-semibold text-slate-700">{post.likes}</span>
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                        <MessageCircle className="w-3 h-3 text-blue-500" />
                        <span className="text-xs font-semibold text-slate-700">{post.comments}</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Post Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-bold text-xl text-slate-900 group-hover:text-oslo-blue transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 line-clamp-3 leading-relaxed">
                      {post.content}
                    </p>
                    
                    {/* Enhanced Meta Information */}
                    <div className="space-y-3 pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-oslo-blue/10 to-oslo-blue/20 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-oslo-blue">{post.author.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-700">{post.author}</p>
                            <p className="text-xs text-slate-500">{format(new Date(post.date), 'd. MMM', { locale: nb })}</p>
                          </div>
                        </div>
                        
                        <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-oslo-blue group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      
                      {post.location && (
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <MapPin className="w-3 h-3" />
                          <span>{post.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Quick Actions */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-slate-900 mb-1">Stay Connected</p>
                <p className="text-slate-600">Get the latest updates from your child's kindergarten</p>
              </div>
              <div className="flex gap-3">
                <Link to="/guardian/notice-board">
                  <Button variant="outline" size="lg" className="gap-2">
                    View All Posts
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/guardian/messages">
                  <Button variant="ghost" size="lg" className="gap-2 text-oslo-blue hover:text-oslo-blue/80">
                    <MessageCircle className="h-4 w-4" />
                    Messages
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MinimalNoticeBoard;
