
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Download, Print, MapPin, Users, Clock, Phone, Mail } from 'lucide-react';

interface KindergartenDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kindergarten: any;
}

const KindergartenDetailsModal = ({ open, onOpenChange, kindergarten }: KindergartenDetailsModalProps) => {
  if (!kindergarten) return null;

  const handleExport = () => {
    // Simulate export functionality
    const dataStr = JSON.stringify(kindergarten, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${kindergarten.name.replace(/\s+/g, '_')}_details.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const capacityPercentage = (kindergarten.capacity.occupied / kindergarten.capacity.total) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {kindergarten.name} - Details
            </DialogTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Print className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Kindergarten ID</p>
                  <p className="font-medium">{kindergarten.id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Type</p>
                  <Badge variant="outline">{kindergarten.type}</Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Director</p>
                  <p className="font-medium">{kindergarten.director}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Status</p>
                  <Badge variant={kindergarten.status === 'Active' ? 'default' : 'secondary'}>
                    {kindergarten.status}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Address
                  </p>
                  <p className="font-medium">{kindergarten.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Capacity Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Capacity Overview
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-900">{kindergarten.capacity.total}</p>
                  <p className="text-sm text-blue-600">Total Capacity</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-900">{kindergarten.capacity.occupied}</p>
                  <p className="text-sm text-green-600">Currently Enrolled</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-900">{Math.round(capacityPercentage)}%</p>
                  <p className="text-sm text-purple-600">Utilization</p>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-slate-600">Age 1-2 Years</p>
                  <p className="font-semibold">{kindergarten.capacity.ageGroup1to2} spots</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-slate-600">Age 3-5 Years</p>
                  <p className="font-semibold">{kindergarten.capacity.ageGroup3to5} spots</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Operational Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Operational Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Operating Hours</p>
                  <p className="font-medium">7:00 AM - 5:00 PM</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Accepting Applications</p>
                  <Badge variant={kindergarten.acceptingApplications ? 'default' : 'secondary'}>
                    {kindergarten.acceptingApplications ? 'Yes' : 'No'}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-600 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    Phone
                  </p>
                  <p className="font-medium">+47 23 45 67 89</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    Email
                  </p>
                  <p className="font-medium">{kindergarten.name.toLowerCase().replace(/\s+/g, '')}@oslo.kommune.no</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Services Offered</h3>
              <div className="flex flex-wrap gap-2">
                {kindergarten.services.map((service: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {service}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KindergartenDetailsModal;
