

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
import { Button } from "@/components/ui/button";

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
          <CardContent className="p-4 space-y-4">
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
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="agra">Agra, UP</SelectItem>
                    <SelectItem value="ahmedabad">Ahmedabad, GJ</SelectItem>
                    <SelectItem value="aizawl">Aizawl, MZ</SelectItem>
                    <SelectItem value="agartala">Agartala, TR</SelectItem>
                    <SelectItem value="amritsar">Amritsar, PB</SelectItem>
                    <SelectItem value="bangalore">Bangalore, KA</SelectItem>
                    <SelectItem value="bhopal">Bhopal, MP</SelectItem>
                    <SelectItem value="bhubaneswar">Bhubaneswar, OD</SelectItem>
                    <SelectItem value="bilaspur">Bilaspur, CG</SelectItem>
                    <SelectItem value="chandigarh">Chandigarh, CH</SelectItem>
                    <SelectItem value="chennai">Chennai, TN</SelectItem>
                    <SelectItem value="coimbatore">Coimbatore, TN</SelectItem>
                    <SelectItem value="cuttack">Cuttack, OD</SelectItem>
                    <SelectItem value="darjeeling">Darjeeling, WB</SelectItem>
                    <SelectItem value="dehradun">Dehradun, UK</SelectItem>
                    <SelectItem value="delhi">Delhi, NCR</SelectItem>
                    <SelectItem value="dibrugarh">Dibrugarh, AS</SelectItem>
                    <SelectItem value="dimapur">Dimapur, NL</SelectItem>
                    <SelectItem value="faridabad">Faridabad, HR</SelectItem>
                    <SelectItem value="gangtok">Gangtok, SK</SelectItem>
                    <SelectItem value="gaya">Gaya, BR</SelectItem>
                    <SelectItem value="guntur">Guntur, AP</SelectItem>
                    <SelectItem value="gurgaon">Gurgaon, HR</SelectItem>
                    <SelectItem value="guwahati">Guwahati, AS</SelectItem>
                    <SelectItem value="haridwar">Haridwar, UK</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad, TG</SelectItem>
                    <SelectItem value="imphal">Imphal, MN</SelectItem>
                    <SelectItem value="indore">Indore, MP</SelectItem>
                    <SelectItem value="itanagar">Itanagar, AR</SelectItem>
                    <SelectItem value="jabalpur">Jabalpur, MP</SelectItem>
                    <SelectItem value="jaipur">Jaipur, RJ</SelectItem>
                    <SelectItem value="jamshedpur">Jamshedpur, JH</SelectItem>
                    <SelectItem value="jodhpur">Jodhpur, RJ</SelectItem>
                    <SelectItem value="kanpur">Kanpur, UP</SelectItem>
                    <SelectItem value="kochi">Kochi, KL</SelectItem>
                    <SelectItem value="kohima">Kohima, NL</SelectItem>
                    <SelectItem value="kolkata">Kolkata, WB</SelectItem>
                    <SelectItem value="kozhikode">Kozhikode, KL</SelectItem>
                    <SelectItem value="lucknow">Lucknow, UP</SelectItem>
                    <SelectItem value="ludhiana">Ludhiana, PB</SelectItem>
                    <SelectItem value="madurai">Madurai, TN</SelectItem>
                    <SelectItem value="manali">Manali, HP</SelectItem>
                    <SelectItem value="mangaluru">Mangaluru, KA</SelectItem>
                    <SelectItem value="margao">Margao, GA</SelectItem>
                    <SelectItem value="mumbai">Mumbai, MH</SelectItem>
                    <SelectItem value="muzaffarpur">Muzaffarpur, BR</SelectItem>
                    <SelectItem value="mysuru">Mysuru, KA</SelectItem>
                    <SelectItem value="nagpur">Nagpur, MH</SelectItem>
                    <SelectItem value="panaji">Panaji, GA</SelectItem>
                    <SelectItem value="panipat">Panipat, HR</SelectItem>
                    <SelectItem value="patna">Patna, BR</SelectItem>
                    <SelectItem value="puducherry">Puducherry, PY</SelectItem>
                    <SelectItem value="pune">Pune, MH</SelectItem>
                    <SelectItem value="raipur">Raipur, CG</SelectItem>
                    <SelectItem value="ranchi">Ranchi, JH</SelectItem>
                    <SelectItem value="salem">Salem, TN</SelectItem>
                    <SelectItem value="shillong">Shillong, ML</SelectItem>
                    <SelectItem value="shimla">Shimla, HP</SelectItem>
                    <SelectItem value="silchar">Silchar, AS</SelectItem>
                    <SelectItem value="surat">Surat, GJ</SelectItem>
                    <SelectItem value="tawang">Tawang, AR</SelectItem>
                    <SelectItem value="thiruvananthapuram">Thiruvananthapuram, KL</SelectItem>
                    <SelectItem value="tiruchirappalli">Tiruchirappalli, TN</SelectItem>
                    <SelectItem value="udaipur">Udaipur, RJ</SelectItem>
                    <SelectItem value="vadodara">Vadodara, GJ</SelectItem>
                    <SelectItem value="vijayawada">Vijayawada, AP</SelectItem>
                    <SelectItem value="visakhapatnam">Visakhapatnam, AP</SelectItem>
                    <SelectItem value="warangal">Warangal, TG</SelectItem>
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
                  <SelectItem value="art-craft">Art & Craft</SelectItem>
                  <SelectItem value="catering">Catering</SelectItem>
                  <SelectItem value="child-care">Child Care</SelectItem>
                  <SelectItem value="domestic-services">Domestic Services</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="home-services">Home Services</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="flex justify-end">
                <Button>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                </Button>
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
