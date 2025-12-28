"use client";

import { NextPage } from "next";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import { RechartsDevtools } from '@recharts/devtools';

// #region Sample data
const data = [
  {
    name: "Total",
    count: 100,
    fill: "white",
  },
  {
    name: "Boys",
    count: 55,
    fill: "#8884d8",
  },
  {
    name: "Girls",
    count: 45,
    fill: "#83a6ed",
  },
];

// #endregion
const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};

interface Props {}

const CountChart: NextPage<Props> = ({}) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-sm font-bold text-gray-900 dark:text-white">Students</h1>
        <Image src="/more.png" alt="More" width={20} height={20} />
      </div>
      {/* CHART */}
      <div className="w-full h-[75%] relative">
        <ResponsiveContainer>
          <RadialBarChart
            responsive
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={20}
            data={data}
          >
            <RadialBar
              background
              dataKey="count"
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt="Users"
          width={60}
          height={60}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-(--skool-sky) rounded-full" />
          <h1 className="font-bold text-sm text-gray-900 dark:text-white">1,356</h1>
          <h2 className="text-sm text-gray-500 dark:text-gray-400">Boys (56%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-(--skool-yellow) rounded-full" />
          <h1 className="font-bold text-sm text-gray-900 dark:text-white">1,056</h1>
          <h2 className="text-sm text-gray-500 dark:text-gray-400">Girls (44%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
