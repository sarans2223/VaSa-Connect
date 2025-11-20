
"use client";

import { useState }from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github, KeyRound, Mail, User, Users } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { mockUser } from "@/lib/data";

interface AuthFormProps {
  type: "login" | "signup";
}

const MicrosoftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 21 21" {...props}>
    <path fill="#f25022" d="M1 1h9v9H1z" />
    <path fill="#00a4ef" d="M1 11h9v9H1z" />
    <path fill="#7fba00" d="M11 1h9v9h-9z" />
    <path fill="#ffb900" d="M11 11h9v9h-9z" />
  </svg>
);

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" {...props} >
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.222,0-9.617-3.27-11.283-7.94l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238
	C42.418,34.569,44,29.692,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
);


export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (type === 'signup') {
      // Simulate checking if email exists. In a real app, this would be a backend check.
      if (email.toLowerCase() === mockUser.email.toLowerCase()) {
        toast({
          title: "Registration Error",
          description: "An account with this email address already exists.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      localStorage.setItem('userName', name);
    }

    if (type === "login") {
      if (email.toLowerCase() === mockUser.email.toLowerCase() && password !== "password123") {
         toast({
          title: "Login Error",
          description: "Invalid password. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
    }


    localStorage.setItem('userEmail', email);
    
    // Simulate API call
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#E0BBE4] via-[#957DAD] to-[#D291BC]">
            {type === "login"
              ? "Welcome Back to VaSa"
              : "Join the VaSa Community"}
          </CardTitle>
          <CardDescription>
            {type === "login"
              ? "Enter your credentials to access your account."
              : "Create an account to get started."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="name" 
                    placeholder="Savitri Bai" 
                    required 
                    className="pl-10" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
               <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="savitri@example.com"
                  required
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
            </div>
            <Button disabled={isLoading} type="submit" className="w-full font-semibold bg-gradient-to-r from-[#E0BBE4] to-[#957DAD] hover:opacity-90 transition-opacity text-primary-foreground">
              {isLoading ? 'Processing...' : (type === "login" ? "Log In" : "Create Account")}
            </Button>
          </form>

          <div className="my-6 flex items-center">
            <Separator className="flex-1" />
            <span className="mx-4 text-sm text-muted-foreground">
              OR CONTINUE WITH
            </span>
            <Separator className="flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              <GoogleIcon className="mr-2 h-5 w-5" />
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <MicrosoftIcon className="mr-2 h-5 w-5" />
              Microsoft
            </Button>
          </div>
          
           {type === 'login' && (
            <>
              <div className="my-6 flex items-center">
                <Separator className="flex-1" />
                <span className="mx-4 text-sm text-muted-foreground">
                  OR
                </span>
                <Separator className="flex-1" />
              </div>
              <Button variant="secondary" className="w-full" onClick={() => router.push('/onsite-login')}>
                <Users className="mr-2 h-5 w-5" />
                Onsite Member Login
              </Button>
            </>
           )}

        </CardContent>
        <CardFooter className="justify-center text-sm">
          {type === "login" ? (
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-semibold text-accent hover:underline">
                Sign up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-accent hover:underline">
                Log in
              </Link>
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

    