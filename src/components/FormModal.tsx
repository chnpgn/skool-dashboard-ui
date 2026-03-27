"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import {
  deleteClass,
  deleteExam,
  deleteStudent,
  deleteSubject,
  deleteTeacher,
} from "@/lib/actions";
import DeleteForm from "./forms/DeleteForm";
import { FormContainerProps } from "./forms/FormContainer";

const deleteActionMap: Record<string, any> = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteStudent,
  exam: deleteExam,
};

const TeacherForm = dynamic(() => import("./forms/TeacherForm"));
const StudentForm = dynamic(() => import("./forms/StudentForm"));
const ClassForm = dynamic(() => import("./forms/ClassForm"));
const SubjectForm = dynamic(() => import("./forms/SubjectForm"));
const ExamForm = dynamic(() => import("./forms/ExamForm"));

const forms: Record<string, any> = {
  teacher: TeacherForm,
  student: StudentForm,
  class: ClassForm,
  subject: SubjectForm,
  exam: ExamForm,
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  const [open, setOpen] = useState(false);

  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-(--skool-yellow)"
      : type === "update"
        ? "bg-(--skool-sky)"
        : "bg-(--skool-purple)";

  const FormComponent = forms[table];

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} width={16} height={16} alt="" />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%]">
            {type === "delete" && id ? (
              <DeleteForm
                table={table}
                id={id}
                action={deleteActionMap[table]}
                onClose={() => setOpen(false)}
              />
            ) : FormComponent ? (
              <FormComponent
                type={type}
                data={data}
                setOpen={setOpen}
                relatedData={relatedData}
              />
            ) : (
              "Form not found"
            )}

            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
