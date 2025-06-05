
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Shield, User, Mail, AlertCircle, CheckCircle, Clock, HelpCircle, Database, UserPlus } from 'lucide-react';

interface GuardianData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  relationship: string;
  idMethod: string;
}

interface SecondGuardian {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  status: 'detected' | 'invited' | 'confirmed' | 'declined';
  invitedAt?: string;
  confirmedAt?: string;
}

interface GuardianInfoManagerProps {
  formData: GuardianData;
  setFormData: (data: GuardianData) => void;
  childPersonalNumber: string;
}

const GuardianInfoManager: React.FC<GuardianInfoManagerProps> = ({
  formData,
  setFormData,
  childPersonalNumber
}) => {
  const [primaryGuardian, setPrimaryGuardian] = useState<GuardianData | null>(null);
  const [secondGuardian, setSecondGuardian] = useState<SecondGuardian | null>(null);
  const [inviteSecondGuardian, setInviteSecondGuardian] = useState(false);
  const [isLoadingGuardians, setIsLoadingGuardians] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  // Mock ID-porten pre-fill data
  useEffect(() => {
    // Simulate logged-in user data from ID-porten
    const mockPrimaryGuardian = {
      firstName: 'Marie',
      lastName: 'Hansen',
      email: 'marie.hansen@email.com',
      phone: '+47 123 45 678',
      address: 'Storgata 15, 0155 Oslo',
      relationship: 'parent',
      idMethod: 'electronic'
    };

    setPrimaryGuardian(mockPrimaryGuardian);
    setFormData(mockPrimaryGuardian);
  }, [setFormData]);

  // Fetch second guardian from FREG when child personal number is available
  useEffect(() => {
    const fetchSecondGuardian = async () => {
      if (childPersonalNumber.length === 11) {
        setIsLoadingGuardians(true);
        
        try {
          // Mock API call to get guardians from FREG
          const response = await fetch(`/mock/freg/guardians?birthNumber=${childPersonalNumber}`);
          
          if (response.ok) {
            const data = await response.json();
            
            if (data.guardians && data.guardians.length > 1) {
              const secondGuardianData = data.guardians.find((g: any) => g.id !== 'primary');
              setSecondGuardian({
                id: secondGuardianData.id,
                firstName: secondGuardianData.firstName,
                lastName: secondGuardianData.lastName,
                email: secondGuardianData.email,
                phone: secondGuardianData.phone,
                status: 'detected'
              });
              setInviteEmail(secondGuardianData.email || '');
            }
          }
        } catch (error) {
          // Mock success for prototype
          const mockSecondGuardian = {
            id: 'guardian-2',
            firstName: 'Lars',
            lastName: 'Hansen',
            email: 'lars.hansen@email.com',
            phone: '+47 987 65 432',
            status: 'detected' as const
          };
          
          setSecondGuardian(mockSecondGuardian);
          setInviteEmail(mockSecondGuardian.email || '');
        }
        
        setIsLoadingGuardians(false);
      }
    };

    fetchSecondGuardian();
  }, [childPersonalNumber]);

  const handleInviteToggle = (checked: boolean) => {
    setInviteSecondGuardian(checked);
    
    if (checked && secondGuardian) {
      // Auto-start invite process
      handleSendInvite();
    }
  };

  const handleSendInvite = async () => {
    if (!secondGuardian || !inviteEmail) return;

    try {
      // Mock API call to send invite
      await fetch('/mock/invite/guardian', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guardianId: secondGuardian.id,
          email: inviteEmail,
          childPersonalNumber
        })
      });

      setSecondGuardian(prev => prev ? {
        ...prev,
        status: 'invited',
        invitedAt: new Date().toISOString()
      } : null);

      // Start warning timer (7 days simulation - shortened for demo)
      setTimeout(() => {
        if (secondGuardian?.status === 'invited') {
          setShowWarning(true);
        }
      }, 5000); // 5 seconds for demo, would be 7 days in real implementation

    } catch (error) {
      console.log('Invite error:', error);
    }
  };

  const getStatusBadge = (status: SecondGuardian['status']) => {
    const statusConfig = {
      detected: { label: 'Detected', variant: 'outline' as const, icon: User },
      invited: { label: 'Invitation Sent', variant: 'secondary' as const, icon: Clock },
      confirmed: { label: 'Confirmed', variant: 'default' as const, icon: CheckCircle },
      declined: { label: 'Declined', variant: 'destructive' as const, icon: AlertCircle }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Primary Guardian (Pre-filled) */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-emerald-600" />
          <h3 className="text-lg font-semibold text-slate-900">Your Information</h3>
          <Badge variant="outline" className="text-emerald-600 border-emerald-300 bg-emerald-50">
            <Database className="w-3 h-3 mr-1" />
            Auto-filled from your digital ID
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">First Name</Label>
            <div className="relative">
              <Input 
                value={formData.firstName}
                disabled
                className="bg-slate-50 border-slate-200"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Database className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">Last Name</Label>
            <div className="relative">
              <Input 
                value={formData.lastName}
                disabled
                className="bg-slate-50 border-slate-200"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Database className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">Email Address</Label>
            <div className="relative">
              <Input 
                type="email"
                value={formData.email}
                disabled
                className="bg-slate-50 border-slate-200"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Database className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">Phone Number</Label>
            <div className="relative">
              <Input 
                type="tel"
                value={formData.phone}
                disabled
                className="bg-slate-50 border-slate-200"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Database className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <Label className="text-sm font-semibold text-slate-700">Home Address</Label>
          <div className="relative">
            <Input 
              value={formData.address}
              disabled
              className="bg-slate-50 border-slate-200"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Database className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Identity Verification Method */}
      <div className="bg-gradient-to-r from-oslo-blue/5 to-blue-50 p-6 rounded-xl border border-oslo-blue/20">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-oslo-blue" />
          <h3 className="text-lg font-semibold text-slate-900">Identity Verification</h3>
        </div>
        
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-700">Verification Method</Label>
          <Select 
            value={formData.idMethod}
            onValueChange={(value) => setFormData({...formData, idMethod: value})}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronic">Electronic ID (ID-porten/Entra ID) - Standard</SelectItem>
              <SelectItem value="manual">Manual verification through Contact Center (OKK)</SelectItem>
              <SelectItem value="foreign">Foreign ID/Non-Oslo resident</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Second Guardian Detection & Invite */}
      {isLoadingGuardians && (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="animate-spin w-5 h-5 border-2 border-oslo-blue border-t-transparent rounded-full"></div>
            <span className="text-slate-600">Checking for additional guardians...</span>
          </div>
        </div>
      )}

      {secondGuardian && (
        <Card className="border-2 border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-3">
              <UserPlus className="w-5 h-5 text-oslo-blue" />
              Second Guardian Detected
              {getStatusBadge(secondGuardian.status)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-slate-700">Name:</span>
                <span className="ml-2">{secondGuardian.firstName} {secondGuardian.lastName}</span>
              </div>
              {secondGuardian.email && (
                <div>
                  <span className="font-medium text-slate-700">Email:</span>
                  <span className="ml-2">{secondGuardian.email}</span>
                </div>
              )}
            </div>

            {secondGuardian.status === 'detected' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-3">
                    <Switch 
                      id="inviteSecondGuardian"
                      checked={inviteSecondGuardian}
                      onCheckedChange={handleInviteToggle}
                    />
                    <Label htmlFor="inviteSecondGuardian" className="text-sm font-medium text-slate-700">
                      Invite second guardian to confirm this application
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Only one guardian is required to submit an application, but both can confirm if preferred.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                {inviteSecondGuardian && (
                  <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Label className="text-sm font-semibold text-slate-700">Email for Invitation</Label>
                    <Input 
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="second.guardian@email.com"
                    />
                  </div>
                )}
              </div>
            )}

            {secondGuardian.status === 'invited' && (
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <span>Invitation sent. Awaiting confirmation.</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setInviteSecondGuardian(false);
                        setSecondGuardian(prev => prev ? {...prev, status: 'detected'} : null);
                      }}
                    >
                      Cancel Invite
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {secondGuardian.status === 'confirmed' && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Second guardian has confirmed their participation in this application.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Warning for non-responding second guardian */}
      {showWarning && secondGuardian?.status === 'invited' && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Second guardian not confirmed.</strong> Application will proceed and may be reviewed by case worker if needed.
          </AlertDescription>
        </Alert>
      )}

      {/* Legal Information */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-slate-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Legal Information</h4>
            <p className="text-slate-600 text-sm">
              According to Oslo municipality regulations, only one guardian is required to submit a kindergarten application. 
              If both guardians wish to be involved, the second guardian can confirm their participation through the invitation system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardianInfoManager;
