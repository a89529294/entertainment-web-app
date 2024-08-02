import { TaskDetailsDialog } from "@/components/board-details/task-details-dialog";
import { TTask } from "@/data/types";
import { cn } from "@/lib/utils";
import { textHeadingM } from "@/styles/custom-class-names";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function DraggableTask({
  task,
  scrollbarVisible,
  className,
}: {
  task: TTask;
  scrollbarVisible: boolean;
  className?: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TaskDetailsDialog
      task={task}
      trigger={
        <li
          key={task.id}
          className={cn(
            "w-72 cursor-grab touch-none list-none rounded-lg bg-white px-4 py-6 text-left shadow-md",
            textHeadingM,
            scrollbarVisible && "w-[269px]",
            isDragging && "opacity-50",
            className,
          )}
          ref={setNodeRef}
          style={style}
          {...listeners}
          {...attributes}
        >
          {task.name}
        </li>
      }
    />
  );
}
