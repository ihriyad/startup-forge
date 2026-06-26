"use client";

import { useState, useRef } from "react";
import { Table, Button, Spinner, Select, ListBox } from "@heroui/react";
import { toast } from "sonner";
import { FiEdit2, FiTrash2, FiX, FiCheck } from "react-icons/fi";
import {
  deleteOpportunity,
  updateOpportunity,
} from "@/lib/actions/founder/opportunities";

const WORK_TYPES = [
  { id: "remote", label: "Remote" },
  { id: "on-site", label: "On-Site" },
  { id: "hybrid", label: "Hybrid" },
];

const COMMITMENT_LEVELS = [
  { id: "full-time", label: "Full-Time" },
  { id: "part-time", label: "Part-Time" },
  { id: "contract", label: "Contract" },
  { id: "internship", label: "Internship" },
];

const selectClass = {
  trigger:
    "border-b-2 border-violet-600 py-1.5 px-0 bg-transparent after:bg-violet-600 h-8 min-h-0",
  value: "text-xs text-foreground pl-1",
};

const SkillTags = ({ skills }) => (
  <div className="flex flex-wrap gap-1">
    {skills?.map((skill) => (
      <span
        key={skill}
        className="text-[10px] px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300"
      >
        {skill}
      </span>
    ))}
  </div>
);

// ── Edit Row Form ────────────────────────────────────────────────────────────
const EditRowForm = ({ opportunity, onSave, onCancel, isSaving }) => {
  const [skills, setSkills] = useState(opportunity.required_skills ?? []);
  const [skillInput, setSkillInput] = useState("");
  const [workType, setWorkType] = useState(opportunity.work_type ?? "");
  const [commitmentLevel, setCommitmentLevel] = useState(
    opportunity.commitment_level ?? "",
  );
  const formRef = useRef(null);

  const addSkill = (raw) => {
    const skill = raw.trim();
    if (!skill || skills.includes(skill)) return;
    setSkills((prev) => [...prev, skill]);
    setSkillInput("");
  };

  const removeSkill = (skill) =>
    setSkills((prev) => prev.filter((s) => s !== skill));

  const handleSkillKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(skillInput);
    }
    if (e.key === "Backspace" && !skillInput) {
      setSkills((prev) => prev.slice(0, -1));
    }
  };

  const handleSave = () => {
    const formData = new FormData(formRef.current);

    if (skills.length === 0) {
      toast.error("At least one skill is required.");
      return;
    }
    if (!workType) {
      toast.error("Please select a work type.");
      return;
    }
    if (!commitmentLevel) {
      toast.error("Please select a commitment level.");
      return;
    }

    onSave({
      role_title: formData.get("role_title"),
      work_type: workType, // from state
      commitment_level: commitmentLevel, // from state
      deadline: formData.get("deadline"),
      required_skills: skills,
    });
  };

  return (
    <form ref={formRef} className="flex flex-col gap-3 py-1">
      {/* Role Title */}
      <input
        name="role_title"
        defaultValue={opportunity.role_title}
        required
        placeholder="Role Title"
        className="w-full outline-none border-b-2 border-violet-600 p-1.5 bg-transparent text-sm"
      />

      {/* Work Type + Commitment — HeroUI Select controlled */}
      <div className="grid grid-cols-2 gap-3">
        <Select
          selectedKey={workType}
          onSelectionChange={(key) => setWorkType(key)}
          variant="underlined"
          color="secondary"
          placeholder="Work type"
          className="w-full"
          classNames={selectClass}
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {WORK_TYPES.map(({ id, label }) => (
                <ListBox.Item key={id} id={id} textValue={label}>
                  {label}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <Select
          selectedKey={commitmentLevel}
          onSelectionChange={(key) => setCommitmentLevel(key)}
          variant="underlined"
          color="secondary"
          placeholder="Commitment"
          className="w-full"
          classNames={selectClass}
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {COMMITMENT_LEVELS.map(({ id, label }) => (
                <ListBox.Item key={id} id={id} textValue={label}>
                  {label}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* Deadline */}
      <input
        name="deadline"
        type="date"
        defaultValue={opportunity.deadline}
        min={new Date().toISOString().split("T")[0]}
        required
        className="w-full outline-none border-b-2 border-violet-600 p-1.5 bg-transparent text-sm text-foreground"
      />

      {/* Skills */}
      <div className="flex flex-wrap items-center gap-1.5 border-b-2 border-violet-600 p-1.5 min-h-[36px]">
        {skills.map((skill) => (
          <span
            key={skill}
            className="flex items-center gap-1 text-[10px] bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-2 py-0.5 rounded-full"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="hover:text-red-500 font-bold leading-none"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleSkillKey}
          onBlur={() => addSkill(skillInput)}
          placeholder={skills.length === 0 ? "Add skills..." : ""}
          className="flex-1 min-w-[80px] outline-none bg-transparent text-xs"
        />
      </div>

      {/* Save / Cancel */}
      <div className="flex gap-2 justify-end pt-1">
        <Button
          size="sm"
          type="button"
          variant="flat"
          onClick={onCancel}
          className="text-xs"
        >
          <FiX size={13} /> Cancel
        </Button>
        <Button
          size="sm"
          type="button"
          isLoading={isSaving}
          onClick={handleSave}
          className="bg-violet-600 text-white text-xs"
        >
          <FiCheck size={13} /> Save
        </Button>
      </div>
    </form>
  );
};

// ── Main Component ───────────────────────────────────────────────────────────
export const ManageOpportunities = ({ opportunities: initial }) => {
  const [opportunities, setOpportunities] = useState(initial);
  const [editingId, setEditingId] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleSave = async (id, updatedFields) => {
    setSavingId(id);
    try {
      await updateOpportunity(id, updatedFields);
      setOpportunities((prev) =>
        prev.map((o) => (o._id === id ? { ...o, ...updatedFields } : o)),
      );
      toast.success("Opportunity updated.");
      setEditingId(null);
    } catch {
      toast.error("Update failed. Please try again.");
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this opportunity? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deleteOpportunity(id);
      setOpportunities((prev) => prev.filter((o) => o._id !== id));
      toast.success("Opportunity deleted.");
    } catch {
      toast.error("Delete failed. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Manage Opportunities
          </h1>
          <p className="text-sm text-foreground-500 mt-1">
            {opportunities.length} opportunity
            {opportunities.length !== 1 ? "s" : ""} posted
          </p>
        </div>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Opportunities table">
            <Table.Header>
              <Table.Column isRowHeader className="w-10">
                #
              </Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Skills</Table.Column>
              <Table.Column>Work Type</Table.Column>
              <Table.Column>Commitment</Table.Column>
              <Table.Column>Deadline</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column className="text-right">Actions</Table.Column>
            </Table.Header>

            <Table.Body emptyContent="No opportunities posted yet.">
              {opportunities.map((opp, index) => (
                <Table.Row key={opp._id}>
                  <Table.Cell>
                    <span className="text-sm text-foreground-400">
                      {index + 1}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    {editingId === opp._id ? (
                      <EditRowForm
                        opportunity={opp}
                        isSaving={savingId === opp._id}
                        onSave={(fields) => handleSave(opp._id, fields)}
                        onCancel={() => setEditingId(null)}
                      />
                    ) : (
                      <span className="text-sm font-medium text-foreground">
                        {opp.role_title}
                      </span>
                    )}
                  </Table.Cell>

                  <Table.Cell>
                    {editingId !== opp._id && (
                      <SkillTags skills={opp.required_skills} />
                    )}
                  </Table.Cell>

                  <Table.Cell>
                    {editingId !== opp._id && (
                      <span className="text-sm text-foreground-500 capitalize">
                        {opp.work_type}
                      </span>
                    )}
                  </Table.Cell>

                  <Table.Cell>
                    {editingId !== opp._id && (
                      <span className="text-sm text-foreground-500 capitalize">
                        {opp.commitment_level}
                      </span>
                    )}
                  </Table.Cell>

                  <Table.Cell>
                    {editingId !== opp._id && (
                      <span className="text-sm text-foreground-500">
                        {new Date(opp.deadline).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </Table.Cell>

                  <Table.Cell>
                    {editingId !== opp._id && (
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                          opp.status === "open"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-default-100 text-foreground-500"
                        }`}
                      >
                        {opp.status ?? "open"}
                      </span>
                    )}
                  </Table.Cell>

                  <Table.Cell>
                    {editingId !== opp._id && (
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="flat"
                          isIconOnly
                          onClick={() => setEditingId(opp._id)}
                          className="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300"
                          aria-label="Edit"
                        >
                          <FiEdit2 size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="flat"
                          isIconOnly
                          isLoading={deletingId === opp._id}
                          onClick={() => handleDelete(opp._id)}
                          className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                          aria-label="Delete"
                        >
                          {deletingId !== opp._id && <FiTrash2 size={14} />}
                        </Button>
                      </div>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};
