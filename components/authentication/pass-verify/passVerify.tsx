"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function PassVerifyPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [code, setCode] = React.useState<string[]>(new Array(6).fill(""));
  const inputs = React.useRef<(HTMLInputElement | null)[]>([]);

  const processInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    slot: number
  ) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== 5) {
      inputs.current[slot + 1]?.focus();
    }
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, slot: number) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1]?.focus();
    }
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    if (code.includes("")) {
      setIsLoading(false);
      return toast.error("Please fill all the fields");
    }

    const finalCode = code.join("");

    axios
      .post("api/password/verify", { id, finalCode })
      .then((res) => {
        if (res.data.status === 400) {
          toast.error(res.data.message);
          setIsLoading(false);
        } else {
          toast.success(res.data.message);
          router.push(`/new-password?id=${id}`);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message);
        console.log(err);
      });

    // setIsLoading(true);
  }

  const ResendCode = () => {
    setIsLoading(true);
    axios
      .patch("/api/password/reset", { id })
      .then((res) => {
        toast.success(res.data.message);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-background to-background/80 rounded-2xl shadow-lg">
      <div className="w-full max-w-md space-y-6">
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
            Verify Your Account
          </h1>
          <p className="text-muted-foreground">
            We&apos;ve sent a verification code to your number
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex justify-center gap-3">
            {code.map((num, idx) => (
              <div key={idx} className="relative group">
                <Input
                  ref={(input) => {
                    if (input) {
                      inputs.current[idx] = input;
                    }
                  }}
                  value={num}
                  onChange={(e) => processInput(e, idx)}
                  onKeyUp={(e) => onKeyUp(e, idx)}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="\d{1}"
                  maxLength={1}
                  className="h-14 w-14 text-center text-xl font-semibold rounded-xl 
                    border-2 transition-all duration-200
                    focus:border-primary focus:ring-2 focus:ring-primary/20
                    group-hover:border-primary/50"
                  disabled={isLoading}
                />
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 
                  bg-primary/20 rounded-full opacity-0 transition-opacity duration-200
                  group-hover:opacity-100"
                />
              </div>
            ))}
          </div>

          <Button
            className="w-full h-12 text-base font-medium rounded-xl
              bg-gradient-to-r from-primary to-primary/30
              hover:opacity-90 transition-opacity"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              "Verify Code"
            )}
          </Button>
        </form>

        <div className="flex flex-col items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              Didn&apos;t receive the code?
            </span>
            <Button
              variant="ghost"
              className="h-auto p-0 font-medium text-primary hover:text-primary/80
                hover:bg-transparent"
              onClick={() => ResendCode()}
              disabled={isLoading}
            >
              Resend Code
            </Button>
          </div>

          <Link
            href="/login"
            className="flex items-center text-muted-foreground hover:text-primary 
              transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
