
'use client';

import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Users, Eye, Edit, Trash2, Star } from "lucide-react";

// Mock data for demonstration
const mockProfiles = [
  { id: '1', name: 'Lakshmi Priya', jobsCompleted: 2, benefitedAmount: 5000 },
  { id: '2', name: 'Kavita Devi', jobsCompleted: 0, benefitedAmount: 0 },
  { id: '3', name: 'Meena Kumari', jobsCompleted: 5, benefitedAmount: 12000 },
  { id: '4', name: 'Anjali Sharma', jobsCompleted: 1, benefitedAmount: 1500 },
  { id: '5', name: 'Sita Rai', jobsCompleted: 0, benefitedAmount: 0 },
  { id: '6', name: 'Rina Das', jobsCompleted: 3, benefitedAmount: 7500 },
];

const statusColors = {
  'Assigned': 'bg-blue-100 text-blue-800 border-blue-200',
  'Not Yet Assigned': 'bg-yellow-100 text-yellow-800 border-yellow-200',
}

const overviewStatusDetails: { [key: string]: { label: string; className: string } } = {
  Empower: { label: 'Empower', className: 'bg-purple-100 text-purple-800 border-purple-200' },
  Progress: { label: 'Progress', className: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  Rise: { label: 'Rise', className: 'bg-green-100 text-green-800 border-green-200' },
  Begin: { label: 'Begin', className: 'bg-gray-100 text-gray-800 border-gray-200' },
};

const getOverviewStatus = (jobsCompleted: number) => {
  if (jobsCompleted >= 5) return 'Empower';
  if (jobsCompleted >= 2) return 'Progress';
  if (jobsCompleted >= 1) return 'Rise';
  return 'Begin';
};


export default function ProfilesListPage() {
  const [filter, setFilter] = useState('all');

  const sortedAndFilteredProfiles = mockProfiles
    .sort((a, b) => {
        // Separate into assigned and not-yet-assigned
        const aIsAssigned = a.jobsCompleted > 0;
        const bIsAssigned = b.jobsCompleted > 0;

        if (!aIsAssigned && bIsAssigned) return -1; // a (not assigned) comes before b (assigned)
        if (aIsAssigned && !bIsAssigned) return 1;  // b (not assigned) comes before a (assigned)

        // If both are assigned, sort by jobsCompleted descending
        if (aIsAssigned && bIsAssigned) {
            if (b.jobsCompleted !== a.jobsCompleted) {
                return b.jobsCompleted - a.jobsCompleted;
            }
        }
        
        // For profiles with the same assignment status and job count, sort by name
        return a.name.localeCompare(b.name);
    })
    .filter(profile => {
        if (filter === 'assigned') {
            return profile.jobsCompleted > 0;
        }
        if (filter === 'not-yet-assigned') {
            return profile.jobsCompleted === 0;
        }
        return true;
    });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex items-center gap-4">
        <Users className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Profiles Already Added</h1>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search by name or mobile..." className="pl-10" />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Profiles</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="not-yet-assigned">Not Yet Assigned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedAndFilteredProfiles.map((profile) => {
           const status = profile.jobsCompleted > 0 ? 'Assigned' : 'Not Yet Assigned';
           const overviewStatus = getOverviewStatus(profile.jobsCompleted);
           const overviewDetails = overviewStatusDetails[overviewStatus];

           return (
            <Card key={profile.id}>
                <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle>{profile.name}</CardTitle>
                    <Badge className={statusColors[status]}>
                        {status}
                    </Badge>
                </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-muted-foreground">Jobs Completed:</span>
                        <span className="font-bold">{profile.jobsCompleted}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-muted-foreground">Amount Benefited:</span>
                        <span className="font-bold">₹{profile.benefitedAmount.toLocaleString()}</span>
                    </div>
                     <div className="flex justify-between items-center text-sm border-t pt-4 mt-4">
                        <span className="font-medium text-muted-foreground flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          Overview
                        </span>
                        <Badge className={overviewDetails.className}>
                          {overviewDetails.label}
                        </Badge>
                    </div>
                </CardContent>
                <CardFooter className="gap-2">
                    <Button variant="outline" size="sm"><Eye className="mr-2 h-4 w-4"/>View</Button>
                    <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4"/>Edit</Button>
                    <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4"/>Delete</Button>
                </CardFooter>
            </Card>
           );
        })}
      </div>
    </div>
  );
}
