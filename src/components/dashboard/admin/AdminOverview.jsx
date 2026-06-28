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

const buildMonthlyData = (items, dateField) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const counts = Array(12).fill(0);

  items.forEach((item) => {
    const date = new Date(item[dateField]);
    if (!isNaN(date)) counts[date.getMonth()]++;
  });

  // only return months that have data — up to current month
  const currentMonth = new Date().getMonth();
  return months.slice(0, currentMonth + 1).map((month, i) => ({
    month,
    count: counts[i],
  }));
};

const buildRevenueData = (payments) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const totals = Array(12).fill(0);

  payments
    .filter((p) => p.payment_status === "paid")
    .forEach((p) => {
      const date = new Date(p.paid_at);
      if (!isNaN(date)) totals[date.getMonth()] += p.amount ?? 0;
    });

  const currentMonth = new Date().getMonth();
  return months.slice(0, currentMonth + 1).map((month, i) => ({
    month,
    revenue: totals[i],
  }));
};

export const AdminOverview = ({ users, startups, opportunities, payments }) => {
  const totalRevenue = payments
    .filter((p) => p.payment_status === "paid")
    .reduce((sum, p) => sum + (p.amount ?? 0), 0);

  const stats = [
    {
      label: "Total Users",
      value: users.length.toLocaleString(),
      icon: FiUsers,
      change: `${users.length} registered`,
    },
    {
      label: "Total Startups",
      value: startups.length.toLocaleString(),
      icon: FiZap,
      change: `${startups.filter((s) => s.status === "approved").length} approved`,
    },
    {
      label: "Opportunities",
      value: opportunities.length.toLocaleString(),
      icon: FiBriefcase,
      change: `${opportunities.filter((o) => o.status === "open").length} open`,
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: FiDollarSign,
      change: `${payments.filter((p) => p.payment_status === "paid").length} payments`,
    },
  ];

  // ── chart data ──────────────────────────────────────────────────────────
  const userMonthly = buildMonthlyData(users, "createdAt");
  const oppMonthly = buildMonthlyData(opportunities, "createdAt");

  // merge user + opportunity monthly into one array for the area chart
  const growthData = userMonthly.map((item, i) => ({
    month: item.month,
    users: item.count,
    opportunities: oppMonthly[i]?.count ?? 0,
  }));

  const revenueData = buildRevenueData(payments);

  // ── role distribution ───────────────────────────────────────────────────
  const collaborators = users.filter((u) => u.role === "collaborator").length;
  const founders = users.filter((u) => u.role === "founder").length;
  const admins = users.filter((u) => u.role === "admin").length;
  const total = users.length || 1; // avoid divide by zero

  const roleData = [
    { name: "Collaborators", value: collaborators, color: "#7c3aed" },
    { name: "Founders", value: founders, color: "#6d28d9" },
    { name: "Admins", value: admins, color: "#c4b5fd" },
  ];

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
              {change}
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
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
              <Tooltip formatter={(v) => [`$${v.toFixed(2)}`, "Revenue"]} />
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
                    ({Math.round((value / total) * 100)}%)
                  </span>
                </span>
              </div>
            ))}

            <div className="pt-2 border-t border-default-100 flex justify-between">
              <span className="text-xs text-foreground-400">
                Total registered
              </span>
              <span className="text-xs font-medium text-foreground">
                {users.length.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
