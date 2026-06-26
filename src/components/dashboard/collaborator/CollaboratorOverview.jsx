"use client";

import Link from "next/link";
import {
  FiSend, FiCheck, FiX,
  FiClock, FiSearch, FiArrowRight,
} from "react-icons/fi";

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-default-50 rounded-lg p-5 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <span className="text-xs text-foreground-500">{label}</span>
      <Icon size={15} className={color} />
    </div>
    <p className="text-3xl font-semibold text-foreground">{value}</p>
  </div>
);

export const CollaboratorOverview = ({ user, applications }) => {
  const total    = applications.length;
  const pending  = applications.filter((a) => a.status === "pending").length;
  const accepted = applications.filter((a) => a.status === "accepted").length;
  const rejected = applications.filter((a) => a.status === "rejected").length;

  // last 3 applications for the recent activity section
  const recent = applications.slice(0, 3);

  const STATUS_STYLES = {
    pending:  "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    accepted: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    rejected: "bg-red-100   text-red-600   dark:bg-red-900/30   dark:text-red-400",
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome back, {user.name.split(" ")[0]} 👋
          </h1>
          <p className="text-sm text-foreground-500 mt-1">
            Track your applications and discover new opportunities.
          </p>
        </div>
        <Link
          href="/opportunities"
          className="flex items-center gap-2 bg-violet-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
        >
          <FiSearch size={15} />
          Browse Opportunities
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Applied"  value={total}    icon={FiSend}  color="text-violet-500" />
        <StatCard label="Pending"        value={pending}  icon={FiClock} color="text-amber-500"  />
        <StatCard label="Accepted"       value={accepted} icon={FiCheck} color="text-green-500"  />
        <StatCard label="Declined"       value={rejected} icon={FiX}     color="text-red-500"    />
      </div>

      {/* Recent Applications */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">
            Recent Applications
          </p>
          <Link
            href="/dashboard/collaborator/my-applications"
            className="flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 font-medium transition-colors"
          >
            View all <FiArrowRight size={12} />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="border border-default-100 rounded-xl p-8 flex flex-col items-center gap-3 text-foreground-400">
            <FiSend size={28} className="text-violet-300" />
            <p className="text-sm">You have not applied to anything yet.</p>
            <Link
              href="/opportunities"
              className="text-xs text-violet-600 font-medium hover:underline"
            >
              Explore opportunities →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {recent.map((app) => (
              <div
                key={app._id}
                className="border border-default-100 rounded-xl px-4 py-3 flex items-center justify-between gap-3 flex-wrap hover:bg-default-50 transition-colors"
              >
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium text-foreground">
                    {app.role_title ?? "—"}
                  </p>
                  <p className="text-xs text-foreground-400">
                    {app.startup_name ?? "—"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-foreground-400">
                    {new Date(app.applied_at).toLocaleDateString("en-US", {
                      month: "short",
                      day:   "numeric",
                      year:  "numeric",
                    })}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                      STATUS_STYLES[app.status] ?? STATUS_STYLES.pending
                    }`}
                  >
                    {app.status ?? "pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-foreground">Quick Actions</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/opportunities"
            className="border border-default-100 rounded-xl p-4 flex items-center gap-3 hover:bg-default-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center shrink-0">
              <FiSearch size={16} className="text-violet-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Browse Opportunities
              </p>
              <p className="text-xs text-foreground-400">
                Find startups looking for your skills
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard/collaborator/my-applications"
            className="border border-default-100 rounded-xl p-4 flex items-center gap-3 hover:bg-default-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center shrink-0">
              <FiSend size={16} className="text-violet-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                My Applications
              </p>
              <p className="text-xs text-foreground-400">
                Track all your application statuses
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};