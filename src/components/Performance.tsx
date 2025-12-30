"use client";

import { Pie, PieChart, ResponsiveContainer } from "recharts";
import Image from "next/image";

// #region Sample data
const data = [
  { name: "Group A", value: 88, fill: "#C3EBFA" },
  { name: "Group B", value: 12, fill: "#FAE273" },
];

const Performance = ({}) => {
  return (
    <div className="bg-white p-4 rounded-md h-80 relative">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-gray-600 dark:text-gray-300 text-sm">
          Performance
        </h1>
        <Image src="/more.png" alt="" width={16} height={16} />
      </div>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            fill="#8884d8"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-3xl font-bold">9.2</h1>
        <p className="text-xs text-gray-300">of 10 max LTS</p>
      </div>
      <div className="font-medium absolute bottom-16 left-0 right-0 m-auto text-center">
        1st Semester - 2nd Semester
      </div>
    </div>
  );
};

export default Performance;
