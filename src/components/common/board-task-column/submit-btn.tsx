"use client";

import { MyButton } from "@/components/common/my-button";
import { useCloseDialogAfterSubmission } from "@/hooks/use-close-dialog-after-submission";
import { ReactNode } from "react";

export function SubmitBtn({
  closeDialog,
  children,
}: {
  closeDialog: () => void;
  children: ReactNode;
}) {
  const pending = useCloseDialogAfterSubmission(closeDialog);

  return (
    <MyButton
      disabled={pending}
      variant={"primary"}
      size={"short"}
      type="submit"
    >
      {children}
    </MyButton>
  );
}
