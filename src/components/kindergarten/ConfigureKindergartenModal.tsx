
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Settings, Loader2, Calendar, Clock, Users } from 'lucide-react';

interface ConfigureKindergartenModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kindergarten: any;
  onConfigurationUpdated: (updatedKindergarten: any) => void;
}

const ConfigureKindergartenModal = ({ open, onOpenChange, kindergarten, onConfigurationUpdated }: ConfigureKindergartenModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState({
    features: {
      acceptsDualPlacement: true,
      hasMealService: true,
      hasExtendedHours: true,
      allowsFlexiblePickup: false,
      providesTransportation: false,
      hasOutdoorActivities: true
    },
    schedule: {
      openTime: '07:00',
      closeTime: '17:00',
      extendedHoursStart: '06:30',
      extendedHoursEnd: '18:00',
      lunchTime: '11:30',
      napTime: '13:00'
    },
    capacity: {
      maxOccupancyPercentage: 100,
      waitlistLimit: 50,
      emergencySpots: 5
    },
    policies: {
      sickChildPolicy: '',
      pickupPolicy: '',
      specialNotes: ''
    }
  });
  const { toast } = useToast();

  useEffect(() => {
    if (kindergarten && open) {
      // Initialize with default or existing configuration
      setConfig({
        features: {
          acceptsDualPlacement: kindergarten.services?.includes('Dual Placement') ?? true,
          hasMealService: kindergarten.services?.includes('Meals') ?? true,
          hasExtendedHours: kindergarten.services?.includes('Extended Hours') ?? true,
          allowsFlexiblePickup: false,
          providesTransportation: false,
          hasOutdoorActivities: kindergarten.services?.includes('Outdoor Activities') ?? true
        },
        schedule: {
          openTime: '07:00',
          closeTime: '17:00',
          extendedHoursStart: '06:30',
          extendedHoursEnd: '18:00',
          lunchTime: '11:30',
          napTime: '13:00'
        },
        capacity: {
          maxOccupancyPercentage: 100,
          waitlistLimit: 50,
          emergencySpots: 5
        },
        policies: {
          sickChildPolicy: 'Children with fever above 38°C must stay home.',
          pickupPolicy: 'Only authorized persons can pick up children.',
          specialNotes: ''
        }
      });
    }
  }, [kindergarten, open]);

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update kindergarten with new configuration
      const updatedServices = [...kindergarten.services.filter((s: string) => 
        !['Dual Placement', 'Meals', 'Extended Hours', 'Outdoor Activities'].includes(s)
      )];
      
      if (config.features.acceptsDualPlacement) updatedServices.push('Dual Placement');
      if (config.features.hasMealService) updatedServices.push('Meals');
      if (config.features.hasExtendedHours) updatedServices.push('Extended Hours');
      if (config.features.hasOutdoorActivities) updatedServices.push('Outdoor Activities');
      
      const updatedKindergarten = {
        ...kindergarten,
        services: updatedServices,
        configuration: config
      };
      
      onConfigurationUpdated(updatedKindergarten);
      onOpenChange(false);
      
      toast({
        title: "Configuration Updated",
        description: `${kindergarten.name} configuration has been successfully updated.`,
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update configuration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!kindergarten) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configure {kindergarten.name}
          </DialogTitle>
          <DialogDescription>
            Manage features, schedules, and policies for this kindergarten.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="features" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="capacity">Capacity</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Feature Toggles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dual-placement">Accepts Dual Placement</Label>
                    <p className="text-sm text-slate-600">Allow children to split time between kindergartens</p>
                  </div>
                  <Switch
                    id="dual-placement"
                    checked={config.features.acceptsDualPlacement}
                    onCheckedChange={(checked) => 
                      setConfig(prev => ({
                        ...prev,
                        features: { ...prev.features, acceptsDualPlacement: checked }
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="meal-service">Meal Service</Label>
                    <p className="text-sm text-slate-600">Provide lunch and snacks</p>
                  </div>
                  <Switch
                    id="meal-service"
                    checked={config.features.hasMealService}
                    onCheckedChange={(checked) => 
                      setConfig(prev => ({
                        ...prev,
                        features: { ...prev.features, hasMealService: checked }
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="extended-hours">Extended Hours</Label>
                    <p className="text-sm text-slate-600">Offer care outside standard hours</p>
                  </div>
                  <Switch
                    id="extended-hours"
                    checked={config.features.hasExtendedHours}
                    onCheckedChange={(checked) => 
                      setConfig(prev => ({
                        ...prev,
                        features: { ...prev.features, hasExtendedHours: checked }
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="flexible-pickup">Flexible Pickup Times</Label>
                    <p className="text-sm text-slate-600">Allow variable pickup schedules</p>
                  </div>
                  <Switch
                    id="flexible-pickup"
                    checked={config.features.allowsFlexiblePickup}
                    onCheckedChange={(checked) => 
                      setConfig(prev => ({
                        ...prev,
                        features: { ...prev.features, allowsFlexiblePickup: checked }
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="transportation">Transportation Service</Label>
                    <p className="text-sm text-slate-600">Provide bus service for children</p>
                  </div>
                  <Switch
                    id="transportation"
                    checked={config.features.providesTransportation}
                    onCheckedChange={(checked) => 
                      setConfig(prev => ({
                        ...prev,
                        features: { ...prev.features, providesTransportation: checked }
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="outdoor-activities">Outdoor Activities</Label>
                    <p className="text-sm text-slate-600">Regular outdoor play and nature activities</p>
                  </div>
                  <Switch
                    id="outdoor-activities"
                    checked={config.features.hasOutdoorActivities}
                    onCheckedChange={(checked) => 
                      setConfig(prev => ({
                        ...prev,
                        features: { ...prev.features, hasOutdoorActivities: checked }
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Daily Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="open-time">Opening Time</Label>
                    <Input
                      id="open-time"
                      type="time"
                      value={config.schedule.openTime}
                      onChange={(e) => 
                        setConfig(prev => ({
                          ...prev,
                          schedule: { ...prev.schedule, openTime: e.target.value }
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="close-time">Closing Time</Label>
                    <Input
                      id="close-time"
                      type="time"
                      value={config.schedule.closeTime}
                      onChange={(e) => 
                        setConfig(prev => ({
                          ...prev,
                          schedule: { ...prev.schedule, closeTime: e.target.value }
                        }))
                      }
                    />
                  </div>
                </div>
                
                {config.features.hasExtendedHours && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="extended-start">Extended Hours Start</Label>
                      <Input
                        id="extended-start"
                        type="time"
                        value={config.schedule.extendedHoursStart}
                        onChange={(e) => 
                          setConfig(prev => ({
                            ...prev,
                            schedule: { ...prev.schedule, extendedHoursStart: e.target.value }
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="extended-end">Extended Hours End</Label>
                      <Input
                        id="extended-end"
                        type="time"
                        value={config.schedule.extendedHoursEnd}
                        onChange={(e) => 
                          setConfig(prev => ({
                            ...prev,
                            schedule: { ...prev.schedule, extendedHoursEnd: e.target.value }
                          }))
                        }
                      />
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lunch-time">Lunch Time</Label>
                    <Input
                      id="lunch-time"
                      type="time"
                      value={config.schedule.lunchTime}
                      onChange={(e) => 
                        setConfig(prev => ({
                          ...prev,
                          schedule: { ...prev.schedule, lunchTime: e.target.value }
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="nap-time">Nap Time</Label>
                    <Input
                      id="nap-time"
                      type="time"
                      value={config.schedule.napTime}
                      onChange={(e) => 
                        setConfig(prev => ({
                          ...prev,
                          schedule: { ...prev.schedule, napTime: e.target.value }
                        }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="capacity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Capacity Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="max-occupancy">Maximum Occupancy Percentage</Label>
                  <Input
                    id="max-occupancy"
                    type="number"
                    min="80"
                    max="120"
                    value={config.capacity.maxOccupancyPercentage}
                    onChange={(e) => 
                      setConfig(prev => ({
                        ...prev,
                        capacity: { ...prev.capacity, maxOccupancyPercentage: parseInt(e.target.value) }
                      }))
                    }
                  />
                  <p className="text-sm text-slate-600 mt-1">Allow temporary over-capacity (80-120%)</p>
                </div>
                
                <div>
                  <Label htmlFor="waitlist-limit">Waitlist Limit</Label>
                  <Input
                    id="waitlist-limit"
                    type="number"
                    min="0"
                    value={config.capacity.waitlistLimit}
                    onChange={(e) => 
                      setConfig(prev => ({
                        ...prev,
                        capacity: { ...prev.capacity, waitlistLimit: parseInt(e.target.value) }
                      }))
                    }
                  />
                  <p className="text-sm text-slate-600 mt-1">Maximum number of children on waitlist</p>
                </div>
                
                <div>
                  <Label htmlFor="emergency-spots">Emergency Reserve Spots</Label>
                  <Input
                    id="emergency-spots"
                    type="number"
                    min="0"
                    max="10"
                    value={config.capacity.emergencySpots}
                    onChange={(e) => 
                      setConfig(prev => ({
                        ...prev,
                        capacity: { ...prev.capacity, emergencySpots: parseInt(e.target.value) }
                      }))
                    }
                  />
                  <p className="text-sm text-slate-600 mt-1">Spots reserved for emergency placements</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="policies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Policies & Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="sick-policy">Sick Child Policy</Label>
                  <Textarea
                    id="sick-policy"
                    value={config.policies.sickChildPolicy}
                    onChange={(e) => 
                      setConfig(prev => ({
                        ...prev,
                        policies: { ...prev.policies, sickChildPolicy: e.target.value }
                      }))
                    }
                    placeholder="Enter policy for handling sick children..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="pickup-policy">Pickup Authorization Policy</Label>
                  <Textarea
                    id="pickup-policy"
                    value={config.policies.pickupPolicy}
                    onChange={(e) => 
                      setConfig(prev => ({
                        ...prev,
                        policies: { ...prev.policies, pickupPolicy: e.target.value }
                      }))
                    }
                    placeholder="Enter policy for authorized pickup persons..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="special-notes">Special Notes</Label>
                  <Textarea
                    id="special-notes"
                    value={config.policies.specialNotes}
                    onChange={(e) => 
                      setConfig(prev => ({
                        ...prev,
                        policies: { ...prev.policies, specialNotes: e.target.value }
                      }))
                    }
                    placeholder="Any additional notes or special considerations..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex gap-3 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving Configuration...
              </>
            ) : (
              'Save Configuration'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigureKindergartenModal;
