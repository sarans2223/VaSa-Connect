
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
              <Select>
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <SelectValue placeholder="Location" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="mumbai">Mumbai, MH</SelectItem>
                    <SelectItem value="pune">Pune, MH</SelectItem>
                    <SelectItem value="nagpur">Nagpur, MH</SelectItem>
                    <SelectItem value="bangalore">Bangalore, KA</SelectItem>
                    <SelectItem value="mysuru">Mysuru, KA</SelectItem>
                    <SelectItem value="mangaluru">Mangaluru, KA</SelectItem>
                    <SelectItem value="gurgaon">Gurgaon, HR</SelectItem>
                    <SelectItem value="faridabad">Faridabad, HR</SelectItem>
                    <SelectItem value="delhi">Delhi, NCR</SelectItem>
                    <SelectItem value="jaipur">Jaipur, RJ</SelectItem>
                    <SelectItem value="chennai">Chennai, TN</SelectItem>
                    <SelectItem value="coimbatore">Coimbatore, TN</SelectItem>
                    <SelectItem value="madurai">Madurai, TN</SelectItem>
                    <SelectItem value="tiruchirappalli">Tiruchirappalli, TN</SelectItem>
                    <SelectItem value="salem">Salem, TN</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
              </Select>
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
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="home-services">Home Services</SelectItem>
                  <SelectItem value="domestic-services">Domestic Services</SelectItem>
                  <SelectItem value="child-care">Child Care</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="art-craft">Art & Craft</SelectItem>
                  <SelectItem value="catering">Catering</SelectItem>
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
