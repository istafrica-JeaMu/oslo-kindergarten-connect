
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Camera, FileText, Heart, MessageCircle, Share, Users, Utensils } from 'lucide-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

const PostDetail = () => {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);

  // Mock post data - in real app this would come from API
  const post = {
    id: parseInt(id || '1'),
    type: 'photos',
    title: 'Easter Holiday Preparations',
    content: `We're excited to share the wonderful Easter preparations happening at our kindergarten! The children have been busy creating beautiful decorations and learning about Easter traditions.

    This week, the children have been:
    • Painting Easter eggs with natural colors
    • Creating spring flower arrangements
    • Learning about Easter traditions from different cultures
    • Preparing for our Easter celebration next Friday

    We encourage all families to join us for our Easter celebration on Friday, March 22nd, from 2:00 PM to 4:00 PM. The children will showcase their artwork and we'll have traditional Easter activities for the whole family.

    Please remember to bring a small Easter treat to share if you'd like to contribute to our celebration buffet.`,
    author: 'Kari Andersen',
    date: '2024-03-18T14:30:00',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    likes: 12,
    comments: 3,
    category: 'activities'
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'activities': return Users;
      case 'menu': return Utensils;
      case 'curriculum': return FileText;
      case 'events': return Calendar;
      default: return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'activities': return 'bg-green-100 text-green-700';
      case 'menu': return 'bg-orange-100 text-orange-700';
      case 'curriculum': return 'bg-blue-100 text-blue-700';
      case 'events': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const CategoryIcon = getCategoryIcon(post.category);

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Link to="/guardian/notice-board">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Notice Board
          </Button>
        </Link>
      </div>

      {/* Post Content */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-oslo-blue rounded-full flex items-center justify-center text-white font-semibold">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{post.author}</h3>
                <p className="text-sm text-slate-600">
                  {format(new Date(post.date), 'd. MMMM yyyy • HH:mm', { locale: nb })}
                </p>
              </div>
            </div>
            
            <Badge className={getCategoryColor(post.category)}>
              <CategoryIcon className="w-3 h-3 mr-1" />
              {post.category}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
              <div className="prose max-w-none">
                {post.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-slate-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Images */}
            {post.images && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {post.images.map((image, index) => (
                  <div key={index} className="aspect-square bg-slate-200 rounded-lg flex items-center justify-center">
                    <Camera className="w-12 h-12 text-slate-400" />
                  </div>
                ))}
              </div>
            )}

            {/* Interaction Bar */}
            <div className="flex items-center justify-between pt-6 border-t">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-2 transition-colors ${
                    liked ? 'text-red-500' : 'text-slate-600 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
                  <span className="font-medium">{liked ? post.likes + 1 : post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-600 hover:text-oslo-blue transition-colors">
                  <MessageCircle className="w-6 h-6" />
                  <span className="font-medium">{post.comments}</span>
                </button>
              </div>
              
              <Button variant="ghost" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Comments Section */}
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-lg font-semibold">Comments</h3>
              <div className="text-slate-500 text-center py-8">
                Comments feature coming soon...
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostDetail;
