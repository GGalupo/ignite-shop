import type { NextApiRequest, NextApiResponse } from "next";

import { stripe } from "../../lib";

export default async function checkout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed." });

  const { priceId } = req.body;

  if (!priceId) return res.status(400).json({ error: "Price not found." });

  const successUrl = `${process.env.IGNITE_SHOP_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.IGNITE_SHOP_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
