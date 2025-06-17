import { Express } from "express";
import { parse, stringify } from "superjson";

export type RegisterServerAction = ({
  actionName,
  filePath,
}: {
  actionName: string;
  filePath: string;
}) => void;

export const serverActionHandler = (app: Express): RegisterServerAction => {
  return ({ actionName, filePath }) => {
    console.log("Registering server action: ", actionName, filePath);

    app.post("/actions/" + actionName, async (req, res) => {
      console.log("Received request for action: ", actionName);
      console.log("Request body: ", req.body);

      const serialisedFnArgs = req.body.serialisedFnArgs;
      const fnArgs = parse(serialisedFnArgs) as any[];

      console.log("Request fn args: ", fnArgs);

      // Import the file
      const actionModule = await import(filePath);
      const actionFn = actionModule[actionName];

      // Prepare the arguments
      const result = await actionFn(...fnArgs);

      console.log("Result: ", result);

      const serialisedFnResult = stringify(result);
      res.json({ serialisedFnResult });
    });
  };
};
