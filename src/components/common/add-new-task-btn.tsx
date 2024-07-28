"use client";

import { addNewTask } from "@/actions/task";
import { BoardTaskColumnDialog } from "@/components/common/board-task-column/board-task-column-dialog";
import { NewTaskForm } from "@/components/common/board-task-column/new-task-form";
import { MyButton } from "@/components/common/my-button";

export function AddNewTaskBtn({
  columnId,
  sequence,
}: {
  columnId: number;
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
          <NewTaskForm
            closeDialog={() => setClose()}
            onAddNewTask={onAddNewTask}
          />
        );
      }}
    </BoardTaskColumnDialog>
  );
}
