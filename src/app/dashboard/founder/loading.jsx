import { StatCardGridSkeleton } from "@/components/ui/skeletons/StatCardSkeleton";
import { Skeleton } from "@heroui/react";

export default function FounderOverviewLoading() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-7 w-56 rounded-lg" />
          <Skeleton className="h-4 w-64 rounded-lg" />
        </div>
        <Skeleton className="h-9 w-36 rounded-lg" />
      </div>
      <StatCardGridSkeleton count={3} />
      {/* quick actions */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-28 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
        </div>
      </div>
    </div>
  );
}