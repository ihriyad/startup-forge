"use client";

import { useState } from "react";
import { Button, Modal, Spinner } from "@heroui/react";
import { toast } from "sonner";
import { createApplication } from "@/lib/actions/founder/applications";

export const ApplyModal = ({ opportunity, currentUser }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [motivation, setMotivation] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const handleSubmit = async () => {
    if (!motivation.trim()) {
      toast.error("Please write a motivation message.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createApplication({
        opportunity_id: opportunity._id,
        applicant_email: currentUser.email,
        portfolio_link: portfolio.trim() || null,
        motivation: motivation.trim(),
        status: "pending",
        applied_at: new Date(),
      });
      toast.success("Application submitted successfully.");
      setMotivation("");
      setPortfolio("");
    } catch (err) {
      // duplicate application error from backend 409
      toast.error(err?.message ?? "Application failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal>
      <Button
        size="sm"
        className="bg-violet-600 text-white text-xs font-medium px-4"
      >
        Apply Now
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="max-w-md w-full m-4">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading className="text-base font-semibold">
                Apply for {opportunity.role_title}
              </Modal.Heading>
              <p className="text-xs text-foreground-400 mt-1">
                {opportunity.startup_name}
              </p>
            </Modal.Header>

            <Modal.Body className="flex flex-col gap-4 py-4">
              {/* Portfolio */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground-600">
                  Portfolio / LinkedIn URL
                </label>
                <input
                  type="url"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="https://yourportfolio.com"
                  className="w-full outline-none border-b-2 border-violet-600 p-2 bg-transparent text-sm"
                />
              </div>

              {/* Motivation */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground-600">
                  Motivation Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  placeholder="Why are you a great fit for this role? What can you bring to the team?"
                  rows={4}
                  className="w-full outline-none border-2 border-violet-600 rounded-lg p-3 bg-transparent text-sm resize-none"
                />
                <p className="text-[10px] text-foreground-400">
                  {motivation.length}/500 characters
                </p>
              </div>
            </Modal.Body>

            <Modal.Footer className="flex justify-end gap-3 px-3">
              
              <Button
                variant="flat"
                size="sm"
                slot={"close"}
                className="text-sm bg-default-100 hover:bg-default-200 text-default-700"
              >
                Cancel
              </Button>

              {/* Submit Button */}
              <Button
                size="sm"
                isLoading={isSubmitting}
                onPress={handleSubmit}
                className="bg-violet-600 text-white text-sm font-medium px-5"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
