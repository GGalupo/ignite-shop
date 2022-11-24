import type { NextApiRequest, NextApiResponse } from "next";

import { stripe } from "../../lib";

export default async function checkout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const priceId = "price_1M5twbDmLeTAh27X4byBY1Hf";
  const successUrl = `${process.env.IGNITE_SHOP_URL}/success`;
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
