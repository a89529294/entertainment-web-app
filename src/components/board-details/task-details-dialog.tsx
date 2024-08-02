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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-between">
            {task.name}

            <TripleDotsWithMenu align="center">
              <div className="flex flex-col gap-4 p-4">
                <button className={cn("text-left text-medium-grey", textbodyL)}>
                  Edit Task
                </button>
                <button className={cn("text-left text-red", textbodyL)}>
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
      </DialogContent>
    </Dialog>
  );
}
