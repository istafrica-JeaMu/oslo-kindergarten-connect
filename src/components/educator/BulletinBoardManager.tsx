
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Users,
  Image,
  Video,
  Bell,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface BulletinPost {
  id: string;
  title: string;
  content: string;
  author: string;
  type: 'announcement' | 'activity' | 'event' | 'photo_gallery' | 'educational';
  status: 'draft' | 'published' | 'scheduled' | 'expired';
  publishDate: string;
  expiryDate?: string;
  targetAudience: string[];
  attachments: string[];
  views: number;
  responses: number;
  urgent: boolean;
}

const BulletinBoardManager = () => {
  const [posts, setPosts] = useState<BulletinPost[]>([
    {
      id: '1',
      title: 'Weekly Activity Plan - Nature Discovery',
      content: 'This week we will be exploring nature! We plan outdoor activities including leaf collection, bird watching, and garden exploration. Please dress your children in weather-appropriate clothing.',
      author: 'Sarah Peterson',
      type: 'activity',
      status: 'published',
      publishDate: '2024-01-15T08:00:00',
      expiryDate: '2024-01-22T18:00:00',
      targetAudience: ['Sunshine Room', 'Rainbow Group'],
      attachments: ['nature_activity_plan.pdf'],
      views: 45,
      responses: 8,
      urgent: false
    },
    {
      id: '2',
      title: 'Parent-Teacher Conference Signup',
      content: 'Spring parent-teacher conferences are now open for booking. Please sign up for your preferred time slot through the app. Conferences will be held March 15-19.',
      author: 'Maria Hansen',
      type: 'announcement',
      status: 'published',
      publishDate: '2024-01-14T10:00:00',
      targetAudience: ['All Groups'],
      attachments: [],
      views: 78,
      responses: 12,
      urgent: true
    },
    {
      id: '3',
      title: 'Holiday Schedule Updates',
      content: 'Updated holiday schedule for Easter break. The kindergarten will be closed April 1-5. Special holiday activities planned for the week before.',
      author: 'Erik Larsen',
      type: 'announcement',
      status: 'scheduled',
      publishDate: '2024-01-20T09:00:00',
      targetAudience: ['All Groups'],
      attachments: ['holiday_schedule.pdf'],
      views: 0,
      responses: 0,
      urgent: false
    }
  ]);

  const [selectedPost, setSelectedPost] = useState<BulletinPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    type: 'announcement',
    targetAudience: [],
    urgent: false,
    publishDate: '',
    expiryDate: ''
  });

  const postTypes = [
    { value: 'announcement', label: 'Announcement', color: 'bg-blue-100 text-blue-800' },
    { value: 'activity', label: 'Activity Plan', color: 'bg-green-100 text-green-800' },
    { value: 'event', label: 'Event', color: 'bg-purple-100 text-purple-800' },
    { value: 'photo_gallery', label: 'Photo Gallery', color: 'bg-orange-100 text-orange-800' },
    { value: 'educational', label: 'Educational Content', color: 'bg-indigo-100 text-indigo-800' }
  ];

  const audiences = [
    'All Groups',
    'Sunshine Room',
    'Rainbow Group',
    'Star Class',
    'Adventure Group',
    'Baby Room'
  ];

  const templates = [
    {
      title: 'Weekly Activity Plan',
      content: 'This week we will be focusing on [THEME]. Planned activities include:\n\n• [Activity 1]\n• [Activity 2]\n• [Activity 3]\n\nPlease [SPECIAL_INSTRUCTIONS].',
      type: 'activity'
    },
    {
      title: 'Holiday Announcement',
      content: 'Dear parents,\n\nWe would like to inform you about the upcoming [HOLIDAY] celebration on [DATE].\n\n[DETAILS]\n\nPlease [REQUIREMENTS].\n\nBest regards,\n[NAME]',
      type: 'announcement'
    },
    {
      title: 'Photo Gallery',
      content: 'Take a look at our recent [ACTIVITY] photos! The children had a wonderful time [DESCRIPTION].\n\n[PHOTO_ATTACHMENTS]',
      type: 'photo_gallery'
    }
  ];

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post: BulletinPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: 'Current Educator',
      type: newPost.type as BulletinPost['type'],
      status: newPost.publishDate ? 'scheduled' : 'draft',
      publishDate: newPost.publishDate || new Date().toISOString(),
      expiryDate: newPost.expiryDate || undefined,
      targetAudience: newPost.targetAudience,
      attachments: [],
      views: 0,
      responses: 0,
      urgent: newPost.urgent
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({
      title: '',
      content: '',
      type: 'announcement',
      targetAudience: [],
      urgent: false,
      publishDate: '',
      expiryDate: ''
    });
    setIsCreating(false);
  };

  const handlePublishPost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, status: 'published' as const, publishDate: new Date().toISOString() }
        : post
    ));
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  const useTemplate = (template: any) => {
    setNewPost(prev => ({
      ...prev,
      title: template.title,
      content: template.content,
      type: template.type
    }));
  };

  const getStatusBadge = (status: string, urgent: boolean) => {
    const urgentClass = urgent ? 'border-red-300 bg-red-50' : '';
    
    switch (status) {
      case 'published':
        return <Badge className={`bg-green-100 text-green-800 ${urgentClass}`}><CheckCircle className="w-3 h-3 mr-1" />Published</Badge>;
      case 'draft':
        return <Badge className={`bg-gray-100 text-gray-800 ${urgentClass}`}>Draft</Badge>;
      case 'scheduled':
        return <Badge className={`bg-blue-100 text-blue-800 ${urgentClass}`}><Clock className="w-3 h-3 mr-1" />Scheduled</Badge>;
      case 'expired':
        return <Badge className={`bg-red-100 text-red-800 ${urgentClass}`}>Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeStyle = (type: string) => {
    return postTypes.find(t => t.value === type)?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Bulletin Board Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="posts">Manage Posts</TabsTrigger>
              <TabsTrigger value="create">Create Post</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">All Posts</h3>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </div>

              <div className="space-y-3">
                {posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{post.title}</h4>
                            {post.urgent && (
                              <Badge variant="destructive" className="text-xs">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2">{post.content}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge className={getTypeStyle(post.type)}>
                            {postTypes.find(t => t.value === post.type)?.label}
                          </Badge>
                          {getStatusBadge(post.status, post.urgent)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-4">
                          <span>By: {post.author}</span>
                          <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                          <span>Audience: {post.targetAudience.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {post.responses}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {post.status === 'draft' && (
                          <Button size="sm" onClick={() => handlePublishPost(post.id)}>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Publish
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => setSelectedPost(post)}>
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="create" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Post</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        placeholder="Post title..."
                        value={newPost.title}
                        onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <Select 
                        value={newPost.type} 
                        onValueChange={(value) => setNewPost(prev => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {postTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Content</label>
                    <Textarea
                      placeholder="Write your post content here..."
                      value={newPost.content}
                      onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                      rows={6}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Publish Date (Optional)</label>
                      <Input
                        type="datetime-local"
                        value={newPost.publishDate}
                        onChange={(e) => setNewPost(prev => ({ ...prev, publishDate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Expiry Date (Optional)</label>
                      <Input
                        type="datetime-local"
                        value={newPost.expiryDate}
                        onChange={(e) => setNewPost(prev => ({ ...prev, expiryDate: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Target Audience</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience..." />
                      </SelectTrigger>
                      <SelectContent>
                        {audiences.map((audience) => (
                          <SelectItem key={audience} value={audience}>
                            {audience}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-4">
                    <Button onClick={handleCreatePost}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Post
                    </Button>
                    <Button variant="outline">
                      <Image className="w-4 h-4 mr-2" />
                      Add Images
                    </Button>
                    <Button variant="outline">
                      <Video className="w-4 h-4 mr-2" />
                      Add Video
                    </Button>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newPost.urgent}
                        onChange={(e) => setNewPost(prev => ({ ...prev, urgent: e.target.checked }))}
                      />
                      <label className="text-sm">Mark as urgent</label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {templates.map((template, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{template.content}</p>
                      <div className="flex items-center justify-between">
                        <Badge className={getTypeStyle(template.type)}>
                          {postTypes.find(t => t.value === template.type)?.label}
                        </Badge>
                        <Button size="sm" onClick={() => useTemplate(template)}>
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulletinBoardManager;
