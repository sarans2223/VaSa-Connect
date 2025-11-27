
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
import { Search, UserPlus, Star, CheckSquare, Square, MapPin } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import type { Job } from '@/lib/types';
import { mockJobs } from '@/lib/data'; // Keep for fallback if needed

const allProfiles = [
  { id: '1', name: 'Lakshmi Priya', skills: ['Cooking', 'Tailoring'], rating: 4.5, jobsCompleted: 2, job: 'Catering Project', location: 'Chennai' },
  { id: '2', name: 'Kavita Devi', skills: ['Farming'], rating: 4.2, jobsCompleted: 2, job: 'Harvesting', location: 'Coimbatore' },
  { id: '3', name: 'Meena Kumari', skills: ['Herding', 'Farming'], rating: 4.8, jobsCompleted: 3, job: 'Livestock Management', location: 'Madurai' },
  { id: '4', name: 'Anjali Sharma', skills: ['Cleaning'], rating: 3.9, jobsCompleted: 1, job: 'Office Cleaning', location: 'Tiruchirappalli' },
  { id: '5', name: 'Sita Rai', skills: ['Child Care', 'Cooking'], rating: 4.0, jobsCompleted: 0, job: 'Nanny Position', location: 'Salem' },
  { id: '6', name: 'Rina Das', skills: ['Handicrafts', 'Painting'], rating: 4.9, jobsCompleted: 5, job: 'Artisan Fair', location: 'Erode' },
  { id: '7', name: 'Sunita Devi', skills: ['Tailoring', 'Embroidery'], rating: 4.1, jobsCompleted: 0, job: 'Boutique Assistant', location: 'Tirunelveli' },
  { id: '8', name: 'Pooja Singh', skills: ['Driving'], rating: 4.3, jobsCompleted: 0, job: 'Delivery Driver', location: 'Vellore' },
];


type WorkerProfile = typeof allProfiles[0];


export default function AssignWorkerPage() {
  const [allWorkers] = useState<WorkerProfile[]>(allProfiles);
  const [availableWorkers, setAvailableWorkers] = useState<WorkerProfile[]>([]);
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [jobs, setJobs] = useState<Job[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setAvailableWorkers(allWorkers);
    try {
        const storedJobs = localStorage.getItem('postedJobs');
        if (storedJobs) {
            setJobs(JSON.parse(storedJobs));
        } else {
            setJobs(mockJobs); // Fallback if nothing in localStorage
        }
    } catch (error) {
        console.error("Failed to load jobs from local storage, using mock jobs.", error);
        setJobs(mockJobs);
    }
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
     if (selectedLocation !== 'all') {
        filtered = filtered.filter(worker => 
            worker.location.toLowerCase() === selectedLocation.toLowerCase()
        );
    }

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
    
    // In a real app, this would be an API call. Here we simulate it.
    console.log('Assigning workers:', workersToAssign.map(w => w.name), 'to job ID:', selectedJob);

    toast({
      title: 'Assignment Confirmed!',
      description: `${workersToAssign.length} worker(s) have been assigned to the job. This is a demo; no data was persisted.`,
    });
    // For demo purposes, we don't redirect or change job status here as it's complex with mock data.
    setSelectedJob('');
    setSelectedWorkers([]);
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
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
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

  const assignableJobs = jobs.filter(job => !job.status || job.status === 'Yet To Assign');

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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 items-end">
                <div className="space-y-2">
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
                    <Label>Location (TN)</Label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="Ariyalur">Ariyalur</SelectItem>
                        <SelectItem value="Chengalpattu">Chengalpattu</SelectItem>
                        <SelectItem value="Chennai">Chennai</SelectItem>
                        <SelectItem value="Coimbatore">Coimbatore</SelectItem>
                        <SelectItem value="Cuddalore">Cuddalore</SelectItem>
                        <SelectItem value="Dharmapuri">Dharmapuri</SelectItem>
                        <SelectItem value="Dindigul">Dindigul</SelectItem>
                        <SelectItem value="Erode">Erode</SelectItem>
                        <SelectItem value="Kallakurichi">Kallakurichi</SelectItem>
                        <SelectItem value="Kanchipuram">Kanchipuram</SelectItem>
                        <SelectItem value="Kanyakumari">Kanyakumari</SelectItem>
                        <SelectItem value="Karur">Karur</SelectItem>
                        <SelectItem value="Krishnagiri">Krishnagiri</SelectItem>
                        <SelectItem value="Madurai">Madurai</SelectItem>
                        <SelectItem value="Mayiladuthurai">Mayiladuthurai</SelectItem>
                        <SelectItem value="Nagapattinam">Nagapattinam</SelectItem>
                        <SelectItem value="Namakkal">Namakkal</SelectItem>
                        <SelectItem value="Nilgiris">Nilgiris</SelectItem>
                        <SelectItem value="Perambalur">Perambalur</SelectItem>
                        <SelectItem value="Pudukkottai">Pudukkottai</SelectItem>
                        <SelectItem value="Ramanathapuram">Ramanathapuram</SelectItem>
                        <SelectItem value="Ranipet">Ranipet</SelectItem>
                        <SelectItem value="Salem">Salem</SelectItem>
                        <SelectItem value="Sivaganga">Sivaganga</SelectItem>
                        <SelectItem value="Tenkasi">Tenkasi</SelectItem>
                        <SelectItem value="Thanjavur">Thanjavur</SelectItem>
                        <SelectItem value="Theni">Theni</SelectItem>
                        <SelectItem value="Thoothukudi">Thoothukudi</SelectItem>
                        <SelectItem value="Tiruchirappalli">Tiruchirappalli</SelectItem>
                        <SelectItem value="Tirunelveli">Tirunelveli</SelectItem>
                        <SelectItem value="Tirupathur">Tirupathur</SelectItem>
                        <SelectItem value="Tiruppur">Tiruppur</SelectItem>
                        <SelectItem value="Tiruvallur">Tiruvallur</SelectItem>
                        <SelectItem value="Tiruvannamalai">Tiruvannamalai</SelectItem>
                        <SelectItem value="Tiruvarur">Tiruvarur</SelectItem>
                        <SelectItem value="Vellore">Vellore</SelectItem>
                        <SelectItem value="Viluppuram">Viluppuram</SelectItem>
                        <SelectItem value="Virudhunagar">Virudhunagar</SelectItem>
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
                            {assignableJobs.length > 0 ? (
                                assignableJobs.map(job => (
                                    <SelectItem key={job.id} value={job.id}>
                                        {job.title}
                                    </SelectItem>
                                ))
                            ) : (
                                <SelectItem value="no-jobs" disabled>No available jobs to assign</SelectItem>
                            )}
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

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Available Workers ({availableWorkers.length})</h2>
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
      </div>

      {selectedWorkers.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t">
          <div className="container mx-auto flex justify-between items-center">
            <p className="font-semibold">{selectedWorkers.length} worker(s) selected.</p>
            <Button size="lg" onClick={handleConfirmAssignment}>Confirm Assignment</Button>
          </div>
        </div>
      )}
    </div>
  );
}

    