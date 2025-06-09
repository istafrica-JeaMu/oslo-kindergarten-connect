
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { CheckCircle, Clock, AlertCircle, Bell, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TodaysStatusCard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock data for multiple children
  const children = [
    {
      id: 1,
      name: 'Oliver',
      attendance: 'checked-in',
      checkedInAt: '08:15',
      nextActivity: 'Outdoor Play',
      nextActivityTime: '10:30',
      pickupTime: '15:30',
      urgentNotifications: 1,
      kindergarten: 'Sinsen Kindergarten'
    },
    {
      id: 2,
      name: 'Emma',
      attendance: 'not-arrived',
      checkedInAt: null,
      nextActivity: 'Morning Circle',
      nextActivityTime: '09:00',
      pickupTime: '16:00',
      urgentNotifications: 0,
      kindergarten: 'Løvenskiold Kindergarten'
    },
    {
      id: 3,
      name: 'Lucas',
      attendance: 'absent',
      checkedInAt: null,
      nextActivity: null,
      nextActivityTime: null,
      pickupTime: '15:30',
      urgentNotifications: 0,
      kindergarten: 'Frogner Kindergarten'
    }
  ];

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    if (children.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % children.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [children.length]);

  const getAttendanceStatus = (child: typeof children[0]) => {
    switch (child.attendance) {
      case 'checked-in':
        return (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-oslo-green" />
            <span className="text-oslo-green font-semibold">Checked In</span>
            <span className="text-slate-600 text-sm">at {child.checkedInAt}</span>
          </div>
        );
      case 'not-arrived':
        return (
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            <span className="text-yellow-600 font-semibold">Not Arrived</span>
          </div>
        );
      case 'absent':
        return (
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-slate-500" />
            <span className="text-slate-500 font-semibold">Absent</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (attendance: string) => {
    switch (attendance) {
      case 'checked-in': return 'border-oslo-green';
      case 'not-arrived': return 'border-yellow-500';
      case 'absent': return 'border-slate-400';
      default: return 'border-slate-200';
    }
  };

  return (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-oslo-blue/5 to-oslo-green/5" />
      <CardHeader className="relative pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="w-12 h-12 bg-gradient-to-br from-oslo-blue/10 to-oslo-blue/20 rounded-xl flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-oslo-blue" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Today's Status</h3>
            <p className="text-sm text-slate-600 font-normal mt-0.5">Children's current status</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="relative">
          <Carousel className="w-full" orientation="horizontal">
            <CarouselContent>
              {children.map((child, index) => (
                <CarouselItem key={child.id}>
                  <Link to="/guardian/attendance-tracking">
                    <div className={`p-4 border-l-4 ${getStatusColor(child.attendance)} bg-gradient-to-r from-slate-50/50 to-transparent rounded-lg hover:shadow-md transition-all duration-300 cursor-pointer group`}>
                      {/* Child Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-slate-900 group-hover:text-oslo-blue transition-colors">
                            {child.name}
                          </h4>
                          <p className="text-sm text-slate-600">{child.kindergarten}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {child.urgentNotifications > 0 && (
                            <Badge className="bg-red-500 text-white animate-pulse">
                              <Bell className="w-3 h-3 mr-1" />
                              {child.urgentNotifications}
                            </Badge>
                          )}
                          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-oslo-blue group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </div>

                      {/* Attendance Status */}
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-semibold text-slate-800 mb-2">Attendance</h5>
                          {getAttendanceStatus(child)}
                        </div>

                        {/* Next Activity */}
                        {child.nextActivity && (
                          <div>
                            <h5 className="font-semibold text-slate-800 mb-2">Coming Up</h5>
                            <div className="flex items-center justify-between p-3 bg-slate-100 rounded-lg">
                              <div>
                                <p className="font-medium text-slate-900">{child.nextActivity}</p>
                                <p className="text-sm text-slate-600">Starting at {child.nextActivityTime}</p>
                              </div>
                              <Clock className="w-5 h-5 text-slate-400" />
                            </div>
                          </div>
                        )}

                        {/* Pickup Time */}
                        <div>
                          <h5 className="font-semibold text-slate-800 mb-2">Pickup</h5>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-oslo-blue" />
                            <span className="text-oslo-blue font-semibold">{child.pickupTime}</span>
                            <span className="text-slate-600 text-sm">Regular pickup time</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {children.length > 1 && (
              <>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-oslo-blue/90 hover:bg-oslo-blue border-oslo-blue text-white shadow-lg hover:shadow-xl" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-oslo-blue/90 hover:bg-oslo-blue border-oslo-blue text-white shadow-lg hover:shadow-xl" />
              </>
            )}
          </Carousel>
        </div>
        
        {children.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            {/* Dots indicator */}
            <div className="flex gap-1.5">
              {children.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-oslo-blue w-6' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodaysStatusCard;
