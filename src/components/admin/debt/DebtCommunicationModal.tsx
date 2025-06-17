
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Send, Mail, MessageSquare, FileText } from 'lucide-react';
import { DebtRecord } from '@/types/debt';

interface DebtCommunicationModalProps {
  debt: DebtRecord;
  isOpen: boolean;
  onClose: () => void;
}

const DebtCommunicationModal = ({ debt, isOpen, onClose }: DebtCommunicationModalProps) => {
  const [messageType, setMessageType] = useState('email');
  const [templateType, setTemplateType] = useState('payment_reminder');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const messageTemplates = {
    payment_reminder: {
      subject: 'Payment Reminder - Outstanding Childcare Fee',
      content: `Dear ${debt.guardian.fullName},

We hope this message finds you well. We are writing to remind you of an outstanding payment for childcare services.

Details:
- Child: ${debt.child.fullName}
- Unit: ${debt.unitName}
- Amount: ${debt.outstandingAmount} SEK
- Due Date: ${debt.dueDate}
- Days Overdue: ${debt.daysOverdue}

Please contact us to arrange payment or discuss payment options.

Best regards,
Municipal Childcare Services`
    },
    first_notice: {
      subject: 'First Notice - Overdue Childcare Payment',
      content: `Dear ${debt.guardian.fullName},

This is a formal notice regarding an overdue payment for childcare services.

Details:
- Child: ${debt.child.fullName}
- Unit: ${debt.unitName}
- Amount: ${debt.outstandingAmount} SEK
- Original Due Date: ${debt.dueDate}
- Days Overdue: ${debt.daysOverdue}

Please arrange payment within 14 days to avoid further collection action.

Best regards,
Municipal Childcare Services`
    },
    final_notice: {
      subject: 'FINAL NOTICE - Immediate Payment Required',
      content: `Dear ${debt.guardian.fullName},

This is your FINAL NOTICE for an overdue childcare payment. Immediate action is required.

Details:
- Child: ${debt.child.fullName}
- Unit: ${debt.unitName}
- Amount: ${debt.outstandingAmount} SEK
- Original Due Date: ${debt.dueDate}
- Days Overdue: ${debt.daysOverdue}

If payment is not received within 7 days, this matter will be forwarded to our collection agency.

Best regards,
Municipal Childcare Services`
    }
  };

  const handleTemplateChange = (template: string) => {
    setTemplateType(template);
    const selectedTemplate = messageTemplates[template as keyof typeof messageTemplates];
    if (selectedTemplate) {
      setSubject(selectedTemplate.subject);
      setMessage(selectedTemplate.content);
    }
  };

  const handleSend = () => {
    console.log('Sending message:', {
      debtId: debt.id,
      type: messageType,
      subject,
      message
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Send Debt Message
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recipient Info */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-medium text-slate-900 mb-2">Recipient Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Guardian:</span>
                <div className="font-medium">{debt.guardian.fullName}</div>
              </div>
              <div>
                <span className="text-slate-600">Child:</span>
                <div className="font-medium">{debt.child.fullName}</div>
              </div>
              <div>
                <span className="text-slate-600">Outstanding Amount:</span>
                <div className="font-medium text-red-600">{debt.outstandingAmount} SEK</div>
              </div>
              <div>
                <span className="text-slate-600">Days Overdue:</span>
                <div className="font-medium">{debt.daysOverdue} days</div>
              </div>
            </div>
          </div>

          {/* Message Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Message Type</label>
              <Select value={messageType} onValueChange={setMessageType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </div>
                  </SelectItem>
                  <SelectItem value="sms">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      SMS
                    </div>
                  </SelectItem>
                  <SelectItem value="postal">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Postal Mail
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Template</label>
              <Select value={templateType} onValueChange={handleTemplateChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="payment_reminder">Payment Reminder</SelectItem>
                  <SelectItem value="first_notice">First Notice</SelectItem>
                  <SelectItem value="final_notice">Final Notice</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="text-sm font-medium mb-2 block">Subject</label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter message subject"
            />
          </div>

          {/* Message Content */}
          <div>
            <label className="text-sm font-medium mb-2 block">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message content"
              rows={10}
              className="resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DebtCommunicationModal;
