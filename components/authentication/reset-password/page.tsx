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
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="space-y-6 max-w-2xl mx-auto border shadow-md p-5 rounded-lg ">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Reset your password</h1>
          <p className="text-muted-foreground">
            Enter your Number below and we will send you a verification code
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-5">
            <div className="space-y-2">
              <Label htmlFor="number">Number</Label>
              <Input
                id="number"
                placeholder="017*********"
                type="number"
                autoCapitalize="none"
                autoComplete="number"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div>
              <Button className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send OTP
              </Button>
            </div>
          </div>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
