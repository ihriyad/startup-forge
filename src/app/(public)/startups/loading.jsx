import { CardGridSkeleton } from "@/components/ui/skeletons/CardSkeleton";
import { Skeleton } from "@heroui/react";

export default function StartupsLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-9 w-48 rounded-lg" />
        <Skeleton className="h-4 w-72 rounded-lg" />
      </div>
      {/* search bar */}
      <Skeleton className="h-11 w-full rounded-lg" />
      {/* industry filter pills */}
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full shrink-0" />
        ))}
      </div>
      <CardGridSkeleton count={6} />
    </div>
  );
}
