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
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useEffect, useId, useState } from "react";

export function DragAndDropArea({
  serverColumns,
  boardId,
  boardName,
}: {
  serverColumns: Record<string, TAggregatedColumnWithTasks>;
  boardId: string;
  boardName: string;
}) {
  const id = useId();
  const [isMobile, setIsMobile] = useState(false);
  const [columns, setColumns] = useState(serverColumns);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const DesktopSensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const mobileSensors = useSensors(
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    const { id } = active;
    const overId = over?.id;

    if (!overId) return;

    // Find the containers
    const activeContainerId = findColumnId(id.toString());
    const overContainerId = findColumnId(overId.toString());
    if (
      !activeContainerId ||
      !overContainerId ||
      activeContainerId === overContainerId
    ) {
      return;
    }

    setColumns((prev) => {
      if (!prev[activeContainerId] || !prev[overContainerId]) return prev;

      const activeItems = prev[activeContainerId].tasks;
      const overItems = prev[overContainerId].tasks;
      // Find the indexes for the items
      const activeIndex = activeItems.findIndex((t) => t.id === id);
      const overIndex = overItems.findIndex((t) => t.id === overId);
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
        [activeContainerId]: {
          ...prev[activeContainerId],
          tasks: prev[activeContainerId].tasks.filter(
            (item) => item.id !== active.id,
          ),
        },
        [overContainerId]: {
          ...prev[overContainerId],
          tasks: [
            ...prev[overContainerId].tasks.slice(0, newIndex),
            columns[activeContainerId].tasks[activeIndex],
            ...prev[overContainerId].tasks.slice(newIndex),
          ],
        },
      };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const { id } = active;
    const overId = over?.id;

    if (!overId) return;

    // Find the containers
    const activeContainerId = findColumnId(id.toString());
    const overContainerId = findColumnId(overId.toString());
    if (
      !activeContainerId ||
      !overContainerId ||
      activeContainerId !== overContainerId
    ) {
      return;
    }

    setColumns((prev) => {
      if (!prev[activeContainerId] || !prev[overContainerId]) return prev;

      const activeItems = prev[activeContainerId].tasks;
      const overItems = prev[overContainerId].tasks;
      // Find the indexes for the items
      const activeIndex = activeItems.findIndex((t) => t.id === id);
      const overIndex = overItems.findIndex((t) => t.id === overId);

      return {
        ...prev,
        [overContainerId]: {
          ...prev[overContainerId],
          tasks: arrayMove(prev[overContainerId].tasks, activeIndex, overIndex),
        },
      };
    });
  }

  function findColumnId(id: string) {
    const foundColumn = Object.values(columns).find((c) => c.id === id);

    if (foundColumn) {
      return id;
    }

    const c = Object.values(columns).find((c) =>
      c.tasks.find((t) => t.id === id),
    );
    return c ? c.id : undefined;
  }

  useEffect(() => {
    setColumns(serverColumns);
  }, [serverColumns]);

  return (
    <DndContext
      id={id}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={isMobile ? mobileSensors : DesktopSensors}
      collisionDetection={closestCorners}
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
                .find((t) => t.id === activeId)!
            }
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
