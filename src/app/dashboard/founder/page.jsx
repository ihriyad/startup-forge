// app/dashboard/founder/page.jsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FounderOverview } from "@/components/dashboard/founder/FounderOverview";
import { publicFetch } from "@/lib/core/server";
import { getFounderStats } from "@/lib/api/startups";

const FounderOverviewPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "founder") redirect("/dashboard");

  // fetch founder's stats
  const stats = await getFounderStats();

  return <FounderOverview user={session.user} stats={stats} />;
};

export default FounderOverviewPage;