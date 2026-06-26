"use server";

import { securedFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";

export const getCollaboratorApplications = async () => {
  const user = await getUserSession();
  return await securedFetch(
    `/api/applications/collaborator?email=${user?.email}`,
  );
};
