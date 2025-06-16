import { Express } from "express";

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

      // Import the file
      const actionModule = await import(filePath);
      const actionFn = actionModule[actionName];

      // Prepare the arguments
      const args = req.body;
      const result = await actionFn(...args);

      console.log("Result: ", result);

      res.json(result);
    });
  };
};
