"use client";

import { AddColumnBlock } from "@/components/board-details/add-column-block";
import { Column } from "@/components/board-details/column";
import { DraggableTask } from "@/components/board-details/draggable-task";
import { TAggregatedColumnWithTasks } from "@/data/types";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useId, useState } from "react";

export function DragAndDropArea({
  serverColumns,
  boardId,
  boardName,
}: {
  serverColumns: Record<string, TAggregatedColumnWithTasks>;
  boardId: number;
  boardName: string;
}) {
  const id = useId();
  const [columns, setColumns] = useState(serverColumns);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    const { id } = active;
    const overId = over?.id;
    if (!overId) return;
    // Find the containers
    const activeContainer = findColumnId(id.toString());
    const overContainer = findColumnId(overId.toString());
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }
    setColumns((prev) => {
      if (!prev[activeContainer] || !prev[overContainer]) return prev;

      const activeItems = prev[activeContainer].tasks;
      const overItems = prev[overContainer].tasks;
      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(
        (t) => t.id === +id.toString().split("-")[1],
      );
      const overIndex = overItems.findIndex(
        (t) => t.id === +overId.toString().split("-")[1],
      );
      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowLastItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: {
          ...prev[activeContainer],
          tasks: prev[activeContainer].tasks.filter(
            (item) => item.id !== +active.id.toString().split("-")[1],
          ),
        },
        [overContainer]: {
          ...prev[overContainer],
          tasks: [
            ...prev[overContainer].tasks.slice(0, newIndex),
            columns[activeContainer].tasks[activeIndex],
            ...prev[overContainer].tasks.slice(
              newIndex,
              prev[overContainer].tasks.length,
            ),
          ],
        },
      };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    console.log(event.active, event.over);

    // console.log(findColumnId(event.active.id.toString()));
    // console.log(findColumnId(event.over?.id.toString() ?? ""));
  }

  function findColumnId(id: string) {
    const foundColumn = Object.values(columns).find(
      (c) => id.split("-")[0] === "column" && c.id === +id.split("-")[1],
    );

    if (foundColumn) {
      return id;
    }

    const c = Object.values(columns).find((c) =>
      c.tasks.find((t) => t.id === +id.split("-")[1]),
    );
    return c ? `column-${c.id}` : undefined;
  }

  return (
    <DndContext
      id={id}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <ul className="isolate flex h-full gap-6 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-main-purple">
        {Object.values(columns).map((c) => {
          return <Column key={c.id} column={c} boardName={boardName} />;
        })}

        <AddColumnBlock
          boardId={boardId}
          columnsLength={Object.keys(columns).length}
        />
      </ul>

      <DragOverlay>
        {activeId ? (
          <DraggableTask
            scrollbarVisible={false}
            task={
              Object.values(columns)
                .flatMap((c) => c.tasks)
                .find((t) => t.id === +activeId?.toString().split("-")[1])!
            }
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
