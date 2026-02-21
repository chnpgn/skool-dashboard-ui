"use client";

import Image from "next/image";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
// import { RechartsDevtools } from '@recharts/devtools';

// #region Sample data

// #endregion
const CountChart = ({ boys, girls}: { boys: number; girls: number }) => {
  const data = [
    {
      name: "Total",
      count: boys + girls,
      fill: "white",
    },
    {
      name: "Boys",
      count: boys,
      fill: "#8884d8",
    },
    {
      name: "Girls",
      count: girls,
      fill: "#83a6ed",
    },
  ];
  return (
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
          <RadialBar background dataKey="count" />
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
  );
};

export default CountChart;
