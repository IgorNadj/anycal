import { App } from "../App";

export default async function HomePage() {
  return (
    <div>
      <App />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
