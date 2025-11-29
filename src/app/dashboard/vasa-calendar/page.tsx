
'use client';

import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, MapPin, Clock, Repeat, CheckCircle, AlertCircle } from 'lucide-react';
import type { Job } from '@/lib/types';
import { sampleJobs } from '@/lib/data';
import { format, isSameDay, parseISO, getDay } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

type JobWithDate = Job & { jobDate: Date };

const statusStyles = {
  'Worker Assigned': 'bg-blue-100 text-blue-800',
  'Completed': 'bg-green-100 text-green-800',
  'Yet To Assign': 'bg-yellow-100 text-yellow-800',
};

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function VasaCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [jobs, setJobs] = useState<JobWithDate[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you'd fetch this data. For now, we'll use and process the mock data.
    const allJobs = sampleJobs;
    const jobsWithDates = allJobs
      .filter(job => job.date && (job.status === 'Worker Assigned' || job.status === 'Completed'))
      .map(job => ({
        ...job,
        jobDate: parseISO(job.date!),
      }));
    setJobs(jobsWithDates);
  }, []);
  
  const selectedDayJobs = date 
    ? jobs.filter(job => isSameDay(job.jobDate, date)) 
    : [];

  const handleWeeklyRecurrence = (job: Job) => {
    toast({
      title: 'Weekly Job Suggested!',
      description: `We've noted you might want "${job.title}" to be a weekly recurrence. This feature is coming soon!`,
    });
  };

  const dayHasJobs = (day: Date) => jobs.some(job => isSameDay(job.jobDate, day));

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex items-center gap-4">
        <CalendarIcon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Vasa Calendar</h1>
      </div>
      <p className="text-muted-foreground">
        View your assigned and completed jobs. Click a date to see details.
      </p>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardContent className="p-2">
                    <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="w-full"
                    components={{
                      DayContent: ({ date: calendarDate }) => {
                        const hasJobs = dayHasJobs(calendarDate);
                        return (
                          <div className="relative h-full w-full flex items-center justify-center">
                            <span>{format(calendarDate, 'd')}</span>
                            {hasJobs && (
                              <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-primary"></span>
                            )}
                          </div>
                        );
                      },
                    }}
                    />
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>
                Schedule for {date ? format(date, 'PPP') : '...'}
              </CardTitle>
               <CardDescription>
                {selectedDayJobs.length} assignment(s) found.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto">
              {selectedDayJobs.length > 0 ? (
                selectedDayJobs.map(job => (
                  <div key={job.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{job.title}</h4>
                        <Badge className={statusStyles[job.status!]}>
                           {job.status === 'Worker Assigned' && <AlertCircle className="mr-2 h-4 w-4" />}
                           {job.status === 'Completed' && <CheckCircle className="mr-2 h-4 w-4" />}
                           {job.status}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{job.companyName}</p>
                     <div className="text-sm text-muted-foreground flex items-center gap-2 border-t pt-3">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                    </div>
                     <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{job.time || 'All Day'}</span>
                    </div>

                    {/* Recurring job suggestion */}
                    {getDay(job.jobDate) === 5 && ( // 5 is for Friday
                      <div className="pt-3 border-t">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-start text-primary hover:text-primary h-auto p-2"
                          onClick={() => handleWeeklyRecurrence(job)}
                        >
                            <Repeat className="mr-2 h-4 w-4" />
                            <div>
                                <p>This job is on a Friday.</p>
                                <p className="font-semibold">Make it a weekly job?</p>
                            </div>
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <p>No jobs scheduled for this day.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
