import { updateTask } from "@/actions/task";
import { TaskForm } from "@/components/common/board-task-column/task-form";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogState, TSubtask, TTask } from "@/data/types";

export function EditTaskDialogContent({
  task,
  subtasks,
  setShowNextDialog,
  closeDialog,
}: {
  task: TTask;
  subtasks: TSubtask[];
  setShowNextDialog: (value: DialogState) => void;
  closeDialog: () => void;
}) {
  const onSave = updateTask.bind(null, task.id, subtasks);
  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <TaskForm
        task={task}
        subtasks={subtasks}
        showView={() => setShowNextDialog("view")}
        closeDialog={closeDialog}
        onSave={onSave}
      />
    </>
  );
}
