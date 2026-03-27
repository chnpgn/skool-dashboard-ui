"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const BigCalendar = ({data}: {data: {title: string, start: Date, end: Date}[]}) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleViewChange = (newView: View) => {
    setView(newView);
  };
  
  return (
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: '98%' }}
      onView={handleViewChange}
      min={new Date(2026, 1, 0, 8, 0, 0)}
      max={new Date(2026, 1, 11, 17, 0, 0)}
    />
  );
};

export default BigCalendar;
