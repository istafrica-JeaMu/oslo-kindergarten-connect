
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, Plus, Edit, Trash2, User, Clock, Mail } from 'lucide-react';

const EmergencyContacts = () => {
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      id: 1,
      name: 'Maria Hansen',
      relationship: 'Mother',
      phone: '+47 123 45 678',
      email: 'maria@example.com',
      priority: 1,
      canPickup: true,
      verified: true
    },
    {
      id: 2,
      name: 'Jon Hansen',
      relationship: 'Father',
      phone: '+47 987 65 432',
      email: 'jon@example.com',
      priority: 2,
      canPickup: true,
      verified: true
    },
    {
      id: 3,
      name: 'Anna Larsen',
      relationship: 'Grandmother',
      phone: '+47 555 44 333',
      email: 'anna@example.com',
      priority: 3,
      canPickup: false,
      verified: false
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    canPickup: false
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact = {
        id: emergencyContacts.length + 1,
        ...newContact,
        priority: emergencyContacts.length + 1,
        verified: false
      };
      setEmergencyContacts([...emergencyContacts, contact]);
      setNewContact({
        name: '',
        relationship: '',
        phone: '',
        email: '',
        canPickup: false
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleDeleteContact = (id: number) => {
    setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Emergency Contacts</h1>
          <p className="text-slate-600 mt-2">Manage your child's emergency contact information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-oslo-blue hover:bg-oslo-blue/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Emergency Contact</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Select value={newContact.relationship} onValueChange={(value) => setNewContact({...newContact, relationship: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Grandmother">Grandmother</SelectItem>
                    <SelectItem value="Grandfather">Grandfather</SelectItem>
                    <SelectItem value="Aunt">Aunt</SelectItem>
                    <SelectItem value="Uncle">Uncle</SelectItem>
                    <SelectItem value="Family Friend">Family Friend</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  placeholder="+47 123 45 678"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                  placeholder="email@example.com"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="canPickup"
                  checked={newContact.canPickup}
                  onCheckedChange={(checked) => setNewContact({...newContact, canPickup: checked as boolean})}
                />
                <Label htmlFor="canPickup">Authorized to pick up child</Label>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddContact} disabled={!newContact.name || !newContact.phone}>
                Add Contact
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Important Notice */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-yellow-800">Important</h3>
              <p className="text-yellow-700 text-sm mt-1">
                Emergency contacts will be called in priority order if we cannot reach the primary guardians. 
                Please keep this information up to date.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts List */}
      <div className="space-y-4">
        {emergencyContacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-oslo-blue/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-oslo-blue" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">{contact.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${contact.priority === 1 ? 'bg-red-50 text-red-700 border-red-200' : 
                          contact.priority === 2 ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                          'bg-slate-50 text-slate-700 border-slate-200'}`}
                      >
                        Priority {contact.priority}
                      </Badge>
                      {contact.verified && (
                        <Badge className="bg-green-100 text-green-700 border-green-300">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="text-slate-600">{contact.relationship}</p>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <button 
                          onClick={() => handleCall(contact.phone)}
                          className="text-oslo-blue hover:text-oslo-blue/80 hover:underline transition-colors"
                        >
                          {contact.phone}
                        </button>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <button 
                          onClick={() => handleEmail(contact.email)}
                          className="text-oslo-blue hover:text-oslo-blue/80 hover:underline transition-colors"
                        >
                          {contact.email}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        contact.canPickup 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {contact.canPickup ? 'Can pick up child' : 'Emergency contact only'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteContact(contact.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Contact Card */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Card className="border-dashed border-2 border-slate-300 hover:border-oslo-blue transition-colors cursor-pointer">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                  <Plus className="w-8 h-8 text-slate-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Add Emergency Contact</h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Add another person who can be contacted in case of emergency
                  </p>
                </div>
                <Button variant="outline" className="border-oslo-blue text-oslo-blue hover:bg-oslo-blue/5">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
      </Dialog>
    </div>
  );
};

export default EmergencyContacts;
