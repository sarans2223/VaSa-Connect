
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { DollarSign, Briefcase, Users, Percent } from 'lucide-react';

const workerData = {
  totalJobs: 15,
  totalEarned: 85000,
  earnings: {
    month: [
      { name: 'Jan', earnings: 12000 },
      { name: 'Feb', earnings: 15000 },
      { name: 'Mar', earnings: 10000 },
      { name: 'Apr', earnings: 18000 },
      { name: 'May', earnings: 13000 },
      { name: 'Jun', earnings: 17000 },
    ],
    week: [
        { name: 'Mon', earnings: 1500 },
        { name: 'Tue', earnings: 2000 },
        { name: 'Wed', earnings: 1800 },
        { name: 'Thu', earnings: 2200 },
        { name: 'Fri', earnings: 2500 },
        { name: 'Sat', earnings: 1200 },
        { name: 'Sun', earnings: 800 },
    ],
    year: [
        { name: 'Jan', earnings: 12000 },
        { name: 'Feb', earnings: 15000 },
        { name: 'Mar', earnings: 10000 },
        { name: 'Apr', earnings: 18000 },
        { name: 'May', earnings: 13000 },
        { name: 'Jun', earnings: 17000 },
        { name: 'Jul', earnings: 19000 },
        { name: 'Aug', earnings: 21000 },
        { name: 'Sep', earnings: 16000 },
        { name: 'Oct', earnings: 22000 },
        { name: 'Nov', earnings: 25000 },
        { name: 'Dec', earnings: 28000 },
    ],
    last10: Array.from({ length: 10 }, (_, i) => ({
      name: `Day ${i + 1}`,
      earnings: Math.floor(Math.random() * (2500 - 1000 + 1) + 1000),
    })),
  },
};

const recruiterData = {
  totalRecruited: 45,
  totalPaid: 320000,
  commissionPaid: 16000,
  recruitment: {
      month: [
        { name: 'Jan', recruited: 5, paid: 40000 },
        { name: 'Feb', recruited: 8, paid: 64000 },
        { name: 'Mar', recruited: 6, paid: 48000 },
        { name: 'Apr', recruited: 10, paid: 80000 },
        { name: 'May', recruited: 7, paid: 56000 },
        { name: 'Jun', recruited: 9, paid: 72000 },
      ],
      week: [
        { name: 'Mon', recruited: 1, paid: 8000 },
        { name: 'Tue', recruited: 2, paid: 16000 },
        { name: 'Wed', recruited: 1, paid: 8000 },
        { name: 'Thu', recruited: 3, paid: 24000 },
        { name: 'Fri', recruited: 2, paid: 16000 },
        { name: 'Sat', recruited: 1, paid: 8000 },
        { name: 'Sun', recruited: 0, paid: 0 },
      ]
  },
};

const formatRupees = (value: number) => `₹${value.toLocaleString('en-IN')}`;

type WorkerPeriod = keyof typeof workerData.earnings;
type RecruiterPeriod = keyof typeof recruiterData.recruitment;

export default function MonetizationPage() {
  const [workerPeriod, setWorkerPeriod] = useState<WorkerPeriod>('month');
  const [recruiterPeriod, setRecruiterPeriod] = useState<RecruiterPeriod>('month');

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex items-center gap-4">
        <DollarSign className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Monetization</h1>
      </div>

      <Tabs defaultValue="worker" className="space-y-4">
        <TabsList>
          <TabsTrigger value="worker">As a Worker</TabsTrigger>
          <TabsTrigger value="recruiter">As a Recruiter</TabsTrigger>
        </TabsList>
        <TabsContent value="worker" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Jobs Completed
                </CardTitle>
                <Briefcase className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{workerData.totalJobs}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Amount Earned
                </CardTitle>
                <DollarSign className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {formatRupees(workerData.totalEarned)}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Earnings Overview</CardTitle>
                  <CardDescription>
                    Your earnings over the selected period.
                  </CardDescription>
                </div>
                <Select value={workerPeriod} onValueChange={(value) => setWorkerPeriod(value as WorkerPeriod)}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="last10">Last 10 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="h-[350px] w-full">
              <ResponsiveContainer>
                <BarChart data={workerData.earnings[workerPeriod]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `₹${Number(value) / 1000}k`} />
                  <Tooltip
                    formatter={(value) => [formatRupees(Number(value)), 'Earnings']}
                  />
                  <Legend />
                  <Bar dataKey="earnings" fill="hsl(var(--primary))" name="Earnings" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recruiter" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Workers Recruited
                </CardTitle>
                <Users className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {recruiterData.totalRecruited}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Amount Paid
                </CardTitle>
                <DollarSign className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {formatRupees(recruiterData.totalPaid)}
                </div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Commission Paid to VaSa
                </CardTitle>
                <Percent className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {formatRupees(recruiterData.commissionPaid)}
                </div>
              </CardContent>
            </Card>
          </div>
           <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Recruitment Overview</CardTitle>
                  <CardDescription>
                    Your recruitment activity over the selected period.
                  </CardDescription>
                </div>
                <Select value={recruiterPeriod} onValueChange={(value) => setRecruiterPeriod(value as RecruiterPeriod)}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="h-[350px] w-full">
              <ResponsiveContainer>
                <BarChart data={recruiterData.recruitment[recruiterPeriod]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" tickFormatter={(value) => `${value}`} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `₹${Number(value) / 1000}k`} />
                  <Tooltip formatter={(value, name) => [name === 'paid' ? formatRupees(Number(value)) : value, name === 'paid' ? 'Amount Paid' : 'Workers Recruited']} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="recruited" fill="hsl(var(--primary))" name="Workers Recruited" />
                  <Bar yAxisId="right" dataKey="paid" fill="hsl(var(--accent))" name="Amount Paid" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

    