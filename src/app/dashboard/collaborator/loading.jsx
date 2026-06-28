import { StatCardGridSkeleton } from "@/components/ui/skeletons/StatCardSkeleton";
import { Skeleton } from "@heroui/react";

export default function CollaboratorOverviewLoading() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-7 w-56 rounded-lg" />
          <Skeleton className="h-4 w-64 rounded-lg" />
        </div>
        <Skeleton className="h-9 w-44 rounded-lg" />
      </div>
      <StatCardGridSkeleton count={4} />
      {/* recent applications */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-40 rounded-lg" />
          <Skeleton className="h-3 w-16 rounded-lg" />
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}