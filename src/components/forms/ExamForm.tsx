"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import { examSchema, ExamSchema } from "@/lib/formValidationSchemas";
import { createExam, updateExam } from "@/lib/actions";
import { useActionState, startTransition, useEffect } from "react";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

type ActionState = {
  success: boolean;
  error: string | null;
};

const ExamForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExamSchema>({
    resolver: zodResolver(examSchema),
  });

  // AFTER REACT 19 IT'LL BE USEACTIONSTATE
  const [state, formAction, isPending] = useActionState<
    ActionState,
    ExamSchema
  >(type === "create" ? createExam : updateExam, {
    success: false,
    error: null,
  });

  const onSubmit = handleSubmit((formData) => {
    console.log("Form Data:", formData);
    startTransition(() => {
      formAction(formData);
    });
  });

  const router = useRouter();

  useEffect(() => {
    console.log("Action state changed:", state);
    if (state.success) {
      toast(`Exam ${type === "create" ? "created" : "updated"} successfully!`);
      router.refresh();
      setOpen(false);
    }
  }, [state, router, setOpen, type]);

  const { lessons } = relatedData || {};

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new exam" : "Update the exam"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Exam Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Start Date"
          name="startTime"
          type="datetime-local"
          defaultValue={
            data?.startTime
              ? new Date(data.startTime).toISOString().slice(0, 16)
              : ""
          }
          register={register}
          error={errors?.startTime}
        />
        <InputField
          label="End Date"
          name="endTime"
          type="datetime-local"
          defaultValue={
            data?.endTime
              ? new Date(data.endTime).toISOString().slice(0, 16)
              : ""
          }
          register={register}
          error={errors?.endTime}
        />
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-sm text-gray-400">Lessoon</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("lessonnId")}
            defaultValue={data?.lessonnId}
          >
            {lessons?.map(
              (lesson: { id: number; name: string }) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.name}
                </option>
              ),
            )}
          </select>
          {errors.lessonnId?.message && (
            <p className="text-xs text-red-400">
              {errors.lessonnId?.message.toString()}
            </p>
          )}
        </div>
      </div>

      {state.error && (
        <p className="text-red-500">
          An error occurred while {type === "create" ? "creating" : "updating"}{" "}
          the subject. Please try again.
        </p>
      )}

      <button
        disabled={isPending}
        className="bg-blue-400 text-white p-2 rounded-md disabled:opacity-50"
      >
        {isPending ? "Saving..." : type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ExamForm;
