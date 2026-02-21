import React from "react";
import Image from "next/image";
import Calendar from "react-calendar";
import EventList from "./EventList";
import EventCalendar from "./EventCalendar";

const EventCalendarContainer = async ({ searchParams} : { searchParams: { [keys: string]: string | undefined}}) => {
    const { date } = await searchParams;
    return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-md">
      <EventCalendar />
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold my-4 text-gray-600 dark:text-gray-300">
          Events
        </h3>
        <Image src="/more.png" alt="Calendar Icon" width={24} height={24} />
      </div>
      <div className="flex flex-col gap-4">
        <EventList dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;
