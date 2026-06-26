"use client";

import { useState } from "react";
import { Table, Button, Avatar } from "@heroui/react";
import { toast } from "sonner";
import { FiCheck, FiTrash2 } from "react-icons/fi";

import { deleteStartup, updateStartup } from "@/lib/actions/admin/startups";

const STATUS_STYLES = {
  approved:
    "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  pending:
    "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  rejected:
    "bg-red-100   text-red-600   dark:bg-red-900/30   dark:text-red-400",
};

const StartupCard = ({
  startup,
  index,
  onApprove,
  onDelete,
  approvingId,
  deletingId,
}) => (
  <div className="border border-default-100 rounded-xl p-4 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <span className="text-xs text-foreground-400">#{index + 1}</span>
      <span
        className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
          STATUS_STYLES[startup.status] ?? STATUS_STYLES.pending
        }`}
      >
        {startup.status ?? "pending"}
      </span>
    </div>

    {/* Logo + Name */}
    <div className="flex items-center gap-3">
      <Avatar
        src={startup.logo || undefined}
        name={startup.startup_name}
        size="sm"
        className="shrink-0 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-600"
      />
      <div>
        <p className="text-sm font-medium text-foreground">
          {startup.startup_name}
        </p>
        <p className="text-xs text-foreground-400">{startup.founder_email}</p>
      </div>
    </div>

    {/* Meta */}
    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-default-100">
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] text-foreground-400">Industry</span>
        <span className="text-xs text-foreground-500 capitalize">
          {startup.industry ?? "—"}
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] text-foreground-400">Funding Stage</span>
        <span className="text-xs text-foreground-500 capitalize">
          {startup.funding_stage ?? "—"}
        </span>
      </div>
    </div>

    {/* Actions */}
    <div className="flex gap-2 pt-1">
      {startup.status !== "approved" && (
        <Button
          size="sm"
          variant="flat"
          isLoading={approvingId === startup._id}
          onClick={() => onApprove(startup._id)}
          className="flex-1 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 text-xs"
          startContent={!approvingId && <FiCheck size={13} />}
        >
          Approve
        </Button>
      )}
      <Button
        size="sm"
        variant="flat"
        isLoading={deletingId === startup._id}
        onClick={() => onDelete(startup._id)}
        className="flex-1 bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 text-xs"
        startContent={!deletingId && <FiTrash2 size={13} />}
      >
        Remove
      </Button>
    </div>
  </div>
);

// ── Main Component
export const ManageStartups = ({ startups: initial }) => {
  const [startups, setStartups] = useState(initial);
  const [approvingId, setApprovingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleApprove = async (id) => {
    setApprovingId(id);
    try {
      await updateStartup(id, { status: "approved" });
      setStartups((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: "approved" } : s)),
      );
      toast.success("Startup approved.");
    } catch {
      toast.error("Approval failed. Please try again.");
    } finally {
      setApprovingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this startup? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deleteStartup(id);
      setStartups((prev) => prev.filter((s) => s._id !== id));
      toast.success("Startup removed.");
    } catch {
      toast.error("Remove failed. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const FILTERS = [
    { id: "all", label: "All", count: startups.length },
    {
      id: "pending",
      label: "Pending",
      count: startups.filter((s) => s.status === "pending").length,
    },
    {
      id: "approved",
      label: "Approved",
      count: startups.filter((s) => s.status === "approved").length,
    },
  ];

  const filtered =
    activeFilter === "all"
      ? startups
      : startups.filter((s) => s.status === activeFilter);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Manage Startups
        </h1>
        <p className="text-sm text-foreground-500 mt-1">
          {startups.length} total startup{startups.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="overflow-x-auto">
        <div className="flex items-center gap-1 border-b border-default-100 min-w-max">
          {FILTERS.map(({ id, label, count }) => (
            <button
              key={id}
              onClick={() => setActiveFilter(id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px capitalize ${
                activeFilter === id
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-foreground-500 hover:text-foreground"
              }`}
            >
              {label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeFilter === id
                    ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600"
                    : "bg-default-100 text-foreground-400"
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2 text-foreground-400">
          <p className="text-sm">
            No {activeFilter !== "all" ? activeFilter : ""} startups found.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile — cards */}
          <div className="flex flex-col gap-3 md:hidden">
            {filtered.map((startup, index) => (
              <StartupCard
                key={startup._id}
                startup={startup}
                index={index}
                onApprove={handleApprove}
                onDelete={handleDelete}
                approvingId={approvingId}
                deletingId={deletingId}
              />
            ))}
          </div>

          {/* Desktop — table */}
          <div className="hidden md:block">
            <Table>
              <Table.ScrollContainer>
                <Table.Content aria-label="Startups table">
                  <Table.Header>
                    <Table.Column isRowHeader className="w-10">
                      #
                    </Table.Column>
                    <Table.Column>Startup</Table.Column>
                    <Table.Column>Founder</Table.Column>
                    <Table.Column>Industry</Table.Column>
                    <Table.Column>Funding Stage</Table.Column>
                    <Table.Column>Status</Table.Column>
                    <Table.Column className="text-right">Actions</Table.Column>
                  </Table.Header>

                  <Table.Body emptyContent="No startups found.">
                    {filtered.map((startup, index) => (
                      <Table.Row key={startup._id}>
                        {/* # */}
                        <Table.Cell>
                          <span className="text-sm text-foreground-400">
                            {index + 1}
                          </span>
                        </Table.Cell>

                        {/* Startup — logo + name */}
                        <Table.Cell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <Avatar.Image
                                alt="Avatar user"
                                src={startup?.logo}
                              />
                              <Avatar.Fallback>
                                {startup?.startup_name
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </Avatar.Fallback>
                            </Avatar>
                            <span className="text-sm font-medium text-foreground">
                              {startup.startup_name}
                            </span>
                          </div>
                        </Table.Cell>

                        {/* Founder */}
                        <Table.Cell>
                          <span className="text-sm text-foreground-500">
                            {startup.founder_email}
                          </span>
                        </Table.Cell>

                        {/* Industry */}
                        <Table.Cell>
                          <span className="text-sm text-foreground-500 capitalize">
                            {startup.industry ?? "—"}
                          </span>
                        </Table.Cell>

                        {/* Funding Stage */}
                        <Table.Cell>
                          <span className="text-sm text-foreground-500 capitalize">
                            {startup.funding_stage ?? "—"}
                          </span>
                        </Table.Cell>

                        {/* Status */}
                        <Table.Cell>
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                              STATUS_STYLES[startup.status] ??
                              STATUS_STYLES.pending
                            }`}
                          >
                            {startup.status ?? "pending"}
                          </span>
                        </Table.Cell>

                        {/* Actions */}
                        <Table.Cell>
                          <div className="flex justify-end gap-2">
                            {startup.status !== "approved" && (
                              <Button
                                size="sm"
                                variant="flat"
                                isLoading={approvingId === startup._id}
                                onClick={() => handleApprove(startup._id)}
                                className="bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 text-xs"
                                startContent={
                                  approvingId !== startup._id && (
                                    <FiCheck size={13} />
                                  )
                                }
                              >
                                Approve
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="flat"
                              isLoading={deletingId === startup._id}
                              onClick={() => handleDelete(startup._id)}
                              className="bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 text-xs"
                              startContent={
                                deletingId !== startup._id && (
                                  <FiTrash2 size={13} />
                                )
                              }
                            >
                              Remove
                            </Button>
                          </div>
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
