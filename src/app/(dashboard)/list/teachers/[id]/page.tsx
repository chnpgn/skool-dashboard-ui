import Announcements from "@/components/Announcements";
import Performance from "@/components/Performance";
import Image from "next/image";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Teacher } from "@/generated/client";
import { notFound } from "next/navigation";
import FormContainer from "@/components/forms/FormContainer";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { getAuthData } from "@/lib/utils";

const SingleTeacherPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { userId, role } = await getAuthData(); // ✅ safe

  if (!id) {
    return notFound();
  }

  const teacher:
    | (Teacher & {
        _count: { subjects: number; lessons: number; classes: number };
      })
    | null = await prisma.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        },
      },
    },
  });

  if (!teacher) {
    return notFound();
  }

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-(--skool-sky-light) py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={teacher.img || "/noAvatar.png"}
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                  {teacher.name} {teacher.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer table="teacher" type="update" data={teacher} />
                )}
              </div>
              <p className="text-sm text-gray-500">
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
                natus. Laboriosam, delectus corrupti .
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 ">
                  <Image
                    src="/blood.png"
                    alt="bloodType"
                    width={14}
                    height={14}
                  />
                  <span>{teacher.bloodType || "A+"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/date.png" alt="date" width={14} height={14} />
                  <span>
                    {teacher.birthday
                      ? new Intl.DateTimeFormat("en-US", {
                          dateStyle: "long",
                        }).format(new Date(teacher.birthday))
                      : "-"}
                  </span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/mail.png" alt="mail" width={14} height={14} />
                  <span>{teacher.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/phone.png" alt="phone" width={14} height={14} />
                  <span>{teacher.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD 1 */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* CARD 2 */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {teacher?._count?.subjects || 0}
                </h1>
                <span className="text-sm text-gray-400">Subjects</span>
              </div>
            </div>
            {/* CARD 3 */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {teacher?._count?.lessons || 0}
                </h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/* CARD 4 */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {teacher?._count?.classes || 0}
                </h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-4 bg-white rounded-md p-4 h-200">
          <h1>TEACHER'S SCHEDULE</h1>
          <BigCalendarContainer type="teacherId" id={teacher.id} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="font-semibold text-gray-600 dark:text-gray-300 text-sm">
            ShortCuts
          </h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 rounded-md bg-(--skool-sky-light)"
              href={`/list/students?teacherId=${"teacher2"}`}
            >
              {" "}
              Teachers Students
            </Link>
            <Link
              className="p-3 rounded-md bg-(--skool-purple-light)"
              href={`/list/lessons?teacherId=${"teacher2"}`}
            >
              {" "}
              Teachers Lessons
            </Link>
            <Link
              className="p-3 rounded-md bg-(--skool-yellow-light)"
              href={`/list/classes?supervisorId=${"teacher2"}`}
            >
              {" "}
              Teachers Classes
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/exams?teacherId=${"teacher2"}`}
            >
              {" "}
              Teachers Exams
            </Link>
            <Link
              className="p-3 rounded-md bg-amber-200 "
              href={`/list/assignments?teacherId=${"teacher2"}`}
            >
              {" "}
              Teachers Assignments
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
