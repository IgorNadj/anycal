import express from "express";
import { Express } from "express";
import { routes } from "./routes.ts";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import { vite } from "./vite.ts";
import { serverActionHandler } from "./action-utils/server/serverActionHandler.ts";

const app: Express = express();
const port = 3000;

app.use(morgan("dev"));

app.use(express.json());

app.use(cors());

app.use("/api", routes());

// Server action handler
const onServerActionFound = serverActionHandler(app);

// Vite serves the frontend + transforms server actions and lets us know it did so
if (process.env.NODE_ENV !== "production") {
  await vite({ app, onServerActionFound });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
