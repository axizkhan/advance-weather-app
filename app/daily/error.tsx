"use client";

import { useEffect } from "react";
import { CentralizedErrorPage } from "@/components/shared/CentralizedErrorPage";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootErrorBoundary({ error, reset }: Props) {
  useEffect(() => {
    // Pipe standard error metrics downstream to crash analytics logging modules (e.g. Sentry)
    console.error("Captured Layout Exception Tree:", error);
  }, [error]);

  return (
    <CentralizedErrorPage
      code={error.message.includes("timeout") ? "API_TIMEOUT" : "DEFAULT"}
      errorInstance={error}
      resetAction={reset}
    />
  );
}
