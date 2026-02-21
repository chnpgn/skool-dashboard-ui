import React from "react";
import CountChart from "./CountChart";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { tr } from "zod/locales";

const CountChartContainer = async () => {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((item) => item.sex === "MALE")?._count || 0;
  const girls = data.find((item) => item.sex === "FEMALE")?._count || 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-sm font-bold text-gray-900 dark:text-white">
          Students
        </h1>
        <Image src="/more.png" alt="More" width={20} height={20} />
      </div>
      {/* CHART */}

      <CountChart boys={boys} girls={girls} />

      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-(--skool-sky) rounded-full" />
          <h1 className="font-bold text-sm text-gray-900 dark:text-white">
            {boys}
          </h1>
          <h2 className="text-sm text-gray-500 dark:text-gray-400">
            Boys ({Math.round(boys / (boys + girls || 1) * 100)}%)
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-(--skool-yellow) rounded-full" />
          <h1 className="font-bold text-sm text-gray-900 dark:text-white">
           {girls}
          </h1>
          <h2 className="text-sm text-gray-500 dark:text-gray-400">
            Girls ({Math.round(girls / (boys + girls || 1) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;
