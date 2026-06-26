import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AddOpportunity } from "@/components/dashboard/founder/AddOppotunity";
import { getFounderStartup } from "@/lib/api/founder/startups";

const AddOpportunityPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "founder") redirect("/dashboard");

  // founder must have a startup before posting opportunities
   const startup = await getFounderStartup();
 

  if (!startup) redirect("/dashboard/founder/my-startup");

  return <AddOpportunity user={session.user} startup={startup} />;
};

export default AddOpportunityPage;