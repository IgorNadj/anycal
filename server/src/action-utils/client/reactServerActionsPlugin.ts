import type { Plugin } from "vite";
import { transformServerAction } from "./transformServerAction.ts";
import { isServerAction } from "./isServerAction.ts";
import { getActionName } from "./getActionName.ts";
import { RegisterServerAction } from "../server/serverActionHandler.ts";

export function reactServerActionsPlugin(
  onServerActionFound: RegisterServerAction,
): Plugin {
  return {
    name: "vite-plugin-react-server-actions",
    transform(code, filePath) {
      if (isServerAction(filePath, code)) {
        const actionName = getActionName(filePath);
        console.log("Transforming action: ", actionName);

        onServerActionFound({ actionName, filePath });

        return transformServerAction({ code, actionName });
      }
      return;
    },
  };
}
