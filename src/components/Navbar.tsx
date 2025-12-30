import Image from "next/image";

const Navbar = ({}) => {
  return (
    <div className="flex items-center justify-between p-4 bg--white dark:bg-gray-900 shadow-md w-full">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 dark:ring-gray-700 px-4 py-2 bg-white dark:bg-gray-900">
        <Image src="/search.png" alt="search" width={14} height={14} />
        <input type="text" placeholder="Search..." className="bg-transparent outline-none w-50 h-5 p-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400" />
      </div>
      {/* ICONS AND USERS NOTIFICATION */}
      <div className="flex item-center gap-6 justify-end w-full">
        <div className="bg-white dark:bg-gray-900 rounded-full w-5 h-5 flex item-center justify-center cursor-pointer">
            <Image src="/message.png" alt="notification" width={20} height={20} />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-full w-5 h-5 flex item-center justify-center cursor-pointer relative">
            <Image src="/announcement.png" alt="user" width={20} height={20} />
            <div className="absolute -top-3 -right-3 w-5 h-5 flex item-center justify-center bg-purple-500 text-white rounded-full text-xs">1</div>
        </div>
        <div className="flex flex-col">
            <span className="text-xs leading-3 font-medium text-gray-900 dark:text-white">John Doe</span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 text-right">Admin</span>
        </div>
        <Image src="/avatar.png" alt="user" width={32} height={32} className="rounded-full" />
      </div>
    </div>
  );
};

export default Navbar;
