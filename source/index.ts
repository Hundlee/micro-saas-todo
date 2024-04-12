import express from "express";
import {
    createUserController,
    findOneUserController,
    listUserController,
} from "./_controllers/user.controller";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/users", listUserController);

app.post("/users", createUserController);

app.get("/users/:userId", findOneUserController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
