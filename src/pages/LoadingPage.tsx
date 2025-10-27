import { CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCalendars } from "../hooks/useCalendars.ts";
import { AuthContext } from "../providers/AuthContext.tsx";

export const LoadingPage = () => {
  const { userUuid } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data: calendars } = useCalendars();

  if (!userUuid) {
    navigate("/hi");
  }

  useEffect(() => {
    const [firstCalendar] = calendars;
    if (firstCalendar) {
      navigate(`/cal/${firstCalendar.uuid}`);
    }
  }, [calendars]);

  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgress(true);
    }, 1000); // Delay of 1 second

    return () => {
      clearTimeout(timer); // Clean up the timer if the component unmounts
    };
  }, []);

  return <>{showProgress && <CircularProgress />}</>;
};
