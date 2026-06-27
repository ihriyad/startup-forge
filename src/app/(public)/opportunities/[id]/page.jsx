import { OpportunityDetails } from "@/components/opportunities/OpportunityDetails";
import { auth } from "@/lib/auth";
import { publicFetch } from "@/lib/core/server";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

const OpportunityDetailsPage = async ({ params }) => {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const opportunity = await publicFetch(`/api/opportunities/${id}`);
  if (!opportunity) notFound();

  return (
    <OpportunityDetails
      opportunity={opportunity}
      currentUser={session?.user ?? null}
    />
  );
};

export default OpportunityDetailsPage;
