// components/dashboard/founder/FounderOverview.jsx
"use client";

import Link from "next/link";
import {
  FiBriefcase,
  FiUsers,
  FiCheckCircle,
  FiPlusCircle,
} from "react-icons/fi";
import { Button } from "@heroui/react";

export const FounderOverview = ({ user, stats }) => {
  const cards = [
    {
      label: "Total Opportunities",
      value: stats?.totalOpportunities ?? 0,
      icon: FiBriefcase,
      href: "/dashboard/founder/manage-opportunities",
    },
    {
      label: "Total Applications",
      value: stats?.totalApplications ?? 0,
      icon: FiUsers,
      href: "/dashboard/founder/applications",
    },
    {
      label: "Accepted Members",
      value: stats?.acceptedMembers ?? 0,
      icon: FiCheckCircle,
      href: "/dashboard/founder/applications",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome back, <span className="text-violet-600">{user.name.split(" ")[0]}</span>
          </h1>
          <p className="text-sm text-foreground-500 mt-1">
            Here is what is happening with your startup today.
          </p>
        </div>
        <Link href="/dashboard/founder/add-opportunity">
          <Button
            className="bg-violet-600 text-white text-sm font-medium rounded-md"
            
          >
            <FiPlusCircle size={16} /> Add Opportunity
          </Button>
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-default-50 rounded-lg p-5 flex flex-col gap-3 hover:bg-default-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground-500">{label}</span>
              <Icon size={16} className="text-violet-600" />
            </div>
            <p className="text-3xl font-semibold text-foreground">{value}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <p className="text-sm font-medium text-foreground mb-3">
          Quick Actions
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/dashboard/founder/my-startup"
            className="border border-default-100 rounded-xl p-4 flex items-center gap-3 hover:bg-default-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center shrink-0">
              <FiBriefcase size={16} className="text-violet-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">My Startup</p>
              <p className="text-xs text-foreground-400">
                View or update your startup profile
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard/founder/applications"
            className="border border-default-100 rounded-xl p-4 flex items-center gap-3 hover:bg-default-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center shrink-0">
              <FiUsers size={16} className="text-violet-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Applications
              </p>
              <p className="text-xs text-foreground-400">
                Review and manage applicants
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
