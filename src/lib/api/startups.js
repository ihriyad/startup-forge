"use server";

import { publicFetch, securedFetch } from "@/lib/core/server";

export const getAdminStartups = async () => {
  return await securedFetch(`/api/admin/startups`);
};
export const getApprovedStartups = async () => {
  return await publicFetch(`/api/startups/approved`);
};
export const getStartupDetails = async (id) => {
  return await publicFetch(`/api/startups/${id}`);
};
export const getStartupOpportunities = async (id) => {
  return await publicFetch(`/api/opportunities/startup/${id}`);
};


