import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCollaboratorApplications } from "@/lib/api/collaborator/applications";
import { MyApplications } from "@/components/dashboard/collaborator/MyApplications";

const MyApplicationsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "collaborator") redirect("/dashboard");

    const applications = await getCollaboratorApplications();

  return <MyApplications applications={applications ?? []} />;
};

export default MyApplicationsPage;