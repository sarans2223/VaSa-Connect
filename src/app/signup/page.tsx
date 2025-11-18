import { AuthForm } from "@/components/auth-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Sign Up | VaSa',
    description: "Create an account with VaSa.",
};

export default function SignupPage() {
  return <AuthForm type="signup" />;
}
