import { prisma } from "@/lib/prisma";
import React from "react";

const StudentAttendanceCard = async ({ id }: { id: string }) => {
  const attendance = await prisma.attendance.findMany({
    where: {
      studentId: id,
      date: {
        gte: new Date(new Date().getFullYear(), 0, 1), // last 30 days
      },
    },
  });

  const totalDays = attendance.length;
  const presentDays = attendance.filter((a) => a.present).length;
  const attendancePercentage =
    totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  return (
    <div className="">
      <h1 className="text-xl font-semibold">{attendancePercentage || '-'}%</h1>
      <span className="text-sm text-gray-400">Attendance</span>
    </div>
  );
};

export default StudentAttendanceCard;
