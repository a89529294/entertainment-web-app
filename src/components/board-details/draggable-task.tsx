import { TTask } from "@/data/types";
import { cn } from "@/lib/utils";
import { textHeadingM } from "@/styles/custom-class-names";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function DraggableTask({
  task,
  scrollbarVisible,
}: {
  task: TTask;
  scrollbarVisible: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: `task-${task.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      key={task.id}
      className={cn(
        "w-72 rounded-lg bg-white px-4 py-6 shadow-lg",
        textHeadingM,
        scrollbarVisible && "w-[269px]",
      )}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {task.name}
    </li>
  );
}
