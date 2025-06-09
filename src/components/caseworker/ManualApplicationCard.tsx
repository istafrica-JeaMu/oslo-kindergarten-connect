
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, UserX, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManualApplicationCard = () => {
  return (
    <Card className="relative overflow-hidden border-2 border-dashed border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50 hover:border-solid hover:border-orange-400 transition-all duration-300 group transform hover:scale-[1.02]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <UserX className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                Register Application (No e-ID)
              </CardTitle>
              <CardDescription className="text-base mt-1">
                Manual submission for guardians without digital ID
              </CardDescription>
            </div>
          </div>
          <Badge className="bg-orange-100 text-orange-700 border-orange-300 font-semibold">
            <AlertCircle className="h-3 w-3 mr-1" />
            Manual Entry
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="p-4 bg-white/70 rounded-lg border border-orange-200">
            <p className="text-sm text-gray-700 mb-3">
              <strong>Use when guardians:</strong>
            </p>
            <ul className="text-sm text-gray-600 space-y-1 ml-4">
              <li>• Don't have BankID or ID-porten access</li>
              <li>• Are new residents without digital credentials</li>
              <li>• Need immediate application assistance</li>
            </ul>
          </div>
          
          <Link to="/caseworker/manual-application" className="block">
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <FileText className="h-5 w-5 mr-2" />
              Start Manual Application
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManualApplicationCard;
