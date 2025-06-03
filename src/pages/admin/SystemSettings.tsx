
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTranslation } from 'react-i18next';
import { 
  Settings, 
  Users, 
  Shield, 
  Database,
  Mail,
  Calendar,
  Globe,
  Save,
  AlertTriangle,
  CheckCircle,
  Key,
  Server
} from 'lucide-react';

const SystemSettings = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState({
    general: {
      systemName: 'Oslo Kindergarten Portal',
      adminEmail: 'admin@oslo.kommune.no',
      supportEmail: 'support@oslo.kommune.no',
      defaultLanguage: 'no',
      timezone: 'Europe/Oslo',
      maintenanceMode: false
    },
    applications: {
      maxApplicationsPerChild: 5,
      applicationDeadline: '2024-04-15',
      autoApprovalEnabled: false,
      documentRequiredDays: 14,
      reminderEmailDays: 7
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      altinnIntegration: true,
      statusUpdateEmails: true,
      placementOfferEmails: true
    },
    security: {
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordMinLength: 8,
      twoFactorRequired: false,
      apiRateLimit: 1000
    },
    integrations: {
      fregEnabled: true,
      altinnEnabled: true,
      idPortenEnabled: true,
      noarkEnabled: true,
      qlikSenseUrl: 'https://qlik.oslo.kommune.no'
    }
  });

  const tabs = [
    { id: 'general', name: 'General Settings', icon: Settings },
    { id: 'applications', name: 'Applications', icon: Users },
    { id: 'notifications', name: 'Notifications', icon: Mail },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'integrations', name: 'Integrations', icon: Database }
  ];

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Saving settings:', settings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="systemName">System Name</Label>
          <Input
            id="systemName"
            value={settings.general.systemName}
            onChange={(e) => updateSetting('general', 'systemName', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="adminEmail">Administrator Email</Label>
          <Input
            id="adminEmail"
            type="email"
            value={settings.general.adminEmail}
            onChange={(e) => updateSetting('general', 'adminEmail', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="supportEmail">Support Email</Label>
          <Input
            id="supportEmail"
            type="email"
            value={settings.general.supportEmail}
            onChange={(e) => updateSetting('general', 'supportEmail', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="defaultLanguage">Default Language</Label>
          <Select value={settings.general.defaultLanguage} onValueChange={(value) => updateSetting('general', 'defaultLanguage', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no">Norwegian (Bokmål)</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Select value={settings.general.timezone} onValueChange={(value) => updateSetting('general', 'timezone', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Europe/Oslo">Europe/Oslo</SelectItem>
              <SelectItem value="UTC">UTC</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <div>
            <h4 className="font-medium text-red-800">Maintenance Mode</h4>
            <p className="text-sm text-red-600">Prevents users from accessing the system</p>
          </div>
        </div>
        <Switch
          checked={settings.general.maintenanceMode}
          onCheckedChange={(checked) => updateSetting('general', 'maintenanceMode', checked)}
        />
      </div>
    </div>
  );

  const renderApplicationSettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="maxApplications">Max Applications per Child</Label>
          <Input
            id="maxApplications"
            type="number"
            value={settings.applications.maxApplicationsPerChild}
            onChange={(e) => updateSetting('applications', 'maxApplicationsPerChild', parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="deadline">Application Deadline</Label>
          <Input
            id="deadline"
            type="date"
            value={settings.applications.applicationDeadline}
            onChange={(e) => updateSetting('applications', 'applicationDeadline', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="documentDays">Document Required Days</Label>
          <Input
            id="documentDays"
            type="number"
            value={settings.applications.documentRequiredDays}
            onChange={(e) => updateSetting('applications', 'documentRequiredDays', parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reminderDays">Reminder Email Days</Label>
          <Input
            id="reminderDays"
            type="number"
            value={settings.applications.reminderEmailDays}
            onChange={(e) => updateSetting('applications', 'reminderEmailDays', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-blue-600" />
          <div>
            <h4 className="font-medium text-blue-800">Auto Approval</h4>
            <p className="text-sm text-blue-600">Automatically approve applications meeting criteria</p>
          </div>
        </div>
        <Switch
          checked={settings.applications.autoApprovalEnabled}
          onCheckedChange={(checked) => updateSetting('applications', 'autoApprovalEnabled', checked)}
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-blue-600" />
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-600">Send email notifications to users</p>
            </div>
          </div>
          <Switch
            checked={settings.notifications.emailNotifications}
            onCheckedChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-green-600" />
            <div>
              <h4 className="font-medium text-gray-900">SMS Notifications</h4>
              <p className="text-sm text-gray-600">Send SMS notifications for urgent updates</p>
            </div>
          </div>
          <Switch
            checked={settings.notifications.smsNotifications}
            onCheckedChange={(checked) => updateSetting('notifications', 'smsNotifications', checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Server className="h-5 w-5 text-purple-600" />
            <div>
              <h4 className="font-medium text-gray-900">Altinn Integration</h4>
              <p className="text-sm text-gray-600">Send official notifications via Altinn</p>
            </div>
          </div>
          <Switch
            checked={settings.notifications.altinnIntegration}
            onCheckedChange={(checked) => updateSetting('notifications', 'altinnIntegration', checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div>
              <h4 className="font-medium text-gray-900">Status Update Emails</h4>
              <p className="text-sm text-gray-600">Notify guardians of application status changes</p>
            </div>
          </div>
          <Switch
            checked={settings.notifications.statusUpdateEmails}
            onCheckedChange={(checked) => updateSetting('notifications', 'statusUpdateEmails', checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <h4 className="font-medium text-gray-900">Placement Offer Emails</h4>
              <p className="text-sm text-gray-600">Send placement offer notifications</p>
            </div>
          </div>
          <Switch
            checked={settings.notifications.placementOfferEmails}
            onCheckedChange={(checked) => updateSetting('notifications', 'placementOfferEmails', checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Alert className="border-yellow-200 bg-yellow-50">
        <Shield className="h-5 w-5 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          Security settings affect all users. Changes take effect immediately.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
          <Input
            id="sessionTimeout"
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
          <Input
            id="maxLoginAttempts"
            type="number"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="passwordLength">Password Min Length</Label>
          <Input
            id="passwordLength"
            type="number"
            value={settings.security.passwordMinLength}
            onChange={(e) => updateSetting('security', 'passwordMinLength', parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="apiRateLimit">API Rate Limit (requests/hour)</Label>
          <Input
            id="apiRateLimit"
            type="number"
            value={settings.security.apiRateLimit}
            onChange={(e) => updateSetting('security', 'apiRateLimit', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <div className="flex items-center gap-3">
          <Key className="h-5 w-5 text-orange-600" />
          <div>
            <h4 className="font-medium text-orange-800">Two-Factor Authentication</h4>
            <p className="text-sm text-orange-600">Require 2FA for all admin users</p>
          </div>
        </div>
        <Switch
          checked={settings.security.twoFactorRequired}
          onCheckedChange={(checked) => updateSetting('security', 'twoFactorRequired', checked)}
        />
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Database className="h-5 w-5 text-blue-600" />
            <div>
              <h4 className="font-medium text-gray-900">FREG Integration</h4>
              <p className="text-sm text-gray-600">Norwegian Population Register integration</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800">Active</Badge>
            <Switch
              checked={settings.integrations.fregEnabled}
              onCheckedChange={(checked) => updateSetting('integrations', 'fregEnabled', checked)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-green-600" />
            <div>
              <h4 className="font-medium text-gray-900">Altinn Integration</h4>
              <p className="text-sm text-gray-600">Official notification delivery service</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800">Active</Badge>
            <Switch
              checked={settings.integrations.altinnEnabled}
              onCheckedChange={(checked) => updateSetting('integrations', 'altinnEnabled', checked)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-red-600" />
            <div>
              <h4 className="font-medium text-gray-900">ID-porten Integration</h4>
              <p className="text-sm text-gray-600">National identity provider</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800">Active</Badge>
            <Switch
              checked={settings.integrations.idPortenEnabled}
              onCheckedChange={(checked) => updateSetting('integrations', 'idPortenEnabled', checked)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Server className="h-5 w-5 text-purple-600" />
            <div>
              <h4 className="font-medium text-gray-900">NOARK 5 Integration</h4>
              <p className="text-sm text-gray-600">Document archiving and compliance</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800">Active</Badge>
            <Switch
              checked={settings.integrations.noarkEnabled}
              onCheckedChange={(checked) => updateSetting('integrations', 'noarkEnabled', checked)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="qlikSenseUrl">Qlik Sense URL</Label>
        <Input
          id="qlikSenseUrl"
          value={settings.integrations.qlikSenseUrl}
          onChange={(e) => updateSetting('integrations', 'qlikSenseUrl', e.target.value)}
          placeholder="https://qlik.oslo.kommune.no"
        />
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'applications':
        return renderApplicationSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'integrations':
        return renderIntegrationSettings();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('admin.settings.title', 'System Settings')}</h1>
        <p className="text-gray-600 mt-2">{t('admin.settings.description', 'Configure system-wide settings and integrations')}</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <Card className="shadow-lg border-0 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Settings Categories</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-oslo-blue text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {tabs.find(tab => tab.id === activeTab)?.icon && (
                  <tabs.find(tab => tab.id === activeTab)!.icon className="h-6 w-6 text-oslo-blue" />
                )}
                {tabs.find(tab => tab.id === activeTab)?.name}
              </CardTitle>
              <CardDescription>
                Configure {tabs.find(tab => tab.id === activeTab)?.name.toLowerCase()} for the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderTabContent()}
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Changes are saved automatically and take effect immediately.
                </p>
                <Button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-oslo-blue hover:bg-blue-700"
                >
                  {isSaving ? (
                    <>
                      <Settings className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save All Settings
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
