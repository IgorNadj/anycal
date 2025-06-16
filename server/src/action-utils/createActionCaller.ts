import type { ActionSpec } from "./types.ts";
import { typedFetch } from "./typedFetch.js";
import { spec } from "node:test/reporters";

/**
 * Get a type safe fetch based on the given spec
 *
 * Example frontend code:
 *   const getThings = createActionCaller(getThingsAction);
 *   const things = await getThings();
 */
export const createActionCaller = <ReqBody, ResBody>(
  action: ActionSpec<ReqBody, ResBody>,
) => {
  return async (reqBody?: ReqBody) => {
    const response = await typedFetch({
      url: action.url,
      method: action.method,
      body: reqBody,
    });
    return response as unknown as ResBody;
  };
};
