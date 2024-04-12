import type { Request, Response } from "express";
import { prisma } from "../_lib/prisma";
import { createCheckoutSession } from "../_lib/stripe";

export const createCheckoutController = async (
    request: Request,
    response: Response
) => {
    const userId = request.headers["x-user-id"];

    if (!userId) {
        return response.status(403).send({
            error: "Not Authorized",
        });
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId as string,
        },
    });

    if (!user) {
        return response.status(403).send({
            error: "Not Authorized",
        });
    }

    const checkout = await createCheckoutSession(user.id);

    return response.send(checkout);
};
