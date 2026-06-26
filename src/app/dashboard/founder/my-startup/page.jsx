import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { publicFetch } from "@/lib/core/server";
import { MyStartup } from "@/components/dashboard/founder/MyStartup";
import { getFounderStartup } from "@/lib/api/startups";

const MyStartupPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "founder") redirect("/dashboard");

  const startup = await getFounderStartup();
  console.log(startup, "founder startup");

  return <MyStartup user={session.user} existingStartup={startup} />;
};

export default MyStartupPage;
