"use client";

import { NextPage } from "next";

interface Props {}

const Announcements: NextPage<Props> = ({}) => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-gray-600 text-lg">Announcements</h1>
        <span className="text-xs text-gray-500">View All</span>
      </div>
      <div className="bg-(--skool-sky-light) rounded-md p-4 mt-2">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-white">School Reopening</h2>
          <span className="text-xs text-white rounded-md px-1 py-1">
            Jan 5, 2025
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="bg-(--skool-purple-light) rounded-md p-4 mt-2">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-white">School Reopening</h2>
          <span className="text-xs text-white rounded-md px-1 py-1">
            Jan 5, 2025
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="bg-(--skool-yellow-light) rounded-md p-4 mt-2">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-white">School Reopening</h2>
          <span className="text-xs text-white rounded-md px-1 py-1">
            Jan 5, 2025
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
};

export default Announcements;
