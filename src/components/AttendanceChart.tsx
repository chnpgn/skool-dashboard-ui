"use client";

import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AttendanceChart = ({ data} : { data: { name: string; present: number; absent: number }[]}) => {
  return (
    
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          barSize={20}
          responsive
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            width="auto"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
          <Bar
            dataKey="present"
            fill="#8884d8"
            radius={[10, 10, 0, 0]}
            legendType="circle"
          />
          <Bar
            dataKey="absent"
            fill="#82ca9d"
            radius={[10, 10, 0, 0]}
            legendType="circle"
          />
        </BarChart>
      </ResponsiveContainer>
  );
};

export default AttendanceChart;
