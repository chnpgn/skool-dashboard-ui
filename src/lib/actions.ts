"use server";

import { clerkClient } from "@clerk/nextjs/server";
import {
  ClassSchema,
  ExamSchema,
  StudentSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchemas";
import { prisma } from "./prisma";
import { getAuthData } from "@/lib/utils";

type CurrentState = {
  success: boolean;
  error: string | null;
};

// SUBJECT ACTIONS
export const createSubject = async (
  currentState: CurrentState,
  data: SubjectSchema,
): Promise<CurrentState> => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers?.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: "Failed to create subject." };
  }
};

export const updateSubject = async (
  currentState: CurrentState,
  data: SubjectSchema,
): Promise<CurrentState> => {
  try {
    await prisma.subject.update({
      where: { id: data.id },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers?.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: "Failed to update subject." };
  }
};

export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData,
): Promise<CurrentState> => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: { id: parseInt(id) },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: "Failed to delete subject." };
  }
};

// CLASS ACTIONS
export const createClass = async (
  currentState: CurrentState,
  data: ClassSchema,
): Promise<CurrentState> => {
  try {
    await prisma.class.create({
      data: {
        name: data.name,
        capacity: data.capacity,
        gradeId: data.gradeId,
        supervisorId: data.supervisorId,
      },
    });

    // revalidatePath("/list/classes");
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: "Failed to create class." };
  }
};

export const updateClass = async (
  currentState: CurrentState,
  data: ClassSchema,
): Promise<CurrentState> => {
  try {
    await prisma.class.update({
      where: { id: data.id },
      data: {
        name: data.name,
        capacity: data.capacity,
        gradeId: data.gradeId,
        supervisorId: data.supervisorId,
      },
    });

    // revalidatePath("/list/classes");
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: "Failed to update class." };
  }
};

export const deleteClass = async (
  currentState: CurrentState,
  data: FormData,
): Promise<CurrentState> => {
  const id = data.get("id") as string;
  console.log("Attempting to delete class with ID:", id);
  try {
    await prisma.class.delete({
      where: { id: parseInt(id) },
    });

    // revalidatePath("/list/classes");
    return { success: true, error: null };
  } catch (err) {
    console.error("❌ Prisma class delete failed:", err);
    return { success: false, error: "Failed to delete class." };
  }
};

// TEACHER ACTIONS
export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema,
): Promise<CurrentState> => {
  try {
    const client = await clerkClient();

    const createdTeacher = await client.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surName,
      publicMetadata: {
        role: "TEACHER",
      },
    });

    await prisma.teacher.create({
      data: {
        id: createdTeacher.id,
        username: data.username,
        name: data.name,
        surname: data.surName,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || "",
        img: data.img,
        bloodType: data.bloodType,
        birthday: data.birthday,
        sex: data.sex,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });

    // revalidatePath("/list/teachers");
    return { success: true, error: null };
  } catch (err) {
    console.error("❌ Prisma teacher create failed:", err);
    return { success: false, error: "Failed to create teacher." };
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema,
): Promise<CurrentState> => {
  if (!data.id) {
    return { success: false, error: "Teacher ID is required for update." };
  }
  try {
    const client = await clerkClient();

    const updatedTeacher = await client.users.updateUser(data.id, {
      username: data.username,
      ...(data.password ? { password: data.password } : {}),
      firstName: data.name,
      lastName: data.surName,
    });

    await prisma.teacher.update({
      where: { id: data.id },
      data: {
        ...(data.password ? { password: data.password } : {}), // Only include password if it's provided
        username: data.username,
        name: data.name,
        surname: data.surName,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || "",
        img: data.img || undefined, // If img is empty string, set it to undefined
        sex: data.sex || undefined, // If sex is empty string, set it to undefined
        bloodType: data.bloodType || undefined, // If bloodType is empty string, set it to undefined
        birthday: data.birthday || undefined, // If birthday is empty string, set it to undefined
        subjects: {
          set: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });

    // revalidatePath("/list/teachers");
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: "Failed to update teacher." };
  }
};

export const deleteTeacher = async (
  _prev: { success: boolean; error: string | null },
  formData: FormData,
) => {
  const id = formData.get("id") as string;

  try {
    const client = await clerkClient();

    await client.users.deleteUser(id); // Delete from Clerk first

    await prisma.teacher.delete({
      where: { id: id },
    });

    console.log("✅ Teacher deleted");
    return { success: true, error: null };
  } catch (err) {
    console.error("❌ Prisma teacher delete failed:", err);
    return { success: false, error: "Delete failed" };
  }
};

// STUDENT ACTIONS
export const createStudent = async (
  currentState: CurrentState,
  data: StudentSchema,
): Promise<CurrentState> => {
  try {
    const classItem = await prisma.class.findUnique({
      where: { id: data.classId },
      include: { _count: { select: { students: true } } },
    });

    if (!classItem || classItem.capacity === classItem._count.students) {
      return { success: false, error: "Class is full." };
    }

    const client = await clerkClient();

    const createdStudent = await client.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surName,
      publicMetadata: {
        role: "STUDENT",
      },
    });

    await prisma.student.create({
      data: {
        id: createdStudent.id,
        username: data.username,
        name: data.name,
        surname: data.surName,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || "",
        img: data.img,
        bloodType: data.bloodType,
        birthday: data.birthday,
        sex: data.sex,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });

    // revalidatePath("/list/students");
    return { success: true, error: null };
  } catch (err) {
    console.error("❌ Prisma student create failed:", err);
    return { success: false, error: "Failed to create student." };
  }
};

export const updateStudent = async (
  currentState: CurrentState,
  data: StudentSchema,
): Promise<CurrentState> => {
  if (!data.id) {
    return { success: false, error: "Student ID is required for update." };
  }
  try {
    const client = await clerkClient();

    const updatedStudent = await client.users.updateUser(data.id, {
      username: data.username,
      ...(data.password ? { password: data.password } : {}),
      firstName: data.name,
      lastName: data.surName,
    });

    console.log(
      "id:",
      data.id,
      "username:",
      data.username,
      "name:",
      data.name,
      "surname:",
      data.surName,
    );

    await prisma.student.update({
      where: { id: data.id },
      data: {
        ...(data.password ? { password: data.password } : {}), // Only include password if it's provided
        username: data.username,
        name: data.name,
        surname: data.surName,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || "",
        img: data.img || undefined, // If img is empty string, set it to undefined
        sex: data.sex || undefined, // If sex is empty string, set it to undefined
        bloodType: data.bloodType || undefined, // If bloodType is empty string, set it to undefined
        birthday: data.birthday || undefined, // If birthday is empty string, set it to undefined
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });

    // revalidatePath("/list/students");
    return { success: true, error: null };
  } catch (err) {
    console.error("❌ Prisma student update failed:", err);
    return { success: false, error: "Failed to update student." };
  }
};

export const deleteStudent = async (
  _prev: { success: boolean; error: string | null },
  formData: FormData,
) => {
  const id = formData.get("id") as string;

  try {
    const client = await clerkClient();

    await client.users.deleteUser(id); // Delete from Clerk first

    await prisma.student.delete({
      where: { id: id },
    });

    console.log("✅ Student deleted");
    return { success: true, error: null };
  } catch (err) {
    console.error("❌ Prisma student delete failed:", err);
    return { success: false, error: "Delete failed" };
  }
};

// EXAM ACTIONS
export const createExam = async (
  currentState: CurrentState,
  data: ExamSchema,
): Promise<CurrentState> => {
  const { userId, role } = await getAuthData();

  try {
    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: userId!,
          id: data.lessonnId,
        },
      });

      if (!teacherLesson) {
        return {
          success: false,
          error: "You can only create exams for your own lessons.",
        };
      }
    }

    await prisma.exam.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonnId,
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: "Failed to create subject." };
  }
};

export const updateExam = async (
  currentState: CurrentState,
  data: ExamSchema,
): Promise<CurrentState> => {
  const { userId, role } = await getAuthData();

  try {
    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: userId!,
          id: data.lessonnId,
        },
      });

      if (!teacherLesson) {
        return {
          success: false,
          error: "You can only create exams for your own lessons.",
        };
      }
    }

    await prisma.exam.update({
      where: { id: data.id },
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonnId,
      },
    });

    // revalidatePath("/list/exams");
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: "Failed to update exam." };
  }
};

export const deleteExam = async (
  currentState: CurrentState,
  data: FormData,
): Promise<CurrentState> => {
  const id = data.get("id") as string;
  const { userId, role } = await getAuthData();

  try {
    await prisma.exam.delete({
      where: {
        id: parseInt(id),
        ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}), // Ensure teachers can only delete their own exams
      },
    });

    // revalidatePath("/list/exams");
    return { success: true, error: null };
  } catch (err) {
    console.error("❌ Prisma exam delete failed:", err);
    return { success: false, error: "Failed to delete exam." };
  }
};
