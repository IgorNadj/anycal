import express from 'express';
import {Express, Request, Response} from 'express';
import {routes} from "./routes";



const app: Express = express();
const port = 3000;


app.use(express.json());

routes(app);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});