export type ActionSpec<ReqBody, ResBody> = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  handle: (reqBody: ReqBody) => Promise<ResBody>;
};
