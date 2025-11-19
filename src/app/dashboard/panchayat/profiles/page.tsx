import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Users, Eye, Edit, Trash2 } from "lucide-react";

// Mock data for demonstration
const mockProfiles = [
  { id: '1', name: 'Gita Devi', jobsCompleted: 2, benefitedAmount: 5000, status: 'Good' },
  { id: '2', name: 'Suresh Kumar', jobsCompleted: 0, benefitedAmount: 0, status: 'Yet To Evaluate' },
  { id: '3', name: 'Meena Kumari', jobsCompleted: 5, benefitedAmount: 12000, status: 'Excellent' },
  { id: '4', name: 'Ravi Sharma', jobsCompleted: 1, benefitedAmount: 1500, status: 'Bad' },
];

const statusColors = {
    'Excellent': 'bg-green-100 text-green-800 border-green-200',
    'Good': 'bg-blue-100 text-blue-800 border-blue-200',
    'Bad': 'bg-red-100 text-red-800 border-red-200',
    'Yet To Evaluate': 'bg-yellow-100 text-yellow-800 border-yellow-200',
}

export default function ProfilesListPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex items-center gap-4">
        <Users className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Profiles Already Added</h1>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search by name or mobile..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="bad">Bad</SelectItem>
                <SelectItem value="yet-to-evaluate">Yet To Evaluate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockProfiles.map((profile) => (
          <Card key={profile.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <CardTitle>{profile.name}</CardTitle>
                  <Badge className={statusColors[profile.status as keyof typeof statusColors]}>
                      {profile.status}
                  </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                    <span className="font-medium text-muted-foreground">Jobs Completed:</span>
                    <span className="font-bold">{profile.jobsCompleted}</span>
                </div>
                 <div className="flex justify-between text-sm">
                    <span className="font-medium text-muted-foreground">Amount Benefited:</span>
                    <span className="font-bold">₹{profile.benefitedAmount.toLocaleString()}</span>
                </div>
            </CardContent>
            <CardFooter className="gap-2">
                <Button variant="outline" size="sm"><Eye className="mr-2 h-4 w-4"/>View</Button>
                <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4"/>Edit</Button>
                <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4"/>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
