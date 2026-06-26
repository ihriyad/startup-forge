"use server";

import { securedFetch } from "../../core/server";
import { getUserSession } from "../../core/session";

export const getFounderApplications = async () => {
  const user = await getUserSession();
  return await securedFetch(`/api/applications/founder?email=${user?.email}`);
};
