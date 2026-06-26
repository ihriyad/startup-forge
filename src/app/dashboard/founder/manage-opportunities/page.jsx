import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getFounderOpportunities } from "@/lib/api/founder/opportunities";
import { ManageOpportunities } from "@/components/dashboard/founder/ManageOpportunities";

const ManageOpportunitiesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "founder") redirect("/dashboard");

  const opportunities = await getFounderOpportunities();

  return <ManageOpportunities opportunities={opportunities ?? []} />;
};

export default ManageOpportunitiesPage;
