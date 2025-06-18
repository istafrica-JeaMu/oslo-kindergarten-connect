import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Edit, Trash2, ArrowUpDown, ChevronLeft, ChevronRight, Users, UserMinus, Grid3X3, Package, Shield, Building2, Lock, Paperclip } from 'lucide-react';

interface Role {
  id: number;
  name: string;
  description: string;
  selected: boolean;
}

const UserTemplates = () => {
  const [activeTab, setActiveTab] = useState<'roles' | 'limited-roles' | 'module-groups' | 'modules'>('roles');
  
  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: 'Account UI Administrator', description: 'Role for administrating new roles handled with account UI v2', selected: false },
    { id: 2, name: 'Account UI Edit/Read Administrator', description: 'Account UI Edit/Read Administrator', selected: false },
    { id: 3, name: 'Account UI Read Administrator', description: 'Access for users that only want to look but not touch', selected: false },
    { id: 4, name: 'Admin CICO- edit', description: 'edit posts', selected: false },
    { id: 5, name: 'Admin CICO- read', description: 'read posts', selected: false },
    { id: 6, name: 'Admin CICO-all', description: 'posts all rights', selected: false },
    { id: 7, name: 'Admin CICO-write', description: 'write posts', selected: false },
    { id: 8, name: 'Admin Sparvens förskola', description: 'Admin Sparvens förskola', selected: false },
    { id: 9, name: 'Administratör VUX (IST)', description: 'Administratör VUX', selected: false },
    { id: 10, name: 'Admission Management Administrator', description: 'Admission Management Administrator', selected: false },
    { id: 11, name: 'Analys Avgiftskontroll', description: 'fee control, retroactive avgiftskontroll', selected: false },
    { id: 12, name: 'Analys Config', description: 'Analys Config', selected: false },
    { id: 13, name: 'Analys Display menu', description: 'anaTest updated description. updated', selected: false },
    { id: 14, name: 'Analys Ekonomianalys RF FSK', description: 'Ekonomianalys RF FSK', selected: false },
    { id: 15, name: 'Analys FSK', description: 'test role', selected: false },
    { id: 16, name: 'Analys Hämta och Lämna', description: 'Analys Hämta och Lämna', selected: false },
    { id: 17, name: 'Arkivering och gallring', description: 'test', selected: false }
  ]);

  const [moduleGroups, setModuleGroups] = useState([
    { id: 1, name: 'AA_GG_test', description: 'AA GG' },
    { id: 2, name: 'Access Rights ModuleGroup', description: 'ModuleGroup that includes ACCESS-RIGHT-EDIT and ACCESS-RIGHT-READ' },
    { id: 3, name: 'Billing Address - Edit', description: 'Edit access rights for Billing Address' },
    { id: 4, name: 'Billing Address - Read', description: 'Read access rights for Billing Address' },
    { id: 5, name: 'Billing Group', description: 'Billing Group' },
    { id: 6, name: 'CCUI Edit', description: 'CCUI Edit' },
    { id: 7, name: 'CCUI Read', description: 'CCUI Read' },
    { id: 8, name: 'Document manager - all modules', description: 'This will give you access to all rights in Docman.' }
  ]);

  const [modules] = useState([
    { id: 1, name: 'Access ACCOUNTING for billingAddress', description: 'Module for accessing Priceable billingAddress type ACCOUNTING subsystem', source: 'Pricing and Accounting' },
    { id: 2, name: 'Access PRICETAG for billingAddress', description: 'Module for accessing Priceable billingAddress type PRICETAG subsystem', source: 'Pricing and Accounting' },
    { id: 3, name: 'Access to logs in Digital National Assessment', description: 'Access to logs in Digital National Assessment that contains recent feedback from Skolverket about data problems.', source: 'Digital National Assessment' },
    { id: 4, name: 'Account Generate account', description: 'Account Generate account', source: 'Eos-admin' },
    { id: 5, name: 'Add to Student Curriculum from Curriculum Package', description: 'User can add Curriculum Packages to Student Curriculum.', source: 'School' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [newRole, setNewRole] = useState({ name: '', description: '' });
  const [newGroup, setNewGroup] = useState({ name: '', description: '' });
  const [updateExisting, setUpdateExisting] = useState(true);
  const [selectedRole, setSelectedRole] = useState('AA_Test');
  const [selectedSource, setSelectedSource] = useState('');

  const limitedRoles = [
    { id: 'AA_Test', name: 'AA_Test', count: 1 },
    { id: 'Access Right Admin', name: 'Access Right Admin', count: 1 },
    { id: 'Access Right READONLY', name: 'Access Right READONLY', count: 1 },
    { id: 'Account UI Administrator', name: 'Account UI Administrator', count: 1 },
    { id: 'Admin Sparvens förskola', name: 'Admin Sparvens förskola', count: 1, locked: true }
  ];

  const organizationElements = [
    { id: 'insektskommunen', name: 'Insektskommunen', type: 'root', expanded: true },
    { id: 'element-01-12-2015', name: 'Element 01.12.2015', type: 'child', expanded: true },
    { id: 'dw-09-09-name', name: 'DW 09.09 name', type: 'child', expanded: true },
    { id: 'samuel-element', name: 'samuel_element', type: 'child', expanded: true }
  ];

  const sources = [...new Set(modules.map(module => module.source))];

  const getFilteredData = () => {
    switch (activeTab) {
      case 'roles':
        return roles.filter(role =>
          role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          role.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 'module-groups':
        return moduleGroups.filter(group =>
          group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 'modules':
        return modules.filter(module => {
          const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               module.description.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesSource = selectedSource === 'all-sources' || !selectedSource || module.source === selectedSource;
          return matchesSearch && matchesSource;
        });
      default:
        return [];
    }
  };

  const filteredData = getFilteredData();
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleSelectAll = (checked: boolean) => {
    setRoles(roles.map(role => ({ ...role, selected: checked })));
  };

  const handleSelectRole = (id: number, checked: boolean) => {
    setRoles(roles.map(role => 
      role.id === id ? { ...role, selected: checked } : role
    ));
  };

  const handleCreateRole = () => {
    if (newRole.name.trim()) {
      const newRoleData = {
        id: Math.max(...roles.map(r => r.id)) + 1,
        name: newRole.name,
        description: newRole.description,
        selected: false
      };
      setRoles([...roles, newRoleData]);
      setNewRole({ name: '', description: '' });
      setShowCreateModal(false);
    }
  };

  const handleCreateGroup = () => {
    if (newGroup.name.trim()) {
      const newGroupData = {
        id: Math.max(...moduleGroups.map(g => g.id)) + 1,
        name: newGroup.name,
        description: newGroup.description
      };
      setModuleGroups([...moduleGroups, newGroupData]);
      setNewGroup({ name: '', description: '' });
      setShowCreateModal(false);
    }
  };

  const handleDeleteGroup = (id: number) => {
    setModuleGroups(moduleGroups.filter(group => group.id !== id));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'roles':
        return (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Roles Management</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="text-gray-600">EXPORT</Button>
                <Button variant="outline" className="text-gray-600">COMPARE</Button>
                <Button variant="outline" className="text-gray-600">DELETE</Button>
                <Button onClick={() => setShowCreateModal(true)} className="bg-teal-600 hover:bg-teal-700 text-white">NEW ROLE</Button>
                <Button onClick={() => setShowImportModal(true)} className="bg-teal-600 hover:bg-teal-700 text-white">IMPORT</Button>
              </div>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Type to search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={roles.every(role => role.selected)}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center gap-1">
                        Name
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedData.map((role: any) => (
                    <TableRow key={role.id} className="hover:bg-gray-50">
                      <TableCell>
                        <Checkbox
                          checked={role.selected}
                          onCheckedChange={(checked) => handleSelectRole(role.id, checked === true)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell className="text-gray-600">{role.description}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t">
                <div className="text-sm text-gray-700">
                  Rows per page: 
                  <select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="ml-2 border border-gray-300 rounded px-2 py-1"
                  >
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-700">
                    {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 'limited-roles':
        return (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Limited Roles Assignment</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Roles Panel */}
              <Card>
                <CardHeader>
                  <CardTitle>Roles</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Type to search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {limitedRoles.map((role) => (
                      <div
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                          selectedRole === role.id 
                            ? 'bg-teal-100 text-teal-800' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-sm">{role.name}</span>
                        <div className="flex items-center gap-2">
                          {role.locked && <Lock className="h-3 w-3 text-gray-400" />}
                          <Badge variant="outline" className="text-xs">
                            {role.count}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Organization Elements Panel */}
              <Card>
                <CardHeader>
                  <CardTitle>Organisation Elements</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Type to search..."
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-right text-sm text-gray-500 mb-4">
                    This role is currently not limited to specific elements/units, so it can be assigned anywhere in the organisation.
                  </div>
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {organizationElements.map((element) => (
                      <div key={element.id} className="flex items-center gap-2 py-1">
                        <Checkbox />
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{element.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        );

      case 'module-groups':
        return (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Module Groups</h1>
              <Button onClick={() => setShowCreateModal(true)} className="bg-teal-600 hover:bg-teal-700 text-white">NEW GROUP</Button>
            </div>

            {/* Search */}
            <div className="relative max-w-md mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Type to search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedData.map((group: any) => (
                    <TableRow key={group.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{group.name}</TableCell>
                      <TableCell className="text-gray-600">{group.description}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteGroup(group.id)}
                          className="text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        );

      case 'modules':
        return (
          <>
            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Modules</h1>

            {/* Search and Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Type to search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedSource} onValueChange={setSelectedSource}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Choose sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-sources">All Sources</SelectItem>
                  {sources.map(source => (
                    <SelectItem key={source} value={source}>{source}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Source</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedData.map((module: any) => (
                    <TableRow key={module.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{module.name}</TableCell>
                      <TableCell className="text-gray-600">{module.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {module.source}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="bg-teal-600 text-white w-64 min-h-screen p-4">
        <div className="mb-8">
          <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Access Right
          </h2>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('roles')}
              className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded transition-colors ${
                activeTab === 'roles' ? 'bg-teal-700' : 'hover:bg-teal-700'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Roles</span>
            </button>
            <button
              onClick={() => setActiveTab('limited-roles')}
              className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded transition-colors ${
                activeTab === 'limited-roles' ? 'bg-teal-700' : 'hover:bg-teal-700'
              }`}
            >
              <UserMinus className="h-4 w-4" />
              <span>Limited Roles</span>
            </button>
            <button
              onClick={() => setActiveTab('module-groups')}
              className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded transition-colors ${
                activeTab === 'module-groups' ? 'bg-teal-700' : 'hover:bg-teal-700'
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
              <span>Module Groups</span>
            </button>
            <button
              onClick={() => setActiveTab('modules')}
              className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded transition-colors ${
                activeTab === 'modules' ? 'bg-teal-700' : 'hover:bg-teal-700'
              }`}
            >
              <Package className="h-4 w-4" />
              <span>Modules</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {renderTabContent()}
      </div>

      {/* Create Role/Group Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {activeTab === 'roles' ? 'Create new role' : 'Create new module group'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={activeTab === 'roles' ? newRole.name : newGroup.name}
                onChange={(e) => activeTab === 'roles' 
                  ? setNewRole({ ...newRole, name: e.target.value })
                  : setNewGroup({ ...newGroup, name: e.target.value })
                }
                placeholder="Enter name"
                className={!(activeTab === 'roles' ? newRole.name : newGroup.name).trim() ? 'border-red-500' : ''}
                required
              />
              {!(activeTab === 'roles' ? newRole.name : newGroup.name).trim() && (
                <p className="text-red-500 text-sm mt-1">required</p>
              )}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={activeTab === 'roles' ? newRole.description : newGroup.description}
                onChange={(e) => activeTab === 'roles'
                  ? setNewRole({ ...newRole, description: e.target.value })
                  : setNewGroup({ ...newGroup, description: e.target.value })
                }
                placeholder="Enter description"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>CANCEL</Button>
            <Button
              onClick={activeTab === 'roles' ? handleCreateRole : handleCreateGroup}
              disabled={!(activeTab === 'roles' ? newRole.name : newGroup.name).trim()}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              SAVE
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Modal */}
      <Dialog open={showImportModal} onOpenChange={setShowImportModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Import</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Paperclip className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <Input type="file" className="hidden" id="file-upload" accept=".csv,.xlsx,.json" />
              <Label htmlFor="file-upload" className="cursor-pointer text-red-500 hover:text-red-600">
                Choose file...
              </Label>
              <p className="text-sm text-red-500 mt-1">Choose file...</p>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="update-existing"
                checked={updateExisting}
                onCheckedChange={(checked) => setUpdateExisting(checked === true)}
              />
              <Label htmlFor="update-existing" className="text-sm">
                Update existing roles with the same name
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImportModal(false)}>CANCEL</Button>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">IMPORT</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserTemplates;
