import { AdminOverview } from "@/components/dashboard/admin/AdminOverview";
import { getAllUsers } from "@/lib/api/users";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AdminOverviewPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") redirect("/dashboard");

  const users = await getAllUsers();
  return <AdminOverview users={users}></AdminOverview>;
};

export default AdminOverviewPage;
