import { BrowseStartups } from "@/components/startups/BrowseStartups";
import { getApprovedStartups } from "@/lib/api/startups";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const StartupsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const startups = await getApprovedStartups();

  return (
    <BrowseStartups
      startups={startups ?? []}
      currentUser={session?.user ?? null}
    />
  );
};

export default StartupsPage;