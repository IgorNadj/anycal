export const typedFetch = async <ReqBody, ResBody>({
  url,
  method,
  body,
}: {
  url: string;
  method: string;
  body: ReqBody;
}) =>
  fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
