import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AddOpportunity } from "@/components/dashboard/founder/AddOppotunity";
import { getFounderStartup } from "@/lib/api/founder/startups";
import { PremiumGate } from "@/components/payment/PremiumGate";
import { publicFetch } from "@/lib/core/server";

const AddOpportunityPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "founder") redirect("/dashboard");

  // founder must have a startup before posting opportunities
  const startup = await getFounderStartup();

  if (!startup) redirect("/dashboard/founder/my-startup");

  // count existing opportunities
  const opportunities = await publicFetch(
    `/api/opportunities/founder?email=${session.user.email}`,
  );

  const oppCount = opportunities?.length ?? 0;
  const isPremium = session.user.plan === "premium";
  const isGated = oppCount >= 3 && !isPremium;

  if (isGated) {
    return <PremiumGate count={oppCount} />;
  }

  return <AddOpportunity user={session.user} startup={startup} />;
};

export default AddOpportunityPage;
