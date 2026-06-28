import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { Skeleton } from "@heroui/react";

export default function ManageStartupsLoading() {
  return (
    <div className="flex flex-col gap-6">
      {/* filter tabs skeleton */}
      <div className="flex flex-col gap-1">
        <Skeleton className="h-7 w-44 rounded-lg" />
        <Skeleton className="h-4 w-28 rounded-lg" />
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-20 rounded-full" />
        ))}
      </div>
      <TableSkeleton rows={7} cols={7} />
    </div>
  );
}