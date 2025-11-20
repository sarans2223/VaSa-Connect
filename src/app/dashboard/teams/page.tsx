import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockTeams } from "@/lib/data";
import { PlusCircle, Users, Send } from "lucide-react";

const suggestedUsers = [
    { name: 'Anita Desai', avatarUrl: 'https://picsum.photos/seed/sugg1/100/100' },
    { name: 'Fatima Sheikh', avatarUrl: 'https://picsum.photos/seed/sugg2/100/100' },
    { name: 'Lakshmi Agarwal', avatarUrl: 'https://picsum.photos/seed/sugg3/100/100' },
];

export default function TeamsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex items-center gap-4">
        <Users className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">My Team</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
            {mockTeams.map(team => (
                <Card key={team.id}>
                    <CardHeader>
                        <CardTitle>{team.name}</CardTitle>
                        <CardDescription>{team.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-3">Members ({team.members.length})</h4>
                            <div className="flex items-center space-x-2">
                                {team.members.map(member => (
                                    <Avatar key={member.id} className="h-10 w-10 border-2 border-white">
                                        <AvatarImage src={member.avatarUrl} alt={member.name}/>
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                ))}
                                <Button variant="outline" shape="circle" size="icon" className="rounded-full">
                                    <PlusCircle className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-semibold">Invite to Team</h4>
                            <div className="flex gap-2">
                                <Input placeholder="Enter email to invite" type="email" />
                                <Button>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                         <div className="space-y-3">
                            <h4 className="font-semibold">Add Members</h4>
                            <div className="flex flex-wrap gap-4">
                                {suggestedUsers.map(user => (
                                    <div key={user.name} className="flex items-center gap-2 rounded-full border p-1 pr-3 bg-secondary/50">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="woman portrait"/>
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium">{user.name}</span>
                                        <Button size="sm" className="ml-auto rounded-full h-7 w-7 p-0">
                                            <PlusCircle className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </CardContent>
                </Card>
            ))}
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Create a New Team</CardTitle>
              <CardDescription>
                Start a new collective for collaboration and support.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="team-name">Team Name</Label>
                  <Input id="team-name" placeholder="e.g., Tech Innovators" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team-description">Description</Label>
                  <Textarea
                    id="team-description"
                    placeholder="What is the purpose of your team?"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-[#E0BBE4] to-[#957DAD] hover:opacity-90 text-primary-foreground">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Team
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
