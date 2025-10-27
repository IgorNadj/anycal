import { Route, Routes } from "react-router";
import { CalendarPage } from "./pages/CalendarPage.tsx";
import { CalendarLayout } from "./pages/layouts/app/CalendarLayout.tsx";
import { ContentLayout } from "./pages/layouts/app/ContentLayout.tsx";
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
        {/* logged out pages */}
        <Route path="/hi" element={<SplashLayout />}>
          <Route path=":form?" element={<RegisterOrSignInPage />} />
        </Route>

        {/* app pages */}
        <Route path="/" element={<AppLayout />}>
          {/* loading page... TODO: do this differently, in a provider maybe? */}
          <Route index element={<LoadingPage />} />

          {/* calendar pages */}
          <Route path="cal" element={<CalendarLayout />}>
            <Route path=":calendarUuid" element={<CalendarPage />} />
          </Route>

          {/* content pages */}
          <Route path="app" element={<ContentLayout />}>
            <Route path="settings" element={<SettingsPage />} />
            <Route path="things/:thingUuid" element={<ThingPage />} />
          </Route>
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
