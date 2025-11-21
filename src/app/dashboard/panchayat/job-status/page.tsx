
'use client';
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, CheckCircle, UserPlus, Trash2, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";


const initialJobs = [
    { id: '1', name: 'Farm Harvesting', workerNames: ['Gita Devi', 'Priya'], status: 'Worker Assigned' },
    { id: '2', name: 'Washing', workerNames: [], status: 'Yet To Assign' },
    { id: '3', name: 'Herder', workerNames: ['Meena Kumari'], status: 'Completed' },
    { id: '4', name: 'Community Hall Painting', workerNames: [], status: 'Yet To Assign' },
    { id: '5', name: 'School Lunch Preparation', workerNames: ['Sunita', 'Anjali'], status: 'Worker Assigned' },
    { id: '6', name: 'Roadside Cleanup', workerNames: ['Ramesh', 'Suresh'], status: 'Completed' },
    { id: '7', name: 'Village Fair Setup', workerNames: [], status: 'Yet To Assign' },
    { id: '8', name: 'Handicraft Stall Management', workerNames: ['Rina Das'], status: 'Worker Assigned' },
    { id: '9', name: 'Temple Cleaning', workerNames: ['Lalita', 'Sarita', 'Anita'], status: 'Completed' },
    { id: '10', name: 'Water Tank Maintenance', workerNames: [], status: 'Yet To Assign' },
    { id: '11', name: 'Local Market Stall Setup', workerNames: ['Kavita Devi'], status: 'Worker Assigned' },
    { id: '12', name: 'Papad Making', workerNames: ['Shanti', 'Kamla'], status: 'Completed' },
    { id: '13', name: 'Spice Grinding', workerNames: [], status: 'Yet To Assign' },
    { id: '14', name: 'Cattle Rearing', workerNames: ['Laxmi'], status: 'Worker Assigned' },
    { id: '15', name: 'Embroidery Work', workerNames: ['Sunita Devi'], status: 'Completed' },
    { id: '16', name: 'Driving for local transport', workerNames: ['Pooja Singh'], status: 'Worker Assigned' },
];

type JobStatus = 'Completed' | 'Worker Assigned' | 'Yet To Assign';

type Job = {
    id: string;
    name: string;
    workerNames: string[];
    status: JobStatus;
}

const statusColors: { [key in JobStatus]: string } = {
    'Completed': 'bg-green-100 text-green-800 border-green-200',
    'Worker Assigned': 'bg-blue-100 text-blue-800 border-blue-200',
    'Yet To Assign': 'bg-yellow-100 text-yellow-800 border-yellow-200',
}

export default function JobStatusPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { toast } = useToast();

  useEffect(() => {
      try {
        const storedJobs = localStorage.getItem('panchayatJobs');
        if (storedJobs) {
            setJobs(JSON.parse(storedJobs));
        } else {
            localStorage.setItem('panchayatJobs', JSON.stringify(initialJobs));
            setJobs(initialJobs);
        }
      } catch (error) {
          setJobs(initialJobs);
      }
  }, []);

  const handleMarkCompleted = (jobId: string, jobName: string) => {
      const updatedJobs = jobs.map(job => 
          job.id === jobId ? { ...job, status: 'Completed' as JobStatus } : job
      );
      setJobs(updatedJobs);
      localStorage.setItem('panchayatJobs', JSON.stringify(updatedJobs));
      toast({
          title: 'Job Status Updated',
          description: `"${jobName}" has been marked as completed.`
      });
  };

  const handleDeleteJob = (jobId: string, jobName: string) => {
    const updatedJobs = jobs.filter(job => job.id !== jobId);
    setJobs(updatedJobs);
    localStorage.setItem('panchayatJobs', JSON.stringify(updatedJobs));
    toast({
        title: 'Job Deleted',
        description: `The job "${jobName}" has been permanently deleted.`,
        variant: 'destructive',
    });
  };

  const statusOrder: { [key in JobStatus]: number } = {
    'Yet To Assign': 1,
    'Worker Assigned': 2,
    'Completed': 3,
  };

  const sortedJobs = [...jobs].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
  
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex items-center gap-4">
        <BarChart className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Job Current Status</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedJobs.map((job) => (
          <Card key={job.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{job.name}</CardTitle>
                  <Badge className={statusColors[job.status]}>
                      {job.status}
                  </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
                <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Assigned Workers</h4>
                    {job.workerNames.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {job.workerNames.map(name => <Badge key={name} variant="secondary">{name}</Badge>)}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No workers assigned yet.</p>
                    )}
                </div>
            </CardContent>
            <CardFooter className="gap-2 flex-wrap">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
                <Button asChild size="sm">
                    <Link href="/dashboard/panchayat/assign-worker">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Assign Workers
                    </Link>
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteJob(job.id, job.name)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Job
                </Button>
                 {job.status === 'Worker Assigned' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleMarkCompleted(job.id, job.name)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark Completed
                    </Button>
                )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
