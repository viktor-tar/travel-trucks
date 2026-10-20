"use client";

import { Button } from "@/components/Button/Button";
import { StatusMessage } from "@/components/StatusMessage/StatusMessage";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <StatusMessage
      heading="h1"
      title="Something went wrong"
      text="We couldn't load this page. Please check your connection and try again."
    >
      <Button onClick={reset}>Try again</Button>
    </StatusMessage>
  );
}
