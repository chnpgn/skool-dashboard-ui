"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { TeacherSchema, teacherSchema } from "@/lib/formValidationSchemas";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createTeacher, updateTeacher } from "@/lib/actions";
import { CldUploadWidget } from "next-cloudinary";

type ActionState = {
  success: boolean;
  error: string | null;
};

const TeacherForm = ({
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
  } = useForm<TeacherSchema>({
    resolver: zodResolver(teacherSchema),
  });

  const [img, setImg] = useState<string | undefined>(data?.img);

  const [state, formAction, isPending] = useActionState<
    ActionState,
    TeacherSchema & { img?: string }
  >(type === "create" ? createTeacher : updateTeacher, {
    success: false,
    error: null,
  });

  const router = useRouter();

  const onSubmit = handleSubmit((formData) => {
    console.log("Submit clicked!", formData);
    const payload: TeacherSchema & { img?: string } = { ...formData, img };
    startTransition(() => formAction(payload));
  });

  useEffect(() => {
    if (state.success) {
      toast(
        `Teacher ${type === "create" ? "created" : "updated"} successfully!`,
      );
      router.refresh();
      setOpen(false);
    }
  }, [state, router, setOpen, type]);

  const { subjects } = relatedData || {};

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create"
          ? "Create a new Teacher"
          : "Update Teacher Information"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Info
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>

      {/* Personal info */}
      <span className="text-xs text-gray-400 font-medium">Personal Info</span>
      <CldUploadWidget
        uploadPreset="skool-dashboard-upload-preset"
        onSuccess={(result, { widget }) => {
          if (result.info && "secure_url" in result.info)
            setImg(result.info.secure_url);
          widget.close();
        }}
      >
        {({ open }) => (
          <div
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            onClick={() => open()}
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </div>
        )}
      </CldUploadWidget>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Sur Name"
          name="surName"
          defaultValue={data?.surName}
          register={register}
          error={errors?.surName}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors?.phone}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors?.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors?.bloodType}
        />
        <InputField
          type="date"
          label="Birthday"
          name="birthday"
          defaultValue={data?.birthday.toISOString().split("T")[0]}
          register={register}
          error={errors?.birthday}
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
          <label className="text-sm text-gray-400">Sex</label>
          <select
            {...register("sex")}
            defaultValue={data?.sex}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.sex && (
            <p className="text-xs text-red-400">
              {errors.sex.message?.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-sm text-gray-400">Subjects</label>
          <select
            multiple
            {...register("subjects")}
            defaultValue={
              data?.subjects?.map((s: { id: string }) => s.id) || []
            }
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            {subjects?.map((subject: { id: string; name: string }) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subjects && (
            <p className="text-xs text-red-400">
              {errors.subjects.message?.toString()}
            </p>
          )}
        </div>
      </div>

      {state.error && <p className="text-red-500">Error: {state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-400 text-white p-2 rounded-md disabled:opacity-50"
      >
        {isPending ? "Saving..." : type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
