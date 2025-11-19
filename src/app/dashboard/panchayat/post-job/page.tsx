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
import { Briefcase, Sparkles } from "lucide-react";

export default function PostJobAndMatchPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Briefcase className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Post a Job & Match Profiles</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>New Job Details</CardTitle>
          <CardDescription>
            Post a job to find suitable candidates from your panchayat.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="job-name">Job Name</Label>
              <Input id="job-name" placeholder="e.g., Farm Harvesting" />
            </div>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="workers-needed">No. of Workers Needed</Label>
                <Input id="workers-needed" type="number" placeholder="e.g., 10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., Village Center" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pay-scale">Pay Scale</Label>
                <Input id="pay-scale" placeholder="e.g., ₹400 per day" />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Button size="lg" className="bg-gradient-to-r from-[#D291BC] to-[#957DAD] hover:opacity-90 text-white">
                <Sparkles className="mr-2 h-5 w-5" />
                AI Profile Matching
              </Button>
              <Button type="submit" size="lg" className="bg-gradient-to-r from-[#E0BBE4] to-[#957DAD] hover:opacity-90 text-primary-foreground">
                Post Job & Match
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
