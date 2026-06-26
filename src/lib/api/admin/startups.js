"use server";

import { publicFetch } from "@/lib/core/server";



export const getStartups = async () => {
  return await publicFetch(`/api/admin/startups`);
};
