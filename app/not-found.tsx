import type { Metadata } from "next";
import { Button } from "@/components/Button/Button";
import { StatusMessage } from "@/components/StatusMessage/StatusMessage";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <StatusMessage
      heading="h1"
      eyebrow="404"
      title="Page not found"
      text="The camper or page you are looking for doesn't exist or has been removed."
    >
      <Button href="/catalog">Back to catalog</Button>
    </StatusMessage>
  );
}
