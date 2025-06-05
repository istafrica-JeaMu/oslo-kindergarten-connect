
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share, Calendar, Camera, FileText, Users, Utensils } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { nb } from 'date-fns/locale';

const NoticeBoard = () => {
  // Mock posts data
  const posts = [
    {
      id: 1,
      type: 'photos',
      title: 'Vårblomster i hagen',
      content: 'Barna plantet nye blomster i barnehagens have i dag. De lærte om forskjellige plantetyper og hvordan man tar vare på dem.',
      author: 'Kari Andersen',
      date: '2024-03-18T14:30:00',
      images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      likes: 12,
      comments: 3,
      category: 'activities'
    },
    {
      id: 2,
      type: 'menu',
      title: 'Ny ukemeny - Uke 12',
      content: 'Vi har oppdatert ukemenyen med flere økologiske alternativer og tatt hensyn til nye allergier.',
      author: 'Oslo Barnehage',
      date: '2024-03-17T09:00:00',
      attachment: 'ukemeny-uke12.pdf',
      likes: 8,
      comments: 1,
      category: 'menu'
    },
    {
      id: 3,
      type: 'announcement',
      title: 'Månedsplan April 2024',
      content: 'Se hva vi har planlagt for april måned! Mye spennende utforaktiviteter og læring om insekter og småkryp.',
      author: 'Pedagogisk team',
      date: '2024-03-16T16:45:00',
      attachment: 'manedsplan-april-2024.pdf',
      likes: 15,
      comments: 5,
      category: 'curriculum'
    },
    {
      id: 4,
      type: 'event',
      title: 'Loppemarked 5. april',
      content: 'Årlig loppemarked hvor foreldre kan kjøpe og selge leker, klær og utstyr. Overskuddet går til nye leker i barnehagen.',
      author: 'Foreldrerådet',
      date: '2024-03-15T12:20:00',
      eventDate: '2024-04-05',
      likes: 23,
      comments: 8,
      category: 'events'
    }
  ];

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

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'activities': return 'Aktiviteter';
      case 'menu': return 'Meny';
      case 'curriculum': return 'Læreplan';
      case 'events': return 'Arrangementer';
      default: return 'Annet';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Oppslagstavle</h1>
          <p className="text-slate-600 mt-2">Se siste nyheter, bilder og planer fra barnehagen</p>
        </div>
        <Badge variant="outline" className="bg-oslo-blue/5 text-oslo-blue border-oslo-blue/20">
          <Calendar className="w-4 h-4 mr-2" />
          Nyheter og oppdateringer
        </Badge>
      </div>

      {/* Filter Categories */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="default" size="sm">Alle innlegg</Button>
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-1" />
              Aktiviteter
            </Button>
            <Button variant="outline" size="sm">
              <Utensils className="w-4 h-4 mr-1" />
              Menyer
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-1" />
              Læreplaner
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-1" />
              Arrangementer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => {
          const CategoryIcon = getCategoryIcon(post.category);
          
          return (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-oslo-blue rounded-full flex items-center justify-center text-white font-semibold">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold">{post.author}</h3>
                      <p className="text-sm text-slate-600">
                        {format(new Date(post.date), 'd. MMMM yyyy • HH:mm', { locale: nb })}
                      </p>
                    </div>
                  </div>
                  
                  <Badge className={getCategoryColor(post.category)}>
                    <CategoryIcon className="w-3 h-3 mr-1" />
                    {getCategoryLabel(post.category)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                    <p className="text-slate-700 leading-relaxed">{post.content}</p>
                  </div>

                  {/* Images */}
                  {post.images && (
                    <div className="grid grid-cols-3 gap-2">
                      {post.images.map((image, index) => (
                        <div key={index} className="aspect-square bg-slate-200 rounded-lg flex items-center justify-center">
                          <Camera className="w-8 h-8 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Attachment */}
                  {post.attachment && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border">
                      <FileText className="w-5 h-5 text-slate-600" />
                      <span className="text-sm font-medium">{post.attachment}</span>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        Last ned
                      </Button>
                    </div>
                  )}

                  {/* Event Date */}
                  {post.eventDate && (
                    <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-purple-800">
                        {format(new Date(post.eventDate), 'EEEE d. MMMM yyyy', { locale: nb })}
                      </span>
                    </div>
                  )}

                  {/* Interaction Bar */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-slate-600 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-slate-600 hover:text-oslo-blue transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.comments}</span>
                      </button>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4 mr-2" />
                      Del
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline">
          Last flere innlegg
        </Button>
      </div>
    </div>
  );
};

export default NoticeBoard;
