
'use client';

import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, UserPlus, Star, CheckSquare, Square } from "lucide-react";

const mockProfiles = [
  { id: '1', name: 'Lakshmi Priya', skills: ['Cooking', 'Tailoring'], rating: 4.5, jobsCompleted: 2, job: 'Catering Project' },
  { id: '2', name: 'Kavita Devi', skills: ['Farming'], rating: 4.2, jobsCompleted: 2, job: 'Harvesting' },
  { id: '3', name: 'Meena Kumari', skills: ['Herding', 'Farming'], rating: 4.8, jobsCompleted: 3, job: 'Livestock Management' },
  { id: '4', name: 'Anjali Sharma', skills: ['Cleaning'], rating: 3.9, jobsCompleted: 1, job: 'Office Cleaning' },
  { id: '5', name: 'Sita Rai', skills: ['Child Care', 'Cooking'], rating: 4.0, jobsCompleted: 0, job: 'Nanny Position' },
  { id: '6', name: 'Rina Das', skills: ['Handicrafts', 'Painting'], rating: 4.9, jobsCompleted: 5, job: 'Artisan Fair' },
  { id: '7', name: 'Sunita Devi', skills: ['Tailoring', 'Embroidery'], rating: 4.1, jobsCompleted: 0, job: 'Boutique Assistant' },
  { id: '8', name: 'Pooja Singh', skills: ['Driving'], rating: 4.3, jobsCompleted: 0, job: 'Delivery Driver' },
];


export default function AssignWorkerPage() {
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);

  const handleSelectWorker = (workerId: string) => {
    setSelectedWorkers(prev => 
      prev.includes(workerId) 
        ? prev.filter(id => id !== workerId)
        : [...prev, workerId]
    );
  };
  
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} className={`h-4 w-4 ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
      );
    }
    return stars;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
            <div className="flex items-center gap-4">
                <UserPlus className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight">Assign Workers</h1>
            </div>
            <p className="text-muted-foreground mt-2">Select profiles to assign to a job.</p>
        </div>
        <Button size="lg" className="bg-gradient-to-r from-[#E0BBE4] to-[#957DAD] hover:opacity-90 text-primary-foreground">
            Confirm Assignment ({selectedWorkers.length})
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
                <div className="relative lg:col-span-1 space-y-2">
                    <Label htmlFor="search-input">Search</Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="search-input" placeholder="Name or skill..." className="pl-10" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Skill</Label>
                    <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by skill" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Skills</SelectItem>
                        <SelectItem value="cooking">Cooking</SelectItem>
                        <SelectItem value="farming">Farming</SelectItem>
                        <SelectItem value="tailoring">Tailoring</SelectItem>
                        <SelectItem value="cleaning">Cleaning</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Job</Label>
                    <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a job to assign" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="job-1">Catering Project</SelectItem>
                        <SelectItem value="job-2">Harvesting</SelectItem>
                        <SelectItem value="job-3">Office Cleaning</SelectItem>
                        <SelectItem value="job-4">Nanny Position</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <Button className="w-full">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                </Button>
            </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockProfiles.map((profile) => {
           const isSelected = selectedWorkers.includes(profile.id);
           return (
            <Card 
              key={profile.id}
              className={`cursor-pointer transition-all ${isSelected ? 'border-primary ring-2 ring-primary' : 'hover:shadow-md'}`}
              onClick={() => handleSelectWorker(profile.id)}
            >
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle>{profile.name}</CardTitle>
                        {isSelected ? <CheckSquare className="h-6 w-6 text-primary" /> : <Square className="h-6 w-6 text-muted-foreground" />}
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {profile.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                        </div>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-muted-foreground">Current Job:</span>
                        <Badge variant="outline">{profile.job}</Badge>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-muted-foreground">Rating:</span>
                        <div className="flex items-center gap-1">
                          {renderStars(profile.rating)}
                           <span className="font-semibold">{profile.rating.toFixed(1)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
           );
        })}
      </div>
       <div className="flex justify-end">
         <Button size="lg" className="bg-gradient-to-r from-[#E0BBE4] to-[#957DAD] hover:opacity-90 text-primary-foreground">
            Confirm Assignment ({selectedWorkers.length})
        </Button>
      </div>
    </div>
  );
}
