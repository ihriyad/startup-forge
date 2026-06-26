"use server";

import { serverMutation } from "@/lib/core/server";

// import { serverMutation } from "../core/server";


export const createOpportunity = async (data) => {
  return await serverMutation("/api/opportunities", data, "POST");
};

export const updateOpportunity = async (id, data) => {
  return await serverMutation(`/api/opportunities/${id}`, data, "PATCH");
};

export const deleteOpportunity = async (id) => {
  return await serverMutation(`/api/opportunities/${id}`, {}, "DELETE");
};