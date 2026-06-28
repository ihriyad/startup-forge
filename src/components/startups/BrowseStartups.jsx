"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@heroui/react";
import { FiBriefcase, FiSearch } from "react-icons/fi";

const INDUSTRIES = [
  "all",
  "technology",
  "health-care",
  "finance",
  "education",
  "operations",
  "e-commerce",
  "other",
];

const StartupCard = ({ startup, currentUser }) => {
  const isOwnStartup = currentUser?.email === startup.founder_email;

  return (
    <Card className="relative bg-content1 border border-divider hover:border-violet-500/40 hover:shadow-xl transition-all duration-300 rounded-2xl min-h-[320px] h-full overflow-hidden group">
      {/* Background Media Container with Clearer, Low-Opacity Overlay Mask */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {startup.logo ? (
          <Image
            src={startup.logo}
            alt={startup.startup_name}
            fill
            sizes="(max-w-768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-violet-900/40 via-background to-background" />
        )}
        {/* Softened vignette mask layer to let the card graphic shine while keeping text legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent dark:from-background dark:via-background/50 dark:to-transparent z-10" />
      </div>

      {/* Main Interaction layer containing Absolute Link Anchor hook */}
      <Link
        href={`/startups/${startup._id}`}
        className="absolute inset-0 z-50 w-full h-full"
        aria-label={`View ${startup.startup_name}`}
      />

      {/* Structural layout content pushed down utilizing flex-col justify-end layout */}
      <div className="relative z-20 flex flex-col justify-end h-full min-h-[320px] w-full pointer-events-none">
        {/* Text Container - Wrapped together to gather cleanly at the lower end of the card frame */}
        <div className="p-5 pb-0 flex flex-col gap-1.5">
          {/* Header row containing title, industry label and ownership banner */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col">
              <Card.Title className="text-base font-bold text-white dark:text-foreground tracking-tight leading-tight [text-shadow:_0_1px_4px_rgba(0,0,0,0.6)]">
                {startup.startup_name}
              </Card.Title>
              <Card.Description className="text-xs text-zinc-200 dark:text-default-400 capitalize mt-0.5 font-semibold">
                {startup.industry}
              </Card.Description>
            </div>

            {/* User Own Project Context Badge indicator element */}
            {isOwnStartup && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-600 text-white font-bold tracking-wide uppercase whitespace-nowrap shrink-0 shadow-sm">
                Your Startup
              </span>
            )}
          </div>

          {/* Content Description Statement Block */}
          <Card.Content className="p-0">
            <p className="text-xs text-zinc-200 dark:text-default-300 leading-relaxed font-normal line-clamp-2 [text-shadow:_0_1px_2px_rgba(0,0,0,0.4)]">
              {startup.description}
            </p>
          </Card.Content>
        </div>

        {/* Footer Data Metrics Segment panel */}
        <Card.Footer className="flex items-center justify-between border-t border-white/10 dark:border-divider p-5 pt-3 mt-3 bg-gradient-to-t from-black/60 to-transparent dark:from-background/80 dark:to-transparent">
          <span className="text-xs text-zinc-300 dark:text-default-400 font-bold uppercase tracking-wider">
            {startup.funding_stage}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-violet-400 dark:text-violet-400 font-black">
            <FiBriefcase size={13} />
            <span>
              {startup.opportunityCount ?? 0} opportunit
              {startup.opportunityCount === 1 ? "y" : "ies"}
            </span>
          </div>
        </Card.Footer>
      </div>
    </Card>
  );
};

export const BrowseStartups = ({ startups, currentUser }) => {
  const [search, setSearch] = useState("");
  const [activeIndustry, setActiveIndustry] = useState("all");

  const filtered = startups.filter((s) => {
    const matchesSearch =
      s.startup_name.toLowerCase().includes(search.toLowerCase()) ||
      s.description?.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry =
      activeIndustry === "all" || s.industry === activeIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col gap-10">
      {/* Header Container Area */}
      <div className="flex flex-col text-center items-center justify-center">
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          Browse Startups
        </h1>
        <p className="text-sm text-default-400 mt-2 max-w-md">
          Discover {startups.length} startup{startups.length !== 1 ? "s" : ""}{" "}
          looking for talented collaborators.
        </p>
      </div>

      {/* Search Input Block - Centered */}
      <div className="flex justify-center w-full">
        <div className="relative max-w-xl w-full">
          <FiSearch
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-default-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search startups by name or description..."
            className="w-full pl-10 pr-4 py-2.5 border border-divider rounded-xl bg-content1 text-sm outline-none focus:border-violet-500 transition-colors shadow-sm text-foreground placeholder:text-default-400"
          />
        </div>
      </div>

      {/* Fixed: Responsive wrapped pill layout instead of a breaking horizontal bar */}
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl px-2">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind}
              onClick={() => setActiveIndustry(ind)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-semibold capitalize transition-all cursor-pointer whitespace-nowrap ${
                activeIndustry === ind
                  ? "bg-violet-600 text-white shadow-md shadow-violet-600/10"
                  : "bg-default-100 dark:bg-default-50 text-default-500 hover:bg-default-200 dark:hover:bg-default-100"
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Interface View */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-default-400 border border-dashed border-divider rounded-2xl bg-content1/40 max-w-md mx-auto w-full">
          <FiBriefcase size={32} className="text-violet-400/60" />
          <p className="text-sm font-medium">
            No startups found matching your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filtered.map((startup) => (
            <StartupCard
              key={startup._id}
              startup={startup}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};
