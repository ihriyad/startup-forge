import { Skeleton } from "@heroui/react";

// startup / opportunity card skeleton
export const CardSkeleton = () => (
  <div className="border border-default-100 rounded-xl p-5 flex flex-col gap-4">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-11 h-11 rounded-xl shrink-0" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3.5 w-28 rounded-lg" />
          <Skeleton className="h-3 w-16 rounded-lg" />
        </div>
      </div>
      <Skeleton className="h-5 w-16 rounded-full shrink-0" />
    </div>
    <div className="flex flex-col gap-1.5">
      <Skeleton className="h-3 w-full rounded-lg" />
      <Skeleton className="h-3 w-4/5 rounded-lg" />
    </div>
    <div className="flex items-center justify-between pt-2 border-t border-default-100">
      <Skeleton className="h-3 w-20 rounded-lg" />
      <Skeleton className="h-3 w-24 rounded-lg" />
    </div>
  </div>
);

export const CardGridSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);