import { AddNewTaskBtn } from "@/components/common/add-new-task-btn";
import { getTasksForColumn } from "@/data/get-tasks";
import { cn, generateRandomColor } from "@/lib/utils";
import { textHeadingM, textHeadingS } from "@/styles/custom-class-names";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollableTaskContainer } from "@/components/board-details/scrollable-task-container";

export async function Column({ id, name }: { id: number; name: string }) {
  const tasks = await getTasksForColumn(id);

  return (
    <li className="h-full">
      <ul className="flex flex-col gap-5 h-full relative">
        <h2 className={cn("flex gap-3 text-medium-grey", textHeadingS)}>
          <div
            className="size-4 rounded-full"
            style={{
              backgroundColor: generateRandomColor(),
            }}
          />

          {name}
        </h2>

        <ScrollableTaskContainer tasks={tasks} />

        <li>
          <AddNewTaskBtn columnId={id} sequence={tasks.length} />
        </li>
      </ul>
    </li>
  );
}
