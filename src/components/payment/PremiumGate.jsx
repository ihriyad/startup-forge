"use client";

import Link from "next/link";
import { FiLock, FiZap } from "react-icons/fi";

export const PremiumGate = ({ count }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
    <div className="w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
      <FiLock size={28} className="text-violet-600" />
    </div>

    <div className="text-center flex flex-col gap-2 max-w-sm">
      <h2 className="text-xl font-bold text-foreground">
        Upgrade to Post More
      </h2>
      <p className="text-sm text-foreground-500">
        You have used all{" "}
        <span className="font-medium text-foreground">{count}/3</span> free
        opportunity slots. Upgrade to Premium for unlimited postings.
      </p>
    </div>

    <div className="flex flex-col sm:flex-row gap-3">
      <Link
        href="/pricing"
        className="flex items-center justify-center gap-2 bg-violet-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-violet-700 transition-colors"
      >
        <FiZap size={15} />
        Upgrade to Premium — $29
      </Link>
      <Link
        href="/dashboard/founder/manage-opportunities"
        className="flex items-center justify-center text-sm text-foreground-500 hover:text-foreground px-6 py-2.5 rounded-lg border border-default-200 transition-colors"
      >
        Manage Existing
      </Link>
    </div>
  </div>
);