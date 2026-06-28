import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { Skeleton } from "@heroui/react";

export default function TransactionsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-7 w-36 rounded-lg" />
          <Skeleton className="h-4 w-40 rounded-lg" />
        </div>
        {/* total revenue card skeleton */}
        <Skeleton className="h-16 w-44 rounded-xl" />
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-20 rounded-full" />
        ))}
      </div>
      <TableSkeleton rows={6} cols={6} />
    </div>
  );
}