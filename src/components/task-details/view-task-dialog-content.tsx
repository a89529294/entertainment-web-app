import { patchSubtaskCompletedStatus } from "@/actions/subtask";
import { StatusSelect } from "@/components/common/board-task-column/stauts-select";
import { TripleDotsWithMenu } from "@/components/common/triple-dots-with-menu";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogState, TSubtask, TTask } from "@/data/types";
import { cn } from "@/lib/utils";
import {
  textbodyL,
  textBodyM,
  textHeadingS,
} from "@/styles/custom-class-names";
import { useEffect, useState } from "react";

export function ViewTaskDialogContent({
  task,
  subtasks,
  setShowNextDialog,
}: {
  task: TTask;
  subtasks: TSubtask[];
  setShowNextDialog: (arg: DialogState) => void;
}) {
  const [localSubtasks, setLocalSubtasks] = useState(subtasks);

  useEffect(() => {
    setLocalSubtasks(subtasks);
  }, [subtasks]);

  return (
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
        <p className={cn(textbodyL, "text-medium-grey")}>{task.description}</p>
        <div>
          <h2
            className={cn(
              textHeadingS,
              "mb-4 tracking-normal text-medium-grey",
            )}
          >
            Subtasks (
            {localSubtasks.reduce(
              (acc, val) => acc + (val.completed ? 1 : 0),
              0,
            )}{" "}
            of {localSubtasks.length})
          </h2>
          <ul className={cn("flex flex-col gap-2 text-black", textBodyM)}>
            {localSubtasks.map((subtask) => {
              return (
                <li
                  key={subtask.id}
                  className="flex items-center gap-4 rounded-sm bg-light-grey px-3 py-4"
                >
                  <input
                    type="checkbox"
                    className="peer accent-main-purple"
                    onChange={(e) => {
                      const completed = e.currentTarget.checked;
                      fetch(`/api/subtask/${subtask.id}/${completed}`, {
                        method: "POST",
                      });

                      setLocalSubtasks((subtasks) => {
                        return subtasks.map((st) =>
                          st.id === subtask.id ? { ...st, completed } : st,
                        );
                      });
                    }}
                    checked={subtask.completed}
                  />
                  <p className="peer-checked:text-black/50 peer-checked:line-through">
                    {subtask.name}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <StatusSelect />
      </div>
    </>
  );
}
