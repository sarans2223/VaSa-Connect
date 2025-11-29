
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { mockUser, sampleJobs } from '@/lib/data';
import type { User, Job } from '@/lib/types';
import { Wallet, Star, Gift, Banknote, Landmark, CreditCard, KeyRound, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const rewardTiers = [
  { name: 'Book a Cleaner (4 hours)', points: 500, icon: '🧼' },
  { name: 'Book a Cook (One Meal)', points: 700, icon: '🍲' },
  { name: 'Book a Tailor (Minor Alterations)', points: 800, icon: '🧵' },
  { name: 'Full Day Event Help', points: 1500, icon: '🎉' },
];

// This would be securely stored and checked on a backend in a real app
const FIXED_VASA_PAY_PIN = '1234';

export default function VasaWalletPage() {
  const [user, setUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [pin, setPin] = useState('');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const { toast } = useToast();

  const [redeemLocation, setRedeemLocation] = useState('');
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [selectedReward, setSelectedReward] = useState<{points: number, name: string} | null>(null);
  const [isRedeemDialogOpen, setIsRedeemDialogOpen] = useState(false);
  
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedJobs = localStorage.getItem('postedJobs');
      setUser(storedUser ? JSON.parse(storedUser) : mockUser);
      setJobs(storedJobs ? JSON.parse(storedJobs) : sampleJobs);
    } catch (error) {
      console.error('Failed to load data from storage', error);
      setUser(mockUser);
      setJobs(sampleJobs);
    }
  }, []);

  const handleMakePayment = () => {
    const jobToPay = jobs.find(j => j.id === selectedJob);

    if (!jobToPay || !jobToPay.pay || !user || user.walletBalance === undefined) {
      toast({ title: 'Error', description: 'Invalid job selection or data.', variant: 'destructive' });
      return;
    }
    if (pin !== FIXED_VASA_PAY_PIN) {
      toast({ title: 'Incorrect PIN', description: 'The Vasa Pay PIN is incorrect.', variant: 'destructive' });
      return;
    }
    if (user.walletBalance < jobToPay.pay) {
      toast({ title: 'Insufficient Balance', description: 'Your wallet balance is too low to make this payment.', variant: 'destructive' });
      return;
    }

    const newBalance = user.walletBalance - jobToPay.pay;
    const tokensEarned = Math.floor(jobToPay.pay / 100) * 10;
    const newTokens = (user.vasaPinkTokens || 0) + tokensEarned;

    const updatedUser = { ...user, walletBalance: newBalance, vasaPinkTokens: newTokens };
    const updatedJobs = jobs.map(j => j.id === selectedJob ? { ...j, status: 'Paid' as const } : j);
    
    setUser(updatedUser);
    setJobs(updatedJobs);
    try {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        localStorage.setItem('postedJobs', JSON.stringify(updatedJobs));
    } catch (e) {
        console.error("could not update localstorage", e)
    }

    toast({
      title: 'Payment Successful!',
      description: `You paid ₹${jobToPay.pay.toLocaleString()} to ${jobToPay.workerNames?.[0] || 'the worker'}. You earned ${tokensEarned} VaSa Pink Tokens.`,
    });

    setIsPaymentDialogOpen(false);
    setSelectedJob('');
    setPin('');
  };
  
  const handleOpenRedeemDialog = (points: number, name: string) => {
    setSelectedReward({ points, name });
    setIsRedeemDialogOpen(true);
  };

  const handleConfirmRedemption = () => {
    if(!selectedReward) return;

    if (!redeemLocation || !fromDate || !fromTime) {
      toast({
        title: 'Missing Information',
        description: 'Please provide location, date, and time for the service.',
        variant: 'destructive',
      });
      return;
    }

     if ((user?.vasaPinkTokens || 0) < selectedReward.points) {
      toast({
        title: 'Not Enough Tokens',
        description: `You do not have enough tokens to redeem this.`,
        variant: 'destructive',
      });
      return;
    }
    
    const newTokens = (user?.vasaPinkTokens || 0) - selectedReward.points;
    const updatedUser = { ...user!, vasaPinkTokens: newTokens };
    setUser(updatedUser);
    try {
        localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch(e) {
        console.error(e)
    }


    toast({
      title: 'Reward Redeemed!',
      description: `You have successfully booked "${selectedReward.name}". The service provider will be confirmed shortly.`,
    });

    // Reset redemption form
    setIsRedeemDialogOpen(false);
    setSelectedReward(null);
    setRedeemLocation('');
    setFromDate(undefined);
    setToDate(undefined);
    setFromTime('');
    setToTime('');
  };


  const nextReward = rewardTiers.find(tier => tier.points > (user?.vasaPinkTokens || 0));
  const progressPercentage = nextReward
    ? ((user?.vasaPinkTokens || 0) / nextReward.points) * 100
    : 100;
    
  const payableJobs = jobs.filter(job => job.status === 'Worker Assigned' && job.pay);

  const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? '00' : '30';
    const formattedHours = hours.toString().padStart(2, '0');
    return `${formattedHours}:${minutes}`;
  });

  const getToTimeOptions = () => {
    if (!fromTime) return timeOptions;
    const fromIndex = timeOptions.indexOf(fromTime);
    return timeOptions.slice(fromIndex + 1);
  };
  const toTimeOptions = getToTimeOptions();

  if (!user) {
    return <div>Loading wallet...</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex items-center gap-4">
        <Wallet className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vasa Wallet</h1>
          <p className="text-muted-foreground">Your hub for payments, tokens, and rewards.</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Current Balance</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">₹{user.walletBalance?.toLocaleString() || '0'}</p>
                </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-primary/80 via-primary to-purple-500 text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star />
                  VaSa Pink Tokens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{user.vasaPinkTokens || 0}</p>
                <p className="text-xs opacity-80 mb-2">Tokens earned</p>
                <Progress value={progressPercentage} className="h-2 bg-primary-foreground/20 [&>div]:bg-primary-foreground" />
                <div className="text-xs mt-1 opacity-90">
                  {nextReward ? (
                    <span>
                      {nextReward.points - (user.vasaPinkTokens || 0)} to next reward: {nextReward.name}
                    </span>
                  ) : (
                    <span>Congratulations! You've unlocked all current rewards.</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Make a Payment</CardTitle>
              <CardDescription>Pay for a completed job and earn tokens.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="job-select">Select a Job to Pay</Label>
                     <Select value={selectedJob} onValueChange={setSelectedJob}>
                        <SelectTrigger id="job-select">
                            <SelectValue placeholder="Choose a job..." />
                        </SelectTrigger>
                        <SelectContent>
                            {payableJobs.length > 0 ? (
                                payableJobs.map(job => (
                                    <SelectItem key={job.id} value={job.id}>
                                        {job.title} - ₹{job.pay?.toLocaleString()} ({job.workerNames?.join(', ') || 'N/A'})
                                    </SelectItem>
                                ))
                            ) : (
                                <SelectItem value="no-jobs" disabled>No pending payments</SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                </div>
                <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className="w-full bg-gradient-to-r from-[#E0BBE4] to-[#957DAD] hover:opacity-90 text-primary-foreground"
                            disabled={!selectedJob}
                        >
                            Make Payment
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Payment</DialogTitle>
                            <DialogDescription>
                                Enter your 4-digit Vasa Pay PIN to authorize this transaction.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">You are paying</p>
                                <p className="text-3xl font-bold">₹{jobs.find(j => j.id === selectedJob)?.pay?.toLocaleString()}</p>
                                <p className="text-sm text-muted-foreground">for "{jobs.find(j => j.id === selectedJob)?.title}"</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pin-input">Vasa Pay PIN</Label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="pin-input"
                                        type="password"
                                        maxLength={4}
                                        className="pl-10 text-center tracking-[0.5em]"
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleMakePayment}>Confirm & Pay</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
          <Card>
             <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift />
                Redeem Your Tokens
              </CardTitle>
              <CardDescription>
                Use your tokens to book a free service.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {rewardTiers.map(tier => (
                <div key={tier.name} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-semibold">{tier.icon} {tier.name}</p>
                    <p className="text-sm text-muted-foreground">{tier.points} Tokens</p>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleOpenRedeemDialog(tier.points, tier.name)}
                    disabled={(user.vasaPinkTokens || 0) < tier.points}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                  >
                    Redeem
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle>Add Funds</CardTitle>
                <CardDescription>Top up your wallet balance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="amount">Amount to Add</Label>
                    <Input id="amount" type="number" placeholder="e.g., 500" />
                </div>
                <div className="space-y-3">
                    <Button className="w-full justify-start gap-3" variant="outline"><CreditCard /> Credit/Debit Card</Button>
                    <Button className="w-full justify-start gap-3" variant="outline"><Landmark /> Bank Transfer</Button>
                    <Button className="w-full justify-start gap-3" variant="outline"><Banknote /> UPI / QR Code</Button>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
        <Dialog open={isRedeemDialogOpen} onOpenChange={setIsRedeemDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Book Your Reward</DialogTitle>
                    <DialogDescription>
                        Please provide the details for your redeemed service: "{selectedReward?.name}".
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                     <div className="space-y-2">
                        <Label htmlFor="redeem-location">Service Location</Label>
                        <Input id="redeem-location" placeholder="Enter address for the service" value={redeemLocation} onChange={(e) => setRedeemLocation(e.target.value)} />
                    </div>
                     <div className="grid sm:grid-cols-2 gap-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="from-date">From Date</Label>
                                <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={'outline'}
                                    className={cn(
                                        'w-full justify-start text-left font-normal',
                                        !fromDate && 'text-muted-foreground'
                                    )}
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {fromDate ? format(fromDate, 'PPP') : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                    mode="single"
                                    selected={fromDate}
                                    onSelect={setFromDate}
                                    initialFocus
                                    />
                                </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="from-time">From Time</Label>
                                <Select value={fromTime} onValueChange={setFromTime}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                    {timeOptions.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                                </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="to-date">To Date (Optional)</Label>
                                <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={'outline'}
                                    className={cn(
                                        'w-full justify-start text-left font-normal',
                                        !toDate && 'text-muted-foreground'
                                    )}
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {toDate ? format(toDate, 'PPP') : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                    mode="single"
                                    selected={toDate}
                                    onSelect={setToDate}
                                    disabled={fromDate ? { before: fromDate } : undefined}
                                    initialFocus
                                    />
                                </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="to-time">To Time (Optional)</Label>
                                <Select value={toTime} onValueChange={setToTime} disabled={!fromTime}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                    {toTimeOptions.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                                </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
                 <DialogFooter>
                    <Button variant="outline" onClick={() => setIsRedeemDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleConfirmRedemption}>Confirm Redemption</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    </div>
  );
}
