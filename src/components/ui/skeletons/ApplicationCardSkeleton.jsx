import { Skeleton } from "@heroui/react";

export const ApplicationCardSkeleton = () => (
  <div className="border border-default-100 rounded-xl p-5 flex flex-col gap-4">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-8 h-8 rounded-full shrink-0" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3.5 w-36 rounded-lg" />
          <Skeleton className="h-3 w-24 rounded-lg" />
        </div>
      </div>
      <Skeleton className="h-5 w-16 rounded-full shrink-0" />
    </div>
    <div className="flex gap-4">
      <Skeleton className="h-3 w-28 rounded-lg" />
      <Skeleton className="h-3 w-24 rounded-lg" />
    </div>
    <Skeleton className="h-16 w-full rounded-lg" />
    <div className="flex items-center justify-between pt-2 border-t border-default-100">
      <Skeleton className="h-3 w-24 rounded-lg" />
      <div className="flex gap-2">
        <Skeleton className="h-7 w-16 rounded-lg" />
        <Skeleton className="h-7 w-16 rounded-lg" />
      </div>
    </div>
  </div>
);

export const ApplicationCardGridSkeleton = ({ count = 4 }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <ApplicationCardSkeleton key={i} />
    ))}
  </div>
);