// import { Add, MoreVert } from "@mui/icons-material";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   Menu,
//   MenuItem,
//   Typography,
// } from "@mui/material";
// import { useContext, useState } from "react";
// import { NavLink } from "react-router";
// import { createCalendar } from "../../actions/db/mutations.ts";
// import { useCalendars } from "../../hooks/useCalendars.ts";
// import { useCreateCalendar } from "../../hooks/useCreateCalendar.ts";
// import { useDeleteCalendar } from "../../hooks/useDeleteCalendar.ts";
// import { AuthContext } from "../../providers/AuthContext.tsx";
// import { StateContext } from "../../providers/StateContext.tsx";
// import type { Calendar } from "../../types.ts";
// import { TextFieldWithCopyButton } from "../form/TextFieldWithCopyButton.tsx";
// import { v4 as uuidv4 } from "uuid";
//
// export const CalendarsList = () => {
//   const ctx = useContext(StateContext);
//   const { setCurrentlyEditingCalendar, setIsCreatingCalendar } = ctx;
//
//   const { userUuid } = useContext(AuthContext);
//
//   const { data: calendars } = useCalendars();
//   const [ firstCalendar ] = calendars;
//
//   const { mutate: deleteCalendar } = useDeleteCalendar();
//   const { mutate: createCalendar } = useCreateCalendar();
//
//   const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
//   const [menuCalendar, setMenuCalendar] = useState<Calendar | null>(null);
//   const [calendarToDelete, setCalendarToDelete] = useState<Calendar | null>(null);
//   const [subscriptionCalendar, setSubscriptionCalendar] = useState<Calendar | null>(null);
//
//   const menuOpen = Boolean(menuAnchorEl);
//
//   const openMenu = (e: React.MouseEvent<HTMLButtonElement>, calendar: Calendar) => {
//     setMenuAnchorEl(e.currentTarget);
//     setMenuCalendar(calendar);
//   };
//
//   const closeMenu = () => {
//     setMenuAnchorEl(null);
//     setMenuCalendar(null);
//   };
//
//   const confirmDelete = () => {
//     if (!calendarToDelete) return;
//     deleteCalendar(calendarToDelete);
//     setCalendarToDelete(null);
//   };
//
//   const onCreateCalendarClick = () => {
//     if (!userUuid) return;
//     const newCalendar: Calendar = {
//       uuid: uuidv4(),
//       name: 'New Calendar',
//       userUuid,
//     }
//     createCalendar(newCalendar);
//   }
//
//   if (calendars.length === 1) {
//     return (
//
//     )}
//   }
//
//   return (
//     <>
//       <Box sx={{ display: "flex" }}>
//         <Typography sx={{ flex: 1 }} variant="h6">
//           Calendars
//         </Typography>
//         <IconButton onClick={onCreateCalendarClick}>
//           <Add />
//         </IconButton>
//       </Box>
//
//       <List>
//         {calendars.map((calendar) => (
//           <ListItem
//             key={calendar.uuid}
//             disablePadding
//             sx={{
//               "&:hover .calendar-menu-btn": { opacity: 1, pointerEvents: "auto" },
//             }}
//             secondaryAction={
//               <IconButton
//                 edge="end"
//                 className="calendar-menu-btn"
//                 sx={{
//                   opacity: 0,
//                   pointerEvents: "none",
//                   transition: "opacity 0.15s",
//                   "&:focus-visible": { opacity: 1, pointerEvents: "auto" },
//                 }}
//                 onClick={(e) => openMenu(e as any, calendar)}
//               >
//                 <MoreVert />
//               </IconButton>
//             }
//           >
//             <ListItemButton>{calendar.name}</ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//
//       <Menu anchorEl={menuAnchorEl} open={menuOpen} onClose={closeMenu}>
//         <MenuItem
//           onClick={() => {
//             if (menuCalendar) setCurrentlyEditingCalendar(menuCalendar);
//             closeMenu();
//           }}
//         >
//           Settings
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             if (menuCalendar) setSubscriptionCalendar(menuCalendar);
//             closeMenu();
//           }}
//         >
//           Subscribe to this Calendar
//         </MenuItem>
//         <MenuItem
//           disabled={calendars.length <= 1}
//           onClick={() => {
//             if (menuCalendar) setCalendarToDelete(menuCalendar);
//             closeMenu();
//           }}
//         >
//           Delete
//         </MenuItem>
//       </Menu>
//
//       <Dialog open={calendarToDelete !== null} onClose={() => setCalendarToDelete(null)}>
//         <DialogTitle>Delete calendar?</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete "{calendarToDelete?.name}"? This cannot be
//             undone.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setCalendarToDelete(null)}>Cancel</Button>
//           <Button color="error" variant="contained" onClick={confirmDelete}>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//
//       <Dialog
//         open={subscriptionCalendar !== null}
//         onClose={() => setSubscriptionCalendar(null)}
//       >
//         <DialogTitle>Subscribe to Calendar</DialogTitle>
//         <DialogContent>
//           <Typography sx={{ mb: 2 }}>
//             You can add this Calendar to your calendar app with the following url:
//           </Typography>
//           <TextFieldWithCopyButton
//             value={
//               subscriptionCalendar
//                 ? `${window.location.origin}/subscribe?uuid=${subscriptionCalendar.uuid}`
//                 : ""
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setSubscriptionCalendar(null)}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };
