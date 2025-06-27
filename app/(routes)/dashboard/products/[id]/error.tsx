"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="h-[calc(100vh-200px)] flex justify-center items-center text-2xl text-muted-foreground">
      <div className="text-center space-y-3">
        <h2 className="font-semibold text-4xl">
          Please Double Check Product ID
        </h2>
        <h2>This Product Does Not Exist</h2>
      </div>
    </div>
  );
}
