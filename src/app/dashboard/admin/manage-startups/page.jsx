import { ManageStartups } from "@/components/dashboard/admin/ManageStartups";
import { getStartups } from "@/lib/api/admin/startups";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


const ManageStartupsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") redirect("/dashboard");

  const startups = await getStartups()

  return <ManageStartups startups={startups ?? []} />;
};

export default ManageStartupsPage;