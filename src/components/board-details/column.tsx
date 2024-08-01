import { ColumnEditDropdown } from "@/components/board-details/column-edit-dropdown";
import { ScrollableTaskContainer } from "@/components/board-details/scrollable-task-container";
import { AddNewTaskBtn } from "@/components/common/add-new-task-btn";
import { TAggregatedColumnWithTasks } from "@/data/types";
import { cn, generateRandomColor } from "@/lib/utils";
import { textHeadingS } from "@/styles/custom-class-names";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export function Column({
  column,
  boardName,
}: {
  column: TAggregatedColumnWithTasks;
  boardName: string;
}) {
  const id = column.id;
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      items={column.tasks}
      strategy={verticalListSortingStrategy}
    >
      <li className="h-full shrink-0" ref={setNodeRef}>
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
                backgroundColor: generateRandomColor(boardName + column.name),
              }}
            />

            {column.name}

            <ColumnEditDropdown id={column.id} />
          </h2>

          <ScrollableTaskContainer columnId={column.id} tasks={column.tasks} />

          <li>
            <AddNewTaskBtn
              columnId={column.id}
              sequence={column.tasks.length}
            />
          </li>
        </ul>
      </li>
    </SortableContext>
  );
}
