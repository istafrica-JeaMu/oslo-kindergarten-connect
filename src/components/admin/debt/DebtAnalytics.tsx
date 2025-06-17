
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, FileText, Target, AlertTriangle } from 'lucide-react';
import { DebtAnalytics as DebtAnalyticsType } from '@/types/debt';

interface DebtAnalyticsProps {
  analytics: DebtAnalyticsType;
}

const DebtAnalytics = ({ analytics }: DebtAnalyticsProps) => {
  const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];

  const statusData = Object.entries(analytics.debtsByStatus).map(([status, count]) => ({
    name: status.replace('_', ' ').toUpperCase(),
    value: count
  }));

  const escalationData = Object.entries(analytics.debtsByEscalation).map(([level, count]) => ({
    name: level.replace('_', ' ').toUpperCase(),
    value: count
  }));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Outstanding</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(analytics.totalOutstanding)}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Debts</p>
                <p className="text-2xl font-bold text-slate-900">{analytics.totalDebts}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Average Debt</p>
                <p className="text-2xl font-bold text-slate-900">
                  {formatCurrency(analytics.averageDebtAmount)}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Target className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Collection Rate</p>
                <p className="text-2xl font-bold text-green-600">{analytics.collectionRate}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Debts by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Debts by Escalation Level</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={escalationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Collection Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={analytics.monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'collected' || name === 'outstanding' 
                    ? formatCurrency(value as number)
                    : value,
                  name
                ]}
              />
              <Bar yAxisId="left" dataKey="newDebts" fill="#ef4444" name="New Debts" />
              <Line yAxisId="right" type="monotone" dataKey="collected" stroke="#22c55e" strokeWidth={3} name="Collected" />
              <Line yAxisId="right" type="monotone" dataKey="outstanding" stroke="#f97316" strokeWidth={3} name="Outstanding" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DebtAnalytics;
