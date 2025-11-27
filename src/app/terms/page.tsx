
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TermsAndConditionsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-muted/40">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
            <Button asChild variant="outline">
                <Link href="/signup">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Sign Up
                </Link>
            </Button>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <CardTitle className="text-3xl font-bold tracking-tight">Terms and Conditions</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>

            <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
            <p>Welcome to VaSa ("we", "our", "us"). By accessing or using our application, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access the service.</p>

            <h2 className="text-xl font-semibold text-foreground">2. User Accounts</h2>
            <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service. You are responsible for safeguarding the password that you use to access the service.</p>

            <h2 className="text-xl font-semibold text-foreground">3. Content</h2>
            <p>Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the service, including its legality, reliability, and appropriateness.</p>
            
            <h2 className="text-xl font-semibold text-foreground">4. Prohibited Uses</h2>
            <p>You may use the service only for lawful purposes. You may not use the service in any way that violates any applicable national or international law or regulation.</p>

            <h2 className="text-xl font-semibold text-foreground">5. Termination</h2>
            <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

            <h2 className="text-xl font-semibold text-foreground">6. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>

            <h2 className="text-xl font-semibold text-foreground">7. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect.</p>

            <h2 className="text-xl font-semibold text-foreground">8. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at support@vasa.example.com.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
