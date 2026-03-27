import { auth } from "@clerk/nextjs/server";

export async function getAuthData() {
  const { userId, sessionClaims } = await auth();

  return {
    userId,
    role: (sessionClaims?.metadata as { role?: string })?.role,
  };
}

const currentWorkWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const startOfWeek = new Date(today);

  // Calculate the start of the week (Monday)
  if (dayOfWeek === 0) {
    // If it's Sunday, go back 6 days to get to Monday
    startOfWeek.setDate(today.getDate() - 6);
  } else {
    // Otherwise, go back to the previous Monday
    startOfWeek.setDate(today.getDate() - (dayOfWeek - 1));
  }
  startOfWeek.setHours(0, 0, 0, 0); // Set to the start of the day

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 4); // Move to Friday
  endOfWeek.setHours(23, 59, 59, 999); // Set to the end of the day

  return { startOfWeek, endOfWeek };
};

export const adjustScheduleToCurrentWorkWeek = (
  lessons: { title: string; start: Date; end: Date }[],
): { title: string; start: Date; end: Date }[] => {
  const { startOfWeek, endOfWeek } = currentWorkWeek();

  return lessons.map((lesson) => {
    const lessonDayOfWeek = lesson.start.getDay(); // 0 (Sunday) to 6 (Saturday)
    const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1; // Calculate days from Monday

    const adjustedStartDate = new Date(startOfWeek);
    adjustedStartDate.setDate(startOfWeek.getDate() + daysFromMonday);
    adjustedStartDate.setHours(
      lesson.start.getHours(),
      lesson.start.getMinutes(),
      lesson.start.getSeconds(),
    );

    const adjustedEndDate = new Date(adjustedStartDate);
    const lessonDuration = lesson.end.getTime() - lesson.start.getTime();

    adjustedEndDate.setHours(
      lesson.end.getHours(),
      lesson.end.getMinutes(),
      lesson.end.getSeconds(),
    );

    return {
      title: lesson.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
    };
  });
};
