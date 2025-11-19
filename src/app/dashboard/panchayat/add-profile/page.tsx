import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus } from "lucide-react";

export default function AddProfilePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-4 mb-8">
        <UserPlus className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Add Profile</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>New Job Seeker Details</CardTitle>
          <CardDescription>
            Fill out the form to register a new person from your panchayat.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="mobile-no">Mobile No</Label>
                <Input id="mobile-no" type="tel" placeholder="Enter mobile number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Job Seeker Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="aadhaar-id">Aadhaar ID</Label>
                <Input id="aadhaar-id" placeholder="Enter 12-digit Aadhaar ID" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Textarea id="skills" placeholder="e.g., Tailoring, Driving, Cooking (comma-separated)" />
              <p className="text-xs text-muted-foreground">Enter skills separated by commas.</p>
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="lg" className="bg-gradient-to-r from-[#E0BBE4] to-[#957DAD] hover:opacity-90 text-primary-foreground">
                Create Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
