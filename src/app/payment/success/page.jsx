import { PaymentSuccess } from "@/components/payment/PaymentSuccess";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";


const PaymentSuccessPage = async ({ searchParams }) => {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (cs_test_...)");

  // retrieve with expanded data — Stripe docs pattern
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  // Stripe docs: if session is still open, payment didn't complete
  if (session.status === "open") {
    redirect("/pricing");
  }

  if (session.status === "complete") {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER;

    // save transaction + upgrade plan — duplicate-safe via transaction_id check
    await fetch(`${baseUrl}/api/payments`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({
        user_email:     session.metadata.userEmail,
        user_id:        session.metadata.userId,
        amount:         session.amount_total / 100,
        transaction_id: session.id,
        payment_status: session.payment_status,
        paid_at:        new Date(),
      }),
    });

    return (
      <PaymentSuccess
        isPaid={true}
        amount={session.amount_total / 100}
        email={session.customer_details?.email}
      />
    );
  }
};

export default PaymentSuccessPage;