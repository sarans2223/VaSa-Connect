import { AuthForm } from "@/components/auth-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Login | VaSa',
    description: "Login to your VaSa account. Her Dreams, Our Mission!",
};

export default function LoginPage() {
  return <AuthForm type="login" />;
}

