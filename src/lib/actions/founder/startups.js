"use server";

import { serverMutation } from "../../core/server";

export const createStartup = async (data) => {
  return await serverMutation("/api/startups", data, "POST");
};

export const updateStartup = async (id, data) => {
  return await serverMutation(`/api/startups/${id}`, data, "PATCH");
};

export const deleteStartup = async (id) => {
  return await serverMutation(`/api/startups/${id}`, {}, "DELETE");
};
