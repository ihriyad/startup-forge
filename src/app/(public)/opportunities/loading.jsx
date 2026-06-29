import { Skeleton } from "@heroui/react";

export default function OpportunitiesLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-8">
        <Skeleton className="h-9 w-56 rounded-lg" />
        <Skeleton className="h-4 w-72 rounded-lg" />
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Filter sidebar skeleton — matches FilterSidebar layout */}
        <div className="w-full md:w-64 shrink-0">
          <div className="border border-default-100 rounded-xl p-4 flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-12 rounded-lg" />
            </div>

            {/* Work type label */}
            <Skeleton className="h-3 w-20 rounded-lg" />
            <div className="flex flex-col gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                  <Skeleton className="h-3 w-16 rounded-lg" />
                </div>
              ))}
            </div>

            <Skeleton className="h-px w-full rounded" />

            {/* Industry label */}
            <Skeleton className="h-3 w-16 rounded-lg" />
            <div className="flex flex-col gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                  <Skeleton className="h-3 w-20 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col gap-5">
          {/* Search bar */}
          <Skeleton className="h-11 w-full rounded-lg" />

          {/* Results count */}
          <Skeleton className="h-4 w-40 rounded-lg" />

          {/* Cards — matches OpportunityCard min-h structure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="border border-default-100 rounded-2xl p-5 flex flex-col gap-4 min-h-[200px]"
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <Skeleton className="h-4 w-3/4 rounded-lg" />
                    <Skeleton className="h-3 w-1/2 rounded-lg" />
                  </div>
                  <Skeleton className="h-5 w-12 rounded-full shrink-0" />
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} className="h-6 w-14 rounded-full" />
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-auto flex flex-col gap-2 pt-3 border-t border-default-100">
                  <Skeleton className="h-3 w-32 rounded-lg" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-24 rounded-lg" />
                    <Skeleton className="h-7 w-20 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}