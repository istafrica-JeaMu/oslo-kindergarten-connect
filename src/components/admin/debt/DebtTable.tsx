
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Send, CreditCard, AlertTriangle, Clock, User, MapPin, Calendar, Euro } from 'lucide-react';
import { DebtRecord } from '@/types/debt';

interface DebtTableProps {
  debts: DebtRecord[];
  selectedRows: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
  onSendMessage: (debt: DebtRecord) => void;
  onRecordPayment: (debt: DebtRecord) => void;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string, direction: 'asc' | 'desc') => void;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

const DebtTable = ({
  debts,
  selectedRows,
  onSelectAll,
  onSelectRow,
  onSendMessage,
  onRecordPayment,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}: DebtTableProps) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      overdue: { color: 'bg-red-100 text-red-800', label: 'Overdue' },
      in_collection: { color: 'bg-orange-100 text-orange-800', label: 'In Collection' },
      legal_action: { color: 'bg-purple-100 text-purple-800', label: 'Legal Action' },
      settled: { color: 'bg-blue-100 text-blue-800', label: 'Settled' },
      written_off: { color: 'bg-gray-100 text-gray-800', label: 'Written Off' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getEscalationBadge = (level: string) => {
    const levelConfig = {
      early_warning: { color: 'bg-yellow-100 text-yellow-800', label: 'Early Warning', icon: Clock },
      first_notice: { color: 'bg-orange-100 text-orange-800', label: 'First Notice', icon: AlertTriangle },
      final_notice: { color: 'bg-red-100 text-red-800', label: 'Final Notice', icon: AlertTriangle },
      collection_agency: { color: 'bg-purple-100 text-purple-800', label: 'Collection Agency', icon: AlertTriangle },
      legal_action: { color: 'bg-gray-100 text-gray-800', label: 'Legal Action', icon: AlertTriangle },
      write_off: { color: 'bg-gray-100 text-gray-600', label: 'Write Off', icon: Clock }
    };
    
    const config = levelConfig[level as keyof typeof levelConfig] || levelConfig.early_warning;
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE');
  };

  const allSelected = debts.length > 0 && debts.every(debt => selectedRows.includes(debt.id));

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={onSelectAll}
                />
              </TableHead>
              <TableHead>Relation</TableHead>
              <TableHead>Civic Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Child Civic Number</TableHead>
              <TableHead>Child Name</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Days Overdue</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Escalation</TableHead>
              <TableHead>Management</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {debts.map((debt) => (
              <TableRow 
                key={debt.id} 
                className={selectedRows.includes(debt.id) ? 'bg-slate-50' : ''}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(debt.id)}
                    onCheckedChange={(checked) => onSelectRow(debt.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium">Guardian/Child</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm font-mono">{debt.guardian.civicNumber}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-slate-900">{debt.guardian.fullName}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm font-mono">{debt.child.civicNumber}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-slate-900">{debt.child.fullName}</div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span className="text-sm font-medium">{debt.unitName}</span>
                    </div>
                    <div className="text-xs text-slate-600 capitalize">{debt.municipality}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Euro className="w-3 h-3 text-red-600" />
                      <span className="font-medium text-red-600">
                        {formatCurrency(debt.outstandingAmount)}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      of {formatCurrency(debt.originalAmount)}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span className="text-sm">{formatDate(debt.dueDate)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`font-medium ${debt.daysOverdue > 30 ? 'text-red-600' : debt.daysOverdue > 14 ? 'text-orange-600' : 'text-slate-900'}`}>
                    {debt.daysOverdue} days
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(debt.status)}
                </TableCell>
                <TableCell>
                  {getEscalationBadge(debt.escalationLevel)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {debt.managementType.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSendMessage(debt)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Send debt message
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRecordPayment(debt)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <CreditCard className="w-4 h-4 mr-1" />
                      Payment
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Show</span>
          <Select value={itemsPerPage.toString()} onValueChange={(value) => onItemsPerPageChange(Number(value))}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-slate-600">entries</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <span className="text-sm text-slate-600">
            Page {currentPage} of {totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DebtTable;
