"use client";

import { NextPage } from "next";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// #region Sample data
const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
  },
  {
    name: "Mar",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Apr",
    income: 2780,
    expense: 3908,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
  },
  {
    name: "Jun",
    income: 2390,
    expense: 3800,
  },
  {
    name: "Jul",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Aug",
    income: 1890,
    expense: 4800,
  },
  {
    name: "Sep",
    income: 2390,
    expense: 3800,
  },
  {
    name: "Oct",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Nov",
    income: 2390,
    expense: 3800,
  },
  {
    name: "Dec",
    income: 3490,
    expense: 4300,
  },
];

interface Props {}

const FinanceChart: NextPage<Props> = ({}) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-sm font-bold text-gray-900 dark:text-white">Finance</h1>
        <Image src="/more.png" alt="More" width={20} height={20} />
      </div>
      {/* CHART */}
      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          responsive
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
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
            tickMargin={20}
          />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#8884d8"
            strokeWidth={5}
          />
          <Line type="monotone" dataKey="expense" stroke="#82ca9d" strokeWidth={5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
