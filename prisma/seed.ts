import { PrismaClient } from "../src/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

// IMPORT DATA POINTS
import {
  teachersData,
  studentsData,
  parentsData,
  subjectsData,
  classesData,
  lessonsData,
  gradesData,
  examsData,
  assignmentsData,
  resultsData,
  eventsData,
  announcementsData,
  attendanceData,
  usersData,
} from "./data"; // Ensure this matches your data file path

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Cleaning database...");

  // Clear in reverse order of dependency
  await prisma.announcement.deleteMany();
  await prisma.event.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.result.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.class.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.parent.deleteMany();
  await prisma.grade.deleteMany();

  console.log("Seeding started...");

  // 1. USERS
  await prisma.user.createMany({ data: usersData})

  // 2. GRADE
  await prisma.grade.createMany({ data: gradesData });

  // 3. SUBJECT
  await prisma.subject.createMany({
    data: subjectsData.map((subject) => ({
      id: subject.id,
      name: subject.name,
    })),
  });

  // 4. PARENT
  await prisma.parent.createMany({
    data: parentsData.map((parent: any) => ({
      id: parent.id,
      userId: parent.userId,
      username: parent.username,
      name: parent.name,
      surname: parent.surname,
      email: parent.email || null, // Ensure optional fields are handled
      phone: parent.phone,
      address: parent.address,
      sex: parent.sex, // Must be "MALE" or "FEMALE" (uppercase)
    })),
  });

  // 5. TEACHER
  for (const teacher of teachersData) {
    // Use a type cast or check if 'subjects' exists on this specific object
    const hasSubjects =
      "subjects" in teacher && Array.isArray((teacher as any).subjects);

    // Destructure safely by casting to 'any' or a custom interface
    const { subjects, ...rest } = teacher as any;

    await prisma.teacher.create({
      data: {
        ...rest,
        // Only attempt to connect if the subjects array exists and isn't empty
        subjects:
          hasSubjects && subjects.length > 0
            ? { connect: subjects.map((id: number) => ({ id })) }
            : undefined,
      },
    });
  }

  // 6. CLASS
  await prisma.class.createMany({ data: classesData });

  // 7. STUDENT
  await prisma.student.createMany({
    data: studentsData.map((student: any) => ({
      ...student,
      // Ensure these are actual Date objects, not just strings
      birthday: new Date(student.birthday),
      createdAt: student.createdAt ? new Date(student.createdAt) : new Date(),
    })),
  });

  // 8. LESSON
  await prisma.lesson.createMany({ data: lessonsData });

  // 9. EXAMS
  await prisma.exam.createMany({ data: examsData });

  // 10. ASSIGNMENTS
  await prisma.assignment.createMany({ data: assignmentsData });

  // 11. RESULTS
  await prisma.result.createMany({ data: resultsData });

  // 12. EVENTS
  await prisma.event.createMany({ data: eventsData });

  // 13. ANNOUNCEMENTS
  await prisma.announcement.createMany({ data: announcementsData });

  // 14. ATTENDANCE
  await prisma.attendance.createMany({ data: attendanceData })

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
