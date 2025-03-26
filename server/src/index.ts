import express from "express";
import { Express, Request, Response } from "express";
import { routes } from "./routes";
import cors from "cors";

const app: Express = express();
const port = 3000;

app.use(express.json());

app.use(cors());

routes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
