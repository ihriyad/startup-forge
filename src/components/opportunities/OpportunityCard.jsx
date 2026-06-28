"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@heroui/react";
import { FiClock, FiBriefcase } from "react-icons/fi";

export const OpportunityCard = ({ opportunity, currentUser }) => {
  const isExpired =
    opportunity.deadline && new Date(opportunity.deadline) < new Date();

  return (
    <Card className="relative bg-content1 border-2 border-transparent hover:border-violet-600 transition-all duration-300 rounded-2xl shadow-sm min-h-[280px] sm:min-h-[300px] h-full flex flex-col justify-between group">
      
      {/* Invisible Absolute Link Anchor Hook for entire card navigation */}
      <Link 
        href={`/opportunities/${opportunity._id}`} 
        className="absolute inset-0 z-30 w-full h-full" 
        aria-label={`View details for ${opportunity.role_title}`}
      />

      {/* Top Section: Header & Meta Info */}
      <div className="flex flex-col flex-1 w-full">
        {/* Role Title and Status Badge */}
        <Card.Header className="flex items-start justify-between gap-4 p-6 pb-2 z-10">
          <div className="flex flex-col gap-1">
            <Card.Title className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug">
              {opportunity.role_title}
            </Card.Title>
            <span className="text-xs text-violet-600 dark:text-violet-400 font-medium">
              {opportunity.startup_name}
            </span>
          </div>
          <span
            className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium tracking-wide shrink-0 ${
              isExpired
                ? "bg-danger/10 text-danger"
                : "bg-success/10 text-success"
            }`}
          >
            {isExpired ? "Expired" : "Open"}
          </span>
        </Card.Header>

        {/* Middle Section: Work Type & Skills with enhanced spacing */}
        <Card.Content className="px-6 py-3 flex flex-col gap-5 z-10">
          {/* Work Mode metadata */}
          <div className="flex items-center gap-1.5 text-xs text-default-400 font-normal">
            <FiBriefcase size={13} className="shrink-0" />
            <span className="capitalize">{opportunity.work_type}</span>
            <span>·</span>
            <span className="capitalize">{opportunity.commitment_level}</span>
          </div>

          {/* Required Skills Badges array block - extra breathing room */}
          <div className="flex flex-wrap gap-2 pt-1">
            {opportunity.required_skills?.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="text-[11px] px-3 py-1 rounded-full bg-violet-600/10 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400 font-medium tracking-wide"
              >
                {skill}
              </span>
            ))}
            {opportunity.required_skills?.length > 3 && (
              <span className="text-[11px] px-3 py-1 rounded-full bg-default-100 text-default-500 font-medium">
                +{opportunity.required_skills.length - 3} more
              </span>
            )}
          </div>
        </Card.Content>
      </div>

      {/* Bottom Section: Footer Actions and Condition Notices */}
      <div className="w-full z-10">
        <Card.Footer className="flex flex-col items-stretch border-t border-divider/60 px-6 py-4 bg-default-50/30 dark:bg-default-50/10 gap-3">
          {/* Timeline and Deadline component tracker */}
          <div className="flex items-center gap-1.5 text-xs text-default-400 font-normal">
            <FiClock size={13} className="shrink-0" />
            <span>
              Deadline:{" "}
              {new Date(opportunity.deadline).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Founder Context Prompt Flag block */}
          {currentUser?.role === "founder" && (
            <div className="border-t border-divider/40 pt-2.5">
              <p className="text-[10px] text-default-400 font-normal">
                Founders cannot apply for opportunities.
              </p>
            </div>
          )}
        </Card.Footer>
      </div>

    </Card>
  );
};