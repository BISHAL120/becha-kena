"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      number: (event.target as HTMLFormElement).number.value,
    };

    axios
      .post("/api/password/reset", { ...data })
      .then((res) => {
        setIsLoading(false);
        router.push(`/pass-verify?id=${res.data.Data.id}`);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error(err.response.data);
      });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="mb-6">
            <svg
              className="w-16 h-16 mx-auto text-primary/80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/20 bg-clip-text text-transparent">
            Reset Password
          </h1>
          <p className="text-muted-foreground">
            We&apos;ll send a verification code to your email address
          </p>
        </div>

        <div className="mt-8 bg-white px-6 py-8 shadow-xl ring-1 ring-gray-900/5 rounded-xl">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </Label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  disabled={isLoading}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Verification Code"
              )}
            </Button>
          </form>
        </div>

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
