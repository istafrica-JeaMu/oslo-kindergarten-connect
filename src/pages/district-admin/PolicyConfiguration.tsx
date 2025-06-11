
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Save, Clock, Users, MapPin, DollarSign } from 'lucide-react';

const PolicyConfiguration = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Policy Configuration</h1>
          <p className="text-slate-600 mt-2">
            Configure district-wide policies and system parameters
          </p>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="placement">Placement</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Configure basic system settings and defaults
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="districtName">District Name</Label>
                  <Input id="districtName" defaultValue="Oslo Municipality" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input id="contactEmail" defaultValue="info@oslo.kommune.no" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Dual Placements</Label>
                    <p className="text-sm text-slate-600">Allow children to have placements at multiple kindergartens</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-approve Applications</Label>
                    <p className="text-sm text-slate-600">Automatically approve applications that meet criteria</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Application Policies
              </CardTitle>
              <CardDescription>
                Configure application deadlines and requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="maxApplications">Max Applications per Child</Label>
                  <Input id="maxApplications" type="number" defaultValue="3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicationWindow">Application Window (days)</Label>
                  <Input id="applicationWindow" type="number" defaultValue="30" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Documentation</Label>
                    <p className="text-sm text-slate-600">Require supporting documents for all applications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Late Applications</Label>
                    <p className="text-sm text-slate-600">Allow applications after deadline with penalties</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="placement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Placement Policies
              </CardTitle>
              <CardDescription>
                Configure placement criteria and priorities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siblingSetting">Sibling Priority Distance (km)</Label>
                  <Input id="siblingSetting" type="number" defaultValue="2" step="0.1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workplaceSetting">Workplace Priority Distance (km)</Label>
                  <Input id="workplaceSetting" type="number" defaultValue="1.5" step="0.1" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Prioritize Local Residents</Label>
                    <p className="text-sm text-slate-600">Give priority to children living in the district</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Consider Special Needs</Label>
                    <p className="text-sm text-slate-600">Factor in special needs requirements during placement</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Fee Policies
              </CardTitle>
              <CardDescription>
                Configure fee structures and payment policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="baseFee">Base Monthly Fee (NOK)</Label>
                  <Input id="baseFee" type="number" defaultValue="3315" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxFee">Maximum Monthly Fee (NOK)</Label>
                  <Input id="maxFee" type="number" defaultValue="6330" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Income-based Fee Calculation</Label>
                    <p className="text-sm text-slate-600">Calculate fees based on household income</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sibling Discounts</Label>
                    <p className="text-sm text-slate-600">Apply discounts for families with multiple children</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PolicyConfiguration;
