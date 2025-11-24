
"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { KeyRound, Mail, User, Users, Eye, EyeOff } from "lucide-react";
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
import { signInWithGoogle } from "@/firebase/auth";
import { useUser } from "@/firebase/index";

const MicrosoftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 21 21" {...props}>
    <path fill="#f25022" d="M1 1h9v9H1z" />
    <path fill="#00a4ef" d="M1 11h9v9H1z" />
    <path fill="#7fba00" d="M11 1h9v9h-9z" />
    <path fill="#ffb900" d="M11 11h9v9h-9z" />
  </svg>
);

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" {...props}>
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
        c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
        s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
        C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
        c-5.222,0-9.617-3.27-11.283-7.94l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238
        C42.418,34.569,44,29.692,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

type AuthFormProps = {
  type: "login" | "signup";
};

// validators
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; // 8+ chars, 1 letter, 1 number

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { user: firebaseUser, loading: userLoading } = useUser();

  const [isLoading, setIsLoading] = useState(true);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  useEffect(() => {
    if (!userLoading && firebaseUser) {
      router.push("/dashboard");
    } else if (!userLoading) {
      setIsLoading(false);
    }
  }, [firebaseUser, userLoading, router]);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const userCredential = await signInWithGoogle();
      const user = userCredential.user;
      localStorage.setItem("userName", user.displayName || name || "VaSa Member");
      if (user.email) {
        localStorage.setItem("userEmail", user.email.toLowerCase());
      }
      router.push("/dashboard");
    } catch (error: any) {
      if (error?.code !== "auth/popup-closed-by-user") {
        console.error("Google Sign-In Error:", error);
        toast({
          title: "Google Sign-In Failed",
          description: "Could not sign in with Google. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Demo behaviour – in real app you'd use Firebase sendPasswordResetEmail
    toast({
      title: "Forgot password",
      description:
        "In a real VaSa app, we would send a password reset link to your email.",
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowForgot(false);

    const normalizedInput = email.toLowerCase();
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");
    const localEmail = storedEmail?.toLowerCase();
    const mockEmail = mockUser.email.toLowerCase();

    // ===== common validation (login + signup) =====
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address like name@example.com.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!passwordRegex.test(password)) {
      toast({
        title: "Weak password",
        description:
          "Password must be at least 8 characters and include both letters and numbers.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // ===== signup-only rules =====
    if (type === "signup") {
      if (!name.trim()) {
        toast({
          title: "Name required",
          description: "Please enter your full name.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (!agreeTerms) {
        toast({
          title: "Agreement required",
          description: "You must accept the Terms & Privacy Policy to continue.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (!isAdult) {
        toast({
          title: "Eligibility check",
          description:
            "Please confirm that you are 18+ or have guardian permission.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // 🚨 email already used (mock OR locally created account)
      if (
        normalizedInput === mockEmail ||
        (localEmail && normalizedInput === localEmail)
      ) {
        toast({
          title: "Email already registered",
          description: "An account with this email already exists. Please log in.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // store name + email + password (demo only)
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", normalizedInput);
      localStorage.setItem("userPassword", password);
    }

    // ===== login-only rules =====
    if (type === "login") {
      // 1) No account found at all
      if (normalizedInput !== mockEmail && normalizedInput !== localEmail) {
        toast({
          title: "No account found",
          description:
            "No VaSa account exists with this email. Please sign up first.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // 2) Password mismatch for mock user
      if (normalizedInput === mockEmail && password !== "password123") {
        toast({
          title: "Password mismatch",
          description: "The password you entered does not match this account.",
          variant: "destructive",
        });
        setIsLoading(false);
        setShowForgot(true);
        return;
      }

      // 3) Password mismatch for locally created user
      if (
        normalizedInput === localEmail &&
        storedPassword &&
        password !== storedPassword
      ) {
        toast({
          title: "Password mismatch",
          description: "The password you entered does not match this account.",
          variant: "destructive",
        });
        setIsLoading(false);
        setShowForgot(true);
        return;
      }

      // success: ensure we have a name saved
      if (!localStorage.getItem("userName") && mockUser.name) {
        localStorage.setItem("userName", mockUser.name);
      }
      // make sure login email is stored as last used
      localStorage.setItem("userEmail", normalizedInput);
    }

    // ===== success path =====
    // Simulate API call / backend delay
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 800);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <div>Loading...</div>
      </div>
    );
  }

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
                    minLength={2}
                    maxLength={50}
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
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </Button>
              </div>
              {type === "signup" && (
                <p className="text-xs text-muted-foreground">
                  Use at least 8 characters with letters and numbers.
                </p>
              )}
              {type === "login" && showForgot && (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="mt-1 text-xs text-accent underline"
                >
                  Forgot password?
                </button>
              )}
            </div>

            {type === "signup" && (
              <div className="space-y-2 text-xs text-muted-foreground">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <span>
                    I agree to VaSa&apos;s{" "}
                    <span className="underline">Terms</span> and{" "}
                    <span className="underline">Privacy Policy</span>.
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={isAdult}
                    onChange={(e) => setIsAdult(e.target.checked)}
                  />
                  <span>
                    I am 18+ or have guardian permission to use this platform.
                  </span>
                </label>
              </div>
            )}

            <Button
              disabled={isLoading || userLoading}
              type="submit"
              className="w-full font-semibold bg-gradient-to-r from-[#E0BBE4] to-[#957DAD] hover:opacity-90 transition-opacity text-primary-foreground"
            >
              {isLoading || userLoading
                ? "Processing..."
                : type === "login"
                ? "Log In"
                : "Create Account"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <Separator className="flex-1" />
            <span className="mx-4 text-sm text-muted-foreground">
              OR CONTINUE WITH
            </span>
            <Separator className="flex-1" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-1 gap-4">
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isGoogleLoading || userLoading}>
              <GoogleIcon className="mr-2 h-5 w-5" />
              {isGoogleLoading ? "Signing in..." : "Google"}
            </Button>
          </div>

          {type === "login" && (
            <>
              <div className="my-6 flex items-center">
                <Separator className="flex-1" />
                <span className="mx-4 text-sm text-muted-foreground">OR</span>
                <Separator className="flex-1" />
              </div>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => router.push("/onsite-login")}
              >
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
              <Link
                href="/signup"
                className="font-semibold text-accent hover:underline"
              >
                Sign up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-accent hover:underline"
              >
                Log in
              </Link>
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

    