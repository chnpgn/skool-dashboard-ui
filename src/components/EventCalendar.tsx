"use client";

import { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Props {}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: 1,
    title: "Project Kickoff Meeting",
    time: "2025-01-05T09:00:00Z",
    description:
      "Initial meeting with stakeholders to align on project scope, objectives, and timelines.",
  },
  {
    id: 2,
    title: "Design Review Session",
    time: "2025-01-10T14:30:00Z",
    description:
      "Review of UI/UX designs and approval of the final visual direction.",
  },
  {
    id: 3,
    title: "Backend API Deployment",
    time: "2025-01-18T11:00:00Z",
    description:
      "Deployment of the first stable version of backend APIs to the staging environment.",
  },
  {
    id: 4,
    title: "User Acceptance Testing",
    time: "2025-01-25T08:45:00Z",
    description:
      "End-to-end testing with selected users to validate functionality and usability.",
  },
  {
    id: 5,
    title: "Production Release",
    time: "2025-02-01T16:00:00Z",
    description:
      "Official release of the application to the production environment.",
  },
];

const EventCalendar: NextPage<Props> = ({}) => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-md">
      <Calendar onChange={onChange} value={value} />
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold my-4 text-gray-600 dark:text-gray-300">
          Events
        </h3>
        <Image src="/more.png" alt="Calendar Icon" width={24} height={24} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-2 border-2 border-gray-200 dark:border-gray-700 rounded-md border-t-4 odd:border-t-(--skool-sky) even:border-t-(--skool-purple)"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                {event.title}
              </h1>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(event.time).toLocaleString()}
              </span>
            </div>
            <p className="mt-2 text-gray-400 dark:text-gray-500 text-xs">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
