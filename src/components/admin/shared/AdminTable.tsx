
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TableColumn {
  key: string;
  title: string;
  render?: (value: any, row: any) => React.ReactNode;
  sortable?: boolean;
}

interface TableAction {
  label: string;
  position: 'bottom-right' | 'bottom-center';
  requiresSelection?: boolean;
  variant?: 'default' | 'destructive';
  onClick?: () => void;
}

interface AdminTableProps {
  columns: TableColumn[];
  data: any[];
  actions?: TableAction[];
  hasMultiSelect?: boolean;
  hasActionColumns?: boolean;
  selectedRows?: Set<number> | string[];
  onSelectAll?: (checked: boolean) => void;
  onSelectRow?: (id: string | number, checked: boolean) => void;
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  emptyMessage?: string;
}

const AdminTable = ({
  columns,
  data,
  actions = [],
  hasMultiSelect = false,
  hasActionColumns = false,
  selectedRows = new Set(),
  onSelectAll,
  onSelectRow,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 15,
  onPageChange,
  onItemsPerPageChange,
  sortField,
  sortDirection,
  onSort,
  emptyMessage = "No results found."
}: AdminTableProps) => {
  
  const renderActionColumn = (columnKey: string) => {
    const iconMap: Record<string, string> = {
      'admit': '✓',
      'handle-interest-request': '♥',
      'child-info': '👤',
      'close-admission-offer': '✗',
      'cancel-offer': '⊗',
      'change-application': '✏️',
      'copy-application': '📋',
      'create-offer': '+',
      'admissions': '⚙️'
    };
    
    const iconKey = columnKey.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-gray-600 hover:bg-gray-100">
        {iconMap[iconKey] || '•'}
      </Button>
    );
  };

  const isSelectedRowsSet = selectedRows instanceof Set;
  const selectedCount = isSelectedRowsSet ? selectedRows.size : selectedRows.length;
  const isAllSelected = data.length > 0 && selectedCount === data.length;

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {hasMultiSelect && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={(checked) => onSelectAll?.(checked === true)}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + (hasMultiSelect ? 1 : 0)}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={row.id || index} className="hover:bg-gray-50">
                  {hasMultiSelect && (
                    <td className="px-6 py-4">
                      <Checkbox
                        checked={isSelectedRowsSet ? selectedRows.has(row.id) : selectedRows.includes(row.id)}
                        onCheckedChange={(checked) => onSelectRow?.(row.id, checked === true)}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {column.render 
                        ? column.render(row[column.key], row)
                        : hasActionColumns && 
                          ['Admit', 'Handle interest request', 'Child info', 'Close admission offer', 'Cancel the offer', 'Change application', 'Copy application', 'Create offer', 'Admissions'].includes(column.title)
                          ? renderActionColumn(column.key)
                          : column.key === '#' 
                            ? (currentPage - 1) * itemsPerPage + index + 1
                            : row[column.key] || '-'
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-8 h-8 p-0"
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-8 h-8 p-0"
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <select 
            className="ml-4 border border-gray-300 rounded px-2 py-1 text-sm"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange?.(Number(e.target.value))}
          >
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">
            {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, data.length)} of {data.length}
          </span>
          <span className="text-sm text-gray-500">Sort Order:</span>
          <Badge variant="outline" className="text-xs">Default ↑</Badge>
        </div>
      </div>
      
      {/* Action Buttons */}
      {actions.length > 0 && (
        <div className={`p-4 border-t ${
          actions[0].position === 'bottom-center' ? 'text-center' : 'text-right'
        }`}>
          <div className={`flex gap-2 ${
            actions[0].position === 'bottom-center' ? 'justify-center flex-wrap' : 'justify-end'
          }`}>
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant === 'destructive' ? 'destructive' : 'default'}
                size="sm"
                disabled={action.requiresSelection && selectedCount === 0}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTable;
