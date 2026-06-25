import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const role = session.user.role;

  if (role === "admin") redirect("/dashboard/admin");
  if (role === "founder") redirect("/dashboard/founder");
  if (role === "collaborator") redirect("/dashboard/collaborator");
};

export default DashboardPage;
