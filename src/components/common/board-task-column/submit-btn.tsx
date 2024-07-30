"use client";

import { MyButton } from "@/components/common/my-button";
import { useCloseDialogAfterSubmission } from "@/hooks/use-close-dialog-after-submission";

export function SubmitBtn({
  closeDialog,
  type,
}: {
  closeDialog: () => void;
  type: "task" | "board" | "column";
}) {
  const pending = useCloseDialogAfterSubmission(closeDialog);

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