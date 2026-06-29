import { Skeleton } from "@heroui/react";

export default function StartupsLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col gap-6">
      {/* Search bar */}
      <div className="flex justify-center w-full">
        <Skeleton className="h-11 max-w-xl w-full rounded-xl" />
      </div>

      {/* Subtitle */}
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-4 w-64 rounded-lg" />
      </div>

      {/* Industry pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>

      {/* Cards grid — matches StartupCard min-h-[320px] */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[320px] rounded-2xl" />
        ))}
      </div>
    </div>
  );
}