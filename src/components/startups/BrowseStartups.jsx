// components/startups/BrowseStartups.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <Link
      href={`/startups/${startup._id}`}
      className="border border-default-100 rounded-xl p-5 flex flex-col gap-4 hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-sm transition-all"
    >
      {/* Top — logo + name + badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {startup.logo ? (
            <Image
              src={startup.logo}
              alt={startup.startup_name}
              width={44}
              height={44}
              className="rounded-xl object-cover w-11 h-11 shrink-0"
            />
          ) : (
            <div className="w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 font-bold text-lg shrink-0">
              {startup.startup_name?.[0]}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-foreground leading-snug">
              {startup.startup_name}
            </p>
            <p className="text-xs text-foreground-400 mt-0.5 capitalize">
              {startup.industry}
            </p>
          </div>
        </div>

        {/* Your startup badge */}
        {isOwnStartup && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 font-medium whitespace-nowrap shrink-0">
            Your Startup
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-foreground-500 leading-relaxed line-clamp-2">
        {startup.description}
      </p>

      {/* Footer — funding stage + opportunity count */}
      <div className="flex items-center justify-between pt-2 border-t border-default-100">
        <span className="text-xs text-foreground-400 capitalize">
          {startup.funding_stage}
        </span>
        <div className="flex items-center gap-1.5 text-xs text-violet-600 font-medium">
          <FiBriefcase size={12} />
          {startup.opportunityCount ?? 0} opportunit
          {startup.opportunityCount === 1 ? "y" : "ies"}
        </div>
      </div>
    </Link>
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
    <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Browse Startups</h1>
        <p className="text-sm text-foreground-500 mt-2">
          Discover {startups.length} startup{startups.length !== 1 ? "s" : ""}{" "}
          looking for talented collaborators.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <FiSearch
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search startups by name or description..."
          className="w-full pl-9 pr-4 py-2.5 border border-default-200 rounded-lg bg-transparent text-sm outline-none focus:border-violet-500 transition-colors"
        />
      </div>

      {/* Industry Filter */}
      <div className="overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind}
              onClick={() => setActiveIndustry(ind)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                activeIndustry === ind
                  ? "bg-violet-600 text-white"
                  : "bg-default-100 text-foreground-500 hover:bg-default-200"
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-foreground-400">
          <FiBriefcase size={36} className="text-violet-300" />
          <p className="text-sm">No startups found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
