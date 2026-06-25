import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ManageUsers } from "@/components/dashboard/admin/ManageUsers";
import { getAllUsers } from "@/lib/api/users";

const ManageUsersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") redirect("/dashboard");
  const users = await getAllUsers();

  return <ManageUsers  users={users}/>;
};

export default ManageUsersPage;
