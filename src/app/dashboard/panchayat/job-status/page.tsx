import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, CheckCircle } from "lucide-react";


const mockJobs = [
    { id: '1', name: 'Farm Harvesting', workerNames: ['Gita Devi', 'Priya'], status: 'Worker Assigned' },
    { id: '2', name: 'Washing', workerNames: [], status: 'Yet To Assign' },
    { id: '3', name: 'Herder', workerNames: ['Meena Kumari'], status: 'Completed' },
];

const statusColors = {
    'Completed': 'bg-green-100 text-green-800 border-green-200',
    'Worker Assigned': 'bg-blue-100 text-blue-800 border-blue-200',
    'Yet To Assign': 'bg-yellow-100 text-yellow-800 border-yellow-200',
}

export default function JobStatusPage() {
  const statusOrder = {
    'Yet To Assign': 1,
    'Worker Assigned': 2,
    'Completed': 3,
  };

  const sortedJobs = mockJobs.sort((a, b) => statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder]);
  
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex items-center gap-4">
        <BarChart className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Job Current Status</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedJobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{job.name}</CardTitle>
                  <Badge className={statusColors[job.status as keyof typeof statusColors]}>
                      {job.status}
                  </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Assigned Workers</h4>
                    {job.workerNames.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {job.workerNames.map(name => <Badge key={name} variant="secondary">{name}</Badge>)}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No workers assigned yet.</p>
                    )}
                </div>
            </CardContent>
            <CardFooter className="gap-2">
                <Button variant="outline">View Details</Button>
                {job.status === 'Worker Assigned' && (
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark Completed
                    </Button>
                )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
