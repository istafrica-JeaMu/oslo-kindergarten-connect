
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FolderOpen, FileText, Download, Search, Filter, Eye, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { t } = useLanguage();

  // Mock documents data
  const documents = [
    {
      id: 1,
      title: t('guardian.documents.examples.yearPlan.title'),
      category: 'curriculum',
      type: 'pdf',
      size: '2.4 MB',
      date: '2024-01-08',
      description: t('guardian.documents.examples.yearPlan.description')
    },
    {
      id: 2,
      title: t('guardian.documents.examples.weeklyMenu.title'),
      category: 'menu',
      type: 'pdf',
      size: '580 KB',
      date: '2024-03-01',
      description: t('guardian.documents.examples.weeklyMenu.description')
    },
    {
      id: 3,
      title: t('guardian.documents.examples.safety.title'),
      category: 'safety',
      type: 'pdf',
      size: '1.2 MB',
      date: '2024-02-15',
      description: t('guardian.documents.examples.safety.description')
    },
    {
      id: 4,
      title: t('guardian.documents.examples.handbook.title'),
      category: 'handbook',
      type: 'pdf',
      size: '3.1 MB',
      date: '2024-01-10',
      description: t('guardian.documents.examples.handbook.description')
    },
    {
      id: 5,
      title: t('guardian.documents.examples.development.title'),
      category: 'personal',
      type: 'pdf',
      size: '890 KB',
      date: '2024-03-15',
      description: t('guardian.documents.examples.development.description')
    }
  ];

  const categories = [
    { id: 'all', label: t('guardian.documents.categories.all'), count: documents.length },
    { id: 'curriculum', label: t('guardian.documents.categories.curriculum'), count: 1 },
    { id: 'menu', label: t('guardian.documents.categories.menu'), count: 1 },
    { id: 'safety', label: t('guardian.documents.categories.safety'), count: 1 },
    { id: 'handbook', label: t('guardian.documents.categories.handbook'), count: 1 },
    { id: 'personal', label: t('guardian.documents.categories.personal'), count: 1 }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'curriculum': return 'bg-blue-100 text-blue-700';
      case 'menu': return 'bg-green-100 text-green-700';
      case 'safety': return 'bg-red-100 text-red-700';
      case 'handbook': return 'bg-purple-100 text-purple-700';
      case 'personal': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.label : category;
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t('guardian.documents.title')}</h1>
          <p className="text-slate-600 mt-2">{t('guardian.documents.description')}</p>
        </div>
        <Badge variant="outline" className="bg-oslo-blue/5 text-oslo-blue border-oslo-blue/20">
          <FolderOpen className="w-4 h-4 mr-2" />
          {t('guardian.documents.badge')}
        </Badge>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder={t('guardian.documents.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              {t('guardian.documents.filter')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>{t('guardian.documents.categoriesTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>{t('guardian.documents.documentsTitle')}</CardTitle>
          <CardDescription>
            {filteredDocuments.length} {t('guardian.documents.of')} {documents.length} {t('guardian.documents.documentsCount')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-slate-600" />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">{document.title}</h3>
                    <p className="text-sm text-slate-600">{document.description}</p>
                    
                    <div className="flex items-center gap-4 mt-2">
                      <Badge className={getCategoryColor(document.category)}>
                        {getCategoryLabel(document.category)}
                      </Badge>
                      
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>{document.size}</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(document.date), 'd. MMM yyyy', { locale: nb })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Updates */}
      <Card>
        <CardHeader>
          <CardTitle>{t('guardian.documents.recentUpdates')}</CardTitle>
          <CardDescription>{t('guardian.documents.recentDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.slice(0, 3).map((document) => (
              <div key={document.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{document.title}</h4>
                  <p className="text-sm text-slate-600">
                    {t('guardian.documents.published')} {format(new Date(document.date), 'd. MMMM', { locale: nb })}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  {t('guardian.documents.download')}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documents;
