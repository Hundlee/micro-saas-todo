import express from "express";
import {
    createUserController,
    findOneUserController,
    listUserController,
} from "./_controllers/user.controller";
import { createTodoController } from "./_controllers/todo.controller";
import { createCheckoutController } from "./_controllers/checkout.controller";
import { stripeWebhookController } from "./_controllers/stripe.controller";

const app = express();
const port = 3000;

app.post(
    "/stripe",
    express.raw({ type: "application/json" }),
    stripeWebhookController
);

app.use(express.json());

app.get("/users", listUserController);

app.post("/users", createUserController);

app.get("/users/:userId", findOneUserController);

app.post("/todos", createTodoController);

app.post("/checkout", createCheckoutController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
