import { deleteTask } from "@/actions/task";
import { TaskForm } from "@/components/common/board-task-column/task-form";
import { DeleteTaskDialogContent } from "@/components/task-details/delete-task-dialog-content";
import { ViewTaskDialogContent } from "@/components/task-details/view-task-dialog-content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogState, TSubtask, TTask } from "@/data/types";
import { ReactNode, useEffect, useState } from "react";

export function TaskDetailsDialog({
  trigger,
  task,
}: {
  trigger: ReactNode;
  task: TTask;
}) {
  const [subtasks, setSubtasks] = useState<TSubtask[] | undefined>(undefined);

  const [open, setOpen] = useState(false);
  const [showNextDialog, setShowNextDialog] = useState<DialogState>("view");
  const onDeleteTask = deleteTask.bind(null, task.id);

  useEffect(() => {
    (async () => {
      if (!open) {
        const subtasks = (await fetch(`/api/${task.id}/subtasks`).then((v) =>
          v.json(),
        )) as { subtasks: TSubtask[] };

        setSubtasks(subtasks.subtasks);
      }
    })();
  }, [task.id, open]);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setShowNextDialog("view");
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => {
          if (showNextDialog !== "view") {
            e.preventDefault();
            setShowNextDialog("view");
          }
        }}
      >
        {showNextDialog === "delete" ? (
          <DeleteTaskDialogContent
            onDeleteTask={onDeleteTask}
            onCloseDialog={() => {
              setShowNextDialog("view");
              setOpen(false);
            }}
            onCancel={() => setShowNextDialog("view")}
          />
        ) : showNextDialog === "edit" ? (
          <>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <TaskForm
              task={task}
              subtasks={subtasks}
              onSave={(() => {}) as any}
              closeDialog={() => setShowNextDialog("view")}
            />
          </>
        ) : (
          <ViewTaskDialogContent
            task={task}
            subtasks={subtasks}
            setShowNextDialog={setShowNextDialog}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
