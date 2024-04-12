import type { Request, Response } from "express";
import { prisma } from "../_lib/prisma";

export const listUserController = async (
    request: Request,
    response: Response
) => {
    const users = await prisma.user.findMany();

    response.send(users);
};

export const findOneUserController = async (
    request: Request,
    response: Response
) => {
    const { userId } = request.params;
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        return response.status(404).send("Not found");
    }

    response.send(user);
};

export const createUserController = async (
    request: Request,
    response: Response
) => {
    const { name, email } = request.body;

    if (!name || !email) {
        return response.send({
            error: "Name or email is invalid",
        });
    }

    const userEmailAlreadyExists = await prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
        },
    });

    if (userEmailAlreadyExists) {
        return response.status(400).send("Email already in use");
    }

    const user = await prisma.user.create({
        data: {
            name,
            email,
        },
    });

    response.send(user);
};
