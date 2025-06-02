
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Paperclip, Archive, Star, Search } from 'lucide-react';

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  // Mock message data
  const messages = [
    {
      id: 1,
      from: 'Løvenskiold Barnehage',
      fromEmail: 'kontakt@lovenskiold.barnehage.oslo.no',
      subject: 'Velkommen til Løvenskiold Barnehage!',
      preview: 'Vi gleder oss til å ønske Emma velkommen til vårt barnehagefellesskap...',
      content: `Kjære Anna Hansen,

Vi gleder oss til å ønske Emma velkommen til vårt barnehagefellesskap!

Som en del av forberedelsene til oppstart, ønsker vi å informere deg om følgende:

• Første dag: Mandag 15. august 2024
• Innkjøringsperiode: De første dagene vil være kortere for at Emma skal bli trygg
• Garderobenummer: 24
• Kontaktperson: Kari Andersen (avdelingsleder)

Vi vil også invitere til et foreldremøte fredag 9. august kl. 18:00 der vi går gjennom praktisk informasjon og årets pedagogiske satsing.

Vi ser frem til et godt samarbeid!

Mvh,
Løvenskiold Barnehage`,
      date: '2024-03-18',
      time: '14:30',
      unread: true,
      starred: false,
      hasAttachment: true
    },
    {
      id: 2,
      from: 'Oslo Kommune',
      fromEmail: 'barnehage@oslo.kommune.no',
      subject: 'Søknadsstatus oppdatert - Emma Hansen',
      preview: 'Din søknad for Emma Hansen har blitt oppdatert. Status: Tildelt plass...',
      content: `Kjære foresatte,

Din søknad for Emma Hansen (søknad #APP-001) har blitt oppdatert.

STATUS: Tildelt plass

Emma har fått plass ved Løvenskiold Barnehage med oppstart 15. august 2024.

Du må akseptere plassen innen 14 dager for å sikre plassen. Dette gjør du ved å logge inn på barnehage.oslo.no og følge instruksjonene.

Ved spørsmål kan du kontakte din saksbehandler Erik Johansen på erik.johansen@oslo.kommune.no eller telefon 23 48 XX XX.

Mvh,
Oslo Kommune Barnehageadministrasjon`,
      date: '2024-03-16',
      time: '09:15',
      unread: false,
      starred: true,
      hasAttachment: false
    },
    {
      id: 3,
      from: 'Saksbehandler - Erik Johansen',
      fromEmail: 'erik.johansen@oslo.kommune.no',
      subject: 'Manglende dokumentasjon',
      preview: 'Vi mangler inntektsopplysninger for behandling av søknad om redusert betaling...',
      content: `Hei Anna,

Vi har mottatt din søknad om redusert betaling for Oliver, men vi mangler følgende dokumentasjon:

- Siste års selvangivelse
- Oppdatert inntektsattest fra arbeidsgiver

Kan du laste opp disse dokumentene i portalen eller sende dem på e-post?

Søknaden vil ikke kunne behandles før vi har mottatt all nødvendig dokumentasjon.

Ta gjerne kontakt hvis du har spørsmål.

Mvh,
Erik Johansen
Saksbehandler
Oslo Kommune`,
      date: '2024-03-14',
      time: '11:20',
      unread: false,
      starred: false,
      hasAttachment: false
    }
  ];

  const handleReply = () => {
    if (replyText.trim()) {
      console.log('Sending reply:', replyText);
      setReplyText('');
      // Here you would typically make an API call
    }
  };

  const toggleStar = (messageId: number) => {
    console.log('Toggle star for message:', messageId);
  };

  const selectedMessageData = messages.find(m => m.id === selectedMessage);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Meldinger</h1>
        <p className="text-gray-600 mt-2">
          Kommunikasjon med barnehager og Oslo Kommune
        </p>
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Søk i meldinger..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Archive className="h-4 w-4 mr-2" />
              Arkiverte
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Message List */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="font-semibold text-gray-900 mb-3">
            Innboks ({messages.filter(m => m.unread).length} uleste)
          </h3>
          
          {messages.map((message) => (
            <Card 
              key={message.id} 
              className={`cursor-pointer transition-all ${
                selectedMessage === message.id 
                  ? 'ring-2 ring-oslo-blue bg-blue-50' 
                  : 'hover:shadow-md'
              } ${message.unread ? 'border-l-4 border-l-blue-500' : ''}`}
              onClick={() => setSelectedMessage(message.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-medium text-sm truncate ${message.unread ? 'font-semibold' : ''}`}>
                        {message.from}
                      </h4>
                      {message.unread && (
                        <Badge variant="secondary" className="text-xs px-1 py-0">
                          Ny
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm truncate ${message.unread ? 'font-medium' : 'text-gray-600'}`}>
                      {message.subject}
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {message.preview}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1 ml-2">
                    <div className="flex items-center gap-1">
                      {message.hasAttachment && (
                        <Paperclip className="h-3 w-3 text-gray-400" />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(message.id);
                        }}
                      >
                        <Star className={`h-3 w-3 ${message.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                      </Button>
                    </div>
                    <span className="text-xs text-gray-500">{message.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Message Content */}
        <div className="lg:col-span-3">
          {selectedMessageData ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedMessageData.subject}</CardTitle>
                    <CardDescription className="mt-2">
                      Fra: {selectedMessageData.from} ({selectedMessageData.fromEmail})
                      <br />
                      {selectedMessageData.date} kl. {selectedMessageData.time}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Archive className="h-4 w-4 mr-2" />
                      Arkiver
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStar(selectedMessageData.id)}
                    >
                      <Star className={`h-4 w-4 mr-2 ${selectedMessageData.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      {selectedMessageData.starred ? 'Fjern stjerne' : 'Legg til stjerne'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Message Content */}
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {selectedMessageData.content}
                  </div>
                </div>

                {/* Attachments */}
                {selectedMessageData.hasAttachment && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Paperclip className="h-4 w-4" />
                      Vedlegg
                    </h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Button variant="outline" size="sm">
                        📄 Informasjonsbrosjyre.pdf (234 KB)
                      </Button>
                    </div>
                  </div>
                )}

                {/* Reply Section */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Svar på melding</h4>
                  <div className="space-y-3">
                    <textarea
                      className="w-full min-h-24 px-3 py-2 border rounded-md resize-y"
                      placeholder="Skriv ditt svar her..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        <Paperclip className="h-4 w-4 mr-2" />
                        Legg ved fil
                      </Button>
                      <Button 
                        onClick={handleReply}
                        disabled={!replyText.trim()}
                        className="bg-oslo-blue hover:bg-blue-700"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send svar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-96 text-gray-500">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Velg en melding for å lese innholdet</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
