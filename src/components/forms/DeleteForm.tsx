"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type ActionState = {
  success: boolean;
  error: string | null;
};

type DeleteFormProps = {
  table: string;
  id: string | number;
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  onClose: () => void;
};

const DeleteForm = ({ table, id, action, onClose }: DeleteFormProps) => {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    action,
    { success: false, error: null },
  );

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`${table} deleted successfully!`);
      router.refresh();
      onClose();
    }
  }, [state, router, onClose, table]);

  return (
    <form action={formAction} className="p-4 flex flex-col gap-4">
      <input type="hidden" name="id" defaultValue={id} />

      <span className="text-center font-medium">
        All the data will be lost. Are you sure you want to delete this {table}?
      </span>

      <button
        disabled={isPending}
        className="bg-red-700 text-white py-2 px-4 rounded-md self-center disabled:opacity-50"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
};

export default DeleteForm;
