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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserSearch, Upload, Users } from "lucide-react";

export default function PostJobPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-4 mb-8">
        <UserSearch className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Hire Talent</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            Fill out the form below to post a new job opportunity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" placeholder="e.g., Senior Frontend Developer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name (Optional)</Label>
                <Input id="company-name" placeholder="e.g., Innovate Inc." />
              </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="logo">Company Logo (Optional)</Label>
                <div className="flex items-center gap-4">
                    <Button variant="outline" asChild>
                       <label htmlFor="logo-upload" className="cursor-pointer">
                         <Upload className="mr-2 h-4 w-4" />
                         Upload Logo
                       </label>
                    </Button>
                    <Input id="logo-upload" type="file" className="hidden" />
                    <span className="text-sm text-muted-foreground">PNG, JPG up to 5MB</span>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g., New York, NY or Remote" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="job-type">Job Type</Label>
                    <Select>
                        <SelectTrigger id="job-type">
                            <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="salary">Salary Range (Optional)</Label>
                    <Input id="salary" placeholder="e.g., $120,000 - $150,000" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" placeholder="e.g., Technology" />
                </div>
            </div>

             <div className="space-y-2">
                <Label htmlFor="num-workers">Number of Workers Needed</Label>
                <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="num-workers" type="number" placeholder="e.g., 5" className="pl-10" />
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of the job role, responsibilities, and qualifications."
                className="min-h-[150px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="skills">Skills Required</Label>
              <Input id="skills" placeholder="e.g., React, TypeScript, Figma (comma-separated)" />
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="lg" className="bg-gradient-to-r from-[#E0BBE4] to-[#957DAD] hover:opacity-90 text-primary-foreground">
                Post Job
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
