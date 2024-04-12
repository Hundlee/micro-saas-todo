import Stripe from "stripe";
import { config } from "../config";

export const stripe = new Stripe(config.stripe.secretKey, {
    apiVersion: "2024-04-10",
});

export const createCheckoutSession = async (userId: string) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "subscription",
            client_reference_id: userId,
            success_url: `http://localhost:3000/success.html`,
            cancel_url: `http://localhost:3000/cancel.html`,
            line_items: [
                {
                    price: config.stripe.proPriceId,
                    quantity: 1,
                },
            ],
        });

        return {
            url: session.url,
        };
    } catch (error) {
        console.error(error);
    }
};
export const handleProcessWebhookCheckout = () => {};
export const handleProcessWebhookUpdatedSubscription = () => {};
