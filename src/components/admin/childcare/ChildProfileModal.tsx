
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Heart, 
  AlertTriangle, 
  Pill,
  Calendar,
  Edit,
  Save,
  X
} from 'lucide-react';
import { Child } from '@/types/childcare';

interface ChildProfileModalProps {
  child: Child;
  isOpen: boolean;
  onClose: () => void;
}

const ChildProfileModal = ({ child, isOpen, onClose }: ChildProfileModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedChild, setEditedChild] = useState(child);

  const handleSave = () => {
    // In real implementation, save to API
    console.log('Saving child data:', editedChild);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedChild(child);
    setIsEditing(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Child Profile: {child.fullName}
            </DialogTitle>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="guardians">Guardians</TabsTrigger>
            <TabsTrigger value="medical">Medical Info</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
            <TabsTrigger value="history">Placement History</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">First Name</label>
                    {isEditing ? (
                      <Input
                        value={editedChild.firstName}
                        onChange={(e) => setEditedChild({
                          ...editedChild,
                          firstName: e.target.value
                        })}
                      />
                    ) : (
                      <p className="p-2 bg-gray-50 rounded">{child.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Name</label>
                    {isEditing ? (
                      <Input
                        value={editedChild.lastName}
                        onChange={(e) => setEditedChild({
                          ...editedChild,
                          lastName: e.target.value
                        })}
                      />
                    ) : (
                      <p className="p-2 bg-gray-50 rounded">{child.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">Civic Number</label>
                    <p className="p-2 bg-gray-50 rounded font-mono">{child.civicNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Birth Date</label>
                    <p className="p-2 bg-gray-50 rounded">{child.birthDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Special Needs:</label>
                  {child.specialNeedsFlag ? (
                    <Badge className="bg-orange-100 text-orange-800">Yes</Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-800">No</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guardians */}
          <TabsContent value="guardians">
            <Card>
              <CardHeader>
                <CardTitle>Guardian Information</CardTitle>
              </CardHeader>
              <CardContent>
                {child.guardians.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No guardian information available</p>
                ) : (
                  <div className="space-y-4">
                    {child.guardians.map((guardian, index) => (
                      <div key={guardian.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">
                            {guardian.firstName} {guardian.lastName}
                          </h4>
                          <div className="flex items-center gap-2">
                            <Badge variant={guardian.isPrimary ? "default" : "outline"}>
                              {guardian.isPrimary ? "Primary" : "Secondary"}
                            </Badge>
                            <Badge variant="outline">{guardian.relationshipType}</Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            {guardian.contactInfo.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {guardian.contactInfo.phone}
                          </div>
                          <div className="flex items-center gap-2 col-span-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {guardian.contactInfo.address}, {guardian.contactInfo.city} {guardian.contactInfo.postalCode}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical Information */}
          <TabsContent value="medical">
            <div className="space-y-4">
              {/* Allergies */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Allergies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {child.medicalInfo.allergies.length === 0 ? (
                    <p className="text-green-600">No known allergies</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {child.medicalInfo.allergies.map((allergy, index) => (
                        <Badge key={index} className="bg-red-100 text-red-800">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Medications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="w-5 h-5 text-blue-500" />
                    Medications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {child.medicalInfo.medications.length === 0 ? (
                    <p className="text-gray-500">No medications</p>
                  ) : (
                    <div className="space-y-2">
                      {child.medicalInfo.medications.map((medication, index) => (
                        <div key={index} className="p-2 bg-blue-50 rounded">
                          {medication}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Special Needs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-purple-500" />
                    Special Needs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {child.medicalInfo.specialNeeds.length === 0 ? (
                    <p className="text-gray-500">No special needs</p>
                  ) : (
                    <div className="space-y-2">
                      {child.medicalInfo.specialNeeds.map((need, index) => (
                        <div key={index} className="p-2 bg-purple-50 rounded">
                          {need}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Emergency Contacts */}
          <TabsContent value="emergency">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                {child.emergencyContacts.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No emergency contacts available</p>
                ) : (
                  <div className="space-y-4">
                    {child.emergencyContacts.map((contact, index) => (
                      <div key={contact.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{contact.name}</h4>
                          <Badge variant="outline">{contact.relationship}</Badge>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {contact.phone}
                          </div>
                          {contact.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              {contact.email}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Pickup authorized:</span>
                            <Badge variant={contact.canPickup ? "default" : "outline"}>
                              {contact.canPickup ? "Yes" : "No"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Placement History */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Placement History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8">
                  Placement history will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ChildProfileModal;
