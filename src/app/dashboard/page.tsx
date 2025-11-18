import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, UserCircle, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockUser } from "@/lib/data";
import { SosButton } from "@/components/sos-button";

const featureCards = [
  {
    title: "Find Your Next Job",
    description: "Search and apply for jobs that match your skills and preferences.",
    href: "/dashboard/jobs",
    icon: Briefcase,
    cta: "Search Jobs",
  },
  {
    title: "Grow Your Skills",
    description: "Access learning modules to enhance your knowledge and career.",
    href: "/dashboard/learning",
    icon: BookOpen,
    cta: "Start Learning",
  },
  {
    title: "Build Your Team",
    description: "Create or join a team to collaborate and grow together.",
    href: "/dashboard/teams",
    icon: Users,
    cta: "Manage Teams",
  },
  {
    title: "Complete Your Profile",
    description: "A strong profile helps you stand out to employers and collaborators.",
    href: "/dashboard/profile",
    icon: UserCircle,
    cta: "View Profile",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {mockUser.name.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s your central hub for safety, growth, and opportunity.
        </p>
      </div>

      <Card className="bg-destructive/5 border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Immediate Assistance</CardTitle>
          <CardDescription>
            If you are in danger, press the SOS button for immediate help.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SosButton />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {featureCards.map((card) => (
          <Card
            key={card.title}
            className="flex flex-col transition-all hover:shadow-lg"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <card.icon className="h-10 w-10 text-accent" />
              <div className="space-y-1">
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button asChild className="w-full sm:w-auto bg-gradient-to-r from-[#E0BBE4] to-[#957DAD] hover:opacity-90 text-primary-foreground">
                <Link href={card.href}>
                  {card.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
