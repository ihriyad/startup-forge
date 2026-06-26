"use server";

import { serverMutation } from "@/lib/core/server";

// import { serverMutation } from "./core/server";

export const updateApplication = async (id, data) => {
  return await serverMutation(`/api/applications/${id}`, data, "PATCH");
};

export const createApplication = async (data) => {
  return await serverMutation("/api/applications", data, "POST");
};