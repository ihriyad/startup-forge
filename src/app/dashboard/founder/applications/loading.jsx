import { ApplicationCardGridSkeleton } from "@/components/ui/skeletons/ApplicationCardSkeleton";
import { Skeleton } from "@heroui/react";

export default function FounderApplicationsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-7 w-36 rounded-lg" />
        <Skeleton className="h-4 w-52 rounded-lg" />
      </div>
      {/* filter tabs */}
      <div className="flex gap-1 border-b border-default-100 pb-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-t-lg" />
        ))}
      </div>
      <ApplicationCardGridSkeleton count={4} />
    </div>
  );
}