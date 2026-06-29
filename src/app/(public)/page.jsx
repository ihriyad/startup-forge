import { Banner } from "@/components/home/Banner";
import { SuccessStories } from "@/components/home/SuccessStories";
import { WhyJoin } from "@/components/home/WhyJoin";
import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { publicFetch } from "@/lib/core/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { FeaturedOpportunities } from "@/components/home/FeaturedOpportunities";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const [startups, opportunitiesData] = await Promise.all([
    publicFetch("/api/startups/approved"),
    publicFetch("/api/opportunities?limit=6&page=1"),
  ]);

  return (
    <main>
      <Navbar></Navbar>
      <Banner startups={startups ?? []} currentUser={session?.user ?? null} />
      <FeaturedOpportunities
        opportunities={opportunitiesData?.opportunities ?? []}
      />
      <SuccessStories></SuccessStories>
      <WhyJoin></WhyJoin>
      <Footer></Footer>
    </main>
  );
}
