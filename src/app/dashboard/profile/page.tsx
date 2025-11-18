import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
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
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { mockUser } from "@/lib/data";
import { User, Edit, Save } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex items-center gap-4">
        <User className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
                <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{mockUser.name}</CardTitle>
              <CardDescription>{mockUser.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Profile Completion</span>
                  <span>{mockUser.profileCompletion}%</span>
                </div>
                <Progress
                  value={mockUser.profileCompletion}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>My Skills</CardTitle>
              <CardDescription>
                Your skills help us match you with the right opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockUser.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
                <Button variant="outline" size="sm" className="h-auto">
                  <Edit className="mr-2 h-3 w-3" /> Edit Skills
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile Information</CardTitle>
              <CardDescription>
                Keep your information up-to-date.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={mockUser.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={mockUser.email} disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience Summary</Label>
                <Textarea
                  id="experience"
                  defaultValue={mockUser.experience}
                  className="min-h-[120px]"
                  placeholder="Tell us about your professional experience..."
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="job-type">Desired Job Type</Label>
                  <Input id="job-type" defaultValue={mockUser.desiredJobType} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="location">Location Preferences</Label>
                  <Input id="location" defaultValue={mockUser.locationPreferences} />
                </div>
              </div>
               <div className="space-y-2">
                  <Label htmlFor="industries">Industry Preferences</Label>
                  <Input id="industries" defaultValue={mockUser.industryPreferences.join(', ')} placeholder="e.g., Technology, Healthcare, Education" />
                </div>
                <div className="flex justify-end">
                    <Button className="bg-gradient-to-r from-[#E0BBE4] to-[#957DAD] hover:opacity-90 text-primary-foreground">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                    </Button>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
