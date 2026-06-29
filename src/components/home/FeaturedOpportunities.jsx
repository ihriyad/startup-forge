"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@heroui/react";
import { FiBriefcase, FiClock, FiTag, FiArrowRight } from "react-icons/fi";

export const FeaturedOpportunities = ({ opportunities }) => {
  return (
    <section className="max-w-[1100px] mx-auto px-6 py-16 border-t border-default-100">
      
      {/* Header Block Section */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            Featured Opportunities
          </h2>
          <p className="text-sm text-default-400 mt-1">
            Latest open roles across top startups
          </p>
        </div>
        <Link
          href="/opportunities"
          className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-violet-600 dark:text-violet-400 font-bold hover:text-violet-700 transition-colors"
        >
          <span>View all roles</span>
          <FiArrowRight size={14} />
        </Link>
      </div>

      {/* Main Multi-device Grid Layout Frame */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((opp) => {
          const isExpired = opp.deadline && new Date(opp.deadline) < new Date();

          return (
            <Link
              key={opp._id}
              href={`/opportunities/${opp._id}`}
              className="h-full block group"
            >
              <Card className="h-full bg-content1 border-2 border-transparent hover:border-violet-600 transition-all duration-300 rounded-2xl shadow-sm min-h-[300px] flex flex-col justify-between">
                
                {/* Upper Structural Info Segment */}
                <div className="flex flex-col flex-1 w-full">
                  <Card.Header className="flex items-start justify-between gap-4 p-6 pb-2">
                    <div className="flex flex-col gap-1">
                      <Card.Title className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug">
                        {opp.role_title}
                      </Card.Title>
                      <span className="text-xs text-violet-600 dark:text-violet-400 font-medium">
                        {opp.startup_name}
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

                  {/* Roomy Skills Tags View Block */}
                  <Card.Content className="px-6 py-3 flex flex-col gap-5">
                    <div className="flex flex-wrap gap-2">
                      {opp.required_skills?.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] px-3 py-1 rounded-full bg-violet-600/10 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400 font-medium tracking-wide"
                        >
                          {skill}
                        </span>
                      ))}
                      {opp.required_skills?.length > 4 && (
                        <span className="text-[11px] px-3 py-1 rounded-full bg-default-100 text-default-500 font-medium">
                          +{opp.required_skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </Card.Content>
                </div>

                {/* Bottom Metadata Alignment Panel */}
                <div className="w-full">
                  <Card.Footer className="flex flex-col items-stretch px-6 py-4 bg-default-50/30 dark:bg-default-50/10 gap-3">
                    
                    {/* Primary Engagement Specifications Line */}
                    <div className="flex items-center gap-1.5 text-xs text-default-400 font-normal">
                      <FiBriefcase size={13} className="shrink-0" />
                      <span className="capitalize">{opp.work_type}</span>
                      <span>·</span>
                      <span className="capitalize">{opp.commitment_level}</span>
                    </div>

                    {/* Deadline Grid Meta Row */}
                    <div className="flex items-center justify-between flex-wrap gap-2 pt-1.5 border-t border-divider/40">
                      <div className="flex items-center gap-1.5 text-xs text-default-400 font-normal">
                        <FiClock size={13} className="shrink-0" />
                        <span className={isExpired ? "text-danger font-medium" : ""}>
                          {opp.deadline
                            ? new Date(opp.deadline).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "No deadline"}
                        </span>
                      </div>
                      
                      {opp.industry && (
                        <div className="flex items-center gap-1 text-xs text-default-400 font-normal">
                          <FiTag size={13} className="shrink-0" />
                          <span className="capitalize">{opp.industry}</span>
                        </div>
                      )}
                    </div>

                  </Card.Footer>
                </div>

              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};