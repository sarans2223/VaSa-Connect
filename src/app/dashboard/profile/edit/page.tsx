
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { mockUser as defaultUser } from "@/lib/data";
import { User as UserIcon, Save, ArrowLeft } from "lucide-react";
import type { User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function EditProfilePage() {
  const [user, setUser] = useState<User>(defaultUser);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    if (storedName) {
      setUser(prevUser => ({ ...prevUser, name: storedName }));
    }
    if (storedEmail) {
      setUser(prevUser => ({ ...prevUser, email: storedEmail }));
    }
  }, []);

  const handleSaveChanges = () => {
    // In a real app, you'd save this to a backend.
    // We'll just simulate it with a toast.
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
    router.push('/dashboard/profile');
  };


  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
        </Button>
        <UserIcon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Edit Profile</h1>
      </div>
      
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
              <Input id="name" defaultValue={user.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user.email} disabled />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Experience Summary</Label>
            <Textarea
              id="experience"
              defaultValue={user.experience}
              className="min-h-[120px]"
              placeholder="Tell us about your professional experience..."
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="job-type">Desired Job Type</Label>
              <Input id="job-type" defaultValue={user.desiredJobType} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="location">Location Preferences</Label>
              <Input id="location" defaultValue={user.locationPreferences} />
            </div>
          </div>
           <div className="space-y-2">
              <Label htmlFor="industries">Industry Preferences (comma-separated)</Label>
              <Input id="industries" defaultValue={user.industryPreferences.join(', ')} placeholder="e.g., Technology, Healthcare, Education" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="skills">My Skills (comma-separated)</Label>
              <Input id="skills" defaultValue={user.skills.join(', ')} placeholder="e.g., Cooking, Event Planning" />
            </div>
            <div className="flex justify-end">
                <Button onClick={handleSaveChanges} className="bg-gradient-to-r from-[#E0BBE4] to-[#957DAD] hover:opacity-90 text-primary-foreground">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
