import { TTask } from "@/data/types";
import { db } from "@/lib/db";
import { cn, generateRandomColor } from "@/lib/utils";
import { textHeadingM, textHeadingS } from "@/styles/custom-class-names";

export async function Column({ id, name }: { id: number; name: string }) {
  const tasks =
    (await db`SELECT * FROM tasks WHERE column_id = ${id}`) as TTask[];

  return (
    <li>
      <ul className="flex flex-col gap-5">
        <h2 className={cn("flex gap-3", textHeadingS)}>
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
      </ul>
    </li>
  );
}
