import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function POST(
  request: Request,
  { params }: { params: { "subtask-id": string; completed: string } },
) {
  const obj = await validateRequest();

  if (!obj.user) Response.json({ code: "You are not authorized." });

  const subtaskId = params["subtask-id"];
  const completed = params.completed === "true";

  await db`UPDATE subtasks SET completed = ${completed} WHERE id = ${subtaskId};`;

  return Response.json({ success: true });
}
