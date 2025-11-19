
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, UserPlus, Users, Briefcase, BarChart } from 'lucide-react';

const panchayatName = 'Gram Panchayat of Exampleville';
const panchayatId = 'GP-EXMPL-001';

const dashboardItems = [
  {
    title: 'Add Profiles',
    description: 'Register new job seekers in your panchayat.',
    href: '/dashboard/panchayat/add-profile',
    icon: UserPlus,
    count: 120, // Example count
    countLabel: 'Profiles',
  },
  {
    title: 'Profiles Already Added',
    description: 'View and manage all registered profiles.',
    href: '/dashboard/panchayat/profiles',
    icon: Users,
    count: 120, // Example count
    countLabel: 'Total Profiles',
  },
  {
    title: 'Job Post & Match',
    description: 'Create new job opportunities and match them to profiles.',
    href: '/dashboard/panchayat/post-job',
    icon: Briefcase,
    count: 15, // Example count
    countLabel: 'Open Jobs',
  },
  {
    title: 'Job Current Status',
    description: 'Track the status of all posted jobs.',
    href: '/dashboard/panchayat/job-status',
    icon: BarChart,
    count: 45, // Example count
    countLabel: 'Jobs Assigned',
  },
];

export default function PanchayatDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            {panchayatName}
          </h1>
          <p className="text-muted-foreground">Panchayat ID: {panchayatId}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {dashboardItems.map((item) => (
          <Card
            key={item.href}
            className="flex flex-col transition-all hover:shadow-lg"
          >
            <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
              <item.icon className="h-8 w-8 text-accent" />
              <div className='flex-1'>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="pt-1">{item.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end">
                <div className="mt-4">
                     <div className="text-3xl font-bold">{item.count}</div>
                     <p className="text-xs text-muted-foreground">{item.countLabel}</p>
                </div>
              <Button asChild className="w-full mt-4 bg-gradient-to-r from-[#E0BBE4] to-[#957DAD] hover:opacity-90 text-primary-foreground">
                <Link href={item.href}>
                  Go to {item.title}
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
