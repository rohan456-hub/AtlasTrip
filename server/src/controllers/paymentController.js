import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder";
const stripe = new Stripe(stripeKey, { apiVersion: "2024-12-18.acacia" });

export const createPaymentIntent = async (req, res) => {
  const { amount, currency = "usd", metadata = {} } = req.body;

  if (!amount) {
    return res.status(400).json({ message: "Amount is required" });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.json({
      clientSecret: "demo_client_secret",
      provider: "demo",
      message: "Stripe key missing, returning demo secret for UI integration."
    });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    metadata
  });

  return res.json({ clientSecret: paymentIntent.client_secret, provider: "stripe" });
};
