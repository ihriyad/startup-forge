import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "founder") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const priceId = "price_1TmxtuRA9Bh8oYo5B8Q6Uw0j"

  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_BETTER_AUTH_URL;

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user?.email,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    
    success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/payment/cancel`,
    metadata: {
      userId: session.user.id,
      userEmail: session.user.email,
    },
  });

  // Stripe docs: redirect 303 directly to session URL
  return NextResponse.redirect(checkoutSession.url, 303);
};
