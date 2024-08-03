import { deleteTask } from "@/actions/task";
import { TaskForm } from "@/components/common/board-task-column/task-form";
import { DeleteDialogSubmitBtn } from "@/components/common/delete-dialog-submit-btn";
import { MyButton } from "@/components/common/my-button";
import { TripleDotsWithMenu } from "@/components/common/triple-dots-with-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TSubtask, TTask } from "@/data/types";
import { cn } from "@/lib/utils";
import {
  textbodyL,
  textBodyM,
  textHeadingL,
  textHeadingS,
} from "@/styles/custom-class-names";
import { ReactNode, useEffect, useState } from "react";

export function TaskDetailsDialog({
  trigger,
  task,
}: {
  trigger: ReactNode;
  task: TTask;
}) {
  const [subtasks, setSubtasks] = useState<TSubtask[]>([]);

  const [open, setOpen] = useState(false);
  const [showNextDialog, setShowNextDialog] = useState<
    "delete" | "edit" | undefined
  >(undefined);
  const onDeleteTask = deleteTask.bind(null, task.id);

  useEffect(() => {
    (async () => {
      if (open) {
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
        if (!v) setShowNextDialog(undefined);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => {
          if (showNextDialog) {
            e.preventDefault();
            setShowNextDialog(undefined);
          }
        }}
      >
        {showNextDialog === "delete" ? (
          <div className="flex flex-col gap-6">
            <DialogHeader className="flex flex-col gap-6">
              <DialogTitle className={cn("text-left text-red", textHeadingL)}>
                Delete this task?
              </DialogTitle>
              <DialogDescription
                className={cn("text-left text-medium-grey", textbodyL)}
              >
                Are you sure you want to delete this task? This action will
                remove all subtasks and cannot be reversed.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <form action={onDeleteTask}>
                <DeleteDialogSubmitBtn
                  closeDialog={() => {
                    setShowNextDialog(undefined);
                    setOpen(false);
                  }}
                />
              </form>

              <MyButton
                onClick={() => setShowNextDialog(undefined)}
                type="button"
                size="short"
                variant="secondary"
              >
                Cancel
              </MyButton>
            </div>
          </div>
        ) : showNextDialog === "edit" ? (
          <>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <TaskForm
              task={task}
              subtasks={subtasks}
              onSave={(() => {}) as any}
              closeDialog={() => setShowNextDialog(undefined)}
            />
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex justify-between">
                {task.name}

                <TripleDotsWithMenu align="center">
                  <div className="flex flex-col gap-4 p-4">
                    <button
                      onClick={() => setShowNextDialog("edit")}
                      className={cn("text-left text-medium-grey", textbodyL)}
                    >
                      Edit Task
                    </button>

                    <button
                      onClick={() => setShowNextDialog("delete")}
                      className={cn("text-left text-red", textbodyL)}
                    >
                      Delete Task
                    </button>
                  </div>
                </TripleDotsWithMenu>
              </DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div className="flex flex-col gap-6">
              <p className={cn(textbodyL, "text-medium-grey")}>
                {task.description}
              </p>
              <div>
                <h2
                  className={cn(
                    textHeadingS,
                    "mb-4 tracking-normal text-medium-grey",
                  )}
                >
                  Subtasks (2 of 3)
                </h2>
                <ul className={cn("flex flex-col gap-2 text-black", textBodyM)}>
                  {subtasks.map((subtask) => {
                    return (
                      <li
                        key={subtask.id}
                        className="flex items-center gap-4 rounded-sm bg-light-grey px-3 py-4"
                      >
                        <input
                          type="checkbox"
                          className="peer accent-main-purple"
                        />
                        <p className="peer-checked:text-black/50 peer-checked:line-through">
                          {subtask.name}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <h2
                  className={cn(
                    textHeadingS,
                    "mb-2 tracking-normal text-medium-grey",
                  )}
                >
                  Current Status
                </h2>

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="pl-3" value="light">
                      Todo
                    </SelectItem>
                    <SelectItem className="pl-3" value="dark">
                      Doing
                    </SelectItem>
                    <SelectItem className="pl-3" value="system">
                      Done
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
