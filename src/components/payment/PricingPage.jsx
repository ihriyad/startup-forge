"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@heroui/react";
import { FiCheck, FiZap } from "react-icons/fi";
import { ScrollReveal } from "../ui/ScrollReveal";

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
  const isPremium = currentUser?.plan === "premium";
  const isFounder = currentUser?.role === "founder";
  const isLoggedIn = !!currentUser;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 flex flex-col gap-12">
      
      {/* Header with ScrollReveal Integration */}
      <div className="text-center flex flex-col gap-3">
        <ScrollReveal>
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            Simple Pricing
          </h1>
          <p className="text-sm text-default-400 max-w-md mx-auto mt-2 leading-relaxed">
            Start for free. Upgrade when you are ready to scale your startup team.
          </p>
        </ScrollReveal>
      </div>

      {/* Cards Pricing Tier Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Free Plan - Animating Scroll */}
        <ScrollReveal className="h-full">
          <Card className="h-full bg-content1 border-2 border-transparent hover:border-violet-600 transition-all duration-300 rounded-3xl shadow-sm p-6 sm:p-8 flex flex-col justify-between min-h-[460px]">
            
            {/* Top segment block */}
            <div className="flex flex-col gap-6 flex-1">
              <Card.Header className="flex flex-col items-start gap-1 p-0">
                <Card.Description className="text-xs text-default-400 font-semibold uppercase tracking-wider">
                  Free
                </Card.Description>
                <Card.Title className="text-4xl font-black text-foreground mt-1 tracking-tight">
                  $0
                </Card.Title>
                <p className="text-xs text-default-400 mt-1">Forever free</p>
              </Card.Header>

              {/* Feature lists */}
              <Card.Content className="p-0 flex-1">
                <ul className="flex flex-col gap-3.5">
                  {FREE_FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <div className="p-1 bg-default-100 rounded-full shrink-0">
                        <FiCheck size={12} className="text-default-500" />
                      </div>
                      <span className="text-sm text-default-500 font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </Card.Content>
            </div>

            {/* Bottom active state action row */}
            <Card.Footer className="p-0 pt-6 border-t border-divider/60">
              <div className="w-full border border-default-200 dark:border-default-100 rounded-xl py-3 text-center text-xs font-bold uppercase tracking-wider text-default-400 bg-default-50/50">
                {isPremium ? "Previous Plan" : "Current Plan"}
              </div>
            </Card.Footer>

          </Card>
        </ScrollReveal>

        {/* Premium Plan - Animating Scroll */}
        <ScrollReveal className="h-full">
          <Card className="relative h-full bg-content1 border-2 border-violet-600 hover:border-violet-500 transition-all duration-300 rounded-3xl shadow-md hover:shadow-lg p-6 sm:p-8 flex flex-col justify-between min-h-[460px] overflow-hidden">
            
            {/* Premium background gradient mask */}
            <div className="absolute inset-0 bg-violet-600/5 dark:bg-violet-600/10 pointer-events-none z-0" />

            {/* Recommended Tier Tag Badge */}
            <div className="absolute top-6 right-6 z-10">
              <span className="text-[10px] px-3 py-1 rounded-full bg-violet-600 text-white font-bold uppercase tracking-wider shadow-sm shadow-violet-600/20">
                RECOMMENDED
              </span>
            </div>

            {/* Top segment block */}
            <div className="relative z-10 flex flex-col gap-6 flex-1">
              <Card.Header className="flex flex-col items-start gap-1 p-0">
                <Card.Description className="text-xs text-violet-600 dark:text-violet-400 font-semibold uppercase tracking-wider">
                  Premium
                </Card.Description>
                <Card.Title className="text-4xl font-black text-foreground mt-1 tracking-tight">
                  $29
                </Card.Title>
                <p className="text-xs text-default-400 mt-1">Monthly payment</p>
              </Card.Header>

              {/* Feature lists */}
              <Card.Content className="p-0 flex-1">
                <ul className="flex flex-col gap-3.5">
                  {PREMIUM_FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <div className="p-1 bg-violet-600/10 dark:bg-violet-600/20 rounded-full shrink-0">
                        <FiCheck size={12} className="text-violet-600 dark:text-violet-400" />
                      </div>
                      <span className="text-sm text-default-600 dark:text-default-400 font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </Card.Content>
            </div>

            {/* Bottom active state action row (Main Stripe integration pipeline) */}
            <Card.Footer className="relative z-10 p-0 pt-6 border-t border-divider/60 flex flex-col gap-3">
              {isPremium ? (
                <div className="w-full border border-success-200 bg-success-50 dark:bg-success-900/10 rounded-xl py-3 text-center text-xs font-bold uppercase tracking-wider text-success">
                  Already Premium ✓
                </div>
              ) : !isLoggedIn ? (
                <Link
                  href="/login"
                  className="w-full h-11 flex items-center justify-center gap-2 rounded-xl text-xs uppercase tracking-wider font-bold bg-violet-600 text-white hover:bg-violet-700 transition-colors shadow-md shadow-violet-600/20"
                >
                  <FiZap size={14} />
                  <span>Log in to Upgrade</span>
                </Link>
              ) : !isFounder ? (
                <div className="w-full border border-default-200 dark:border-default-100 rounded-xl py-3 text-center text-xs font-bold uppercase tracking-wider text-default-400 bg-default-50/50">
                  Only for Founders
                </div>
              ) : (
                <form
                  action="/api/checkout_sessions"
                  method="POST"
                  className="w-full"
                >
                  <button
                    type="submit"
                    className="w-full h-11 flex items-center justify-center gap-2 rounded-xl text-xs uppercase tracking-wider font-bold bg-violet-600 text-white hover:bg-violet-700 transition-colors shadow-md shadow-violet-600/20 cursor-pointer"
                  >
                    <FiZap size={14} />
                    <span>Upgrade to Premium — $29</span>
                  </button>
                </form>
              )}

              {!isFounder && isLoggedIn && (
                <p className="text-[10px] text-center text-default-400 font-medium">
                  Premium is only available for founder accounts.
                </p>
              )}
            </Card.Footer>

          </Card>
        </ScrollReveal>

      </div>
    </div>
  );
};