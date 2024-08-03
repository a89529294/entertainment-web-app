import { DialogFormInput } from "@/components/common/board-task-column/dialog-form-input";
import { DialogFormLabel } from "@/components/common/board-task-column/dialog-form-label";
import { DialogFormTextArea } from "@/components/common/board-task-column/dialog-form-textarea";
import { DynamicLengthInputs } from "@/components/common/board-task-column/dynamic-length-inputs";
import { SubmitBtn } from "@/components/common/board-task-column/submit-btn";
import { MyButton } from "@/components/common/my-button";
import { TSubtask, TTask } from "@/data/types";

export function TaskForm({
  onSave,
  closeDialog,
  task,
  subtasks,
}: {
  onSave: (formData: FormData) => Promise<void>;
  closeDialog: () => void;
  task?: TTask;
  subtasks?: TSubtask[];
}) {
  return (
    <form action={onSave} className="mt-6 flex flex-col gap-6">
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
          defaultValue={task?.name}
        />
      </DialogFormLabel>

      <DialogFormLabel label="Description">
        <DialogFormTextArea
          name="description"
          placeholder="e.g. It’s always good to take a break. This 
15 minute break will  recharge the batteries 
a little."
          defaultValue={task?.description}
        />
      </DialogFormLabel>

      <DynamicLengthInputs
        list={subtasks?.map((v) => ({ id: v.id, value: v.name }))}
        label="Subtasks"
        nameSuffix="subtask"
      />

      <MyButton size="short" variant="destructive" onClick={closeDialog}>
        Return To View
      </MyButton>

      <SubmitBtn closeDialog={closeDialog}>
        {task ? "Save Changes" : "Create New Task"}
      </SubmitBtn>
    </form>
  );
}
