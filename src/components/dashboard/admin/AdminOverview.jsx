// components/dashboard/admin/AdminOverview.jsx
"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FiUsers, FiZap, FiBriefcase, FiDollarSign } from "react-icons/fi";

// --- dummy data (replace with real API calls later) ---
const stats = [
  { label: "Total Users", value: "4,821", icon: FiUsers, change: "+12%" },
  { label: "Total Startups", value: "318", icon: FiZap, change: "+8%" },
  { label: "Opportunities", value: "1,074", icon: FiBriefcase, change: "+21%" },
  {
    label: "Total Revenue",
    value: "$28,450",
    icon: FiDollarSign,
    change: "+34%",
  },
];

const growthData = [
  { month: "Jan", users: 320, opportunities: 90 },
  { month: "Feb", users: 480, opportunities: 140 },
  { month: "Mar", users: 610, opportunities: 175 },
  { month: "Apr", users: 720, opportunities: 210 },
  { month: "May", users: 890, opportunities: 260 },
  { month: "Jun", users: 980, opportunities: 310 },
];

const revenueData = [
  { month: "Jan", revenue: 3200 },
  { month: "Feb", revenue: 4800 },
  { month: "Mar", revenue: 5100 },
  { month: "Apr", revenue: 6400 },
  { month: "May", revenue: 7200 },
  { month: "Jun", revenue: 8450 },
];

const roleData = [
  { name: "Collaborators", value: 3210, color: "#7c3aed" },
  { name: "Founders", value: 1284, color: "#6d28d9" },
  { name: "Admins", value: 327, color: "#c4b5fd" },
];

export const AdminOverview = ({users}) => {
  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Overview</h1>
        <p className="text-sm text-foreground-500 mt-1">
          Platform-wide stats and activity
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, change }) => (
          <div
            key={label}
            className="bg-default-50 rounded-lg p-4 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground-500">{label}</span>
              <Icon size={16} className="text-violet-600" />
            </div>
            <p className="text-2xl font-semibold text-foreground">{value}</p>
            <span className="text-[11px] text-violet-600 font-medium bg-violet-100 dark:bg-violet-900/30 px-2 py-0.5 rounded-full w-fit">
              {change} this month
            </span>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Platform Growth */}
        <div className="border border-default-100 rounded-xl p-5">
          <p className="text-sm font-medium text-foreground mb-1">
            Platform Growth
          </p>
          <p className="text-xs text-foreground-400 mb-4">
            Users & opportunities per month
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="oppsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c4b5fd" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#c4b5fd" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#7c3aed"
                fill="url(#usersGrad)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="opportunities"
                stroke="#c4b5fd"
                fill="url(#oppsGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Revenue */}
        <div className="border border-default-100 rounded-xl p-5">
          <p className="text-sm font-medium text-foreground mb-1">
            Monthly Revenue
          </p>
          <p className="text-xs text-foreground-400 mb-4">
            Stripe payments — last 6 months
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip
                formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]}
              />
              <Bar dataKey="revenue" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Role Distribution */}
      <div className="border border-default-100 rounded-xl p-5">
        <p className="text-sm font-medium text-foreground mb-1">
          User Role Distribution
        </p>
        <p className="text-xs text-foreground-400 mb-4">
          Breakdown of registered user roles
        </p>
        <div className="flex items-center gap-8 flex-wrap">
          <PieChart width={120} height={120}>
            <Pie
              data={roleData}
              cx={55}
              cy={55}
              innerRadius={30}
              outerRadius={52}
              dataKey="value"
              strokeWidth={0}
            >
              {roleData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <div className="flex flex-col gap-3 flex-1">
            {roleData.map(({ name, value, color }) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: color }}
                  />
                  <span className="text-sm text-foreground-500">{name}</span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {value.toLocaleString()}
                  <span className="text-foreground-400 font-normal ml-1 text-xs">
                    ({Math.round((value / 4821) * 100)}%)
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
