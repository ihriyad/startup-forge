import { Skeleton } from "@heroui/react";

export const TableRowSkeleton = ({ cols = 6 }) => (
  <div className="flex items-center gap-4 px-4 py-3 border-b border-default-100">
    {Array.from({ length: cols }).map((_, i) => (
      <Skeleton
        key={i}
        className={`h-4 rounded-lg ${
          i === 0 ? "w-6 shrink-0" :
          i === 1 ? "w-32" :
          i === cols - 1 ? "w-16 ml-auto" :
          "flex-1"
        }`}
      />
    ))}
  </div>
);

export const TableSkeleton = ({ rows = 6, cols = 6 }) => (
  <div className="border border-default-100 rounded-xl overflow-hidden">
    {/* header */}
    <div className="flex items-center gap-4 px-4 py-3 bg-default-50 border-b border-default-100">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-3 rounded-lg ${
            i === 0 ? "w-6 shrink-0" :
            i === cols - 1 ? "w-16 ml-auto" :
            "flex-1"
          }`}
        />
      ))}
    </div>
    {/* rows */}
    {Array.from({ length: rows }).map((_, i) => (
      <TableRowSkeleton key={i} cols={cols} />
    ))}
  </div>
);