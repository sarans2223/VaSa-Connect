
'use client';

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Job } from '@/lib/types';
import { sampleJobs } from '@/lib/data';
import { format, isSameDay, parseISO, startOfDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

export default function SchedulePage() {
    const [scheduledJobs, setScheduledJobs] = useState<Job[]>([]);
    const [date, setDate] = useState<Date | undefined>(new Date());
    
    useEffect(() => {
        try {
            const storedJobs = localStorage.getItem('postedJobs');
            const parsedJobs: Job[] = storedJobs ? JSON.parse(storedJobs) : [];

            const combinedJobs = [...sampleJobs, ...parsedJobs].filter(
                (job, index, self) => index === self.findIndex((j) => j.id === job.id || j.title === job.title)
            );
            
            const confirmedAndDatedJobs = combinedJobs.filter(
                job => (job.status === 'Worker Assigned' || job.status === 'Completed') && job.date
            );

            setScheduledJobs(confirmedAndDatedJobs);
        } catch (error) {
            console.error("Failed to load jobs from local storage:", error);
            setScheduledJobs([]);
        }
    }, []);

    const getJobDate = (job: Job): Date | null => {
        if (!job.date) return null;
        try {
            // Handles 'yyyy-MM-dd' or full ISO strings
            return startOfDay(parseISO(job.date));
        } catch (e) {
            // Fallback for other formats like 'MMMM d, yyyy'
            const parsed = new Date(job.date);
            return isNaN(parsed.getTime()) ? null : startOfDay(parsed);
        }
    };
    
    const scheduledDates = scheduledJobs.map(getJobDate).filter((d): d is Date => d !== null);

    const jobsForSelectedDate = date 
        ? scheduledJobs.filter(job => {
            const jobDate = getJobDate(job);
            return jobDate && isSameDay(jobDate, date);
          })
        : [];

    const JobEventCard = ({ job }: { job: Job }) => {
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
                <CalendarIcon className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight">My Schedule</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl">
                Here's a look at your job assignments. Select a date to see the details.
            </p>

            <Card className="lg:grid lg:grid-cols-3 lg:gap-4">
                <div className="p-4 lg:col-span-2 flex justify-center">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        modifiers={{ scheduled: scheduledDates }}
                        modifiersClassNames={{ scheduled: 'bg-primary/20 rounded-full' }}
                    />
                </div>
                <div className="p-4 border-t lg:border-t-0 lg:border-l lg:col-span-1">
                    <h2 className="text-lg font-semibold mb-4">
                        Jobs for {date ? format(date, 'E, d MMM yyyy') : 'the selected date'}
                    </h2>
                    {jobsForSelectedDate.length > 0 ? (
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                            {jobsForSelectedDate.map(job => (
                                <JobEventCard key={job.id} job={job} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-muted-foreground">
                            <p>No jobs scheduled for this day.</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
