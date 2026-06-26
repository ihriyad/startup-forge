import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getFounderApplications } from "@/lib/api/founder/applications";
import { FounderApplications } from "@/components/dashboard/founder/FounderApplications";

const FounderApplicationsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "founder") redirect("/dashboard");

  const applications = await getFounderApplications()

  return <FounderApplications applications={applications ?? []} />;
};

export default FounderApplicationsPage;