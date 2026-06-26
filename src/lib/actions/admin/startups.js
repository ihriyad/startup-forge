"use server";

import { serverMutation } from "../../core/server";

export const updateStartup = async (id, data) => {
  return await serverMutation(`/api/admin/startups/${id}`, data, "PATCH");
};

export const deleteStartup = async (id) => {
  return await serverMutation(`/api/admin/startups/${id}`, {}, "DELETE");
};
