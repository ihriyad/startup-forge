import { StartupDetails } from "@/components/startups/StartupDetails";
import { getStartupDetails, getStartupOpportunities } from "@/lib/api/startups";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";


const StartupDetailsPage = async ({ params }) => {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const [startup, opportunities] = await Promise.all([
    getStartupDetails(id),
    getStartupOpportunities(id)
  ]);

  if (!startup) notFound();

  return (
    <StartupDetails
      startup={startup}
      opportunities={opportunities ?? []}
      currentUser={session?.user ?? null}
    />
  );
};

export default StartupDetailsPage;