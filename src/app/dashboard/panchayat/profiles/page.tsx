
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
import { Search, Users, Eye, Edit, Trash2 } from "lucide-react";

// Mock data for demonstration
const mockProfiles = [
  { id: '1', name: 'Lakshmi Priya', jobsCompleted: 2, benefitedAmount: 5000 },
  { id: '2', name: 'Kavita Devi', jobsCompleted: 0, benefitedAmount: 0 },
  { id: '3', name: 'Meena Kumari', jobsCompleted: 5, benefitedAmount: 12000 },
  { id: '4', name: 'Anjali Sharma', jobsCompleted: 1, benefitedAmount: 1500 },
  { id: '5', name: 'Sita Rai', jobsCompleted: 0, benefitedAmount: 0 },
];

const statusColors = {
  'Assigned': 'bg-blue-100 text-blue-800 border-blue-200',
  'Not Yet Assigned': 'bg-yellow-100 text-yellow-800 border-yellow-200',
}

export default function ProfilesListPage() {
  const [filter, setFilter] = useState('all');

  const sortedAndFilteredProfiles = mockProfiles
    .sort((a, b) => {
        // Sorts "Not Yet Assigned" (jobsCompleted: 0) before "Assigned"
        if (a.jobsCompleted === 0 && b.jobsCompleted > 0) return -1;
        if (a.jobsCompleted > 0 && b.jobsCompleted === 0) return 1;
        return a.name.localeCompare(b.name); // Secondary sort by name
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
