import { TaskStatus, TSubtask } from "@/data/types";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function POST(
  request: Request,
  { params }: { params: { "task-id": string; status: TaskStatus } },
) {
  const obj = await validateRequest();

  if (!obj.user) Response.json({ code: "You are not authorized." });

  const taskId = params["task-id"];
  const status = params["status"];

  await db`UPDATE tasks SET status = ${status} WHERE id = ${taskId}`;
  revalidateTag("columns-with-tasks");
  return Response.json({ sucess: true });
}
