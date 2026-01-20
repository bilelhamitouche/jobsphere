import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Factory } from "lucide-react";
import Link from "next/link";

export default function NoCompanies() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Factory />
        </EmptyMedia>
        <EmptyTitle>No Companies Yet</EmptyTitle>
        <EmptyDescription>
          There are no companies yet. Add your own company Now.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button variant="default" asChild>
            <Link href="/recruiter-signin">Recruiter Signin</Link>
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
