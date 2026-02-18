import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Briefcase } from "lucide-react";

export default function NoJobs() {
  return (
    <Empty className="col-span-2">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Briefcase />
        </EmptyMedia>
        <EmptyTitle>No Jobs Yet</EmptyTitle>
        <EmptyDescription>
          There are no jobs yet. Post your first job now.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
