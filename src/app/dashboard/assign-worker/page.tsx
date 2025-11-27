
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import { Search, UserPlus, Star, CheckSquare, Square, UserCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { mockJobs } from '@/lib/data';
import type { Job } from '@/lib/types';

const allProfiles = [
  { id: '1', name: 'Lakshmi Priya', skills: ['Cooking', 'Tailoring'], rating: 4.5, jobsCompleted: 2, job: 'Catering Project' },
  { id: '2', name: 'Kavita Devi', skills: ['Farming'], rating: 4.2, jobsCompleted: 2, job: 'Harvesting' },
  { id: '3', name: 'Meena Kumari', skills: ['Herding', 'Farming'], rating: 4.8, jobsCompleted: 3, job: 'Livestock Management' },
  { id: '4', name: 'Anjali Sharma', skills: ['Cleaning'], rating: 3.9, jobsCompleted: 1, job: 'Office Cleaning' },
  { id: '5', name: 'Sita Rai', skills: ['Child Care', 'Cooking'], rating: 4.0, jobsCompleted: 0, job: 'Nanny Position' },
  { id: '6', name: 'Rina Das', skills: ['Handicrafts', 'Painting'], rating: 4.9, jobsCompleted: 5, job: 'Artisan Fair' },
  { id: '7', name: 'Sunita Devi', skills: ['Tailoring', 'Embroidery'], rating: 4.1, jobsCompleted: 0, job: 'Boutique Assistant' },
  { id: '8', name: 'Pooja Singh', skills: ['Driving'], rating: 4.3, jobsCompleted: 0, job: 'Delivery Driver' },
];

type WorkerProfile = typeof allProfiles[0];


export default function AssignWorkerPage() {
  const [allWorkers] = useState<WorkerProfile[]>(allProfiles);
  const [availableWorkers, setAvailableWorkers] = useState<WorkerProfile[]>([]);
  const [assignedWorkers, setAssignedWorkers] = useState<WorkerProfile[]>([]);
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // Initialize available workers, you might want to fetch this
    setAvailableWorkers(allWorkers);
  }, [allWorkers]);
  
  const handleSearch = () => {
    let filtered = allWorkers;

    if (searchQuery) {
        filtered = filtered.filter(worker => 
            worker.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    if (selectedSkill !== 'all') {
        filtered = filtered.filter(worker => 
            worker.skills.some(skill => skill.toLowerCase() === selectedSkill.toLowerCase())
        );
    }

    // Exclude workers who are already assigned in the current session
    const assignedIds = assignedWorkers.map(w => w.id);
    filtered = filtered.filter(w => !assignedIds.includes(w.id));

    setAvailableWorkers(filtered);
};


  const handleSelectWorker = (workerId: string) => {
    setSelectedWorkers(prev => 
      prev.includes(workerId) 
        ? prev.filter(id => id !== workerId)
        : [...prev, workerId]
    );
  };

  const handleConfirmAssignment = () => {
    if (!selectedJob) {
      toast({
        title: 'No Job Selected',
        description: 'Please select a job to assign workers to.',
        variant: 'destructive',
      });
      return;
    }

    const workersToAssign = allWorkers.filter(w => selectedWorkers.includes(w.id));
    if (workersToAssign.length === 0) {
      toast({
        title: 'No Workers Selected',
        description: 'Please select at least one worker to assign.',
        variant: 'destructive',
      });
      return;
    }
    
    setAssignedWorkers(prev => [...prev, ...workersToAssign]);
    setAvailableWorkers(prev => prev.filter(w => !selectedWorkers.includes(w.id)));
    setSelectedWorkers([]);

    try {
        const storedJobs = localStorage.getItem('panchayatJobs');
        if (storedJobs) {
            let panchayatJobs: Job[] = JSON.parse(storedJobs);
            const jobToUpdate = panchayatJobs.find(job => job.id === selectedJob);

            if (jobToUpdate) {
                const updatedJobs = panchayatJobs.map(job => 
                    job.id === selectedJob 
                    ? { ...job, workerNames: [...(job.workerNames || []), ...workersToAssign.map(w => w.name)], status: 'Worker Assigned' as Job['status'] }
                    : job
                );
                localStorage.setItem('panchayatJobs', JSON.stringify(updatedJobs));
            }
        }
    } catch (error) {
        console.error("Failed to update job status in local storage", error);
    }

    toast({
      title: 'Assignment Confirmed!',
      description: `${workersToAssign.length} worker(s) have been assigned to the job.`,
    });
    router.push('/dashboard/panchayat/job-status');
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

  const WorkerCard = ({ profile, isSelected, onSelect }: { profile: WorkerProfile, isSelected: boolean, onSelect: (id: string) => void }) => (
      <Card 
        key={profile.id}
        className={`cursor-pointer transition-all ${isSelected ? 'border-primary ring-2 ring-primary' : 'hover:shadow-md'}`}
        onClick={() => onSelect(profile.id)}
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

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
            <div className="flex items-center gap-4">
                <UserPlus className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight">Hire Talent</h1>
            </div>
            <p className="text-muted-foreground mt-2">Select profiles to hire for a job.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
                <div className="lg:col-span-1 space-y-2">
                    <Label htmlFor="search-input">Search by Name</Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                          id="search-input" 
                          placeholder="Name..." 
                          className="pl-10" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Skill</Label>
                    <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by skill" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Skills</SelectItem>
                        <SelectItem value="cooking">Cooking</SelectItem>
                        <SelectItem value="farming">Farming</SelectItem>
                        <SelectItem value="tailoring">Tailoring</SelectItem>
                        <SelectItem value="cleaning">Cleaning</SelectItem>
                        <SelectItem value="herding">Herding</SelectItem>
                        <SelectItem value="child-care">Child Care</SelectItem>
                        <SelectItem value="handicrafts">Handicrafts</SelectItem>
                        <SelectItem value="painting">Painting</SelectItem>
                        <SelectItem value="embroidery">Embroidery</SelectItem>
                        <SelectItem value="driving">Driving</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Job</Label>
                    <Select value={selectedJob} onValueChange={setSelectedJob}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a job to assign" />
                        </SelectTrigger>
                        <SelectContent>
                            {mockJobs.slice(0, 5).map(job => (
                                <SelectItem key={job.id} value={job.id}>
                                    {job.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                 <Button onClick={handleSearch}>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                </Button>
            </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="available">Available Workers ({availableWorkers.length})</TabsTrigger>
            <TabsTrigger value="assigned">Assigned to Current Job ({assignedWorkers.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="available" className="mt-6">
          {availableWorkers.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {availableWorkers.map((profile) => (
                 <WorkerCard 
                   key={profile.id}
                   profile={profile}
                   isSelected={selectedWorkers.includes(profile.id)}
                   onSelect={handleSelectWorker}
                 />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground bg-muted/50 rounded-lg">
                <h3 className="text-xl font-semibold">No Available Workers</h3>
                <p className="mt-2">Try adjusting your search filters or check back later.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="assigned" className="mt-6">
           {assignedWorkers.length > 0 ? (
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {assignedWorkers.map((profile) => (
                    <Card key={profile.id}>
                        <CardHeader>
                           <div className="flex justify-between items-start">
                              <CardTitle>{profile.name}</CardTitle>
                              <UserCheck className="h-6 w-6 text-green-600" />
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
                                <span className="font-medium text-muted-foreground">Rating:</span>
                                <div className="flex items-center gap-1">
                                  {renderStars(profile.rating)}
                                   <span className="font-semibold">{profile.rating.toFixed(1)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
           ) : (
             <div className="text-center py-16 text-muted-foreground bg-muted/50 rounded-lg">
                <h3 className="text-xl font-semibold">No Workers Assigned Yet</h3>
                <p className="mt-2">Select workers from the 'Available' tab and confirm to assign them.</p>
            </div>
           )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
