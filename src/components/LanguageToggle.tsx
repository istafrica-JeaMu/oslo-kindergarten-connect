
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const changeLanguage = (lng: string) => {
    if (lng === 'en' || lng === 'nb') {
      setLanguage(lng as 'en' | 'nb');
    }
  };

  // Map the internal language code to display value
  const displayValue = language === 'nb' ? 'no' : 'en';

  return (
    <Select value={displayValue} onValueChange={changeLanguage}>
      <SelectTrigger className="w-auto gap-2 border-0 bg-transparent hover:bg-gray-100 focus:ring-0">
        <Globe className="h-4 w-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-white border shadow-lg">
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="no">Norsk</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageToggle;
