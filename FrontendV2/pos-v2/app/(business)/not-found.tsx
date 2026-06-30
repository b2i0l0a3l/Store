import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function BusinessNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <FileQuestion className="size-16 text-muted-foreground" />
      <h2 className="text-2xl font-bold">Page not found</h2>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Button asChild>
        <Link href="/pos">Go to POS</Link>
      </Button>
    </div>
  );
}
