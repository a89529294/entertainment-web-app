"use client";

import { BoardTaskColumnDialog } from "@/components/common/board-task-column/board-task-column-dialog";
import { DialogFormInput } from "@/components/common/board-task-column/dialog-form-input";
import { DialogFormLabel } from "@/components/common/board-task-column/dialog-form-label";
import { DynamicLengthInputs } from "@/components/common/board-task-column/dynamic-length-inputs";
import { SubmitBtn } from "@/components/common/board-task-column/submit-btn";
import { myButtonCN } from "@/components/common/my-button-types";
import { ReactNode } from "react";

export function DialogWrapper({
  triggerLabel,
  dialogTitle,
  children,
}: {
  triggerLabel: string;
  dialogTitle: string;
  children: (setClose: () => void) => ReactNode;
}) {
  return (
    <BoardTaskColumnDialog
      trigger={
        <button className={myButtonCN("primary", "tall")}>
          {triggerLabel}
        </button>
      }
      title={dialogTitle}
    >
      {(setClose) => {
        return children(setClose);
      }}
    </BoardTaskColumnDialog>
  );
}
