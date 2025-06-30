import Link from "next/link";
import { ArrowLeft, Lock, Mail } from "lucide-react";

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
import Logo from "@/components/ui/logo";

export default function ResetPassword() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Back Home Button */}
      <div className="absolute top-8 left-8">
        <Button
          asChild
          className="group flex items-center gap-2 transition-all duration-300 hover:bg-green-500 hover:text-white hover:shadow-lg"
        >
          <Link href="/login">
            <ArrowLeft className="w-6 h-6 text-green-500 group-hover:text-white transition-all duration-300" />
            <span>Back Login</span>
          </Link>
        </Button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-3 md:top-20 right-3 md:right-20 w-32 h-32 bg-green-200 rounded-full opacity-60"></div>
      <div className="absolute bottom-3 md:bottom-20 left-3 md:left-20 w-20 h-20 bg-green-300 rounded-full opacity-40"></div>

      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-8 z-50">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Logo />
            <span className="text-2xl font-bold text-black">
              BECHA <span className="text-green-500">KENA</span>
            </span>
          </div>
        </div>

        {/* Reset Password Card */}
        <Card className="shadow-lg border-0 dark:bg-amber-50">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Reset Password
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              {"We'll send a verification code to your email address"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
            >
              Send Verification Code
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
