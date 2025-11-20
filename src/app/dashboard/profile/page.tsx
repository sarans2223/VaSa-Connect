
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
import { mockUser as defaultUser } from "@/lib/data";
import { User as UserIcon, Edit, Save, UploadCloud, PiggyBank, Star, Leaf, Gem, Crown } from "lucide-react";
import type { User } from "@/lib/types";

const membershipBadges = {
  Rise: {
    label: "Vasa Rise Member",
    icon: Leaf,
    className: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
  },
  Bloom: {
    label: "Vasa Bloom Member",
    icon: Gem,
    className: "bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-100",
  },
  Empower: {
    label: "Vasa Empower Member",
    icon: Crown,
    className: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100",
  },
};


export default function ProfilePage() {
  const [user, setUser] = useState<User>(defaultUser);

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

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-200" />);
      } else {
        stars.push(<Star key={i} className="h-5 w-5 text-gray-300" />);
      }
    }
    return stars;
  };

  const MembershipBadge = () => {
    const badge = membershipBadges[user.membership];
    if (!badge) return null;
    const Icon = badge.icon;
    return (
      <Badge variant="outline" className={`mt-2 ${badge.className}`}>
        <Icon className="mr-2 h-4 w-4" />
        {badge.label}
      </Badge>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
       <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <UserIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        </div>
        <Button asChild>
            <Link href="/dashboard/profile/edit">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
            </Link>
        </Button>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <MembershipBadge />
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">Rating</span>
                  <div className="flex items-center gap-1">
                    {renderStars(user.rating)}
                    <span className="font-bold ml-1">{user.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3 border-t pt-4">
                 <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">Profile Verification</span>
                    <Badge variant="destructive">Not Verified</Badge>
                 </div>
                 <Button variant="outline" className="w-full">
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Upload PAN Card
                 </Button>
                 <Button variant="outline" className="w-full">
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Upload Aadhaar Card
                 </Button>
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
               <div className="flex items-center gap-4">
                 <PiggyBank className="h-8 w-8 text-primary" />
                 <div>
                    <CardTitle>Vasa Pay</CardTitle>
                    <CardDescription>Manage your bank account details for payments.</CardDescription>
                 </div>
               </div>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank-name">Bank Name</Label>
                      <Input id="bank-name" placeholder="e.g., State Bank of India" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-holder">Account Holder Name</Label>
                      <Input id="account-holder" placeholder="As per your bank account" />
                    </div>
                  </div>
                   <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="account-number">Account Number</Label>
                      <Input id="account-number" placeholder="Enter your bank account number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ifsc-code">IFSC Code</Label>
                      <Input id="ifsc-code" placeholder="Enter the IFSC code" />
                    </div>
                  </div>
                 <div className="flex justify-end">
                    <Button className="bg-gradient-to-r from-[#E0BBE4] to-[#957DAD] hover:opacity-90 text-primary-foreground">
                        <Save className="mr-2 h-4 w-4" />
                        Save Bank Details
                    </Button>
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
                {user.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
           <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Your professional summary and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Experience Summary</Label>
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md min-h-[120px]">
                    {user.experience}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Desired Job Type</Label>
                  <p className="text-sm font-medium p-3 bg-muted rounded-md">{user.desiredJobType}</p>
                </div>
                 <div className="space-y-2">
                  <Label>Location Preferences</Label>
                  <p className="text-sm font-medium p-3 bg-muted rounded-md">{user.locationPreferences}</p>
                </div>
              </div>
               <div className="space-y-2">
                  <Label>Industry Preferences</Label>
                  <div className="flex flex-wrap gap-2">
                    {user.industryPreferences.map((industry) => (
                        <Badge key={industry} variant="secondary" className="text-sm">
                            {industry}
                        </Badge>
                    ))}
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
