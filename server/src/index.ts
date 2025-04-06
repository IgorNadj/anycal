import express from "express";
import { Express, Request, Response } from "express";
import { routes } from "./routes";
import cors from "cors";
import morgan from "morgan";

const app: Express = express();
const port = 3000;

app.use(morgan("dev"));

app.use(express.json());

app.use(cors());

app.use("/api", routes());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
