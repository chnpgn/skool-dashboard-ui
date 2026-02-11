import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import FormModal from "@/components/FormModal";
import { Class, Prisma, Result, Teacher } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { currentUserId, role } from "@/lib/utils";
import { ca, de } from "zod/locales";

type ResultList = {
  id: number;
  title: string;
  studentName: string;
  teacherName: string;
  score: number;
  className: string;
  type: string;
  startTime: Date | null;
};

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Student",
    accessor: "student",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  ...(role === "admin" || role === "teacher"
    ? [
        {
          header: "Actions",
          accessor: "actions",
        },
      ]
    : []),
];

const renderRow = (item: ResultList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-(--skool-purple-light)"
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td>{item.studentName}</td>
    <td className="hidden md:table-cell">{item.score}</td>
    <td className="hidden md:table-cell">{item.teacherName}</td>
    <td className="hidden md:table-cell">{item.className}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        item.startTime!,
      )}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {(role === "admin" || role === "teacher") && (
          <>
            <FormModal table="result" type="update" data={item} />
            <FormModal table="result" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ResultListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  const { page, ...queryParams } = params;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITIONS
  const query: Prisma.ResultWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          // Add more cases for other filters if needed
          case "studentId":
            query.studentId = value;
            break;

          case "search":
            query.OR = [
              {
                student: {
                  name: {
                    contains: value,
                    mode: "insensitive",
                  },
                },
              },
              {
                exam: {
                  title: {
                    contains: value,
                    mode: "insensitive",
                  },
                },
              },
            ];
            break;

          default:
            break;
        }
      }
    }
  }

  // ROLE CONDITIONS
  switch (role) {
    case "admin":
      // No additional conditions for admin
      break;
    case "teacher":
      query.OR = [
        {
          exam: { lesson: { teacherId: currentUserId! } },
          assignment: { lesson: { teacherId: currentUserId! } },
        },
      ];
      break;
    case "student":
      query.studentId = currentUserId!;
      break;
    case "parent":
      query.student = {
        parentId: currentUserId!,
      };
      break;
    default:
      break;
  }

  const [dataRes, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: { select: { name: true, surname: true } },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.result.count({
      where: query,
    }),
  ]);

  const data = dataRes.map((res) => {
    const assessment = res.exam || res.assignment;

    if (!assessment) {
      return null; // or handle the error as needed
    }
    const isExam = "startTime" in assessment;

    return {
      id: res.id,
      title: assessment.title,
      studentName: `${res.student.name} ${res.student.surname}`,
      teacherName: `${assessment.lesson.teacher.name} ${assessment.lesson.teacher.surname}`,
      score: res.score,
      className: assessment.lesson.class.name,
      type: isExam ? "Exam" : "Assignment",
      startTime: isExam ? assessment.startTime : assessment.startDate,
    };
  });

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-(--skool-yellow)">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-(--skool-yellow)">
              <Image src="/sort.png" alt="filter" width={14} height={14} />
            </button>
            {(role === "admin" || role === "teacher") && (
              <FormModal table="result" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination count={count} page={p} />
    </div>
  );
};

export default ResultListPage;
