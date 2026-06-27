"use client";

import Link from "next/link";
import { FiClock, FiBriefcase, FiUsers } from "react-icons/fi";

export const OpportunityCard = ({ opportunity, currentUser }) => {
  const isExpired =
    opportunity.deadline && new Date(opportunity.deadline) < new Date();

  return (
    <Link
      href={`/opportunities/${opportunity._id}`}
      className="border border-default-100 rounded-xl p-5 flex flex-col gap-3 hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-sm transition-all"
    >
      {/* Role + status */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-foreground leading-snug">
          {opportunity.role_title}
        </p>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${
            isExpired
              ? "bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400"
              : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
          }`}
        >
          {isExpired ? "Expired" : "Open"}
        </span>
      </div>

      {/* Startup name */}
      <p className="text-xs text-violet-600 font-medium">
        {opportunity.startup_name}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1">
        {opportunity.required_skills?.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="text-[10px] px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300"
          >
            {skill}
          </span>
        ))}
        {opportunity.required_skills?.length > 3 && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-default-100 text-foreground-400">
            +{opportunity.required_skills.length - 3} more
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between pt-2 border-t border-default-100 flex-wrap gap-2">
        <div className="flex items-center gap-1 text-xs text-foreground-400">
          <FiBriefcase size={11} />
          <span className="capitalize">{opportunity.work_type}</span>
          <span>·</span>
          <span className="capitalize">{opportunity.commitment_level}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-foreground-400">
          <FiClock size={11} />
          {new Date(opportunity.deadline).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Founder notice */}
      {currentUser?.role === "founder" && (
        <p className="text-[10px] text-foreground-400 italic border-t border-default-100 pt-2">
          Founders cannot apply for opportunities.
        </p>
      )}
    </Link>
  );
};
