
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Shield, PhoneOff, Calendar, CreditCard, Heart, MessageSquare, Phone, ArrowRight } from "lucide-react";

const benefits = [
  { icon: CheckCircle, title: "Verified & Trusted", description: "Every helper is background-checked for your safety." },
  { icon: Shield, title: "Job Insurance", description: "In-app bookings are covered by our satisfaction guarantee." },
  { icon: PhoneOff, title: "Masked Contact", description: "Your privacy is protected. Contact details are never shared." },
  { icon: Calendar, title: "Easy Rebooking", description: "Book your favorite helper again in just one tap." },
  { icon: CreditCard, title: "Cashless Payments", description: "Secure digital payments with receipts for every job." },
  { icon: Heart, title: "Supports Your Helper", description: "In-app booking helps your helper build their reputation and get more work." },
];

const howItWorksSteps = [
  { step: 1, title: "Book Securely", description: "Choose your helper and confirm the job with an in-app payment." },
  { step: 2, title: "Connect Safely", description: "Use in-app chat or a masked call to coordinate details before the job." },
  { step: 3, title: "Get Warranty", description: "Once the job is done, it's covered by our 24-hour service warranty." },
];

const faqs = [
    {
        question: "Can I contact my helper directly after the job?",
        answer: "No — VaSa hides direct contact details to protect both of you. Use the in-app chat or masked call for future bookings."
    },
    {
        question: "What if my helper asks for cash?",
        answer: "All VaSa protections apply only to in-app digital payments. Helpers who accept private cash may lose access to VaSa benefits."
    },
    {
        question: "Is my booking insured?",
        answer: "Yes — app-booked services include our job insurance and satisfaction guarantee for 24 hours after the job."
    }
];


export default function KeepBookingPage() {
    const mockHelper = {
        name: "Lakshmi Priya",
        avatarUrl: "https://picsum.photos/seed/user1/100/100",
        rating: 4.9,
        jobsCompleted: 28,
    };
  
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Rebook the same helper. Safer, insured, instant.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Loved the service from your last helper? Book them again with all the protections and convenience of the VaSa platform.
        </p>
         <div className="mt-8 flex justify-center items-center gap-4">
            <Avatar className="h-16 w-16">
                <AvatarImage src={mockHelper.avatarUrl} alt={mockHelper.name} data-ai-hint="woman portrait" />
                <AvatarFallback>{mockHelper.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-bold text-lg">{mockHelper.name}</p>
                <p className="text-sm text-muted-foreground">Rebooking is just one tap away.</p>
            </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-[#E0BBE4] to-[#957DAD] hover:opacity-90 text-primary-foreground">
            Rebook {mockHelper.name}
          </Button>
          <Button size="lg" variant="outline">
            See Plans
          </Button>
        </div>
      </section>

      {/* Warranty Banner */}
      <div className="p-4 rounded-lg bg-secondary border border-primary/20 text-center">
          <p className="font-semibold text-secondary-foreground">
              <Shield className="inline-block mr-2 h-5 w-5" />
              Bookings made through VaSa include background verification, damage protection and in-app dispute support. Private bookings are not covered.
          </p>
      </div>


      {/* Benefits Grid */}
      <section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex items-start gap-4">
              <benefit.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
       <section className="text-center">
         <h2 className="text-3xl font-bold mb-8">How It Works</h2>
         <div className="grid gap-8 md:grid-cols-3">
            {howItWorksSteps.map((step) => (
                <div key={step.step} className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl mb-4">
                        {step.step}
                    </div>
                    <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                </div>
            ))}
         </div>
       </section>

      {/* Rebooking & Contact Actions */}
      <Card>
        <CardHeader>
            <CardTitle>Ready to book again?</CardTitle>
            <CardDescription>Use our secure in-app tools to connect with {mockHelper.name}.</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
           <Button variant="secondary" className="h-12">
             <MessageSquare className="mr-2" />
             Message in-app
           </Button>
           <Button variant="secondary" className="h-12" title="Your phone number and the helper’s phone number are masked until booking is confirmed — this protects privacy and prevents direct offline deals.">
              <Phone className="mr-2" />
              Call (masked)
            </Button>
        </CardContent>
      </Card>
      
       {/* Subscription Plans */}
       <section>
           <h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
            <p className="text-center text-muted-foreground mb-8 -mt-4">Benefits apply only to in-app bookings.</p>
            <div className="grid gap-8 md:grid-cols-3 items-start">
                {/* Plans would be dynamically rendered here */}
                 <Card>
                    <CardHeader>
                        <CardTitle>One-time Booking</CardTitle>
                        <CardDescription>Pay per job</CardDescription>
                    </CardHeader>
                    <CardContent><Button className="w-full">Select</Button></CardContent>
                </Card>
                 <Card className="border-primary ring-2 ring-primary">
                    <CardHeader>
                        <CardTitle>Weekly Plan</CardTitle>
                        <CardDescription>One booking per week. Save 15%.</CardDescription>
                    </CardHeader>
                    <CardContent><Button className="w-full">Select</Button></CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Monthly Care Plan</CardTitle>
                        <CardDescription>Up to 5 bookings a month. Best value.</CardDescription>
                    </CardHeader>
                    <CardContent><Button className="w-full">Select</Button></CardContent>
                </Card>
            </div>
       </section>

        {/* FAQ */}
        <section>
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-lg">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base">
                           {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
        
        {/* Legal Snippet */}
        <div className="text-center text-xs text-muted-foreground">
            <p>By using VaSa for rebooking, you agree to our Terms of Service. Attempting to book or pay outside the VaSa platform may result in service limitations and loss of protections.</p>
        </div>

    </div>
  );
}
