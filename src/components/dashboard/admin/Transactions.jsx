"use client";

import { useState } from "react";
import { Table } from "@heroui/react";
import { FiDollarSign } from "react-icons/fi";

const STATUS_STYLES = {
  paid: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  unpaid:
    "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  pending:
    "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
};

const FILTERS = ["all", "paid", "unpaid", "pending"];


const TransactionCard = ({ payment, index }) => (
  <div className="border border-default-100 rounded-xl p-4 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <span className="text-xs text-foreground-400">#{index + 1}</span>
      <span
        className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
          STATUS_STYLES[payment.payment_status] ?? STATUS_STYLES.pending
        }`}
      >
        {payment.payment_status}
      </span>
    </div>

    {/* Amount */}
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center shrink-0">
        <FiDollarSign size={16} className="text-violet-600" />
      </div>
      <div>
        <p className="text-lg font-bold text-foreground">
          ${payment.amount?.toFixed(2)}
        </p>
        <p className="text-[10px] text-foreground-400">StartupForge Premium</p>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-2 pt-2 border-t border-default-100">
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] text-foreground-400">User</span>
        <span className="text-xs text-foreground-500 truncate">
          {payment.user_email}
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] text-foreground-400">Transaction ID</span>
        <span className="text-[10px] text-foreground-400 font-mono truncate">
          {payment.transaction_id}
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] text-foreground-400">Date</span>
        <span className="text-xs text-foreground-500">
          {new Date(payment.paid_at).toLocaleDateString("en-US", {
            month: "short",
            day:   "numeric",
            year:  "numeric",
          })}
        </span>
      </div>
    </div>
  </div>
);

// ── Main Component ───────────────────────────────────────────────────────────
export const Transactions = ({ payments }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? payments
      : payments.filter((p) => p.payment_status === activeFilter);

  const countOf = (status) =>
    payments.filter((p) => p.payment_status === status).length;

  // total revenue from paid only
  const totalRevenue = payments
    .filter((p) => p.payment_status === "paid")
    .reduce((sum, p) => sum + (p.amount ?? 0), 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Transactions
          </h1>
          <p className="text-sm text-foreground-500 mt-1">
            {payments.length} total transaction
            {payments.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Total Revenue Stat */}
        <div className="border border-default-100 rounded-xl px-5 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center shrink-0">
            <FiDollarSign size={16} className="text-violet-600" />
          </div>
          <div>
            <p className="text-[10px] text-foreground-400">Total Revenue</p>
            <p className="text-lg font-bold text-foreground">
              ${totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="overflow-x-auto">
        <div className="flex items-center gap-1 border-b border-default-100 min-w-max">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px capitalize ${
                activeFilter === f
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-foreground-500 hover:text-foreground"
              }`}
            >
              {f}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeFilter === f
                    ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600"
                    : "bg-default-100 text-foreground-400"
                }`}
              >
                {f === "all" ? payments.length : countOf(f)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-foreground-400">
          <FiDollarSign size={32} className="text-violet-300" />
          <p className="text-sm">
            No {activeFilter !== "all" ? activeFilter : ""} transactions yet.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile — cards */}
          <div className="flex flex-col gap-3 md:hidden">
            {filtered.map((payment, index) => (
              <TransactionCard
                key={payment._id}
                payment={payment}
                index={index}
              />
            ))}
          </div>

          {/* Desktop — table */}
          <div className="hidden md:block">
            <Table>
              <Table.ScrollContainer minWidth={700}>
                <Table.Content aria-label="Transactions table">
                  <Table.Header>
                    <Table.Column isRowHeader className="w-10">
                      #
                    </Table.Column>
                    <Table.Column>User</Table.Column>
                    <Table.Column>Transaction ID</Table.Column>
                    <Table.Column>Amount</Table.Column>
                    <Table.Column>Date</Table.Column>
                    <Table.Column>Status</Table.Column>
                  </Table.Header>

                  <Table.Body emptyContent="No transactions found.">
                    {filtered.map((payment, index) => (
                      <Table.Row key={payment._id}>
                        {/* # */}
                        <Table.Cell>
                          <span className="text-sm text-foreground-400">
                            {index + 1}
                          </span>
                        </Table.Cell>

                        {/* User */}
                        <Table.Cell>
                          <span className="text-sm text-foreground">
                            {payment.user_email}
                          </span>
                        </Table.Cell>

                        {/* Transaction ID */}
                        <Table.Cell>
                          <span className="text-xs font-mono text-foreground-400 truncate max-w-[160px] block">
                            {payment.transaction_id}
                          </span>
                        </Table.Cell>

                        {/* Amount */}
                        <Table.Cell>
                          <span className="text-sm font-semibold text-violet-600">
                            ${payment.amount?.toFixed(2)}
                          </span>
                        </Table.Cell>

                        {/* Date */}
                        <Table.Cell>
                          <span className="text-sm text-foreground-500">
                            {new Date(payment.paid_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day:   "numeric",
                                year:  "numeric",
                              }
                            )}
                          </span>
                        </Table.Cell>

                        {/* Status */}
                        <Table.Cell>
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                              STATUS_STYLES[payment.payment_status] ??
                              STATUS_STYLES.pending
                            }`}
                          >
                            {payment.payment_status}
                          </span>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};