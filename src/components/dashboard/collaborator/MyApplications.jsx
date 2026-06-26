"use client";

import { useState } from "react";
import { Table } from "@heroui/react";
import { FiSend, FiExternalLink } from "react-icons/fi";
import Link from "next/link";

const STATUS_STYLES = {
  pending:  "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  accepted: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  rejected: "bg-red-100   text-red-600   dark:bg-red-900/30   dark:text-red-400",
};

const FILTERS = ["all", "pending", "accepted", "rejected"];

// ── Mobile card — same data, stacked layout ──────────────────────────────────
const ApplicationCard = ({ app, index }) => (
  <div className="border border-default-100 rounded-xl p-4 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <span className="text-xs text-foreground-400">#{index + 1}</span>
      <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${STATUS_STYLES[app.status] ?? STATUS_STYLES.pending}`}>
        {app.status ?? "pending"}
      </span>
    </div>

    <div>
      <p className="text-sm font-medium text-foreground">{app.role_title ?? "—"}</p>
      <p className="text-xs text-foreground-400 mt-0.5">{app.startup_name ?? "—"}</p>
    </div>

    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-default-100">
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] text-foreground-400">Applied</span>
        <span className="text-xs text-foreground-500">
          {new Date(app.applied_at).toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric",
          })}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] text-foreground-400">Deadline</span>
        <span className={`text-xs ${
          app.deadline && new Date(app.deadline) < new Date() && app.status === "pending"
            ? "text-red-500"
            : "text-foreground-500"
        }`}>
          {app.deadline
            ? new Date(app.deadline).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric",
              })
            : "—"}
        </span>
      </div>
    </div>

    {app.portfolio_link ? (
      <a
        href={app.portfolio_link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 font-medium transition-colors w-fit"
      >
        <FiExternalLink size={12} />
        View Portfolio
      </a>
    ) : (
      <span className="text-xs text-foreground-400">No portfolio</span>
    )}
  </div>
);

export const MyApplications = ({ applications }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? applications
      : applications.filter((a) => a.status === activeFilter);

  const countOf = (status) =>
    applications.filter((a) => a.status === status).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">My Applications</h1>
        <p className="text-sm text-foreground-500 mt-1">
          {applications.length} total application{applications.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Filter Tabs — scrollable on mobile so they never wrap or overflow */}
      <div className="overflow-x-auto scrollbar-hide">
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
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeFilter === f
                  ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600"
                  : "bg-default-100 text-foreground-400"
              }`}>
                {f === "all" ? applications.length : countOf(f)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-foreground-400">
          <FiSend size={32} className="text-violet-300" />
          <p className="text-sm">
            No {activeFilter !== "all" ? activeFilter : ""} applications yet.
          </p>
          <Link href="/opportunities" className="text-xs text-violet-600 hover:underline font-medium">
            Browse opportunities →
          </Link>
        </div>
      ) : (
        <>
          {/* Mobile — card list */}
          <div className="flex flex-col gap-3 md:hidden">
            {filtered.map((app, index) => (
              <ApplicationCard key={app._id} app={app} index={index} />
            ))}
          </div>

          {/* Desktop — table */}
          <div className="hidden md:block">
            <Table>
              <Table.ScrollContainer >
                <Table.Content aria-label="My applications">
                  <Table.Header>
                    <Table.Column isRowHeader className="w-10">#</Table.Column>
                    <Table.Column>Role</Table.Column>
                    <Table.Column>Startup</Table.Column>
                    <Table.Column>Applied On</Table.Column>
                    <Table.Column>Deadline</Table.Column>
                    <Table.Column>Portfolio</Table.Column>
                    <Table.Column>Status</Table.Column>
                  </Table.Header>

                  <Table.Body>
                    {filtered.map((app, index) => (
                      <Table.Row key={app._id}>
                        <Table.Cell>
                          <span className="text-sm text-foreground-400">{index + 1}</span>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="text-sm font-medium text-foreground">
                            {app.role_title ?? "—"}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="text-sm text-foreground-500">
                            {app.startup_name ?? "—"}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="text-sm text-foreground-500">
                            {new Date(app.applied_at).toLocaleDateString("en-US", {
                              month: "short", day: "numeric", year: "numeric",
                            })}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <span className={`text-sm ${
                            app.deadline &&
                            new Date(app.deadline) < new Date() &&
                            app.status === "pending"
                              ? "text-red-500"
                              : "text-foreground-500"
                          }`}>
                            {app.deadline
                              ? new Date(app.deadline).toLocaleDateString("en-US", {
                                  month: "short", day: "numeric", year: "numeric",
                                })
                              : "—"}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          {app.portfolio_link ? (
                            <a
                              href={app.portfolio_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 font-medium transition-colors"
                            >
                              <FiExternalLink size={12} />
                              View
                            </a>
                          ) : (
                            <span className="text-xs text-foreground-400">—</span>
                          )}
                        </Table.Cell>

                        <Table.Cell>
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                            STATUS_STYLES[app.status] ?? STATUS_STYLES.pending
                          }`}>
                            {app.status ?? "pending"}
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