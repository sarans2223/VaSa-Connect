
'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import type { Job } from '@/lib/types';
import { sampleJobs } from '@/app/dashboard/assign-worker/page';
import { format, isFuture, isPast, parseISO, compareDesc, startOfDay } from 'date-fns';

export default function SchedulePage() {
    const [scheduledJobs, setScheduledJobs] = useState<Job[]>([]);
    
    useEffect(() => {
        try {
            const storedJobs = localStorage.getItem('postedJobs');
            const parsedJobs: Job[] = storedJobs ? JSON.parse(storedJobs) : [];

            // Combine with sample jobs and filter for scheduled ones
            const combinedJobs = [...sampleJobs, ...parsedJobs].filter(
                (job, index, self) => index === self.findIndex((j) => j.id === job.id || j.title === job.title)
            );
            
            const confirmedAndDatedJobs = combinedJobs.filter(
                job => (job.status === 'Worker Assigned' || job.status === 'Completed') && job.date
            );

            // Sort jobs by date
            const sortedJobs = confirmedAndDatedJobs.sort((a, b) => {
                if (a.date && b.date) {
                    try {
                        const dateA = parseISO(a.date);
                        const dateB = parseISO(b.date);
                        return compareDesc(dateA, dateB);
                    } catch(e) {
                         // Fallback for non-ISO dates
                         return new Date(b.date).getTime() - new Date(a.date).getTime();
                    }
                }
                return 0;
            });

            setScheduledJobs(sortedJobs);
        } catch (error) {
            console.error("Failed to load jobs from local storage:", error);
            setScheduledJobs([]);
        }
    }, []);

    const getJobDate = (job: Job): Date | null => {
        if (!job.date) return null;
        try {
            return startOfDay(parseISO(job.date));
        } catch (e) {
            const parsed = new Date(job.date);
            return isNaN(parsed.getTime()) ? null : startOfDay(parsed);
        }
    };

    const upcomingJobs = scheduledJobs.filter(job => {
        const jobDate = getJobDate(job);
        return jobDate && isFuture(jobDate);
    });

    const pastJobs = scheduledJobs.filter(job => {
        const jobDate = getJobDate(job);
        return jobDate && isPast(jobDate);
    });
    
    const JobEventCard = ({ job }: { job: Job }) => {
        const jobDate = getJobDate(job);

        return (
            <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <Badge variant={job.status === 'Completed' ? 'secondary' : 'default'} className={
                            job.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }>
                            {job.status}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.companyName}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                    </div>
                    {jobDate && (
                         <div className="flex items-center text-sm text-muted-foreground gap-2">
                            <Calendar className="h-4 w-4" />
                             <span>{format(jobDate, 'E, d MMM yyyy')}</span>
                        </div>
                    )}
                    {job.time && (
                         <div className="flex items-center text-sm text-muted-foreground gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{job.time}</span>
                        </div>
                    )}
                </CardContent>
            </Card>
        )
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8">
            <div className="flex items-center gap-4">
                <Calendar className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight">My Schedule</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl">
                Here's a look at your upcoming and past job assignments.
            </p>

            <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upcoming">Upcoming ({upcomingJobs.length})</TabsTrigger>
                    <TabsTrigger value="past">Past ({pastJobs.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="mt-6">
                    {upcomingJobs.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                           {upcomingJobs.map(job => <JobEventCard key={job.id} job={job} />)}
                        </div>
                    ) : (
                        <div className="text-center py-16 text-muted-foreground bg-muted/50 rounded-lg">
                            <h3 className="text-xl font-semibold">No Upcoming Jobs</h3>
                            <p className="mt-2">Your schedule is clear. Confirmed jobs will appear here.</p>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="past" className="mt-6">
                    {pastJobs.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                           {pastJobs.map(job => <JobEventCard key={job.id} job={job} />)}
                        </div>
                    ) : (
                         <div className="text-center py-16 text-muted-foreground bg-muted/50 rounded-lg">
                            <h3 className="text-xl font-semibold">No Past Jobs</h3>
                            <p className="mt-2">Your completed jobs will be shown here.</p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
