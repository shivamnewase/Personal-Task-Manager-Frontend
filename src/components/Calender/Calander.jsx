import React, { useContext, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // for the day grid view
import interactionPlugin from "@fullcalendar/interaction"; // for interaction features like clicking
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";

export default function Calendar({ projectTaks }) {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  console.log("🚀 ~ Calendar ~ selectedEvent:", selectedEvent)

  const handleDateClick = (arg) => {
    alert(`Date clicked: ${arg.dateStr}`);
  };

  const handleEventClick = (arg) => {
    setSelectedEvent(arg.event);
    setOpen(true);
  };

  const data = projectTaks.tasks?.map((list) => {
    return {
      title: list.name,
      start: list.startDate,
      end: list.dueDate,
    };
  });

  const renderEventContent = (eventInfo) => {
    return (
      <div style={{ margin: "10px 0" }}>
        {" "}
        {/* Add margin here */}
        <strong>{eventInfo.event.title}</strong>
        <div>Start Date: {eventInfo.event.start.toDateString()}</div>
        <div>
          Due Date:{" "}
          {eventInfo.event.end ? eventInfo.event.end.toDateString() : "N/A"}
        </div>
      </div>
    );
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div style={{ margin: "20px" }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        events={data}
        eventContent={renderEventContent}
        eventClick={handleEventClick} // Add event click handler
      />

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6">Task Name: {selectedEvent?.title}</Typography>
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="StartDate"
            type="text"
            fullWidth
            variant="outlined"
            disabled
            value={selectedEvent?.start.toDateString()}
            placeholder="Add any additional details here"
          />
          <TextField
            autoFocus
            margin="dense"
            label="DueDate"
            disabled
            type="text"
            fullWidth
            variant="outlined"
            value={
              selectedEvent?.end ? selectedEvent.end.toDateString() : "N/A"
            }
            placeholder="Add any additional details here"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
