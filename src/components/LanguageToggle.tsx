
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Select value={i18n.language} onValueChange={changeLanguage}>
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
