import { NextPage } from "next";
import Image from "next/image";

interface Props {
  type: "staff" | "parent" | "student" | "teacher";
}

const UserCard: NextPage<Props> = ({ type }) => {
  return (
    <div className="rounded-2xl odd:bg-(--skool-sky-light) even:bg-(--skool-yellow-light) dark:odd:bg-opacity-20 dark:even:bg-opacity-20 p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-green-600 dark:text-green-400">2024/25</span>
        <Image src="/more.png" alt="User" width={20} height={20} />
      </div>
      <h1 className="text-lg font-semibold my-4 text-gray-900 dark:text-white">1,222</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500 dark:text-gray-400">{type}</h2>
    </div>
  );
};

export default UserCard;
