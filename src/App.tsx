import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout.tsx";
import { CalendarPage } from "./pages/CalendarPage.tsx";
import { Loading } from "./pages/Loading.tsx";
import { PageNotFoundPage } from "./pages/PageNotFoundPage.tsx";
import { ThingPage } from "./pages/ThingPage.tsx";
import { Welcome } from "./pages/Welcome.tsx";
import { AppProviders } from "./providers/AppProviders.tsx";

export const App = () => {
  return (
    <AppProviders>
      <Layout>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/home" element={<CalendarPage />} />
          <Route path="/thing/:uuid" element={<ThingPage />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="*" element={<PageNotFoundPage />} />
        </Routes>
      </Layout>
    </AppProviders>
  );
};
