"use client";

import { MyButton } from "@/components/common/my-button";
import { usePrevValue } from "@/hooks/use-prev-value";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";

export function SubmitBtn({
  closeDialog,
  type,
}: {
  closeDialog: () => void;
  type: "task" | "board" | "column";
}) {
  const { pending } = useFormStatus();
  const prevPending = usePrevValue(pending);

  useEffect(() => {
    if (prevPending && !pending) closeDialog();
  }, [prevPending, pending, closeDialog]);

  return (
    <MyButton
      disabled={pending}
      variant={"primary"}
      size={"short"}
      type="submit"
    >
      Create New{" "}
      {type === "board" ? "Board" : type === "column" ? "Column" : "Task"}
    </MyButton>
  );
}
