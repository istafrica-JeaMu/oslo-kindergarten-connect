
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Edit, Shield, Clock, Phone } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { nb, enUS } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';

const PickupAuthorization = () => {
  const { t, language } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  
  const locale = language === 'nb' ? nb : enUS;
  
  // Mock authorized persons data
  const authorizedPersons = [
    {
      id: 1,
      name: 'Lars Eriksen',
      relationship: t('guardian.pickup.relationships.father'),
      phone: '+47 987 65 432',
      validUntil: '2024-12-31',
      status: 'active',
      emergencyContact: true
    },
    {
      id: 2,
      name: 'Inga Andersen',
      relationship: t('guardian.pickup.relationships.grandmother'),
      phone: '+47 456 78 901',
      validUntil: '2024-06-30',
      status: 'active',
      emergencyContact: false
    },
    {
      id: 3,
      name: 'Kari Olsen',
      relationship: t('guardian.pickup.relationships.friend'),
      phone: '+47 234 56 789',
      validUntil: '2024-04-15',
      status: 'temporary',
      emergencyContact: false
    }
  ];

  const emergencyPickups = [
    {
      id: 1,
      date: format(new Date(), 'yyyy-MM-dd'),
      person: 'Inga Andersen',
      reason: t('guardian.pickup.emergencyReasons.parentIll'),
      status: 'approved',
      requestTime: '14:30'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t('guardian.pickup.title')}</h1>
          <p className="text-slate-600 mt-2">{t('guardian.pickup.description')}</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          {t('guardian.pickup.addAuthorized')}
        </Button>
      </div>

      {/* Emergency Pickup Today */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-500" />
            {t('guardian.pickup.emergencyToday')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <select className="flex-1 p-3 border rounded-lg">
                <option value="">{t('guardian.pickup.selectPerson')}</option>
                {authorizedPersons.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name} ({person.relationship})
                  </option>
                ))}
              </select>
              <input 
                type="time" 
                className="p-3 border rounded-lg"
                placeholder={t('guardian.pickup.pickupTime')}
              />
            </div>
            <textarea 
              placeholder={t('guardian.pickup.emergencyReason')}
              className="w-full p-3 border rounded-lg resize-none h-20"
            />
            <Button className="w-full">
              {t('guardian.pickup.notifyEmergency')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Authorized Persons */}
      <Card>
        <CardHeader>
          <CardTitle>{t('guardian.pickup.authorizedPersons')}</CardTitle>
          <CardDescription>{t('guardian.pickup.authorizedDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {authorizedPersons.map((person) => (
              <div key={person.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-oslo-blue rounded-full flex items-center justify-center text-white">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{person.name}</h3>
                    <p className="text-sm text-slate-600">{person.relationship}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {person.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {t('guardian.pickup.validUntil')}: {format(new Date(person.validUntil), 'dd.MM.yyyy', { locale })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {person.emergencyContact && (
                    <Badge variant="outline" className="text-red-600 border-red-600">
                      {t('guardian.pickup.emergency')}
                    </Badge>
                  )}
                  <Badge className={
                    person.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                  }>
                    {t(`guardian.pickup.status.${person.status}`)}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Emergency Pickups */}
      <Card>
        <CardHeader>
          <CardTitle>{t('guardian.pickup.recentEmergency')}</CardTitle>
          <CardDescription>{t('guardian.pickup.recentDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyPickups.map((pickup) => (
              <div key={pickup.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {format(new Date(pickup.date), 'EEEE d. MMMM', { locale })}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {pickup.person} - {pickup.reason}
                    </p>
                    <p className="text-xs text-slate-500">
                      {t('guardian.pickup.requestedAt')}: {pickup.requestTime}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-500">
                  {t(`guardian.pickup.status.${pickup.status}`)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Authorization Form */}
      {showAddForm && (
        <Card className="border-2 border-oslo-blue">
          <CardHeader>
            <CardTitle>{t('guardian.pickup.addNewPerson')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('guardian.pickup.fullName')}
                  </label>
                  <input 
                    type="text" 
                    placeholder={t('guardian.pickup.enterName')}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('guardian.pickup.relationship')}
                  </label>
                  <select className="w-full p-3 border rounded-lg">
                    <option value="">{t('guardian.pickup.selectRelationship')}</option>
                    <option value="father">{t('guardian.pickup.relationships.father')}</option>
                    <option value="mother">{t('guardian.pickup.relationships.mother')}</option>
                    <option value="grandmother">{t('guardian.pickup.relationships.grandmother')}</option>
                    <option value="grandfather">{t('guardian.pickup.relationships.grandfather')}</option>
                    <option value="friend">{t('guardian.pickup.relationships.friend')}</option>
                    <option value="other">{t('guardian.pickup.relationships.other')}</option>
                  </select>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('guardian.pickup.phoneNumber')}
                  </label>
                  <input 
                    type="tel" 
                    placeholder="+47 xxx xx xxx"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('guardian.pickup.validUntil')}
                  </label>
                  <input 
                    type="date" 
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="emergency" className="rounded" />
                <label htmlFor="emergency" className="text-sm">
                  {t('guardian.pickup.markAsEmergency')}
                </label>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1">
                  {t('guardian.pickup.addPerson')}
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  {t('common.cancel')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PickupAuthorization;
