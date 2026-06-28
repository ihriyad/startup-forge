import { Sidebar } from "@/components/dashboard/Sidebar";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/shared/Navbar";
import { Plus_Jakarta_Sans } from "next/font/google";

export const metadata = {
  title: "Dashboard | StartupForge",
  description: "StartupForge Dashboard",
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
});

const DashboardLayout = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const role = session.user.role;

  return (
    <>
    <Navbar></Navbar>
     <div className={`${jakarta.className} flex min-h-screen`}>
      
      <Sidebar role={role} user={session.user} />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
    </>
  );
};

export default DashboardLayout;
