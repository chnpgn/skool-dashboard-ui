import { prisma } from "@/lib/prisma";

const EventList = async ({ dateParam }: { dateParam?: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();

  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });

  return data.map((event) => (
    <div
      key={event.id}
      className="p-2 border-2 border-gray-200 dark:border-gray-700 rounded-md border-t-4 odd:border-t-(--skool-sky) even:border-t-(--skool-purple)"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xs font-semibold text-gray-600 dark:text-gray-300">
          {event.title}
        </h1>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(event.startTime).toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
      <p className="mt-2 text-gray-400 dark:text-gray-500 text-xs">
        {event.description}
      </p>
    </div>
  ));
};

export default EventList;
