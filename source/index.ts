import express from "express";
import {
    findOneUserController,
    listUserController,
} from "./_controllers/user.controller";

const app = express();
const port = 3000;

app.get("/users", listUserController);
app.get("/users/:userId", findOneUserController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
