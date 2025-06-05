
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FolderOpen, FileText, Download, Search, Filter, Eye, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock documents data
  const documents = [
    {
      id: 1,
      title: 'Årsplan 2024',
      category: 'curriculum',
      type: 'pdf',
      size: '2.4 MB',
      date: '2024-01-08',
      description: 'Pedagogisk årsplan og læremål for 2024'
    },
    {
      id: 2,
      title: 'Ukemeny Mars 2024',
      category: 'menu',
      type: 'pdf',
      size: '580 KB',
      date: '2024-03-01',
      description: 'Komplett meny for mars måned med allergener'
    },
    {
      id: 3,
      title: 'Sikkerhetsprosedyrer',
      category: 'safety',
      type: 'pdf',
      size: '1.2 MB',
      date: '2024-02-15',
      description: 'Oppdaterte rutiner for brannsikkerhet og evakuering'
    },
    {
      id: 4,
      title: 'Foreldrehåndbok 2024',
      category: 'handbook',
      type: 'pdf',
      size: '3.1 MB',
      date: '2024-01-10',
      description: 'Komplett guide for foreldre med alle praktiske opplysninger'
    },
    {
      id: 5,
      title: 'Emmas utviklingsrapport Q1',
      category: 'personal',
      type: 'pdf',
      size: '890 KB',
      date: '2024-03-15',
      description: 'Kvartalsrapport om Emmas utvikling og læring'
    }
  ];

  const categories = [
    { id: 'all', label: 'Alle dokumenter', count: documents.length },
    { id: 'curriculum', label: 'Læreplan', count: 1 },
    { id: 'menu', label: 'Menyer', count: 1 },
    { id: 'safety', label: 'Sikkerhet', count: 1 },
    { id: 'handbook', label: 'Håndbøker', count: 1 },
    { id: 'personal', label: 'Personlige', count: 1 }
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
          <h1 className="text-3xl font-bold text-slate-900">Dokumenter</h1>
          <p className="text-slate-600 mt-2">Tilgang til alle publiserte dokumenter fra barnehagen</p>
        </div>
        <Badge variant="outline" className="bg-oslo-blue/5 text-oslo-blue border-oslo-blue/20">
          <FolderOpen className="w-4 h-4 mr-2" />
          Dokumentarkiv
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
                  placeholder="Søk i dokumenter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Kategorier</CardTitle>
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
          <CardTitle>Dokumenter</CardTitle>
          <CardDescription>
            {filteredDocuments.length} av {documents.length} dokumenter
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
          <CardTitle>Nylige oppdateringer</CardTitle>
          <CardDescription>Sist publiserte dokumenter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.slice(0, 3).map((document) => (
              <div key={document.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{document.title}</h4>
                  <p className="text-sm text-slate-600">
                    Publisert {format(new Date(document.date), 'd. MMMM', { locale: nb })}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Last ned
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
