"use server";

import { ClassSchema, SubjectSchema } from "./formValidationSchemas";
import { prisma } from "./prisma";

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
        }
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
        }
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
  try {
    await prisma.class.delete({
      where: { id: parseInt(id) },
    });

    // revalidatePath("/list/classes");
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: "Failed to delete class." };
  }
};
