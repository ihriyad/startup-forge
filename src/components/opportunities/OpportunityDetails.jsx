"use client";

import Link from "next/link";
import {
  FiArrowLeft,
  FiBriefcase,
  FiClock,
  FiUsers,
  FiTag,
  FiMail,
} from "react-icons/fi";
import { ApplyModal } from "./ApplyModal";

export const OpportunityDetails = ({ opportunity, currentUser }) => {
  const isFounder = currentUser?.role === "founder";
  const isLoggedIn = !!currentUser;
  const isExpired =
    opportunity.deadline && new Date(opportunity.deadline) < new Date();
  const isOwnStartup = currentUser?.email === opportunity.founder_email;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-8">
      {/* Back */}
      <Link
        href="/opportunities"
        className="flex items-center gap-1.5 text-sm text-foreground-500 hover:text-violet-600 transition-colors w-fit"
      >
        <FiArrowLeft size={15} />
        Back to Opportunities
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left — main content */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Header */}
          <div className="border border-default-100 rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {opportunity.role_title}
                </h1>
                <Link
                  href={`/startups/${opportunity.startup_id}`}
                  className="text-sm text-violet-600 font-medium hover:underline mt-1 inline-block"
                >
                  {opportunity.startup_name}
                </Link>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  isExpired
                    ? "bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400"
                    : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                }`}
              >
                {isExpired ? "Expired" : "Open"}
              </span>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-2">
              <p className="text-xs text-foreground-400 font-medium">
                Required Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {opportunity.required_skills?.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="border border-default-100 rounded-xl p-6 grid grid-cols-2 gap-5">
            {[
              {
                icon: FiBriefcase,
                label: "Work Type",
                value: opportunity.work_type,
              },
              {
                icon: FiUsers,
                label: "Commitment",
                value: opportunity.commitment_level,
              },
              {
                icon: FiTag,
                label: "Industry",
                value: opportunity.industry ?? "—",
              },
              {
                icon: FiMail,
                label: "Posted by",
                value: opportunity.founder_email,
              },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-2">
                <Icon size={14} className="text-violet-500 mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-foreground-400">
                    {label}
                  </span>
                  <span className="text-sm text-foreground capitalize">
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — sticky apply card */}
        <aside className="lg:sticky lg:top-6 flex flex-col gap-4">
          <div className="border border-default-100 rounded-xl p-5 flex flex-col gap-4">
            {/* Deadline */}
            <div className="flex items-center gap-2">
              <FiClock size={14} className="text-violet-500 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-foreground-400">
                  Application Deadline
                </span>
                <span
                  className={`text-sm font-medium ${
                    isExpired ? "text-red-500" : "text-foreground"
                  }`}
                >
                  {new Date(opportunity.deadline).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="border-t border-default-100" />

            {/* CTA */}
            {!isLoggedIn ? (
              <Link
                href="/login"
                className="w-full text-center bg-violet-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-violet-700 transition-colors"
              >
                Log in to Apply
              </Link>
            ) : isExpired ? (
              <p className="text-xs text-center text-red-500 font-medium py-2">
                This opportunity has expired.
              </p>
            ) : isFounder ? (
              <div className="bg-default-50 rounded-lg p-3 text-center">
                <p className="text-xs text-foreground-500 font-medium">
                  {isOwnStartup
                    ? "This is your opportunity."
                    : "Founders cannot apply for opportunities."}
                </p>
                {!isOwnStartup && (
                  <p className="text-[10px] text-foreground-400 mt-1">
                    Switch to a collaborator account to apply.
                  </p>
                )}
              </div>
            ) : (
              <ApplyModal opportunity={opportunity} currentUser={currentUser} />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
