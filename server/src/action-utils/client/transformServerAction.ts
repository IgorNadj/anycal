import * as swc from "@swc/core";
import { collectExportNames } from "./collectExportNames.ts";

export const transformServerAction = ({
  code,
  actionName,
}: {
  code: string;
  actionName: string;
}) => {
  const mod = swc.parseSync(code);
  const exportNames = collectExportNames(mod);
  const [firstExportName] = exportNames;
  let newCode = `
const createActionCaller = (actionName) => {
  return async (...args) => {
    console.log("caller called with args: " + args);
    const result = await fetch("/actions/" + actionName, {
      method: "POST",
      body: JSON.stringify(args),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.json();
  };
};

export const ${firstExportName} = createActionCaller('${actionName}');
`;
  return swc.transformSync(newCode, {
    jsc: { target: "esnext" },
    sourceMaps: true,
  });
};
