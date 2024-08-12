import { TaskDetailsDialog } from "@/components/task-details/task-details-dialog";
import { TSubtask, TTask } from "@/data/types";
import { cn } from "@/lib/utils";
import { textBodyM, textHeadingM } from "@/styles/custom-class-names";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";

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
  const [open, setOpen] = useState(false);
  const [subtasks, setSubtasks] = useState<TSubtask[] | undefined>(undefined);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    (async () => {
      if (!open) {
        const subtasks = (await fetch(`/api/${task.id}/subtasks`).then((v) =>
          v.json(),
        )) as { subtasks: TSubtask[] };

        setSubtasks(subtasks.subtasks);
      }
    })();
  }, [task.id, open]);

  return (
    <TaskDetailsDialog
      open={open}
      setOpen={setOpen}
      task={task}
      subtasks={subtasks}
      trigger={
        <li
          key={task.id}
          className={cn(
            "w-72 cursor-grab touch-none list-none space-y-2 rounded-lg bg-white px-4 py-6 text-left shadow-md dark:bg-dark-grey",
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
          <p>{task.name}</p>
          <p className={cn("text-medium-grey", textBodyM)}>
            {subtasks?.filter((s) => s.completed).length} of {subtasks?.length}{" "}
            subtasks
          </p>
        </li>
      }
    />
  );
}
