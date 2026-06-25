import { Sidebar } from "@/components/dashboard/Sidebar";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const role = session.user.role;

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} user={session.user} />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
