import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const listUserController = async (
    request: Request,
    response: Response
) => {
    const users = await prisma.user.findMany();

    response.send(users);
};
