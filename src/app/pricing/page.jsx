import { PricingPage } from "@/components/payment/PricingPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const Pricing = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <PricingPage
      currentUser={session?.user ?? null}
    />
  );
};

export default Pricing;