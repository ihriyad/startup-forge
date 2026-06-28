import { StatCardGridSkeleton } from "@/components/ui/skeletons/StatCardSkeleton";
import { Skeleton } from "@heroui/react";

export default function AdminOverviewLoading() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-7 w-32 rounded-lg" />
        <Skeleton className="h-4 w-56 rounded-lg" />
      </div>
      <StatCardGridSkeleton count={4} />
      {/* chart placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
      <Skeleton className="h-48 rounded-xl" />
    </div>
  );
}