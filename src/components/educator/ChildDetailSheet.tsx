
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  MessageSquare, 
  AlertTriangle, 
  Phone, 
  Clock, 
  MapPin, 
  LogIn, 
  LogOut, 
  UserX,
  Send,
  Users
} from 'lucide-react';
import { Child } from '@/pages/staff/EducatorAttendance';

interface ChildDetailSheetProps {
  child: Child;
  onAction: (action: string, childId: string) => void;
  onLocationChange: (childId: string, location: string) => void;
}

const ChildDetailSheet = ({ child, onAction, onLocationChange }: ChildDetailSheetProps) => {
  const [newNote, setNewNote] = useState('');
  const [quickMessage, setQuickMessage] = useState('');

  const locations = [
    'Classroom',
    'Playground',
    'Art Room',
    'Music Room',
    'Nap Room',
    'Dining Area',
    'Library',
    'Outdoor Area'
  ];

  const quickMessages = [
    'Running 15 minutes late',
    'Please ensure extra snack today',
    'Early pickup at 3 PM',
    'Feeling unwell, please monitor',
    'Forgot lunch box'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600';
      case 'absent': return 'text-red-600';
      case 'on-leave': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Child Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
          {child.name.split(' ').map(n => n[0]).join('')}
        </div>
        <h2 className="text-xl font-bold">{child.name}</h2>
        <p className="text-gray-600">{child.age}</p>
        <p className={`font-medium ${getStatusColor(child.status)}`}>
          {child.status.replace('-', ' ').toUpperCase()}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        {child.status === 'absent' && (
          <Button 
            onClick={() => onAction('check-in', child.id)}
            className="bg-green-600 hover:bg-green-700"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Check In
          </Button>
        )}
        {child.status === 'present' && (
          <>
            <Button 
              variant="outline"
              onClick={() => onAction('check-out', child.id)}
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Check Out
            </Button>
            <Button 
              variant="outline"
              onClick={() => onAction('mark-absent', child.id)}
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              <UserX className="w-4 h-4 mr-2" />
              Mark Absent
            </Button>
          </>
        )}
        {child.status === 'on-leave' && (
          <Button 
            onClick={() => onAction('check-in', child.id)}
            className="bg-green-600 hover:bg-green-700 col-span-2"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Check In
          </Button>
        )}
      </div>

      <Separator />

      {/* Current Status Info */}
      <div className="space-y-3">
        <h3 className="font-semibold">Current Status</h3>
        
        {child.status === 'present' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm">Check-in: {child.checkInTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm">Expected pickup: {child.expectedPickupTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <Select 
                value={child.currentLocation} 
                onValueChange={(value) => onLocationChange(child.id, value)}
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {child.status === 'on-leave' && child.checkOutTime && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm">Checked out: {child.checkOutTime}</span>
          </div>
        )}
      </div>

      <Separator />

      {/* Guardian Info */}
      <div className="space-y-3">
        <h3 className="font-semibold">Guardian Information</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{child.guardian}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{child.phone}</span>
          </div>
          {child.pickupDelegates.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Pickup Delegates:</span>
              </div>
              {child.pickupDelegates.map((delegate, index) => (
                <div key={index} className="text-sm text-gray-600 ml-6">
                  {delegate}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Alerts */}
      {(child.medicalAlerts.length > 0 || child.missingConsents.length > 0) && (
        <>
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              Alerts & Reminders
            </h3>
            
            {child.medicalAlerts.length > 0 && (
              <div>
                <p className="text-sm font-medium text-red-600 mb-1">Medical Alerts:</p>
                {child.medicalAlerts.map((alert, index) => (
                  <Badge key={index} variant="outline" className="bg-red-50 text-red-600 border-red-200 mr-1 mb-1">
                    {alert}
                  </Badge>
                ))}
              </div>
            )}

            {child.missingConsents.length > 0 && (
              <div>
                <p className="text-sm font-medium text-yellow-600 mb-1">Missing Consents:</p>
                {child.missingConsents.map((consent, index) => (
                  <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200 mr-1 mb-1">
                    {consent}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <Separator />
        </>
      )}

      {/* Quick Message */}
      <div className="space-y-3">
        <h3 className="font-semibold flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Quick Message to Guardian
          {child.unreadMessages > 0 && (
            <Badge className="bg-orange-100 text-orange-800 ml-2">
              {child.unreadMessages} unread
            </Badge>
          )}
        </h3>
        
        <div className="space-y-2">
          <Select value={quickMessage} onValueChange={setQuickMessage}>
            <SelectTrigger>
              <SelectValue placeholder="Select quick message..." />
            </SelectTrigger>
            <SelectContent>
              {quickMessages.map((message) => (
                <SelectItem key={message} value={message}>
                  {message}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Textarea 
            placeholder="Type custom message..."
            value={quickMessage}
            onChange={(e) => setQuickMessage(e.target.value)}
            rows={3}
          />
          
          <Button className="w-full" disabled={!quickMessage.trim()}>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </div>
      </div>

      <Separator />

      {/* Daily Notes */}
      <div className="space-y-3">
        <h3 className="font-semibold">Daily Notes</h3>
        
        <div className="space-y-2">
          <Textarea 
            placeholder="Add a note about this child's day..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows={3}
          />
          <Button variant="outline" className="w-full" disabled={!newNote.trim()}>
            Add Note
          </Button>
        </div>

        {child.notes.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Previous Notes:</p>
            {child.notes.map((note, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                {note}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildDetailSheet;
