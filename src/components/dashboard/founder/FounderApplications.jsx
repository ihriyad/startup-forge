"use client";

import { useState } from "react";
import { Button, Avatar } from "@heroui/react";
import { toast } from "sonner";
import {
  FiCheck, FiX, FiExternalLink,
  FiClock, FiBriefcase, FiUsers,
} from "react-icons/fi";
import { updateApplication } from "@/lib/actions/founder/applications";


// status badge config
const STATUS_STYLES = {
  pending:  "bg-amber-100  text-amber-600  dark:bg-amber-900/30  dark:text-amber-400",
  accepted: "bg-green-100  text-green-600  dark:bg-green-900/30  dark:text-green-400",
  rejected: "bg-red-100    text-red-600    dark:bg-red-900/30    dark:text-red-400",
};

const StatusBadge = ({ status }) => (
  <span
    className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
      STATUS_STYLES[status] ?? STATUS_STYLES.pending
    }`}
  >
    {status ?? "pending"}
  </span>
);

// single application card — different from table, card-based layout
const ApplicationCard = ({ app, onAction, actionLoadingId }) => {
  const isPending  = app.status === "pending";
  const isLoading  = actionLoadingId === app._id;

  return (
    <div className="border border-default-100 rounded-xl p-5 flex flex-col gap-4 hover:border-violet-200 dark:hover:border-violet-800 transition-colors">

      {/* Top Row — applicant info + status */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <Avatar
            name={app.applicant_email}
            size="sm"
            className="shrink-0 bg-violet-100 dark:bg-violet-900/30 text-violet-600"
          />
          <div>
            <p className="text-sm font-medium text-foreground">
              {app.applicant_email}
            </p>
            <p className="text-xs text-foreground-400 mt-0.5">
              Applied{" "}
              {new Date(app.applied_at).toLocaleDateString("en-US", {
                month: "short",
                day:   "numeric",
                year:  "numeric",
              })}
            </p>
          </div>
        </div>
        <StatusBadge status={app.status} />
      </div>

      {/* Meta — role + startup */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-1.5 text-xs text-foreground-500">
          <FiBriefcase size={12} className="text-violet-500 shrink-0" />
          <span>{app.role_title ?? "—"}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-foreground-500">
          <FiUsers size={12} className="text-violet-500 shrink-0" />
          <span>{app.startup_name ?? "—"}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-foreground-500">
          <FiClock size={12} className="text-violet-500 shrink-0" />
          <span>Deadline: {app.deadline
            ? new Date(app.deadline).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric",
              })
            : "—"}
          </span>
        </div>
      </div>

      {/* Motivation message */}
      {app.motivation && (
        <div className="bg-default-50 rounded-lg p-3">
          <p className="text-xs text-foreground-400 mb-1 font-medium">
            Motivation
          </p>
          <p className="text-sm text-foreground leading-relaxed line-clamp-3">
            {app.motivation}
          </p>
        </div>
      )}

      {/* Bottom Row — portfolio + actions */}
      <div className="flex items-center justify-between gap-3 flex-wrap pt-1 border-t border-default-100">
        {/* Portfolio link */}
        {app.portfolio_link ? (
          <a
            href={app.portfolio_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-violet-600 hover:text-violet-700 font-medium transition-colors"
          >
            <FiExternalLink size={12} />
            View Portfolio
          </a>
        ) : (
          <span className="text-xs text-foreground-400">No portfolio link</span>
        )}

        {/* Action buttons — only show if pending */}
        {isPending ? (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="flat"
              isLoading={isLoading}
              onClick={() => onAction(app._id, "rejected")}
              className="bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 text-xs"
             
            >
             <FiX size={13} /> Decline
            </Button>
            <Button
              size="sm"
              variant="flat"
              isLoading={isLoading}
              onClick={() => onAction(app._id, "accepted")}
              className="bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 text-xs"
              
            >
            <FiCheck size={13} />  Accept
            </Button>
          </div>
        ) : (
          // allow founder to revert a decision back to pending
          <Button
            size="sm"
            variant="flat"
            isLoading={isLoading}
            onClick={() => onAction(app._id, "pending")}
            className="bg-default-100 text-foreground-500 text-xs"
          >
            Undo Decision
          </Button>
        )}
      </div>
    </div>
  );
};

// ── Main Component ───────────────────────────────────────────────────────────
export const FounderApplications = ({ applications: initial }) => {
  const [applications, setApplications] = useState(initial);
  const [actionLoadingId, setActionLoadingId]   = useState(null);
  const [activeFilter, setActiveFilter]         = useState("all");

  const handleAction = async (appId, newStatus) => {
    setActionLoadingId(appId);
    try {
      await updateApplication(appId, { status: newStatus });
      setApplications((prev) =>
        prev.map((a) => (a._id === appId ? { ...a, status: newStatus } : a))
      );
      toast.success(
        newStatus === "accepted"
          ? "Applicant accepted."
          : newStatus === "rejected"
          ? "Applicant declined."
          : "Status reset to pending."
      );
    } catch {
      toast.error("Action failed. Please try again.");
    } finally {
      setActionLoadingId(null);
    }
  };

  // filter tabs
  const FILTERS = [
    { id: "all",      label: "All",      count: applications.length                                    },
    { id: "pending",  label: "Pending",  count: applications.filter((a) => a.status === "pending").length  },
    { id: "accepted", label: "Accepted", count: applications.filter((a) => a.status === "accepted").length },
    { id: "rejected", label: "Declined", count: applications.filter((a) => a.status === "rejected").length },
  ];

  const filtered =
    activeFilter === "all"
      ? applications
      : applications.filter((a) => a.status === activeFilter);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Applications</h1>
        <p className="text-sm text-foreground-500 mt-1">
          Review and manage collaborator applications.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 border-b border-default-100 pb-0">
        {FILTERS.map(({ id, label, count }) => (
          <button
            key={id}
            onClick={() => setActiveFilter(id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeFilter === id
                ? "border-violet-600 text-violet-600"
                : "border-transparent text-foreground-500 hover:text-foreground"
            }`}
          >
            {label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeFilter === id
                  ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300"
                  : "bg-default-100 text-foreground-400"
              }`}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-foreground-400 gap-2">
          <FiUsers size={32} className="text-violet-300" />
          <p className="text-sm">No {activeFilter !== "all" ? activeFilter : ""} applications yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((app) => (
            <ApplicationCard
              key={app._id}
              app={app}
              onAction={handleAction}
              actionLoadingId={actionLoadingId}
            />
          ))}
        </div>
      )}
    </div>
  );
};