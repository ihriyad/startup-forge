
import { CollaboratorOverview } from "@/components/dashboard/collaborator/CollaboratorOverview";
import { getCollaboratorApplications } from "@/lib/api/collaborator/applications";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


const CollaboratorOverviewPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "collaborator") redirect("/dashboard");

  const applications = await getCollaboratorApplications();

  return (
    <CollaboratorOverview
      user={session.user}
      applications={applications ?? []}
    />
  );
};

export default CollaboratorOverviewPage;