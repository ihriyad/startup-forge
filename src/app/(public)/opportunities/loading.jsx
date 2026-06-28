import { CardGridSkeleton } from "@/components/ui/skeletons/CardSkeleton";
import { Skeleton } from "@heroui/react";

export default function OpportunitiesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col gap-2 mb-8">
        <Skeleton className="h-9 w-56 rounded-lg" />
        <Skeleton className="h-4 w-64 rounded-lg" />
      </div>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* filter sidebar skeleton */}
        <div className="w-full md:w-64 shrink-0">
          <div className="border border-default-100 rounded-xl p-4 flex flex-col gap-5">
            <Skeleton className="h-4 w-16 rounded-lg" />
            <div className="flex flex-col gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                  <Skeleton className="h-3 w-20 rounded-lg" />
                </div>
              ))}
            </div>
            <Skeleton className="h-px w-full" />
            <div className="flex flex-col gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                  <Skeleton className="h-3 w-24 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* cards */}
        <div className="flex-1 flex flex-col gap-5">
          <Skeleton className="h-11 w-full rounded-lg" />
          <CardGridSkeleton count={9} />
        </div>
      </div>
    </div>
  );
}