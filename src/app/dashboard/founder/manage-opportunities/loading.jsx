import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { Skeleton } from "@heroui/react";

export default function ManageOpportunitiesLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-7 w-52 rounded-lg" />
        <Skeleton className="h-4 w-36 rounded-lg" />
      </div>
      <TableSkeleton rows={6} cols={8} />
    </div>
  );
}