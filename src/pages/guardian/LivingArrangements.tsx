import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Home,
  CalendarRange,
  Users,
  Edit,
  Save,
  Clock,
  MapPin,
  Phone,
  FileUp,
  Check,
  Plus,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Mail,
  Shield,
  UserPlus,
  Settings,
  Eye,
  MoreVertical,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const LivingArrangements = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPrimaryAddress, setIsEditingPrimaryAddress] = useState(false);
  const [selectedArrangementType, setSelectedArrangementType] = useState('fixed');
  const [showAddPersonDialog, setShowAddPersonDialog] = useState(false);
  const [showEditPersonDialog, setShowEditPersonDialog] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [newPersonData, setNewPersonData] = useState({
    name: '',
    relationship: '',
    phone: '',
    purpose: '',
    restrictions: ''
  });
  const [primaryAddressData, setPrimaryAddressData] = useState({
    street: 'Trondheimsveien 235',
    postalCode: '0586',
    city: 'Oslo',
    resident: 'Mother (Anna Hansen)',
    relationship: 'Primary Guardian',
    schedule: 'Monday - Thursday (Kindergarten pickup at 16:00)',
    phone: '+47 22 33 44 55',
    email: 'anna.hansen@email.com'
  });
  const { toast } = useToast();
  const { t } = useLanguage();

  const livingArrangement = {
    type: selectedArrangementType,
    lastUpdated: '2024-03-18',
    nextReview: '2025-09-01',
    verificationStatus: {
      address: true,
      contact: true,
      documents: true,
      emergency: false
    },
    primaryAddress: {
      street: primaryAddressData.street,
      postalCode: primaryAddressData.postalCode,
      city: primaryAddressData.city,
      resident: primaryAddressData.resident,
      relationship: primaryAddressData.relationship,
      schedule: primaryAddressData.schedule,
      phone: primaryAddressData.phone,
      email: primaryAddressData.email,
      verified: true
    },
    secondaryAddress: {
      street: 'Bygdøy Allé 15',
      postalCode: '0262',
      city: 'Oslo',
      resident: 'Father (Lars Hansen)',
      relationship: 'Secondary Guardian',
      schedule: 'Friday - Sunday (Kindergarten pickup at 15:30)',
      phone: '+47 22 66 77 88',
      email: 'lars.hansen@email.com',
      verified: true
    },
    authorizedPersons: [
      {
        id: 1,
        name: 'Astrid Hansen',
        relationship: 'Grandmother',
        phone: '+47 22 11 22 33',
        purpose: 'Emergency backup for sick days',
        status: 'active',
        expiryDate: null,
        restrictions: 'Emergency only'
      },
      {
        id: 2,
        name: 'Erik Olsen',
        relationship: 'Neighbor',
        phone: '+47 22 44 55 66',
        purpose: 'School holiday pickup when parents work',
        status: 'active',
        expiryDate: null,
        restrictions: 'Weekdays only'
      },
      {
        id: 3,
        name: 'Maria Johannsen',
        relationship: 'Babysitter',
        phone: '+47 22 77 88 99',
        purpose: 'Evening event pickup',
        status: 'active',
        expiryDate: '2025-07-15',
        restrictions: 'After 17:00 only'
      },
      {
        id: 4,
        name: 'Nils Hansen',
        relationship: 'Uncle',
        phone: '+47 22 99 00 11',
        purpose: 'Authorized for Father\'s custody days',
        status: 'active',
        expiryDate: null,
        restrictions: 'Friday-Sunday only'
      }
    ],
    custodyDocument: 'custody-agreement.pdf',
    specialNotes: 'Holiday schedule rotates annually. Christmas 2024: Mother, Easter 2025: Father. Child has special dietary requirements documented separately.'
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Living arrangements updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleSavePrimaryAddress = () => {
    setIsEditingPrimaryAddress(false);
    toast({
      title: "Primary address updated",
      description: "Your address information has been saved successfully.",
    });
  };

  const handleArrangementTypeChange = (type: string) => {
    setSelectedArrangementType(type);
    toast({
      title: "Arrangement type changed",
      description: `Selected ${type === 'shared' ? 'Shared Custody' : type === 'fixed' ? 'Fixed Residence' : 'Other Arrangement'}`,
    });
  };

  const handleConfigureSchedule = () => {
    toast({
      title: "Schedule Configuration",
      description: "Opening schedule configuration dialog...",
    });
  };

  const handleManagePickup = () => {
    toast({
      title: "Pickup Authorization",
      description: "Opening pickup authorization management...",
    });
  };

  const handleSetupCustom = () => {
    toast({
      title: "Custom Arrangement",
      description: "Opening custom arrangement setup...",
    });
  };

  const handleAddPerson = () => {
    setNewPersonData({
      name: '',
      relationship: '',
      phone: '',
      purpose: '',
      restrictions: ''
    });
    setShowAddPersonDialog(true);
  };

  const handleSaveNewPerson = () => {
    toast({
      title: "Person Added",
      description: `${newPersonData.name} has been added to authorized pickup list.`,
    });
    setShowAddPersonDialog(false);
    setNewPersonData({
      name: '',
      relationship: '',
      phone: '',
      purpose: '',
      restrictions: ''
    });
  };

  const handleEditPerson = (person: any) => {
    setSelectedPerson(person);
    setNewPersonData({
      name: person.name,
      relationship: person.relationship,
      phone: person.phone,
      purpose: person.purpose,
      restrictions: person.restrictions
    });
    setShowEditPersonDialog(true);
  };

  const handleSaveEditPerson = () => {
    toast({
      title: "Person Updated",
      description: `${selectedPerson?.name}'s information has been updated.`,
    });
    setShowEditPersonDialog(false);
    setSelectedPerson(null);
  };

  const handleDeletePerson = (person: any) => {
    toast({
      title: "Person Removed",
      description: `${person.name} has been removed from authorized pickup list.`,
      variant: "destructive",
    });
  };

  const handleViewDocument = () => {
    toast({
      title: "Document Viewer",
      description: "Opening custody agreement document...",
    });
  };

  const handleUploadDocument = () => {
    toast({
      title: "Document Upload",
      description: "Opening document upload dialog...",
    });
  };

  const handleViewContact = (name: string) => {
    toast({
      title: "Contact Details",
      description: `Viewing details for ${name}...`,
    });
  };

  const handleManagePerson = (personId: number) => {
    const person = livingArrangement.authorizedPersons.find(p => p.id === personId);
    toast({
      title: "Manage Person",
      description: `Opening management options for ${person?.name}...`,
    });
  };

  const getStatusIcon = (verified: boolean) => {
    return verified ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <AlertTriangle className="w-4 h-4 text-orange-500" />
    );
  };

  const getStatusBadge = (status: string, expiryDate?: string) => {
    if (status === 'active') {
      if (expiryDate) {
        const expiry = new Date(expiryDate);
        const today = new Date();
        const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
        
        if (daysUntilExpiry <= 30) {
          return <Badge className="bg-orange-100 text-orange-700 border-orange-300">Expires Soon</Badge>;
        }
      }
      return <Badge className="bg-green-100 text-green-700 border-green-300">Active</Badge>;
    }
    return <Badge className="bg-slate-100 text-slate-700 border-slate-300">Inactive</Badge>;
  };

  const renderWeeklySchedule = (schedule: string, accent: string) => {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const isMonToThu = schedule.includes('Monday') && schedule.includes('Thursday');
    const isFriToSun = schedule.includes('Friday') && schedule.includes('Sunday');
    
    return (
      <div className="flex gap-1">
        {days.map((day, index) => {
          let isActive = false;
          if (isMonToThu && index <= 3) isActive = true;
          if (isFriToSun && index >= 4) isActive = true;
          
          return (
            <div
              key={index}
              className={`w-6 h-6 rounded text-xs flex items-center justify-center font-medium ${
                isActive 
                  ? `${accent} text-white` 
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Living Arrangements</h1>
          <p className="text-slate-600 mt-2">Manage custody schedules, addresses, and pickup authorization</p>
          <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Last updated: {livingArrangement.lastUpdated}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Next review: {livingArrangement.nextReview}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-oslo-blue/5 text-oslo-blue border-oslo-blue/20">
            <Home className="w-4 h-4 mr-2" />
            {selectedArrangementType === 'shared' ? 'Shared Custody' : selectedArrangementType === 'fixed' ? 'Fixed Residence' : 'Other Arrangement'}
          </Badge>
          {!isEditing && (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Arrangements
            </Button>
          )}
        </div>
      </div>

      <Card className="border-l-4 border-l-oslo-blue">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Arrangement Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              {getStatusIcon(livingArrangement.verificationStatus.address)}
              <span className="text-sm">Address Verified</span>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(livingArrangement.verificationStatus.contact)}
              <span className="text-sm">Contact Verified</span>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(livingArrangement.verificationStatus.documents)}
              <span className="text-sm">Documents Complete</span>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(livingArrangement.verificationStatus.emergency)}
              <span className="text-sm">Emergency Contact Needed</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Arrangement Type</CardTitle>
            {!isEditing && selectedArrangementType === 'fixed' && (
              <Button variant="ghost" size="sm" onClick={handleManagePickup}>
                <Settings className="w-4 h-4 mr-2" />
                Manage Pickup Authorization
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className={`border-2 rounded-lg p-6 flex flex-col items-center text-center gap-3 transition-all hover:shadow-md cursor-pointer ${
                selectedArrangementType === 'shared' 
                  ? 'bg-oslo-blue/5 border-oslo-blue' 
                  : 'border-slate-200 hover:border-oslo-blue/50'
              }`}
              onClick={() => handleArrangementTypeChange('shared')}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedArrangementType === 'shared' ? 'bg-oslo-blue' : 'bg-slate-100'
              }`}>
                <Home className={`w-6 h-6 ${selectedArrangementType === 'shared' ? 'text-white' : 'text-slate-500'}`} />
              </div>
              <div>
                <p className="font-semibold text-lg">Shared Custody</p>
                <p className="text-sm text-slate-600 mt-1">Child alternates between two homes</p>
                {selectedArrangementType === 'shared' && (
                  <Badge className="bg-oslo-blue mt-2">Selected</Badge>
                )}
              </div>
              {selectedArrangementType === 'shared' && (
                <div className="mt-2">
                  <p className="text-xs text-slate-500 mb-2">Current Schedule:</p>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Mon-Thu: Mother</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Fri-Sun: Father</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div 
              className={`border-2 rounded-lg p-6 flex flex-col items-center text-center gap-3 transition-all hover:shadow-md cursor-pointer ${
                selectedArrangementType === 'fixed' 
                  ? 'bg-oslo-blue/5 border-oslo-blue' 
                  : 'border-slate-200 hover:border-oslo-blue/50'
              }`}
              onClick={() => handleArrangementTypeChange('fixed')}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedArrangementType === 'fixed' ? 'bg-oslo-blue' : 'bg-slate-100'
              }`}>
                <Home className={`w-6 h-6 ${selectedArrangementType === 'fixed' ? 'text-white' : 'text-slate-500'}`} />
              </div>
              <div>
                <p className="font-semibold text-lg">Fixed Residence</p>
                <p className="text-sm text-slate-600 mt-1">One primary home with authorized pickup</p>
                {selectedArrangementType === 'fixed' && (
                  <Badge className="bg-oslo-blue mt-2">Selected</Badge>
                )}
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs text-slate-500">Current setup:</p>
                <p className="text-xs font-medium">4 authorized persons</p>
                {selectedArrangementType === 'fixed' && (
                  <Button variant="outline" size="sm" className="mt-2" onClick={handleManagePickup}>
                    Manage Pickup
                  </Button>
                )}
              </div>
            </div>
            
            <div 
              className={`border-2 rounded-lg p-6 flex flex-col items-center text-center gap-3 transition-all hover:shadow-md cursor-pointer ${
                selectedArrangementType === 'other' 
                  ? 'bg-oslo-blue/5 border-oslo-blue' 
                  : 'border-slate-200 hover:border-oslo-blue/50'
              }`}
              onClick={() => handleArrangementTypeChange('other')}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedArrangementType === 'other' ? 'bg-oslo-blue' : 'bg-slate-100'
              }`}>
                <FileUp className={`w-6 h-6 ${selectedArrangementType === 'other' ? 'text-white' : 'text-slate-500'}`} />
              </div>
              <div>
                <p className="font-semibold text-lg">Other Arrangement</p>
                <p className="text-sm text-slate-600 mt-1">Custom situation requiring documentation</p>
                {selectedArrangementType === 'other' && (
                  <Badge className="bg-oslo-blue mt-2">Selected</Badge>
                )}
              </div>
              <div className="mt-2">
                <Badge variant="outline" className="text-xs">Documentation Required</Badge>
                {selectedArrangementType === 'other' && (
                  <Button variant="outline" size="sm" className="mt-2" onClick={handleSetupCustom}>
                    Setup Custom
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-oslo-blue" />
                Primary Address
              </CardTitle>
              <CardDescription>
                Main residence where child lives
              </CardDescription>
            </div>
            {!isEditingPrimaryAddress && (
              <Button variant="outline" size="sm" onClick={() => setIsEditingPrimaryAddress(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Address
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isEditingPrimaryAddress ? (
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="street1">Street Address</Label>
                  <Input
                    id="street1"
                    value={primaryAddressData.street}
                    onChange={(e) => setPrimaryAddressData({...primaryAddressData, street: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="postal1">Postal Code</Label>
                  <Input
                    id="postal1"
                    value={primaryAddressData.postalCode}
                    onChange={(e) => setPrimaryAddressData({...primaryAddressData, postalCode: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city1">City</Label>
                  <Input
                    id="city1"
                    value={primaryAddressData.city}
                    onChange={(e) => setPrimaryAddressData({...primaryAddressData, city: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="resident1">Resident</Label>
                  <Input
                    id="resident1"
                    value={primaryAddressData.resident}
                    onChange={(e) => setPrimaryAddressData({...primaryAddressData, resident: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone1">Phone</Label>
                  <Input
                    id="phone1"
                    value={primaryAddressData.phone}
                    onChange={(e) => setPrimaryAddressData({...primaryAddressData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email1">Email</Label>
                  <Input
                    id="email1"
                    value={primaryAddressData.email}
                    onChange={(e) => setPrimaryAddressData({...primaryAddressData, email: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="schedule1">Schedule</Label>
                <Input
                  id="schedule1"
                  value={primaryAddressData.schedule}
                  onChange={(e) => setPrimaryAddressData({...primaryAddressData, schedule: e.target.value})}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={handleSavePrimaryAddress}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Address
                </Button>
                <Button variant="outline" onClick={() => setIsEditingPrimaryAddress(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-100">
                  <Avatar className="w-16 h-16 border-2 border-white shadow-md">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-oslo-blue text-white text-lg font-semibold">AH</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-bold text-lg text-slate-800">{livingArrangement.primaryAddress.resident}</h3>
                      <Badge className="bg-blue-100 text-blue-700 text-xs border-blue-200">{livingArrangement.primaryAddress.relationship}</Badge>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm text-slate-700">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <MapPin className="w-3 h-3 text-blue-600" />
                        </div>
                        <span className="font-medium">{livingArrangement.primaryAddress.street}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600 ml-9">
                        <span>{livingArrangement.primaryAddress.postalCode} {livingArrangement.primaryAddress.city}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg border">
                    <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-600" />
                      Contact Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 w-12">Phone:</span>
                        <span className="font-medium">{livingArrangement.primaryAddress.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 w-12">Email:</span>
                        <span className="font-medium">{livingArrangement.primaryAddress.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-green-800 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Pickup Schedule
                      </h4>
                      {renderWeeklySchedule(livingArrangement.primaryAddress.schedule, 'bg-green-500')}
                    </div>
                    <p className="text-sm text-green-700">{livingArrangement.primaryAddress.schedule}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedArrangementType === 'shared' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" />
              Secondary Address
            </CardTitle>
            <CardDescription>
              Secondary residence where child lives Friday through Sunday
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-green-600 text-white">LH</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{livingArrangement.secondaryAddress.resident}</h3>
                    <Badge className="bg-green-100 text-green-700 text-xs">{livingArrangement.secondaryAddress.relationship}</Badge>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="space-y-1 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{livingArrangement.secondaryAddress.street}, {livingArrangement.secondaryAddress.postalCode} {livingArrangement.secondaryAddress.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{livingArrangement.secondaryAddress.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{livingArrangement.secondaryAddress.email}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleViewContact('Lars Hansen')}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Kindergarten Pickup Schedule
                  </h4>
                  {renderWeeklySchedule(livingArrangement.secondaryAddress.schedule, 'bg-green-500')}
                </div>
                <p className="text-sm text-slate-600">{livingArrangement.secondaryAddress.schedule}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Authorized Pickup Persons
              </CardTitle>
              <CardDescription>
                People authorized to collect your child when you cannot
              </CardDescription>
            </div>
            <Button size="sm" onClick={handleAddPerson}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Person
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Person</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Restrictions</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {livingArrangement.authorizedPersons.map((person) => (
                <TableRow key={person.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{person.name}</p>
                        <p className="text-xs text-slate-500">{person.relationship}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{person.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{person.purpose}</p>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(person.status, person.expiryDate)}
                    {person.expiryDate && (
                      <p className="text-xs text-slate-500 mt-1">
                        Expires: {person.expiryDate}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-slate-600">{person.restrictions}</p>
                  </TableCell>
                  <TableCell>
                    <ContextMenu>
                      <ContextMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="w-40">
                        <ContextMenuItem onClick={() => handleEditPerson(person)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </ContextMenuItem>
                        <ContextMenuItem 
                          onClick={() => handleDeletePerson(person)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileUp className="w-5 h-5 text-slate-600" />
            Legal Documentation
          </CardTitle>
          <CardDescription>
            Custody agreements and supporting documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {livingArrangement.custodyDocument ? (
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{livingArrangement.custodyDocument}</h3>
                    <p className="text-sm text-slate-600">Custody Agreement - Verified</p>
                    <div className="flex items-center gap-1 mt-1">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">Document verified</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleViewDocument}>
                  View Document
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center p-8 bg-slate-50 rounded-lg border border-dashed">
                <Button variant="outline" onClick={handleUploadDocument}>
                  <FileUp className="w-4 h-4 mr-2" />
                  Upload Custody Documents
                </Button>
              </div>
            )}
            
            {livingArrangement.specialNotes && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Special Notes & Holiday Schedule
                </h3>
                <p className="text-sm text-blue-700">{livingArrangement.specialNotes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {isEditing && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      )}

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <Check className="w-5 h-5" />
            Important Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div className="space-y-2">
              <p>• Changes to living arrangements affect pickup authorization and emergency procedures</p>
              <p>• All pickup persons must provide valid ID when collecting your child</p>
              <p>• Holiday schedules may override regular custody arrangements</p>
            </div>
            <div className="space-y-2">
              <p>• Custody documents require annual review and updates</p>
              <p>• Emergency contacts are checked regularly for accuracy</p>
              <p>• Processing time for arrangement changes: 2-3 business days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showAddPersonDialog} onOpenChange={setShowAddPersonDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Authorized Person</DialogTitle>
            <DialogDescription>
              Add someone who can pick up your child from kindergarten.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newPersonData.name}
                onChange={(e) => setNewPersonData({...newPersonData, name: e.target.value})}
                className="col-span-3"
                placeholder="Full name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="relationship" className="text-right">
                Relationship
              </Label>
              <Input
                id="relationship"
                value={newPersonData.relationship}
                onChange={(e) => setNewPersonData({...newPersonData, relationship: e.target.value})}
                className="col-span-3"
                placeholder="e.g., Grandmother"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={newPersonData.phone}
                onChange={(e) => setNewPersonData({...newPersonData, phone: e.target.value})}
                className="col-span-3"
                placeholder="+47 XX XX XX XX"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="purpose" className="text-right">
                Purpose
              </Label>
              <Textarea
                id="purpose"
                value={newPersonData.purpose}
                onChange={(e) => setNewPersonData({...newPersonData, purpose: e.target.value})}
                className="col-span-3"
                placeholder="When will this person pick up your child?"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="restrictions" className="text-right">
                Restrictions
              </Label>
              <Input
                id="restrictions"
                value={newPersonData.restrictions}
                onChange={(e) => setNewPersonData({...newPersonData, restrictions: e.target.value})}
                className="col-span-3"
                placeholder="e.g., Emergency only"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddPersonDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewPerson}>
              Add Person
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditPersonDialog} onOpenChange={setShowEditPersonDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Authorized Person</DialogTitle>
            <DialogDescription>
              Update information for {selectedPerson?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                value={newPersonData.name}
                onChange={(e) => setNewPersonData({...newPersonData, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-relationship" className="text-right">
                Relationship
              </Label>
              <Input
                id="edit-relationship"
                value={newPersonData.relationship}
                onChange={(e) => setNewPersonData({...newPersonData, relationship: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-phone" className="text-right">
                Phone
              </Label>
              <Input
                id="edit-phone"
                value={newPersonData.phone}
                onChange={(e) => setNewPersonData({...newPersonData, phone: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-purpose" className="text-right">
                Purpose
              </Label>
              <Textarea
                id="edit-purpose"
                value={newPersonData.purpose}
                onChange={(e) => setNewPersonData({...newPersonData, purpose: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-restrictions" className="text-right">
                Restrictions
              </Label>
              <Input
                id="edit-restrictions"
                value={newPersonData.restrictions}
                onChange={(e) => setNewPersonData({...newPersonData, restrictions: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditPersonDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEditPerson}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LivingArrangements;
