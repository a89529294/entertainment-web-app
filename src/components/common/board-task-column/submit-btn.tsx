"use client";

import { MyButton } from "@/components/common/my-button";
import { useCloseDialogAfterSubmission } from "@/hooks/use-close-dialog-after-submission";
import { ComponentProps, ReactNode } from "react";

export function SubmitBtn({
  closeDialog,
  children,
  disabled,
  ...rest
}: ComponentProps<"button"> & {
  closeDialog: () => void;
  children: ReactNode;
}) {
  const pending = useCloseDialogAfterSubmission(closeDialog);

  return (
    <MyButton
      disabled={disabled || pending}
      variant={"primary"}
      size={"short"}
      type="submit"
      {...rest}
    >
      {children}
    </MyButton>
  );
}
