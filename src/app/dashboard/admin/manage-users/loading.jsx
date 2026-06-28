import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { Skeleton } from "@heroui/react";

export default function ManageUsersLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-7 w-40 rounded-lg" />
        <Skeleton className="h-4 w-32 rounded-lg" />
      </div>
      <TableSkeleton rows={8} cols={7} />
    </div>
  );
}