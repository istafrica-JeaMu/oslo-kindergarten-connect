
import React from 'react';
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
import { Separator } from '@/components/ui/separator';
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  FileText,
  Edit,
  Trash2
} from 'lucide-react';
import { Admission } from '@/types/childcare';

interface AdmissionModalProps {
  admission: Admission;
  isOpen: boolean;
  onClose: () => void;
}

const AdmissionModal = ({ admission, isOpen, onClose }: AdmissionModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Admission Details: {admission.child.fullName}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Terminate
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="notes">Journal Notes</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview">
            <div className="space-y-4">
              {/* Child Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Child Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Full Name</label>
                      <p className="font-medium">{admission.child.fullName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Civic Number</label>
                      <p className="font-mono">{admission.child.civicNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Birth Date</label>
                      <p>{admission.child.birthDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Special Needs</label>
                      <Badge variant={admission.child.specialNeedsFlag ? "destructive" : "outline"}>
                        {admission.child.specialNeedsFlag ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Placement Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Placement Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Department</label>
                      <p className="font-medium">{admission.department.name}</p>
                      <p className="text-sm text-gray-500">{admission.department.unitName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Municipality</label>
                      <Badge>{admission.department.municipality}</Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Capacity</label>
                      <p>{admission.department.currentEnrollment} / {admission.department.capacity}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Age Range</label>
                      <p>{admission.department.ageMin} - {admission.department.ageMax} years</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Admission Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Admission Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Admission Start</label>
                      <p className="font-medium">{admission.admissionStart}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">End Date</label>
                      <p className="font-medium">{admission.endDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Start Date</label>
                      <p>{admission.startDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Change Stop</label>
                      <p>{admission.changeStop || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Rate Category</label>
                      <Badge variant="outline">{admission.rateCategory.name}</Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Reason Type</label>
                      <p>{admission.reasonType}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Schedule */}
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Timetable & Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Schedule Pattern</label>
                    <Badge variant="outline" className="mt-1">
                      {admission.timetable.schedulePattern}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Weekly Hours</label>
                    <p className="font-medium">{admission.timetable.weeklyHours}h</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Average Time</label>
                    <p className="font-medium">{admission.averageTime}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Daily Schedule</h4>
                  {admission.timetable.dailySchedule.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No daily schedule configured</p>
                  ) : (
                    <div className="space-y-2">
                      {admission.timetable.dailySchedule.map((schedule, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="font-medium">{schedule.dayOfWeek}</span>
                          <span>{schedule.startTime} - {schedule.endTime}</span>
                          <Badge variant="outline">{schedule.hours}h</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Journal Notes */}
          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Journal Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                {admission.journalNotes.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No journal notes available</p>
                ) : (
                  <div className="space-y-4">
                    {admission.journalNotes.map((note) => (
                      <div key={note.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{note.type}</Badge>
                          <span className="text-sm text-gray-500">{note.createdAt}</span>
                        </div>
                        <p className="text-gray-700">{note.content}</p>
                        <div className="mt-2 text-xs text-gray-500">
                          Created by: {note.createdBy}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events */}
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Admission Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8">
                  Admission events and history will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdmissionModal;
