import express from "express";
import { Express } from "express";
import { routes } from "./routes.ts";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import { addVite } from "./vite.js";

const app: Express = express();
const port = 3000;

app.use(morgan("dev"));

app.use(express.json());

app.use(cors());

app.use("/api", routes());

// Vite only runs on dev
if (process.env.NODE_ENV !== "production") {
  await addVite(app);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
