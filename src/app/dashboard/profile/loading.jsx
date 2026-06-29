import { Skeleton } from "@heroui/react";

export default function ProfileLoading() {
  return (
    <div className="mx-auto my-12 px-4 w-full">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-2">
        <Skeleton className="h-8 w-56 rounded-lg" />
        <Skeleton className="h-4 w-80 rounded-lg" />
      </div>

      <div className="space-y-8">
        {/* Avatar card */}
        <div className="border border-default-100 rounded-xl p-6 flex flex-col items-center gap-4">
          <Skeleton className="w-[140px] h-[140px] rounded-full" />
          <Skeleton className="h-8 w-28 rounded-lg" />
        </div>

        {/* Profile details card */}
        <div className="border-2 border-dashed border-default-200 rounded-xl p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 w-44 rounded-lg" />
            <Skeleton className="h-3 w-64 rounded-lg" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-3 w-20 rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ))}
          </div>

          {/* Info box */}
          <Skeleton className="h-16 w-full rounded-xl" />

          {/* Save button */}
          <div className="flex justify-end border-t border-default-100 pt-4">
            <Skeleton className="h-12 w-36 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
