import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Gem, Award, Star, Bell, CheckCircle } from "lucide-react";

const premiumBenefits = [
    {
        icon: Award,
        title: "Skill Tests & Certification",
        description: "Prove your expertise by taking skill tests and earn official certificates upon passing.",
    },
    {
        icon: Star,
        title: "Premium Profile Badge",
        description: "Stand out to recruiters with a special badge on your profile, marking you as a top worker.",
    },
    {
        icon: Bell,
        title: "Priority Job Notifications",
        description: "Be the first to know about new job opportunities that match your profile.",
    },
    {
        icon: CheckCircle,
        title: "Enhanced Visibility",
        description: "Your profile will be highlighted and recommended to top recruiters in your domain.",
    }
]

export default function MembershipPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Gem className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Unlock Premium</h1>
      </div>

      <div className="flex justify-center">
        <Card className="max-w-2xl w-full shadow-2xl border-2 border-accent/50 bg-gradient-to-br from-card to-accent/5">
            <CardHeader className="text-center">
                <CardTitle className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500">
                    VaSa Premium
                </CardTitle>
                <CardDescription className="text-lg">
                    Accelerate your career and unlock exclusive benefits.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="text-center">
                    <p className="text-5xl font-bold">₹199<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                </div>
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-center">Your Premium Benefits:</h3>
                    <ul className="space-y-4">
                        {premiumBenefits.map(benefit => (
                            <li key={benefit.title} className="flex items-start gap-4">
                                <div className="flex-shrink-0 bg-accent/20 text-accent p-2 rounded-full">
                                    <benefit.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="font-semibold">{benefit.title}</p>
                                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
            <CardFooter>
                 <Button size="lg" className="w-full text-lg h-12 bg-gradient-to-r from-[#E0BBE4] to-[#957DAD] hover:opacity-90 text-primary-foreground shadow-lg">
                    Become a Premium Member
                 </Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
