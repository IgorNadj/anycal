import type { ActionSpec } from "./types.ts";
import { Request, Response } from "express";

/**
 * Get a type safe express route based on the given spec
 *
 * Example server code:
 *   const getThings = createActionHandler(getThingsAction);
 *   app.use(getThings);
 */
export const createActionHandler = <ReqBody, ResBody>(
  action: ActionSpec<ReqBody, ResBody>,
) => {
  return async (
    req: Request<{}, {}, ReqBody>,
    res: Response<ResBody | { error: string }>,
  ) => {
    const result = await action.handle(req.body);
    res.status(200).json(result);
  };
};
