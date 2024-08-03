"use client";

import { addNewTask } from "@/actions/task";
import { BoardTaskColumnDialog } from "@/components/common/board-task-column/board-task-column-dialog";
import { TaskForm } from "@/components/common/board-task-column/task-form";
import { MyButton } from "@/components/common/my-button";

export function AddNewTaskBtn({
  columnId,
  sequence,
}: {
  columnId: string;
  sequence: number;
}) {
  const onAddNewTask = addNewTask.bind(null, columnId, sequence);
  return (
    <BoardTaskColumnDialog
      trigger={
        <MyButton className="w-72" size="tall" variant="primary">
          + Add New Task
        </MyButton>
      }
      title={"Add New Task"}
    >
      {(setClose) => {
        return (
          <TaskForm closeDialog={() => setClose()} onSave={onAddNewTask} />
        );
      }}
    </BoardTaskColumnDialog>
  );
}
