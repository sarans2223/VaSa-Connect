
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Sparkles,
  ShieldCheck,
  Award,
  HeartHandshake,
  TrendingUp,
  Gift,
  Zap,
  CalendarDays,
  MapPin,
  Repeat,
  BadgeCheck,
  Crown
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';


const clientBenefits = [
  {
    icon: ShieldCheck,
    title: 'Job & Damage Insurance',
    description: "Book with confidence. In-app bookings are insured against damages.",
  },
  {
    icon: BadgeCheck,
    title: 'Verified & Guaranteed Workers',
    description: 'We stand by the quality and safety of our verified professionals.',
  },
  {
    icon: Gift,
    title: 'Earn VaSa Pink Tokens',
    description: 'Get reward tokens for every booking to redeem for exciting offers.',
  },
  {
    icon: Crown,
    title: 'Premium Member Discounts',
    description: 'Subscribed members enjoy exclusive discounts on all in-app rebookings.',
  },
];

const workerBenefits = [
  {
    icon: HeartHandshake,
    title: 'Insurance & Safety Support',
    description: 'Get access to insurance and our emergency support for every on-platform job.',
  },
  {
    icon: Award,
    title: 'Bonuses & Incentives',
    description: 'Earn bonuses for completing 10 bookings and get weekly performance incentives.',
  },
  {
    icon: TrendingUp,
    title: 'Higher Pay & Better Jobs',
    description: 'Improve your ranking with each job to unlock higher pay and premium customers.',
  },
  {
    icon: Zap,
    title: 'Guaranteed Job Consistency',
    description: 'Staying on the platform ensures a steady stream of verified job opportunities.',
  },
];

const pastWorkers = [
    { id: 'worker-1', name: 'Lakshmi Priya', job: 'Community Kitchen Chef', avatarUrl: 'https://picsum.photos/seed/user1/100/100' },
    { id: 'worker-2', name: 'Kavita Devi', job: 'Urgent Tailoring Work', avatarUrl: 'https://picsum.photos/seed/user2/100/100' },
    { id: 'worker-3', name: 'Meena Kumari', job: 'Farm Hand for Harvest', avatarUrl: 'https://picsum.photos/seed/user4/100/100' },
]

export default function RebookPage() {
    const { toast } = useToast();
    const [selectedWorker, setSelectedWorker] = useState<typeof pastWorkers[0] | null>(null);
    const [bookingDate, setBookingDate] = useState<Date>();
    const [bookingLocation, setBookingLocation] = useState('');
    const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

    const handleSelectWorker = (worker: typeof pastWorkers[0]) => {
        setSelectedWorker(worker);
    }
    
    const handleConfirmBooking = () => {
        if (!selectedWorker || !bookingDate || !bookingLocation) {
            toast({
                title: 'Missing Information',
                description: 'Please select a worker, date, and location to proceed.',
                variant: 'destructive',
            });
            return;
        }

        toast({
            title: 'Rebooking Confirmed!',
            description: `A request has been sent to ${selectedWorker.name} for ${format(bookingDate, 'PPP')} at ${bookingLocation}.`,
        });

        // Reset state
        setIsBookingDialogOpen(false);
        setSelectedWorker(null);
        setBookingDate(undefined);
        setBookingLocation('');
    }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="text-center">
        <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
            <Repeat className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Rebook Through VaSa</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
          When you rebook within our app, you unlock exclusive benefits and protections that aren't available for outside bookings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Sparkles className="text-primary" />
              Benefits as a Recruiter
            </CardTitle>
            <CardDescription>
              Booking through VaSa keeps you safe and rewarded.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {clientBenefits.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <item.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Award className="text-accent-foreground bg-accent p-1 rounded-full" />
              Benefits as a Worker
            </CardTitle>
            <CardDescription>
              You empower your worker with every in-app booking.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {workerBenefits.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <item.icon className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="text-center pt-4">
         <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="bg-gradient-to-r from-[#E0BBE4] to-[#957DAD] hover:opacity-90 text-primary-foreground">
                    <Repeat className="mr-2 h-4 w-4" />
                    Rebook a Previous Worker
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                 <DialogHeader>
                    <DialogTitle>Rebook a Worker</DialogTitle>
                    <DialogDescription>
                        Select a worker you've hired before to start a new booking.
                    </DialogDescription>
                </DialogHeader>

                {!selectedWorker ? (
                    // Worker selection view
                     <div className="space-y-4 py-4">
                        <h3 className="font-semibold">Your Past Workers</h3>
                        {pastWorkers.map(worker => (
                            <div key={worker.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={worker.avatarUrl} />
                                        <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{worker.name}</p>
                                        <p className="text-sm text-muted-foreground">{worker.job}</p>
                                    </div>
                                </div>
                                <Button variant="outline" onClick={() => handleSelectWorker(worker)}>Select</Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Date and location view
                     <div className="space-y-6 py-4">
                        <div className="flex items-center gap-4 p-3 rounded-lg bg-muted">
                            <Avatar>
                                <AvatarImage src={selectedWorker.avatarUrl} />
                                <AvatarFallback>{selectedWorker.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p>You are rebooking:</p>
                                <p className="font-semibold text-primary">{selectedWorker.name}</p>
                            </div>
                            <Button variant="link" size="sm" className="ml-auto" onClick={() => setSelectedWorker(null)}>Change</Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="booking-date">Select Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                        variant={'outline'}
                                        className={cn(
                                            'w-full justify-start text-left font-normal',
                                            !bookingDate && 'text-muted-foreground'
                                        )}
                                        >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {bookingDate ? format(bookingDate, 'PPP') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                        mode="single"
                                        selected={bookingDate}
                                        onSelect={setBookingDate}
                                        initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="booking-location">Location</Label>
                                 <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input 
                                        id="booking-location"
                                        placeholder="Enter service address"
                                        className="pl-10"
                                        value={bookingLocation}
                                        onChange={(e) => setBookingLocation(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
               
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleConfirmBooking} disabled={!selectedWorker}>
                        Confirm Rebooking
                    </Button>
                </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>

    </div>
  );
}
