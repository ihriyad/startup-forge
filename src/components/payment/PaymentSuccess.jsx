"use client";

import Link from "next/link";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";

export const PaymentSuccess = ({ isPaid, amount, email }) => {
  if (!isPaid) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="max-w-md w-full border border-default-100 rounded-2xl p-8 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-foreground-500">
            Payment could not be verified. Please contact support.
          </p>
          <Link href="/dashboard/founder" className="text-xs text-violet-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="max-w-md w-full border border-default-100 rounded-2xl p-8 flex flex-col items-center gap-6 text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
          <FiCheckCircle size={36} className="text-violet-600" />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-foreground">
            Payment Successful!
          </h1>
          <p className="text-sm text-foreground-500">
            Your StartupForge Premium plan is now active.
          </p>
        </div>

        {/* Receipt Summary */}
        <div className="w-full bg-default-50 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground-400">Plan</span>
            <span className="font-medium text-foreground">
              StartupForge Premium
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground-400">Amount paid</span>
            <span className="font-medium text-violet-600">${amount}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground-400">Account</span>
            <span className="font-medium text-foreground truncate max-w-[180px]">
              {email}
            </span>
          </div>
        </div>

        {/* What's unlocked */}
        <div className="w-full flex flex-col gap-2 text-left">
          <p className="text-xs text-foreground-400 font-medium uppercase tracking-wide">
            Now unlocked
          </p>
          {[
            "Unlimited opportunity postings",
            "Priority listing on Browse page",
            "Premium founder badge",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <FiCheckCircle size={13} className="text-violet-600 shrink-0" />
              <span className="text-sm text-foreground-600">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/dashboard/founder/add-opportunity"
          className="w-full flex items-center justify-center gap-2 bg-violet-600 text-white text-sm font-medium py-3 rounded-lg hover:bg-violet-700 transition-colors"
        >
          Post an Opportunity
          <FiArrowRight size={15} />
        </Link>

        <Link
          href="/dashboard/founder"
          className="text-xs text-foreground-400 hover:text-violet-600 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};