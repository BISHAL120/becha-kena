"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";

export default function VerifyPage() {
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

    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 3000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Verification Required
          </h1>
          <p className="text-gray-500 text-center text-sm">
            We&apos;ve sent a 6-digit code to your number. Please enter it
            below.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex justify-center gap-3 sm:gap-4">
            {code.map((num, idx) => (
              <div key={idx} className="relative">
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
                  className="h-14 w-14 sm:h-16 sm:w-16 text-center text-xl font-semibold rounded-xl border-2 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  disabled={isLoading}
                />
                {idx !== 5 && (
                  <div className="hidden sm:block absolute top-1/2 -right-3 w-1.5 h-1.5 rounded-full bg-gray-300" />
                )}
              </div>
            ))}
          </div>

          <Button
            className="w-full h-12 text-base font-medium rounded-xl transition-all hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            Verify Now
          </Button>
        </form>

        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <span className="text-gray-500">Didn&apos;t receive the code?</span>
            <Button
              variant="link"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
              disabled={isLoading}
            >
              Resend
            </Button>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <Link
              href="/login"
              className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
