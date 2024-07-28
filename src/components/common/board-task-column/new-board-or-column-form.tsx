import { DialogFormInput } from "@/components/common/board-task-column/dialog-form-input";
import { DialogFormLabel } from "@/components/common/board-task-column/dialog-form-label";
import { DynamicLengthInputs } from "@/components/common/board-task-column/dynamic-length-inputs";
import { SubmitBtn } from "@/components/common/board-task-column/submit-btn";

export function NewBoardOrColumnForm({
  onAddNewEntity,
  closeDialog,
  type,
}: {
  onAddNewEntity: (formData: FormData) => Promise<void>;
  closeDialog: () => void;
  type: "column" | "board";
}) {
  return (
    <form action={onAddNewEntity} className="mt-6 flex flex-col gap-6">
      <DialogFormLabel label={type === "column" ? "Column Name" : "Board Name"}>
        <DialogFormInput
          name="name"
          placeholder="e.g. Todo"
          required
          pattern=".*\S.*"
        />
      </DialogFormLabel>

      <DynamicLengthInputs
        label={type === "board" ? "Columns" : "Tasks"}
        nameSuffix={type === "board" ? "column" : "task"}
      />

      <SubmitBtn closeDialog={closeDialog} type={type} />
    </form>
  );
}
