"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button, Spinner } from "@heroui/react";
import { FiUploadCloud, FiEdit2, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import {
  createStartup,
  updateStartup,
  deleteStartup,
} from "@/lib/actions/founder/startups";

const INDUSTRIES = [
  { id: "technology", label: "Technology" },
  { id: "health-care", label: "Health Care" },
  { id: "finance", label: "Finance" },
  { id: "education", label: "Education" },
  { id: "operations", label: "Operations" },
  { id: "e-commerce", label: "E-Commerce" },
  { id: "other", label: "Other" },
];

const FUNDING_STAGES = [
  { id: "idea", label: "Idea Stage" },
  { id: "pre-seed", label: "Pre-Seed" },
  { id: "seed", label: "Seed" },
  { id: "series-a", label: "Series A" },
  { id: "series-b", label: "Series B" },
  { id: "growth", label: "Growth" },
];

export const MyStartup = ({ user, existingStartup }) => {
  // console.log(existingStartup);
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [logoPreview, setLogoPreview] = useState(existingStartup?.logo || null);
  const [isEditing, setIsEditing] = useState(!existingStartup);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Logo must be under 5MB.");
      e.target.value = "";
      setLogoPreview(null);
      return;
    }
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleReset = () => {
    setLogoPreview(existingStartup?.logo || null);
    formRef.current?.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const logoFile = formData.get("logo");
    let uploadedLogoUrl = existingStartup?.logo || null;

    // upload to ImgBB only if a new file was selected
    if (logoFile?.size > 0) {
      if (logoFile.size > 5 * 1024 * 1024) {
        toast.error("Logo must be under 5MB.");
        setIsSubmitting(false);
        return;
      }

      try {
        const imgBbForm = new FormData();
        imgBbForm.append("image", logoFile);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          { method: "POST", body: imgBbForm },
        );
        const result = await res.json();

        if (result.success) {
          uploadedLogoUrl = result.data.url;
        } else {
          toast.error("Logo upload failed. Saving without logo.");
        }
      } catch {
        toast.error("ImgBB upload error.");
      }
    }

    const payload = {
      startup_name: formData.get("startup_name"),
      industry: formData.get("industry"),
      description: formData.get("description"),
      funding_stage: formData.get("funding_stage"),
      founder_email: user.email,
      logo: uploadedLogoUrl,
      status: existingStartup?.status || "pending",
      createdAt: existingStartup?.createdAt || new Date(),
    };

    try {
      if (existingStartup._id) {
        await updateStartup(existingStartup._id, payload);
        toast.success("Startup updated successfully.");
      } else {
        await createStartup(payload);
        toast.success("Startup created successfully.");
      }
      setIsEditing(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your startup? This cannot be undone.",
      )
    )
      return;
    setIsDeleting(true);
    try {
      await deleteStartup(existingStartup._id);
      toast.success("Startup deleted.");
      handleReset();
      window.location.reload();
    } catch {
      toast.error("Delete failed.");
    } finally {
      setIsDeleting(false);
    }
  };

  // ── View Mode (startup exists and not editing) ─────────────────────────────
  if (existingStartup?._id && !isEditing) {
    return (
      <div className="flex flex-col gap-6 max-w-2xl">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              My Startup
            </h1>
            <p className="text-sm text-foreground-500 mt-1">
              Your startup profile on StartupForge.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="flat"
              className="text-violet-600 bg-violet-100 dark:bg-violet-900/30"
              startContent={<FiEdit2 size={14} />}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="flat"
              isLoading={isDeleting}
              className="text-red-600 bg-red-100 dark:bg-red-900/30"
              startContent={<FiTrash2 size={14} />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="border border-default-100 rounded-xl p-6 flex flex-col gap-5">
          {/* Logo + Name */}
          <div className="flex items-center gap-4">
            {existingStartup.logo ? (
              <Image
                src={existingStartup.logo}
                alt="Startup Logo"
                width={56}
                height={56}
                className="rounded-xl object-cover w-14 h-14"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 font-bold text-xl">
                {existingStartup.startup_name?.[0]}
              </div>
            )}
            <div>
              <p className="text-lg font-semibold text-foreground">
                {existingStartup.startup_name}
              </p>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                  existingStartup.status === "approved"
                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                }`}
              >
                {existingStartup.status}
              </span>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Industry", value: existingStartup.industry },
              { label: "Funding Stage", value: existingStartup.funding_stage },
              { label: "Founder Email", value: existingStartup.founder_email },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-xs text-foreground-400">{label}</span>
                <span className="text-sm text-foreground capitalize">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-foreground-400">Description</span>
            <p className="text-sm text-foreground leading-relaxed">
              {existingStartup.description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Create / Edit Form
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          {existingStartup._id ? "Edit Startup" : "Create Your Startup"}
        </h1>
        <p className="text-sm text-foreground-500 mt-1">
          {existingStartup._id
            ? "Update your startup profile."
            : "Set up your startup profile to start posting opportunities."}
        </p>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="border border-default-100 rounded-xl p-6 flex flex-col gap-5"
      >
        {/* Row 1 — Name + Industry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground-600">
              Startup Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="startup_name"
              placeholder="e.g. FinFlow AI"
              defaultValue={existingStartup?.startup_name}
              className="w-full outline-none border-b-2 border-violet-600 p-2 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground-600">
              Industry <span className="text-red-500">*</span>
            </label>
            <select
              required
              name="industry"
              defaultValue={existingStartup?.industry || ""}
              className="w-full outline-none border-b-2 border-violet-600 p-2 bg-transparent text-sm text-foreground"
            >
              <option value="" disabled>
                Select industry
              </option>
              {INDUSTRIES.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2 — Funding Stage + Logo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground-600">
              Funding Stage <span className="text-red-500">*</span>
            </label>
            <select
              required
              name="funding_stage"
              defaultValue={existingStartup?.funding_stage || ""}
              className="w-full outline-none border-b-2 border-violet-600 p-2 bg-transparent text-sm text-foreground"
            >
              <option value="" disabled>
                Select stage
              </option>
              {FUNDING_STAGES.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Logo Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground-600">
              Startup Logo
            </label>
            <div className="flex items-center gap-3">
              <label className="w-12 h-12 rounded-xl border-2 border-dashed border-violet-300 dark:border-violet-800 hover:border-violet-500 transition-colors flex items-center justify-center cursor-pointer overflow-hidden shrink-0">
                {logoPreview ? (
                  <Image
                    src={logoPreview}
                    alt="Logo preview"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiUploadCloud size={18} className="text-violet-400" />
                )}
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </label>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground-600">
                  {logoPreview ? "Image selected" : "Upload logo"}
                </span>
                <span className="text-[10px] text-foreground-400">
                  PNG, JPG up to 5MB
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3 — Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-foreground-600">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            name="description"
            placeholder="Tell collaborators about your startup's mission and vision..."
            defaultValue={existingStartup?.description}
            rows={4}
            className="w-full outline-none border-2 border-violet-600 rounded-lg p-3 bg-transparent text-sm resize-none focus:border-violet-500"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          {existingStartup._id && (
            <Button
              type="button"
              variant="flat"
              onClick={() => {
                setIsEditing(false);
                handleReset();
              }}
              className="text-sm"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-violet-600 text-white text-sm font-medium px-6"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" color="white" />
                <span>
                  {existingStartup._id ? "Updating..." : "Creating..."}
                </span>
              </div>
            ) : existingStartup._id ? (
              "Update Startup"
            ) : (
              "Create Startup"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
