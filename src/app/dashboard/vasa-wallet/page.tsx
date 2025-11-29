
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { mockUser } from '@/lib/data';
import type { User } from '@/lib/types';
import { Wallet, Star, Gift, Banknote, Landmark, CreditCard } from 'lucide-react';

const rewardTiers = [
  { name: 'Book a Cleaner (4 hours)', points: 500, icon: '🧼' },
  { name: 'Book a Cook (One Meal)', points: 700, icon: '🍲' },
  { name: 'Book a Tailor (Minor Alterations)', points: 800, icon: '🧵' },
  { name: 'Full Day Event Help', points: 1500, icon: '🎉' },
];

export default function VasaWalletPage() {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : mockUser);
    } catch (error) {
      console.error('Failed to load user from storage', error);
      setUser(mockUser);
    }
  }, []);

  const handleRedeem = (points: number, name: string) => {
    if ((user?.vasaPinkTokens || 0) < points) {
      toast({
        title: 'Not Enough Tokens',
        description: `You need ${points} VaSa Pink Tokens to redeem this reward.`,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Reward Redeemed!',
        description: `You have successfully redeemed "${name}". We will contact you shortly.`,
      });
      // In a real app, you would deduct the points from the user's account
    }
  };

  const nextReward = rewardTiers.find(tier => tier.points > (user?.vasaPinkTokens || 0));
  const progressPercentage = nextReward
    ? ((user?.vasaPinkTokens || 0) / nextReward.points) * 100
    : 100;

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
          <Card className="bg-gradient-to-br from-primary/80 via-primary to-purple-500 text-primary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Star />
                Your VaSa Pink Tokens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold">{user.vasaPinkTokens || 0}</div>
              <p className="text-sm opacity-80 mb-4">Tokens earned</p>
              <Progress value={progressPercentage} className="h-3 bg-primary-foreground/20 [&>div]:bg-primary-foreground" />
              <div className="text-xs mt-2 opacity-90">
                {nextReward ? (
                  <span>
                    {nextReward.points - (user.vasaPinkTokens || 0)} tokens to your next reward: {nextReward.name}
                  </span>
                ) : (
                  <span>Congratulations! You've unlocked all current rewards.</span>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How to Earn & Redeem Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>1. Pay for Services</AccordionTrigger>
                  <AccordionContent>
                    Complete your payments to workers securely through the Vasa Wallet. Choose from multiple payment methods to add funds.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>2. Earn Tokens Automatically</AccordionTrigger>
                  <AccordionContent>
                    For every ₹100 spent on a successfully completed and paid job, you earn 10 VaSa Pink Tokens. The more you use Vasa, the more you earn!
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>3. Redeem for Free Services</AccordionTrigger>
                  <AccordionContent>
                    Once you've collected enough tokens, you can redeem them for free services. Choose a reward from the list, and VaSa will cover the payment to the worker on your behalf. It's our way of saying thank you!
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
                    onClick={() => handleRedeem(tier.points, tier.name)}
                    disabled={(user.vasaPinkTokens || 0) < tier.points}
                  >
                    Redeem
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle>Payment Options</CardTitle>
                <CardDescription>Add funds to your Vasa Wallet.</CardDescription>
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
            <CardFooter>
                <Button className="w-full bg-gradient-to-r from-[#E0BBE4] to-[#957DAD] hover:opacity-90 text-primary-foreground">Add Funds</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
