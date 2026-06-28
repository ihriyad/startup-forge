import { Skeleton } from "@heroui/react";

export const StatCardSkeleton = () => (
  <div className="bg-default-50 rounded-lg p-4 flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <Skeleton className="h-3 w-24 rounded-lg" />
      <Skeleton className="h-4 w-4 rounded-md" />
    </div>
    <Skeleton className="h-8 w-20 rounded-lg mt-1" />
    <Skeleton className="h-3 w-16 rounded-full" />
  </div>
);

export const StatCardGridSkeleton = ({ count = 4 }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <StatCardSkeleton key={i} />
    ))}
  </div>
);