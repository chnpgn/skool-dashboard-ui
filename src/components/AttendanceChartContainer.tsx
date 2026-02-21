import React from "react";
import AttendanceChart from "./AttendanceChart";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

const AttendanceChartContainer = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek); // Set to Sunday

  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: startOfWeek,
        lte: today,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
    };

  resData.forEach((record) => {
    const itemDate = new Date(record.date);

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayName = daysOfWeek[itemDate.getDay() - 1]; // Get day name based on index

      if (record.present) {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1;
      }
    }
  });

  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold text-gray-900 dark:text-white">
          Attendance Chart
        </h1>
        <Image src="/more.png" alt="Attendance" width={20} height={20} />
      </div>
      <AttendanceChart data={data} />
    </div>
  );
};

export default AttendanceChartContainer;
