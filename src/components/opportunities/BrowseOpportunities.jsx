// components/opportunities/BrowseOpportunities.jsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import Link from "next/link";
import { RadioGroup, Radio, Label } from "@heroui/react";
import {
  FiSearch,
  FiBriefcase,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { OpportunityCard } from "./OpportunityCard";

const WORK_TYPES = [
  { id: "remote", label: "Remote" },
  { id: "on-site", label: "On-Site" },
  { id: "hybrid", label: "Hybrid" },
];

const INDUSTRIES = [
  { id: "technology", label: "Technology" },
  { id: "health-care", label: "Health Care" },
  { id: "finance", label: "Finance" },
  { id: "education", label: "Education" },
  { id: "operations", label: "Operations" },
  { id: "e-commerce", label: "E-Commerce" },
  { id: "other", label: "Other" },
];

// ── Filter Sidebar ───────────────────────────────────────────────────────────
const FilterSidebar = ({ filters, onFilterChange, onReset }) => {
  const hasActiveFilters =
    filters.workType || filters.industry || filters.search;

  return (
    <aside className="w-full md:w-64 shrink-0 flex flex-col gap-5">
      <div className="border border-default-100 rounded-xl p-4 flex flex-col gap-5 sticky top-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Filters</p>
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 font-medium transition-colors"
            >
              <FiX size={12} />
              Clear all
            </button>
          )}
        </div>

        {/* Work Type */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-foreground-500 uppercase tracking-wide">
            Work Type
          </p>
          <RadioGroup
            value={filters.workType}
            onChange={(val) => onFilterChange("workType", val)}
          >
            <Radio value="">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <span className="text-sm text-foreground-600">All</span>
              </Radio.Content>
            </Radio>
            {WORK_TYPES.map(({ id, label }) => (
              <Radio key={id} value={id}>
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  <span className="text-sm text-foreground-600">{label}</span>
                </Radio.Content>
              </Radio>
            ))}
          </RadioGroup>
        </div>

        <div className="border-t border-default-100" />

        {/* Industry */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-foreground-500 uppercase tracking-wide">
            Industry
          </p>
          <RadioGroup
            value={filters.industry}
            onChange={(val) => onFilterChange("industry", val)}
          >
            <Radio value="">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <span className="text-sm text-foreground-600">All</span>
              </Radio.Content>
            </Radio>
            {INDUSTRIES.map(({ id, label }) => (
              <Radio key={id} value={id}>
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  <span className="text-sm text-foreground-600">{label}</span>
                </Radio.Content>
              </Radio>
            ))}
          </RadioGroup>
        </div>
      </div>
    </aside>
  );
};

// ── Pagination ───────────────────────────────────────────────────────────────
const Pagination = ({ currentPage, total, limit, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-default-100 text-foreground-500 hover:border-violet-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <FiChevronLeft size={16} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
            currentPage === p
              ? "bg-violet-600 text-white"
              : "border border-default-100 text-foreground-500 hover:border-violet-400"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-default-100 text-foreground-500 hover:border-violet-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <FiChevronRight size={16} />
      </button>
    </div>
  );
};

// ── Main Component ───────────────────────────────────────────────────────────
export const BrowseOpportunities = ({
  opportunities,
  total,
  currentPage,
  currentUser,
  filters: initialFilters,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(initialFilters.search);
  const LIMIT = 9;

  // push filter changes to URL — server re-fetches with new params
  const updateURL = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, val]) => {
        if (val) {
          params.set(key, val);
        } else {
          params.delete(key);
        }
      });
      params.set("page", "1"); // reset to page 1 on filter change
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  const handleFilterChange = (key, value) => {
    updateURL({ [key]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateURL({ search: searchInput });
  };

  const handleReset = () => {
    setSearchInput("");
    router.push(pathname);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Browse Opportunities
        </h1>
        <p className="text-sm text-foreground-500 mt-2">
          Find the perfect role across{" "}
          <span className="text-violet-600 font-medium">{total}</span> open
          opportunities.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Filter Sidebar */}
        <FilterSidebar
          filters={{
            workType: initialFilters.workType,
            industry: initialFilters.industry,
            search: initialFilters.search,
          }}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />

        {/* Main Content */}
        <section className="flex-1 min-w-0 flex flex-col gap-5">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative flex gap-2">
            <div className="relative flex-1">
              <FiSearch
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400"
              />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by role title or skill..."
                className="w-full pl-9 pr-4 py-2.5 border border-default-200 rounded-lg bg-transparent text-sm outline-none focus:border-violet-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors shrink-0"
            >
              Search
            </button>
          </form>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-foreground-500">
              Showing{" "}
              <span className="font-medium text-foreground">
                {opportunities.length}
              </span>{" "}
              of <span className="font-medium text-foreground">{total}</span>{" "}
              opportunities
            </p>
          </div>

          {/* Grid */}
          {opportunities.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-dashed border-default-200 rounded-xl h-60 gap-3 text-foreground-400">
              <FiBriefcase size={32} className="text-violet-300" />
              <p className="text-sm">
                No opportunities found. Try adjusting your filters.
              </p>
              <button
                onClick={handleReset}
                className="text-xs text-violet-600 hover:underline font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {opportunities.map((opp) => (
                <OpportunityCard
                  key={opp._id}
                  opportunity={opp}
                  currentUser={currentUser}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            total={total}
            limit={LIMIT}
            onPageChange={handlePageChange}
          />
        </section>
      </div>
    </div>
  );
};
