import { Route, Routes } from "react-router";
import { CalendarPage } from "./pages/CalendarPage.tsx";
import { AppContentPageLayout } from "./pages/layouts/app/AppContentPageLayout.tsx";
import { AppDataPageLayout } from "./pages/layouts/app/AppDataPagelLayout.tsx";
import { AppLayout } from "./pages/layouts/AppLayout.tsx";
import { SplashLayout } from "./pages/layouts/SplashLayout.tsx";
import { LoadingPage } from "./pages/LoadingPage.tsx";
import { PageNotFoundPage } from "./pages/PageNotFoundPage.tsx";
import { RegisterOrSignInPage } from "./pages/RegisterOrSignInPage.tsx";
import { SettingsPage } from "./pages/SettingsPage.tsx";
import { SignOutPage } from "./pages/SignOutPage.tsx";
import { ThingPage } from "./pages/ThingPage.tsx";
import { AppProviders } from "./providers/AppProviders.tsx";

export const App = () => {
  return (
    <AppProviders>
      <Routes>
        {/* loading page... TODO: do this differently, in a provider maybe? */}
        <Route index element={<LoadingPage />} />

        {/* App Pages */}
        <Route path="/app" element={<AppLayout />}>
          {/* - App Data Pages */}
          <Route element={<AppDataPageLayout />}>
            <Route path="cal/:calendarUuid" element={<CalendarPage />} />
            <Route path="things/:thingUuid" element={<ThingPage />} />
          </Route>

          {/* - App Content Pages */}
          <Route element={<AppContentPageLayout />}>
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* logged out */}
        <Route path="/hi" element={<SplashLayout />}>
          <Route path=":form?" element={<RegisterOrSignInPage />} />
        </Route>

        {/* sign out */}
        <Route path="/sign-out" element={<SplashLayout />}>
          <Route path="" element={<SignOutPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
    </AppProviders>
  );
};
