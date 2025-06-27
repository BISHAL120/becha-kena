"use client"; // Error boundaries must be Client Components

import { useRouter } from "next/navigation";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();

  console.log(error);

  setTimeout(() => {
    router.push("/products");
  }, 1000);

  return (
    <div className="h-[calc(100vh-200px)] flex justify-center items-center text-2xl text-muted-foreground">
      <div className="text-center space-y-3">
        <h2 className="font-semibold text-4xl">
          Please Double Check Product ID
        </h2>
        <h2>This Product Does Not Exist</h2>
        <p>Redirecting...</p>
      </div>
    </div>
  );
}
