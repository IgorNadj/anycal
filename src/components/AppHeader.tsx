import type { ViewMode } from "../types.ts";
import { AuthAvatar } from "./auth/AuthAvatar.tsx";
import { CurrentDateDisplay } from "./header/CurrentDateDisplay.tsx";
import { PrevNext } from "./header/PrevNext.tsx";
import { Today } from "./header/Today.tsx";
import { ViewModeSelector } from "./header/ViewModeSelector.tsx";

type Props = {
  viewMode: ViewMode;
  setViewMode: (newViewMode: ViewMode) => void;
  currentDate: Date;
  setCurrentDate: (newDate: Date) => void;
};

export const AppHeader = ({
  viewMode,
  setViewMode,
  currentDate,
  setCurrentDate,
}: Props) => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, display: "flex" }}>
        <div>
          <Today setCurrentDate={setCurrentDate} />
        </div>
        <div>
          <PrevNext
            viewMode={viewMode}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        </div>
        <div>
          <CurrentDateDisplay currentDate={currentDate} viewMode={viewMode} />
        </div>
      </div>
      <div>
        <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      <div>
        <AuthAvatar />
      </div>
    </div>
  );
};
