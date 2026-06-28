import { AdminOverview } from "@/components/dashboard/admin/AdminOverview";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { publicFetch, securedFetch } from "@/lib/core/server";

const AdminOverviewPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") redirect("/dashboard");

  const [users, startups, opportunities, payments] = await Promise.all([
    publicFetch("/api/users"),
    publicFetch("/api/admin/startups"),
    publicFetch("/api/opportunities/all"),
    securedFetch("/api/payments"),
  ]);

  return (
    <AdminOverview
      users={users        ?? []}
      startups={startups  ?? []}
      opportunities={opportunities ?? []}
      payments={payments  ?? []}
    />
  );
};

export default AdminOverviewPage;