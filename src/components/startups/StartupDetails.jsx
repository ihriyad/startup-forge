"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FiBriefcase,
  FiMail,
  FiTag,
  FiClock,
  FiUsers,
  FiArrowLeft,
} from "react-icons/fi";
import { ApplyModal } from "../opportunities/ApplyModal";


const OpportunityCard = ({ opportunity, currentUser, startup }) => {
  const isFounder = currentUser?.role === "founder";
  const isOwnStartup = currentUser?.email === startup.founder_email;
  const isLoggedIn = !!currentUser;

  return (
    <div className="border border-default-100 rounded-xl p-5 flex flex-col gap-4 hover:border-violet-200 dark:hover:border-violet-800 transition-colors">
      {/* Role + work type */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <p className="text-sm font-semibold text-foreground">
            {opportunity.role_title}
          </p>
          <p className="text-xs text-foreground-400 mt-0.5 capitalize">
            {opportunity.work_type} · {opportunity.commitment_level}
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 font-medium">
          Open
        </span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {opportunity.required_skills?.map((skill) => (
          <span
            key={skill}
            className="text-[10px] px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Deadline */}
      <div className="flex items-center gap-1.5 text-xs text-foreground-400">
        <FiClock size={12} />
        Deadline:{" "}
        {new Date(opportunity.deadline).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>

      {/* CTA */}
      <div className="pt-2 border-t border-default-100">
        {!isLoggedIn ? (
          <Link
            href="/login"
            className="text-xs text-violet-600 font-medium hover:underline"
          >
            Log in to apply →
          </Link>
        ) : isFounder ? (
          // founders see a friendly info text instead of apply button
          <p className="text-xs text-foreground-400 italic">
            {isOwnStartup
              ? "This is your opportunity."
              : "Founders cannot apply for opportunities."}
          </p>
        ) : (
          <ApplyModal opportunity={opportunity} currentUser={currentUser} />
        )}
      </div>
    </div>
  );
};

export const StartupDetails = ({ startup, opportunities, currentUser }) => {
  const isOwnStartup = currentUser?.email === startup.founder_email;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-8">
      {/* Back */}
      <Link
        href="/startups"
        className="flex items-center gap-1.5 text-sm text-foreground-500 hover:text-violet-600 transition-colors w-fit"
      >
        <FiArrowLeft size={15} />
        Back to Startups
      </Link>

      {/* Startup Header */}
      <div className="border border-default-100 rounded-xl p-6 flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            {startup.logo ? (
              <Image
                src={startup.logo}
                alt={startup.startup_name}
                width={64}
                height={64}
                className="rounded-xl object-cover w-16 h-16 shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 font-bold text-2xl shrink-0">
                {startup.startup_name?.[0]}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-foreground">
                  {startup.startup_name}
                </h1>
                {isOwnStartup && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 font-medium">
                    Your Startup
                  </span>
                )}
              </div>
              <span className="text-xs text-foreground-400 capitalize">
                {startup.industry}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-lg font-semibold text-violet-600">
                {opportunities.length}
              </span>
              <span className="text-[10px] text-foreground-400">
                Opportunit{opportunities.length === 1 ? "y" : "ies"}
              </span>
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <FiTag size={13} className="text-violet-500 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] text-foreground-400">
                Funding Stage
              </span>
              <span className="text-xs text-foreground capitalize">
                {startup.funding_stage}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FiMail size={13} className="text-violet-500 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] text-foreground-400">Founder</span>
              <span className="text-xs text-foreground">
                {startup.founder_email}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FiUsers size={13} className="text-violet-500 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] text-foreground-400">Status</span>
              <span className="text-xs text-green-600 capitalize font-medium">
                {startup.status}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-foreground-400 font-medium">About</span>
          <p className="text-sm text-foreground leading-relaxed">
            {startup.description}
          </p>
        </div>
      </div>

      {/* Opportunities Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <FiBriefcase size={16} className="text-violet-600" />
          <h2 className="text-lg font-semibold text-foreground">
            Open Opportunities
          </h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 font-medium">
            {opportunities.length}
          </span>
        </div>

        {opportunities.length === 0 ? (
          <div className="border border-default-100 rounded-xl p-8 flex flex-col items-center gap-2 text-foreground-400">
            <FiBriefcase size={28} className="text-violet-300" />
            <p className="text-sm">No open opportunities at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {opportunities.map((opp) => (
              <OpportunityCard
                key={opp._id}
                opportunity={opp}
                currentUser={currentUser}
                startup={startup}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
