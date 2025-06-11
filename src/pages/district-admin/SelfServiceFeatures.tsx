
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, MessageSquare, Calendar, FileText, CreditCard, Settings } from 'lucide-react';

const SelfServiceFeatures = () => {
  const features = [
    {
      category: 'Guardian Portal',
      icon: Users,
      features: [
        { name: 'Application Submission', description: 'Allow guardians to submit kindergarten applications online', enabled: true },
        { name: 'Attendance Tracking', description: 'View real-time attendance and check-in/out status', enabled: true },
        { name: 'Payment Management', description: 'View invoices and make online payments', enabled: true },
        { name: 'Document Upload', description: 'Upload required documents and consents', enabled: true },
        { name: 'Schedule Viewing', description: 'View daily schedules and activities', enabled: true },
        { name: 'Absence Reporting', description: 'Report child absences and sick days', enabled: false }
      ]
    },
    {
      category: 'Communication',
      icon: MessageSquare,
      features: [
        { name: 'Direct Messaging', description: 'Chat directly with teachers and staff', enabled: true },
        { name: 'Notice Board', description: 'View kindergarten announcements and news', enabled: true },
        { name: 'Photo Sharing', description: 'Receive photos from daily activities', enabled: true },
        { name: 'Emergency Notifications', description: 'Receive urgent notifications via SMS/email', enabled: true },
        { name: 'Newsletter Subscriptions', description: 'Subscribe to district newsletters', enabled: false }
      ]
    },
    {
      category: 'Appointments & Meetings',
      icon: Calendar,
      features: [
        { name: 'Meeting Booking', description: 'Book parent-teacher meetings online', enabled: false },
        { name: 'Event Registration', description: 'Register for kindergarten events and activities', enabled: false },
        { name: 'Calendar Integration', description: 'Sync kindergarten events with personal calendars', enabled: false }
      ]
    },
    {
      category: 'Advanced Features',
      icon: Settings,
      features: [
        { name: 'Living Arrangements', description: 'Manage dual placement and custody arrangements', enabled: true },
        { name: 'Pickup Authorization', description: 'Manage who can pick up children', enabled: false },
        { name: 'Dietary Preferences', description: 'Set and update dietary requirements', enabled: false },
        { name: 'Medical Information', description: 'Update medical conditions and allergies', enabled: false }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Self-Service Features</h1>
          <p className="text-slate-600 mt-2">
            Enable and disable parent-facing features and functionality
          </p>
        </div>
        <Button>
          <Shield className="w-4 h-4 mr-2" />
          Save Configuration
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-green-900">12</p>
                <p className="text-sm text-slate-600">Enabled Features</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-orange-900">7</p>
                <p className="text-sm text-slate-600">Disabled Features</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-900">1,456</p>
                <p className="text-sm text-slate-600">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Categories */}
      <div className="space-y-6">
        {features.map((category) => (
          <Card key={category.category} className="overflow-hidden">
            <CardHeader className="bg-slate-50">
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-slate-600" />
                </div>
                {category.category}
              </CardTitle>
              <CardDescription>
                Manage features available to guardians in this category
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {category.features.map((feature) => (
                  <div key={feature.name} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-slate-900">{feature.name}</h4>
                          <Badge variant={feature.enabled ? 'default' : 'secondary'}>
                            {feature.enabled ? 'Enabled' : 'Disabled'}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600">{feature.description}</p>
                      </div>
                      <Switch defaultChecked={feature.enabled} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Notice */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-orange-600 mt-1" />
            <div>
              <h3 className="font-semibold text-orange-900 mb-2">Security Notice</h3>
              <p className="text-sm text-orange-800">
                Enabling self-service features increases user convenience but may require additional 
                security measures. Ensure proper authentication and data validation are in place 
                before enabling sensitive features like payment management or document uploads.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelfServiceFeatures;
