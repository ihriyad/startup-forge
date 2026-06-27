import { BrowseOpportunities } from "@/components/opportunities/BrowseOpportunities";
import { auth } from "@/lib/auth";
import { publicFetch } from "@/lib/core/server";
import { headers } from "next/headers";

const OpportunitiesPage = async ({ searchParams }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const resolvedParams = await searchParams;

  const search = resolvedParams?.search || "";
  const workType = resolvedParams?.workType || "";
  const industry = resolvedParams?.industry || "";
  const page = resolvedParams?.page || "1";

  // build query string for backend
  const query = new URLSearchParams();
  if (search) query.set("search", search);
  if (workType) query.set("workType", workType);
  if (industry) query.set("industry", industry);
  query.set("page", page);
  query.set("limit", "9");

  const result = await publicFetch(`/api/opportunities?${query.toString()}`);

  return (
    <BrowseOpportunities
      opportunities={result?.opportunities ?? []}
      total={result?.total ?? 0}
      currentPage={Number(page)}
      currentUser={session?.user ?? null}
      filters={{ search, workType, industry }}
    />
  );
};

export default OpportunitiesPage;
