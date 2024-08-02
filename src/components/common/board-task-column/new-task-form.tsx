import { DialogFormInput } from "@/components/common/board-task-column/dialog-form-input";
import { DialogFormLabel } from "@/components/common/board-task-column/dialog-form-label";
import { DialogFormTextArea } from "@/components/common/board-task-column/dialog-form-textarea";
import { DynamicLengthInputs } from "@/components/common/board-task-column/dynamic-length-inputs";
import { SubmitBtn } from "@/components/common/board-task-column/submit-btn";

export function NewTaskForm({
  onAddNewTask,
  closeDialog,
}: {
  onAddNewTask: (formData: FormData) => Promise<void>;
  closeDialog: () => void;
}) {
  return (
    <form action={onAddNewTask} className="mt-6 flex flex-col gap-6">
      <DialogFormLabel label="Title">
        <DialogFormInput
          name="name"
          placeholder="e.g. Take a coffe break"
          required
          pattern=".*\S.*"
          onInvalid={(e) =>
            e.currentTarget.classList.add("invalid:focus-visible:border-red")
          }
          onChange={(e) => {
            e.currentTarget.checkValidity();
            if (e.currentTarget.value)
              e.currentTarget.classList.remove(
                "invalid:focus-visible:border-red",
              );
          }}
          autoFocus
        />
      </DialogFormLabel>

      <DialogFormLabel label="Description">
        <DialogFormTextArea
          name="description"
          placeholder="e.g. It’s always good to take a break. This 
15 minute break will  recharge the batteries 
a little."
        />
      </DialogFormLabel>

      <DynamicLengthInputs label="Subtasks" nameSuffix="subtask" />

      <SubmitBtn closeDialog={closeDialog} type="task" />
    </form>
  );
}
