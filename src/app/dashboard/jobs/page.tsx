import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockJobs } from "@/lib/data";
import { Briefcase, Search, MapPin } from "lucide-react";
import { JobCard } from "../components/job-card";
import { JobSearchClient } from "./components/job-search-client";
import { Separator } from "@/components/ui/separator";

export default function JobsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex items-center gap-4">
        <Briefcase className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Job Opportunities</h1>
      </div>

      <JobSearchClient />
      
      <Separator />

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">All Jobs</h2>
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search by title or skill..." className="pl-10" />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Location" className="pl-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="data">Data Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
