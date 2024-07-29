import { ColumnEditDropdown } from "@/components/board-details/column-edit-dropdown";
import { ScrollableTaskContainer } from "@/components/board-details/scrollable-task-container";
import { AddNewTaskBtn } from "@/components/common/add-new-task-btn";
import { getTasksForColumn } from "@/data/get-tasks";
import { cn, generateRandomColor } from "@/lib/utils";
import { textHeadingS } from "@/styles/custom-class-names";
import { useRef } from "react";

export async function Column({ id, name }: { id: number; name: string }) {
  const tasks = await getTasksForColumn(id);

  return (
    <li className="h-full shrink-0">
      <ul className="relative flex h-full flex-col gap-5">
        <h2
          className={cn(
            "flex items-center gap-3 text-medium-grey",
            textHeadingS,
          )}
        >
          <div
            className="size-4 rounded-full"
            style={{
              backgroundColor: generateRandomColor(),
            }}
          />

          {name}

          <ColumnEditDropdown id={id} />
        </h2>

        <ScrollableTaskContainer tasks={tasks} />

        <li>
          <AddNewTaskBtn columnId={id} sequence={tasks.length} />
        </li>
      </ul>
    </li>
  );
}
