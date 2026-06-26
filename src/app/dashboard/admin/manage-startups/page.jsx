import { ManageStartups } from "@/components/dashboard/admin/ManageStartups";
import { getAdminStartups } from "@/lib/api/startups";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


const ManageStartupsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") redirect("/dashboard");

  const startups = await getAdminStartups()

  return <ManageStartups startups={startups ?? []} />;
};

export default ManageStartupsPage;