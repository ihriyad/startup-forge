"use client";

import { FiCheck, FiZap } from "react-icons/fi";
import Link from "next/link";

const FREE_FEATURES = [
  "Up to 3 opportunity postings",
  "Basic startup profile",
  "View all applications",
  "Accept / reject applicants",
];

const PREMIUM_FEATURES = [
  "Unlimited opportunity postings",
  "Priority listing on Browse page",
  "Premium founder badge",
  "Advanced applicant management",
  "All free features included",
];

export const PricingPage = ({ currentUser }) => {
  const isPremium  = currentUser?.plan === "premium";
  const isFounder  = currentUser?.role === "founder";
  const isLoggedIn = !!currentUser;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 flex flex-col gap-10">
      {/* Header */}
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-foreground">Simple Pricing</h1>
        <p className="text-sm text-foreground-500 max-w-md mx-auto">
          Start for free. Upgrade when you&lsquo;re ready to scale your startup team.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Plan */}
        <div className="border border-default-100 rounded-2xl p-6 flex flex-col gap-5">
          <div>
            <p className="text-xs text-foreground-400 font-medium uppercase tracking-wide">
              Free
            </p>
            <p className="text-3xl font-bold text-foreground mt-1">$0</p>
            <p className="text-xs text-foreground-400 mt-1">Forever free</p>
          </div>

          <ul className="flex flex-col gap-2.5 flex-1">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <FiCheck size={13} className="text-foreground-400 shrink-0" />
                <span className="text-sm text-foreground-500">{f}</span>
              </li>
            ))}
          </ul>

          <div className="border border-default-200 rounded-lg py-2.5 text-center text-sm font-medium text-foreground-400">
            {isPremium ? "Previous Plan" : "Current Plan"}
          </div>
        </div>

        {/* Premium Plan */}
        <div className="border-2 border-violet-600 rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <span className="text-[10px] px-2 py-1 rounded-full bg-violet-600 text-white font-medium">
              RECOMMENDED
            </span>
          </div>

          <div className="absolute inset-0 bg-violet-50 dark:bg-violet-950/20 pointer-events-none" />

          <div className="relative">
            <p className="text-xs text-violet-600 font-medium uppercase tracking-wide">
              Premium
            </p>
            <p className="text-3xl font-bold text-foreground mt-1">$29</p>
            <p className="text-xs text-foreground-400 mt-1">Monthly payment</p>
          </div>

          <ul className="flex flex-col gap-2.5 flex-1 relative">
            {PREMIUM_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <FiCheck size={13} className="text-violet-600 shrink-0" />
                <span className="text-sm text-foreground-600">{f}</span>
              </li>
            ))}
          </ul>

          {/* Stripe docs pattern — simple form POST, no JS fetch needed */}
          {isPremium ? (
            <div className="relative border border-green-200 bg-green-50 dark:bg-green-900/20 rounded-lg py-2.5 text-center text-sm font-medium text-green-600">
              Already Premium ✓
            </div>
          ) : !isLoggedIn ? (
            <Link
              href="/login"
              className="relative w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 transition-colors"
            >
              <FiZap size={15} />
              Log in to Upgrade
            </Link>
          ) : !isFounder ? (
            <div className="relative border border-default-200 rounded-lg py-2.5 text-center text-sm text-foreground-400">
              Only for Founders
            </div>
          ) : (
            // Stripe docs pattern: form action POST → route handler → redirect 303
            <form
              action="/api/checkout_sessions"
              method="POST"
              className="relative"
            >
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 transition-colors"
              >
                <FiZap size={15} />
                Upgrade to Premium — $29
              </button>
            </form>
          )}

          {!isFounder && isLoggedIn && (
            <p className="relative text-[10px] text-center text-foreground-400">
              Premium is only available for founder accounts.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};