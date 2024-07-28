import { MyButton } from "@/components/common/my-button";
import { TTask } from "@/data/types";
import { db } from "@/lib/db";
import { cn, generateRandomColor } from "@/lib/utils";
import { textHeadingM, textHeadingS } from "@/styles/custom-class-names";
import { addNewTask } from "@/actions/task";
import { BoardTaskColumnDialog } from "@/components/common/board-task-column/board-task-column-dialog";
import { myButtonCN } from "@/components/common/my-button-types";
import { NewTaskForm } from "@/components/common/board-task-column/new-task-form";
import { AddNewTaskBtn } from "@/components/common/add-new-task-btn";
import { getTasksForColumn } from "@/data/get-tasks";

export async function Column({ id, name }: { id: number; name: string }) {
  const tasks = await getTasksForColumn(id);

  return (
    <li>
      <ul className="flex flex-col gap-5">
        <h2 className={cn("flex gap-3 text-medium-grey", textHeadingS)}>
          <div
            className="size-4 rounded-full"
            style={{
              backgroundColor: generateRandomColor(),
            }}
          />

          {name}
        </h2>

        {tasks.map((task) => {
          return (
            <li
              key={task.id}
              className={cn(
                "py-6 px-4 bg-white rounded-lg shadow-lg w-72",
                textHeadingM
              )}
            >
              {task.name}
            </li>
          );
        })}

        <li>
          <AddNewTaskBtn columnId={id} sequence={tasks.length} />
        </li>
      </ul>
    </li>
  );
}
