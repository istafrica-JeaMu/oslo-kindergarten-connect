
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

interface Child {
  id: string;
  name: string;
  kindergarten: string;
}

interface ChildInfoCardProps {
  child: Child;
}

const ChildInfoCard = ({ child }: ChildInfoCardProps) => {
  return (
    <Card className="border-l-4 border-l-oslo-blue">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-oslo-blue" />
          {child.name}
        </CardTitle>
        <CardDescription>{child.kindergarten}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ChildInfoCard;
