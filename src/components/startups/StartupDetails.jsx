"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@heroui/react";
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
  const isAdmin = currentUser?.role === "admin";
  const isOwnStartup = currentUser?.email === startup.founder_email;
  const isLoggedIn = !!currentUser;
  const isExpired = opportunity.deadline && new Date(opportunity.deadline) < new Date();

  return (
    <Card className="relative bg-content1 border-2 border-transparent hover:border-violet-600 transition-all duration-300 rounded-2xl shadow-sm min-h-[280px] sm:min-h-[300px] h-full flex flex-col justify-between group">
      
      {/* Interactive Operations Navigation Interceptor Layer */}
      {!isOwnStartup && isLoggedIn && !isFounder && !isAdmin && (
        <Link 
          href={`/opportunities/${opportunity._id}`} 
          className="absolute inset-0 z-20 w-full h-full" 
          aria-label={`View details for ${opportunity.role_title}`}
        />
      )}

      {/* Top Section: Header & Meta Info */}
      <div className="flex flex-col flex-1 w-full">
        {/* Role Title and Status Badge */}
        <Card.Header className="flex items-start justify-between gap-4 p-6 pb-2 z-10">
          <div className="flex flex-col gap-1">
            <Card.Title className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug">
              {opportunity.role_title}
            </Card.Title>
            <span className="text-xs text-violet-600 dark:text-violet-400 font-medium">
              {opportunity.work_type} · {opportunity.commitment_level}
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
          {/* Required Skills Badges array block - extra breathing room */}
          <div className="flex flex-wrap gap-2 pt-1">
            {opportunity.required_skills?.map((skill) => (
              <span
                key={skill}
                className="text-[11px] px-3 py-1 rounded-full bg-violet-600/10 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400 font-medium tracking-wide"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card.Content>
      </div>

      {/* Bottom Section: Footer Actions and Condition Notices */}
      <div className="w-full z-30">
        <Card.Footer className="flex flex-col items-stretch px-6 py-4 bg-default-50/30 dark:bg-default-50/10 gap-3">
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

          {/* Interactive Form Action Trigger Area */}
          <div className="w-full pt-1">
            {!isLoggedIn ? (
              <Link
                href="/login"
                className="text-xs text-violet-600 dark:text-violet-400 font-bold hover:underline inline-flex items-center gap-1"
              >
                Log in to apply →
              </Link>
            ) : isFounder ? (
              <p className="text-[11px] text-default-400 font-medium">
                {isOwnStartup
                  ? "This is your opportunity."
                  : "Founders cannot apply for opportunities."}
              </p>
            ) : isAdmin ? (
              <p className="text-[11px] text-default-400 font-medium">Admin can&lsquo;t Apply for Opportunities.</p>
            ) : (
              <ApplyModal opportunity={opportunity} currentUser={currentUser} />
            )}
          </div>
        </Card.Footer>
      </div>

    </Card>
  );
};

export const StartupDetails = ({ startup, opportunities, currentUser }) => {
  const isOwnStartup = currentUser?.email === startup.founder_email;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-6">
      
      {/* Return Back Route Anchor Link */}
      <Link
        href="/startups"
        className="flex items-center gap-1.5 text-xs font-bold text-default-400 hover:text-violet-600 transition-colors w-fit uppercase tracking-wider"
      >
        <FiArrowLeft size={14} />
        <span>Back to Startups</span>
      </Link>

      {/* Big Cover Image Section without any text content on top */}
      <div className="relative w-full h-[200px] sm:h-[360px] rounded-2xl overflow-hidden shadow-sm bg-content1">
        {startup.logo ? (
          <Image
            src={startup.logo}
            alt={`${startup.startup_name} cover`}
            fill
            priority
            sizes="(max-w-896px) 100vw, 896px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-violet-600/20 via-content1 to-content1 flex items-center justify-center text-violet-600/30 font-black text-5xl sm:text-7xl select-none">
            {startup.startup_name?.[0]}
          </div>
        )}
      </div>

      {/* Borderless Profile Detail Hub Card below the cover */}
      <Card className="bg-content1 shadow-sm rounded-2xl p-2 md:p-4 border-none">
        
        {/* Core Profile Details Section */}
        <Card.Header className="flex flex-row items-center justify-between gap-4 p-4 pb-2">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <Card.Title className="text-xl sm:text-2xl font-black tracking-tight text-foreground leading-none">
                  {startup.startup_name}
                </Card.Title>
                {isOwnStartup && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-600/10 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400 font-bold tracking-wide uppercase">
                    Your Startup
                  </span>
                )}
              </div>
              <Card.Description className="text-xs font-semibold text-default-400 capitalize mt-2">
                {startup.industry}
              </Card.Description>
            </div>
          </div>

          {/* Optimized downsized counter panel layout for mobile screens */}
          <div className="flex flex-col items-center bg-default-100 dark:bg-default-50 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl shrink-0 min-w-[65px] sm:min-w-[80px] shadow-sm">
            <span className="text-base sm:text-lg font-black text-violet-600 dark:text-violet-400 leading-none">
              {opportunities.length}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-default-400 uppercase tracking-wide mt-1 text-center">
              Opp{opportunities.length === 1 ? "" : "s"}
            </span>
          </div>
        </Card.Header>

        {/* Detailed Metadata Structural Grid Segment - Borderless */}
        <Card.Content className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 py-5 my-2 bg-default-50/30 rounded-xl">
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-violet-600/5 dark:bg-violet-600/10 rounded-lg text-violet-500 shrink-0">
              <FiTag size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-default-400 uppercase tracking-wider">
                Funding Stage
              </span>
              <span className="text-xs text-foreground font-semibold capitalize mt-0.5">
                {startup.funding_stage}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-violet-600/5 dark:bg-violet-600/10 rounded-lg text-violet-500 shrink-0">
              <FiMail size={14} />
            </div>
            <div className="flex flex-col min-w-0 w-full">
              <span className="text-[10px] font-bold text-default-400 uppercase tracking-wider">Founder</span>
              <span className="text-xs text-foreground font-semibold mt-0.5 truncate block w-full">
                {startup.founder_email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-violet-600/5 dark:bg-violet-600/10 rounded-lg text-violet-500 shrink-0">
              <FiUsers size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-default-400 uppercase tracking-wider">Status</span>
              <span className="text-xs text-success font-bold capitalize mt-0.5">
                {startup.status}
              </span>
            </div>
          </div>

        </Card.Content>

        {/* Longform Editorial Description Content */}
        <Card.Footer className="flex flex-col items-start gap-2 p-4 pt-2">
          <span className="text-xs font-bold text-default-400 uppercase tracking-wider">About Startup</span>
          <p className="text-sm text-default-600 dark:text-default-400 leading-relaxed font-normal text-left">
            {startup.description}
          </p>
        </Card.Footer>

      </Card>

      {/* Available Opportunities Segment Panel */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center gap-2 px-1">
          <FiBriefcase size={16} className="text-violet-600" />
          <h2 className="text-lg font-bold text-foreground tracking-tight">
            Open Opportunities
          </h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-600/10 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400 font-bold">
            {opportunities.length}
          </span>
        </div>

        {opportunities.length === 0 ? (
          <div className="border border-dashed border-divider rounded-2xl p-12 flex flex-col items-center gap-2 text-default-400 bg-content1/50">
            <FiBriefcase size={28} className="text-violet-400/40" />
            <p className="text-xs font-semibold">No open opportunities at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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