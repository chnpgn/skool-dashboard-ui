'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const TableSearch = ({}) => {

  const router = useRouter();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = (event.currentTarget.elements[0] as HTMLInputElement).value;

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("search", value);
    router.push(`${window.location.pathname}?${searchParams.toString()}`);
  };

  return (
    <form
    onSubmit={handleSubmit}
    className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 dark:ring-gray-700 px-4 py-2 bg-white dark:bg-gray-900">
      <Image src="/search.png" alt="search" width={14} height={14} />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent outline-none w-50 h-5 p-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
      />
    </form>
  );
};

export default TableSearch;
