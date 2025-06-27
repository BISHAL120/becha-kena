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
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Enter Verification Code</h1>
        <p className="text-muted-foreground">
          Enter the verification code sent to your number
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            {code.map((num, idx) => (
              <div key={idx}>
                <Input
                  ref={(input) => {
                    if (input) {
                      inputs.current.push(input);
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
                  className="h-12 w-12 text-center text-lg border-black/40"
                  disabled={isLoading}
                />
              </div>
            ))}
          </div>
          <Button className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify email
          </Button>
        </div>
      </form>
      <div className="text-center text-sm">
        Didn&apos;t receive the code?{" "}
        <Button
          variant="link"
          className="text-sm underline-offset-4 hover:text-primary"
          disabled={isLoading}
        >
          Resend
        </Button>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Back to login
        </Link>
      </p>
    </div>
  );
}
