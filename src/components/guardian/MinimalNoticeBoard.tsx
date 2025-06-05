
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Heart, MessageCircle, Clock, MapPin, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const MinimalNoticeBoard = () => {
  const { t } = useLanguage();

  // Enhanced featured posts with better sample kid pictures
  const featuredPosts = [
    {
      id: 1,
      title: t('guardian.noticeBoard.posts.springFlowers.title'),
      content: t('guardian.noticeBoard.posts.springFlowers.content'),
      date: '2024-03-18T14:30:00',
      image: 'https://images.unsplash.com/photo-1544776527-0ad373b91315?w=600&h=400&fit=crop&crop=faces',
      category: 'activities',
      likes: 12,
      comments: 3,
      views: 45
    },
    {
      id: 2,
      title: t('guardian.noticeBoard.posts.fleaMarket.title'),
      content: t('guardian.noticeBoard.posts.fleaMarket.content'),
      date: '2024-03-15T12:20:00',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop&crop=faces',
      category: 'events',
      likes: 23,
      comments: 8,
      views: 89
    },
    {
      id: 3,
      title: 'Art Workshop Results',
      content: 'Amazing creativity from our young artists! Check out the beautiful paintings they created during yesterday\'s art session.',
      date: '2024-03-16T16:45:00',
      image: 'https://images.unsplash.com/photo-1587691592099-24045742c181?w=600&h=400&fit=crop&crop=faces',
      category: 'activities',
      likes: 18,
      comments: 5,
      views: 67
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'activities': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'events': return 'bg-violet-50 text-violet-700 border-violet-200';
      case 'announcements': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    return t(`guardian.noticeBoard.categories.${category}`);
  };

  return (
    <Card className="overflow-hidden border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
      <CardContent className="p-0">
        {/* Streamlined Header */}
        <div className="relative bg-gradient-to-br from-oslo-blue/5 via-white to-oslo-green/5 p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-oslo-blue/3 to-oslo-green/3" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-oslo-blue to-blue-600 rounded-3xl flex items-center justify-center shadow-xl">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-oslo-green rounded-full animate-pulse shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{t('guardian.noticeBoard.title')}</h2>
                <p className="text-slate-600 text-lg">{t('guardian.noticeBoard.description')}</p>
              </div>
            </div>
            <Link to="/guardian/notice-board">
              <Button size="lg" className="gap-2 shadow-xl hover:shadow-2xl bg-gradient-to-r from-oslo-blue to-blue-600 hover:from-oslo-blue/90 hover:to-blue-600/90">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Modern Posts Grid */}
        <div className="p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <div key={post.id} className="group cursor-pointer">
                <div className="bg-white rounded-3xl border border-slate-200/60 hover:border-oslo-blue/30 hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-[1.02]">
                  {/* Enhanced Image Section */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <Badge className={`absolute top-4 left-4 ${getCategoryColor(post.category)} font-semibold shadow-lg backdrop-blur-sm`}>
                      {getCategoryLabel(post.category)}
                    </Badge>
                    
                    {/* Engagement Stats */}
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
                        <Heart className="w-3.5 h-3.5 text-red-500" />
                        <span className="text-xs font-bold text-slate-800">{post.likes}</span>
                      </div>
                      <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
                        <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-xs font-bold text-slate-800">{post.comments}</span>
                      </div>
                      <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-xs font-bold text-slate-800">{post.views}</span>
                      </div>
                    </div>
                  </div>

                  {/* Clean Content Section */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-bold text-xl text-slate-900 group-hover:text-oslo-blue transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 line-clamp-3 leading-relaxed">
                      {post.content}
                    </p>
                    
                    {/* Simplified Meta */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">{format(new Date(post.date), 'd. MMM', { locale: nb })}</span>
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-oslo-blue group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Clean CTA Section */}
          <div className="mt-12 pt-8 border-t border-slate-100">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-slate-900">Stay Updated</h3>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Get the latest news, activities, and important updates from your child's kindergarten
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <Link to="/guardian/notice-board">
                  <Button size="lg" className="gap-2 bg-gradient-to-r from-oslo-blue to-blue-600 hover:from-oslo-blue/90 hover:to-blue-600/90 shadow-xl">
                    <Calendar className="h-4 w-4" />
                    View All Posts
                  </Button>
                </Link>
                <Link to="/guardian/messages">
                  <Button variant="outline" size="lg" className="gap-2 border-2 border-oslo-blue text-oslo-blue hover:bg-oslo-blue hover:text-white shadow-lg">
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
