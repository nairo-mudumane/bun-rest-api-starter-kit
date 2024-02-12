import { Elysia } from "elysia";
import { bearer } from "@elysiajs/bearer";
import { UserController } from "./user-controller";
import mongoose from "mongoose";

const app = new Elysia();

app.use(bearer()).onBeforeHandle(async ({ bearer }) => {
  if (!bearer) throw new Error("Unauthorized");

  const isAuthorized = bearer === "123";
  if (!isAuthorized) throw new Error("Unauthorized");
});

app.use(UserController);

const PORT = process.env.PORT || 4001;
const mongodbUri = "mongodb://localhost:27017/elysia";

mongoose
  .connect(mongodbUri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
      )
    )
  )
  .catch((err) => console.log(err));
