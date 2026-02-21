import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const Announcements = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const roleConditions = {
    admin: {},
    teacher: {
      lessons: {
        some: {
          teacherId: userId,
        },
      },
    },
    student: {
      students: {
        some: {
          id: userId,
        },
      },
    },
    parent: {
      students: {
        some: {
          parentId: userId,
        },
      },
    },
  };

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== 'admin' && {
        OR: [
        { classId: null },
        { class: roleConditions[role as keyof typeof roleConditions] || {} },
      ],
      })
    },
  });

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-md mt-5">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-gray-600 dark:text-gray-300 text-sm">
          Announcements
        </h1>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          View All
        </span>
      </div>
      {data[0] && <div className="bg-(--skool-sky-light) rounded-md p-4 mt-2">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-white text-xs">{data[0]?.title}</h2>
          <span className="text-xs text-white rounded-md px-1 py-1">
            {new Intl.DateTimeFormat("en-US").format(data[0]?.date)}
          </span>
        </div>
        <p className="text-xs text-gray-500">
          {data[0]?.description || "No description available"}
        </p>
      </div>}

      {data[1] && <div className="bg-(--skool-purple-light) rounded-md p-4 mt-2">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-white text-xs">{data[1]?.title}</h2>
          <span className="text-xs text-white rounded-md px-1 py-1">
            {new Intl.DateTimeFormat("en-US").format(data[1]?.date)}
          </span>
        </div>
        <p className="text-xs text-gray-500">
          {data[1]?.description || "No description available"}
        </p>
      </div>}

      {data[2] && <div className="bg-(--skool-yellow-light) rounded-md p-4 mt-2">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-white text-xs">{data[2]?.title}</h2>
          <span className="text-xs text-white rounded-md px-1 py-1">
            {new Intl.DateTimeFormat("en-US").format(data[2]?.date)}
          </span>
        </div>
        <p className="text-xs text-gray-500">
          {data[2]?.description || "No description available"}
        </p>
      </div>}
    </div>
  );
};

export default Announcements;
