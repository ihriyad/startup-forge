"use client";

import { useRef, useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { FiPlusCircle } from "react-icons/fi";
import { createOpportunity } from "@/lib/actions/founder/opportunities";

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

// skills the user typed are stored as an array
// they type one skill and press Enter or comma to add it
const SkillsInput = ({ skills, setSkills }) => {
  const [input, setInput] = useState("");

  const addSkill = (raw) => {
    const skill = raw.trim();
    if (!skill || skills.includes(skill)) return;
    setSkills((prev) => [...prev, skill]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(input);
    }
    // backspace on empty input removes last skill
    if (e.key === "Backspace" && !input) {
      setSkills((prev) => prev.slice(0, -1));
    }
  };

  const removeSkill = (skill) =>
    setSkills((prev) => prev.filter((s) => s !== skill));

  return (
    <div className="flex flex-wrap items-center gap-2 border-b-2 border-violet-600 p-2 min-h-[42px]">
      {skills.map((skill) => (
        <span
          key={skill}
          className="flex items-center gap-1 text-xs bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-2 py-1 rounded-full"
        >
          {skill}
          <button
            type="button"
            onClick={() => removeSkill(skill)}
            className="hover:text-red-500 transition-colors font-bold leading-none"
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addSkill(input)} // add on blur too
        placeholder={
          skills.length === 0 ? "e.g. React, Node.js — press Enter to add" : ""
        }
        className="flex-1 min-w-[140px] outline-none bg-transparent text-sm"
      />
    </div>
  );
};

export const AddOpportunity = ({ user, startup }) => {
  const router = useRouter();
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skills, setSkills] = useState([]);

  const handleReset = () => {
    setSkills([]);
    formRef.current?.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (skills.length === 0) {
      toast.error("Please add at least one required skill.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.target);

    const payload = {
      startup_id: startup._id,
      startup_name: startup.startup_name, // denormalized for easy display
      role_title: formData.get("role_title"),
      required_skills: skills, // array from state
      work_type: formData.get("work_type"),
      commitment_level: formData.get("commitment_level"),
      deadline: formData.get("deadline"),
      founder_email: user.email,
      status: "open",
      createdAt: new Date(),
    };

    try {
      await createOpportunity(payload);
      toast.success("Opportunity posted successfully.");
      handleReset();
      router.push("/dashboard/founder/manage-opportunities");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Add Opportunity
        </h1>
        <p className="text-sm text-foreground-500 mt-1">
          Posting for{" "}
          <span className="text-violet-600 font-medium">
            {startup.startup_name}
          </span>
        </p>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="border border-default-100 rounded-xl p-6 flex flex-col gap-5"
      >
        {/* Row 1 — Role Title + Work Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground-600">
              Role Title <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="role_title"
              placeholder="e.g. Frontend Developer"
              className="w-full outline-none border-b-2 border-violet-600 p-2 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground-600">
              Work Type <span className="text-red-500">*</span>
            </label>
            <select
              required
              name="work_type"
              defaultValue=""
              className="w-full outline-none border-b-2 border-violet-600 p-2 bg-transparent text-sm text-foreground"
            >
              <option value="" disabled>
                Select work type
              </option>
              {WORK_TYPES.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2 — Commitment Level + Deadline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground-600">
              Commitment Level <span className="text-red-500">*</span>
            </label>
            <select
              required
              name="commitment_level"
              defaultValue=""
              className="w-full outline-none border-b-2 border-violet-600 p-2 bg-transparent text-sm text-foreground"
            >
              <option value="" disabled>
                Select commitment
              </option>
              {COMMITMENT_LEVELS.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground-600">
              Application Deadline <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="deadline"
              type="date"
              // prevent past dates
              min={new Date().toISOString().split("T")[0]}
              className="w-full outline-none border-b-2 border-violet-600 p-2 bg-transparent text-sm text-foreground"
            />
          </div>
        </div>

        {/* Row 3 — Required Skills */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-foreground-600">
            Required Skills <span className="text-red-500">*</span>
          </label>
          <SkillsInput skills={skills} setSkills={setSkills} />
          <p className="text-[10px] text-foreground-400">
            Press Enter or comma after each skill to add it.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="flat"
            onClick={handleReset}
            className="text-sm"
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-violet-600 text-white text-sm font-medium px-6"
            startContent={!isSubmitting && <FiPlusCircle size={15} />}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" color="white" />
                <span>Posting...</span>
              </div>
            ) : (
              "Post Opportunity"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
