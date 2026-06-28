import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { securedFetch } from "@/lib/core/server";
import { Transactions } from "@/components/dashboard/admin/Transactions";

const TransactionsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") redirect("/dashboard");

  const payments = await securedFetch("/api/payments");

  return <Transactions payments={payments ?? []} />;
};

export default TransactionsPage;