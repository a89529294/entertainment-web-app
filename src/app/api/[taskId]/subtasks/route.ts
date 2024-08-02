import { TSubtask } from "@/data/types";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { taskId: string } },
) {
  const obj = await validateRequest();

  if (!obj.user) Response.json({ code: "You are not authorized." });

  const taskId = params.taskId;

  const subtasks =
    (await db`SELECT * FROM subtasks WHERE task_id = ${taskId}`) as TSubtask[];

  return Response.json({ subtasks });
}
