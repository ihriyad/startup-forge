"use server";

import { securedFetch } from "../../core/server";
import { getUserSession } from "../../core/session";

export const getFounderOpportunities = async () => {
  const user = await getUserSession();
  return await securedFetch(`/api/opportunities/founder?email=${user?.email}`);
};
